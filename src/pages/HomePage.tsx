import { useId, useMemo } from 'react'
import type { Category, Term } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { dailyTerm, englishName, levelCounts, recentlyAdded, representative, LEVEL_LABEL, LEVELS } from '../lib/terms'
import { groupCategories } from '../lib/groups'
import { TermCard } from '../components/TermCard'
import { LevelMeter } from '../components/LevelMeter'
import { Icon } from '../components/Icon'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

function LevelMix({ counts, total }: { counts: Record<1 | 2 | 3, number>; total: number }) {
  const label = LEVELS.map((l) => `${LEVEL_LABEL[l]} ${counts[l]}`).join(', ')
  return (
    <span className="mix" role="img" aria-label={`난이도 비율: ${label}`} title={label}>
      {LEVELS.map((l) => (
        <span key={l} className={`mix__seg mix__seg--${l}`} style={{ flexGrow: counts[l] || 0, flexBasis: 0 }} />
      ))}
      {total === 0 && <span className="mix__seg" style={{ flexGrow: 1 }} />}
    </span>
  )
}

function CategoryTile({ cat, terms }: { cat: Category; terms: Term[] }) {
  const counts = levelCounts(terms)
  const reps = representative(terms, 3)
  return (
    <li className="cattile">
      <a className="cattile__link" href={toHash({ kind: 'category', code: cat.code })}>
        <span className="cattile__icon" aria-hidden="true">
          {cat.icon}
        </span>
        <span className="cattile__name">{cat.name}</span>
      </a>
      <span className="cattile__count">{terms.length}</span>
      <LevelMix counts={counts} total={terms.length} />
      <p className="cattile__reps">{reps.map((t) => t.term).join(' · ')}</p>
    </li>
  )
}

function TermRail({ title, terms, ctx, more }: { title: string; terms: Term[]; ctx: PageContext; more?: { href: string; label: string } }) {
  const hid = useId()
  return (
    <section className="section" aria-labelledby={hid}>
      <div className="section__head">
        <h2 className="section__title" id={hid}>
          {title}
        </h2>
        {more && (
          <a className="section__more" href={more.href}>
            {more.label} <Icon name="arrow-right" size={14} />
          </a>
        )}
      </div>
      <ul className="grid grid--cards grid--rail">
        {terms.map((t) => (
          <li key={t.id}>
            <TermCard term={t} category={ctx.data.categories.get(t.category)} compact />
          </li>
        ))}
      </ul>
    </section>
  )
}

export function HomePage({ ctx }: { ctx: PageContext }) {
  const { data, stars, recentTerms, openSearch } = ctx
  const { terms, categories, stats } = data.bundle

  const today = useMemo(() => dailyTerm(terms, new Date()), [terms])
  const byCat = useMemo(() => {
    const m = new Map<string, Term[]>()
    for (const t of terms) {
      const list = m.get(t.category)
      if (list) list.push(t)
      else m.set(t.category, [t])
    }
    return m
  }, [terms])
  const recentViewed = recentTerms.map((id) => data.byId.get(id)).filter((t): t is Term => Boolean(t)).slice(0, 6)
  const starred = terms.filter((t) => stars.has(t.id))
  const added = useMemo(() => recentlyAdded(terms, 6), [terms])
  const todayCat = today ? data.categories.get(today.category) : undefined

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <p className="hero__eyebrow">IT 용어 사전</p>
          <h1 className="hero__title">모르는 용어를, 10초 안에.</h1>
          <p className="hero__lead">한 줄 정의 · 비유 · 예시 · 헷갈리기 쉬운 것. 컴공 학부생과 연구실 신입을 위한 용어 사전.</p>
          <button type="button" className="hero__search" onClick={openSearch} aria-haspopup="dialog">
            <Icon name="search" size={20} />
            <span className="hero__placeholder">SSH, 리버스 프록시, ㄹㅂㅅ …</span>
            <span className="hero__keys" aria-hidden="true">
              <kbd>/</kbd>
              <span>또는</span>
              <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
              <kbd>K</kbd>
            </span>
            <span className="sr-only">용어 검색 열기</span>
          </button>
          <p className="hero__stats">
            <strong>{stats.total}</strong>개 용어 · <strong>{categories.length}</strong>개 분야 · 한글·영문·약어·초성 검색
          </p>
        </div>
      </section>

      <div className="container home__body">
        {today && (
          <section className="section" aria-labelledby="h-today">
            <div className="section__head">
              <h2 className="section__title" id="h-today">
                오늘의 용어
              </h2>
              <span className="section__note">
                {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
              </span>
            </div>
            <a className="today" href={toHash({ kind: 'term', id: today.id })}>
              <span className="today__meta">
                {todayCat && (
                  <span>
                    <span aria-hidden="true">{todayCat.icon}</span> {todayCat.name}
                  </span>
                )}
                <LevelMeter level={today.level} showLabel />
              </span>
              <span className="today__term">{today.term}</span>
              {englishName(today) && <span className="today__en">{englishName(today)}</span>}
              <span className="today__def">{today.definition}</span>
              <span className="today__cta">
                읽어 보기 <Icon name="arrow-right" size={16} />
              </span>
            </a>
          </section>
        )}

        {recentViewed.length > 0 && <TermRail title="최근 본 용어" terms={recentViewed} ctx={ctx} />}
        {starred.length > 0 && (
          <TermRail
            title="별표한 용어"
            terms={starred.slice(0, 6)}
            ctx={ctx}
            more={starred.length > 6 ? { href: toHash({ kind: 'starred' }), label: `${starred.length}개 모두 보기` } : { href: toHash({ kind: 'starred' }), label: '별표 목록' }}
          />
        )}

        <section className="section" aria-labelledby="h-cats">
          <div className="section__head">
            <h2 className="section__title" id="h-cats">
              분야
            </h2>
            <span className="section__note">{categories.length}개</span>
          </div>
          {groupCategories(categories).map((g) => (
            <div key={g.name} className="catgroup">
              <h3 className="catgroup__name">
                {g.name}
                <span className="catgroup__count">{g.categories.length}</span>
              </h3>
              <ul className="catgrid">
                {g.categories.map((c) => (
                  <CategoryTile key={c.code} cat={c} terms={byCat.get(c.code) ?? []} />
                ))}
              </ul>
            </div>
          ))}
          <p className="catgrid__legend" aria-hidden="true">
            <span className="mix__seg mix__seg--1" /> 기초 <span className="mix__seg mix__seg--2" /> 중급 <span className="mix__seg mix__seg--3" /> 심화
          </p>
        </section>

        <TermRail title="최근 추가된 용어" terms={added} ctx={ctx} more={{ href: toHash({ kind: 'stats' }), label: '통계' }} />
      </div>
    </div>
  )
}
