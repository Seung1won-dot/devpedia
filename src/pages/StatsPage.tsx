import { useMemo } from 'react'
import type { Kind } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { LEVEL_LABEL, LEVELS } from '../lib/terms'
import { KIND_LABEL } from '../lib/kind'
import { Breadcrumb } from '../components/Breadcrumb'

const MIN_PER_CATEGORY = 10
const KINDS: Kind[] = ['concept', 'tool', 'protocol', 'pattern', 'metric', 'regulation']

function Bar({ value, max, label, testId }: { value: number; max: number; label: string; testId?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <span className="bar" role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label} data-testid={testId}>
      <span className="bar__fill" style={{ width: `${pct}%` }} />
    </span>
  )
}

/** 통계 (스펙 F-11). 막대는 한 가지 색이고, 식별은 행 라벨(아이콘·이름)이 맡는다. */
export function StatsPage({ ctx }: { ctx: PageContext }) {
  const { bundle } = ctx.data
  const { stats, categories, terms } = bundle
  const maxCat = Math.max(1, ...Object.values(stats.byCategory))
  const maxLevel = Math.max(1, ...LEVELS.map((l) => stats.byLevel[l]))
  const covered = categories.filter((c) => (stats.byCategory[c.code] ?? 0) >= MIN_PER_CATEGORY).length
  const starredCount = terms.filter((t) => ctx.stars.has(t.id)).length
  const byKind = useMemo(() => {
    const m: Record<Kind, number> = { concept: 0, tool: 0, protocol: 0, pattern: 0, metric: 0, regulation: 0 }
    for (const t of terms) m[t.kind]++
    return m
  }, [terms])
  const maxKind = Math.max(1, ...Object.values(byKind))
  const generated = new Date(bundle.generatedAt)
  const published = stats.total ? Math.round((stats.byStatus.published / stats.total) * 100) : 0

  return (
    <div className="container page stats">
      <Breadcrumb items={[{ label: '홈', href: toHash({ kind: 'home' }) }, { label: '통계' }]} />
      <header className="pagehead pagehead--cat">
        <h1 className="pagehead__title">통계</h1>
        <p className="pagehead__meta">
          빌드 <time dateTime={bundle.generatedAt}>{generated.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}</time> 기준
        </p>
      </header>

      <section className="kpis" aria-label="핵심 지표">
        <div className="kpi">
          <span className="kpi__label">등록 용어</span>
          <span className="kpi__value" data-testid="stats-total">
            {stats.total}
          </span>
          <span className="kpi__hint">K1</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">분야 커버</span>
          <span className="kpi__value">
            {covered}
            <span className="kpi__unit">/{categories.length}</span>
          </span>
          <span className="kpi__hint">K2 · {MIN_PER_CATEGORY}장 이상인 분야</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">용어당 관련 용어</span>
          <span className="kpi__value">{stats.avgRelated}</span>
          <span className="kpi__hint">K7 · 고아 {stats.orphanCount}개</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">발행 비율</span>
          <span className="kpi__value">
            {published}
            <span className="kpi__unit">%</span>
          </span>
          <span className="kpi__hint">
            발행 {stats.byStatus.published} · 검토 중 {stats.byStatus.review} · 초안 {stats.byStatus.draft}
          </span>
        </div>
        <div className="kpi">
          <span className="kpi__label">별표</span>
          <span className="kpi__value">{starredCount}</span>
          <span className="kpi__hint">이 기기에서 복습 표시</span>
        </div>
      </section>

      <div className="stats__grid">
        <section className="stats__card stats__card--wide" aria-labelledby="h-bycat">
          <h2 className="stats__h" id="h-bycat">
            분야별 카드 수
          </h2>
          <ul className="bars">
            {categories.map((c) => {
              const n = stats.byCategory[c.code] ?? 0
              return (
                <li key={c.code} className="bars__row">
                  <a className="bars__label" href={toHash({ kind: 'category', code: c.code })}>
                    <span aria-hidden="true">{c.icon}</span> {c.name}
                  </a>
                  <Bar value={n} max={maxCat} label={`${c.name} ${n}개`} testId="stats-cat-bar" />
                  <span className={`bars__value${n < MIN_PER_CATEGORY ? ' bars__value--low' : ''}`}>{n}</span>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="stats__card" aria-labelledby="h-level">
          <h2 className="stats__h" id="h-level">
            난이도
          </h2>
          <ul className="bars">
            {LEVELS.map((l) => (
              <li key={l} className="bars__row">
                <span className="bars__label">{LEVEL_LABEL[l]}</span>
                <Bar value={stats.byLevel[l]} max={maxLevel} label={`${LEVEL_LABEL[l]} ${stats.byLevel[l]}개`} />
                <span className="bars__value">{stats.byLevel[l]}</span>
              </li>
            ))}
          </ul>
          <h2 className="stats__h stats__h--gap">카드 종류</h2>
          <ul className="bars">
            {KINDS.map((k) => (
              <li key={k} className="bars__row">
                <span className="bars__label">{KIND_LABEL[k]}</span>
                <Bar value={byKind[k]} max={maxKind} label={`${KIND_LABEL[k]} ${byKind[k]}개`} />
                <span className="bars__value">{byKind[k]}</span>
              </li>
            ))}
          </ul>
        </section>

        {stats.recent.length > 0 && (
          <section className="stats__card" aria-labelledby="h-recent">
            <h2 className="stats__h" id="h-recent">
              최근 갱신
            </h2>
            <ul className="recent">
              {stats.recent.map((r) => (
                <li key={r.id}>
                  <a className="recent__item" href={toHash({ kind: 'term', id: r.id })}>
                    <span className="recent__term">{r.term}</span>
                    <time className="recent__date" dateTime={r.updated}>
                      {r.updated}
                    </time>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
