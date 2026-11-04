import { useId, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import { m } from 'motion/react'
import type { Category, Term } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { dailyTerm, englishName, levelCounts, recentlyAdded, representative, LEVEL_LABEL, LEVELS } from '../lib/terms'
import { groupCategories } from '../lib/groups'
import { TermCard } from '../components/TermCard'
import { LevelMeter } from '../components/LevelMeter'
import { Icon } from '../components/Icon'
import { SectionHead } from '../components/SectionHead'
import { Reveal } from '../components/Reveal'
import { canObserve, EASE_OUT } from '../lib/motion'
import { playHeroIntro, shouldPlayIntro } from '../lib/intro'

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

// 분야 타일: 그룹이 화면에 들어오면 타일이 순서대로 떠오른다 (그룹당 한 번)
const TILE = { hidden: { opacity: 0, y: 8 }, shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } } }
const TILE_LIST = { hidden: {}, shown: { transition: { staggerChildren: 0.04 } } }

function TileList({ children }: { children: ReactNode }) {
  const view = canObserve() ? { whileInView: 'shown', viewport: { once: true, margin: '0px 0px -10% 0px' } } : { animate: 'shown' }
  return (
    <m.ul className="catgrid" variants={TILE_LIST} initial="hidden" {...view}>
      {children}
    </m.ul>
  )
}

/** 제목을 단어 → 글자 조각으로 나눈다. 글자는 화면에만 쓰고, 스크린리더는 원문 한 줄을 읽는다. */
function SplitTitle({ text, accent }: { text: string; accent?: string }) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi}>
            <span className={`hero__word${accent && w.startsWith(accent) ? ' hero__word--accent' : ''}`}>
              {Array.from(w).map((ch, ci) => (
                <span key={ci} className="hero__char">
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </>
  )
}

function CategoryTile({ cat, terms }: { cat: Category; terms: Term[] }) {
  const counts = levelCounts(terms)
  const reps = representative(terms, 3)
  return (
    <m.li className="cattile" variants={TILE}>
      <a className="cattile__link" href={toHash({ kind: 'category', code: cat.code })}>
        <span className="cattile__icon" aria-hidden="true">
          {cat.icon}
        </span>
        <span className="cattile__name">{cat.name}</span>
      </a>
      <span className="cattile__count">{terms.length}</span>
      <LevelMix counts={counts} total={terms.length} />
      <p className="cattile__reps">{reps.map((t) => t.term).join(' · ')}</p>
    </m.li>
  )
}

function TermRail({ eyebrow, title, terms, ctx, more }: { eyebrow: string; title: string; terms: Term[]; ctx: PageContext; more?: { href: string; label: string } }) {
  const hid = useId()
  return (
    <Reveal className="section" aria-labelledby={hid}>
      <SectionHead
        id={hid}
        eyebrow={eyebrow}
        title={title}
        aside={
          more && (
            <a className="section__more" href={more.href}>
              {more.label} <Icon name="arrow-right" size={14} />
            </a>
          )
        }
      />
      <ul className="grid grid--cards grid--rail">
        {terms.map((t) => (
          <li key={t.id}>
            <TermCard term={t} category={ctx.data.categories.get(t.category)} compact />
          </li>
        ))}
      </ul>
    </Reveal>
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

  // 첫 화면 인트로 (anime.js): 페인트 전에 숨겨 두고, 글자 하나씩 떠오르게 한다. 세션당 한 번.
  const heroRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = heroRef.current
    if (!el || !shouldPlayIntro()) return
    el.classList.add('is-intro')
    return playHeroIntro(el)
  }, [])

  return (
    <div className="home">
      <section className="hero" ref={heroRef}>
        <span className="hero__glow" aria-hidden="true" />
        <span className="hero__grid" aria-hidden="true" />
        <div className="container hero__inner">
          <p className="hero__eyebrow" data-intro>
            <span className="hero__dot" aria-hidden="true" />
            IT 용어 사전
          </p>
          <h1 className="hero__title">
            <SplitTitle text="모르는 용어를, 10초 안에." accent="10초" />
          </h1>
          <p className="hero__lead" data-intro>한 줄 정의 · 비유 · 예시 · 헷갈리기 쉬운 것. 컴공 학부생과 연구실 신입을 위한 용어 사전.</p>
          <button type="button" className="hero__search" onClick={openSearch} aria-haspopup="dialog" data-intro>
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
          <p className="hero__stats" data-intro>
            <strong>{stats.total}</strong>개 용어 · <strong>{categories.length}</strong>개 분야 · 한글·영문·약어·초성 검색
          </p>
        </div>
      </section>

      <div className="container home__body">
        {today && (
          <Reveal className="section" aria-labelledby="h-today">
            <SectionHead
              id="h-today"
              eyebrow={new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
              title="오늘의 용어"
              aside="매일 자정에 바뀝니다"
            />
            <a className="today" href={toHash({ kind: 'term', id: today.id })}>
              <span className="today__meta">
                {todayCat && (
                  <span className="today__cat">
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
          </Reveal>
        )}

        {recentViewed.length > 0 && <TermRail eyebrow="이 기기에서" title="최근 본 용어" terms={recentViewed} ctx={ctx} />}
        {starred.length > 0 && (
          <TermRail
            eyebrow="복습"
            title="별표한 용어"
            terms={starred.slice(0, 6)}
            ctx={ctx}
            more={starred.length > 6 ? { href: toHash({ kind: 'starred' }), label: `${starred.length}개 모두 보기` } : { href: toHash({ kind: 'starred' }), label: '별표 목록' }}
          />
        )}

        <Reveal className="section" aria-label="분야">
          <SectionHead
            size="lg"
            eyebrow="분야"
            title={
              <>
                {categories.length}개 분야를 <em>한 화면</em>에
              </>
            }
            lead="CS 기초부터 서버·인프라, AI, 의료 IT까지. 그룹별로 훑어보고 막대로 난이도 분포를 가늠하세요."
            aside={`${stats.total}개 용어`}
          />
          {groupCategories(categories).map((g) => (
            <div key={g.name} className="catgroup">
              <h3 className="catgroup__name">
                {g.name}
                <span className="catgroup__count">{g.categories.length}</span>
              </h3>
              <TileList>
                {g.categories.map((c) => (
                  <CategoryTile key={c.code} cat={c} terms={byCat.get(c.code) ?? []} />
                ))}
              </TileList>
            </div>
          ))}
          <p className="catgrid__legend" aria-hidden="true">
            <span className="mix__seg mix__seg--1" /> 기초 <span className="mix__seg mix__seg--2" /> 중급 <span className="mix__seg mix__seg--3" /> 심화
          </p>
        </Reveal>

        <TermRail eyebrow="새 카드" title="최근 추가된 용어" terms={added} ctx={ctx} more={{ href: toHash({ kind: 'stats' }), label: '통계' }} />
      </div>
    </div>
  )
}
