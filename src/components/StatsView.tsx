import type { Bundle, Level } from '../types'
import type { Route } from '../lib/route'
import { Icon } from './Icon'
import { LEVEL_LABEL } from './FilterBar'

interface Props {
  bundle: Bundle
  starredCount: number
  onNavigate: (r: Route) => void
  onClose: () => void
}

const MIN_PER_CATEGORY = 10
const LEVELS: Level[] = [1, 2, 3]

function Bar({ value, max, label, testId }: { value: number; max: number; label: string; testId?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div
      className="bar"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
      data-testid={testId}
    >
      <div className="bar__fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

/** 통계 뷰 (스펙 F-11). 막대는 한 가지 색이고 식별은 행 라벨(아이콘·이름)이 맡는다. */
export function StatsView({ bundle, starredCount, onNavigate, onClose }: Props) {
  const { stats, categories } = bundle
  const maxCat = Math.max(1, ...Object.values(stats.byCategory))
  const covered = categories.filter((c) => (stats.byCategory[c.code] ?? 0) >= MIN_PER_CATEGORY).length
  const generated = new Date(stats && bundle.generatedAt)

  return (
    <article className="stats" aria-labelledby="stats-title">
      <div className="detail__topbar">
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          <Icon name="arrow-left" size={16} />
          목록으로
        </button>
      </div>
      <header className="stats__head">
        <h1 id="stats-title" className="detail__title">통계</h1>
        <p className="muted">
          빌드 {generated.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })} 기준
        </p>
      </header>

      <section className="kpis" aria-label="핵심 지표">
        <div className="kpi">
          <span className="kpi__label">등록 용어</span>
          <span className="kpi__value" data-testid="stats-total">{stats.total}</span>
          <span className="kpi__hint">K1 · v1 목표 150</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">카테고리 커버</span>
          <span className="kpi__value">{covered}<span className="kpi__unit">/{categories.length}</span></span>
          <span className="kpi__hint">K2 · {MIN_PER_CATEGORY}개 이상인 카테고리</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">용어당 관련 용어</span>
          <span className="kpi__value">{stats.avgRelated}</span>
          <span className="kpi__hint">K7 · 고아 {stats.orphanCount}개</span>
        </div>
        <div className="kpi">
          <span className="kpi__label">별표</span>
          <span className="kpi__value">{starredCount}</span>
          <span className="kpi__hint">이 기기에서 복습 표시</span>
        </div>
      </section>

      <section className="detail__section">
        <h2>카테고리별 카드 수</h2>
        <ul className="bars">
          {categories.map((c) => {
            const n = stats.byCategory[c.code] ?? 0
            return (
              <li key={c.code} className="bars__row">
                <button type="button" className="bars__label" onClick={() => onNavigate({ kind: 'category', code: c.code })}>
                  <span aria-hidden="true">{c.icon}</span> {c.name}
                </button>
                <Bar value={n} max={maxCat} label={`${c.name} ${n}개`} testId="stats-cat-bar" />
                <span className={`bars__value${n < MIN_PER_CATEGORY ? ' bars__value--low' : ''}`}>{n}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="detail__section">
        <h2>난이도 · 상태</h2>
        <div className="stats__twocol">
          <ul className="bars">
            {LEVELS.map((l) => (
              <li key={l} className="bars__row">
                <span className="bars__label">{LEVEL_LABEL[l]}</span>
                <Bar value={stats.byLevel[l]} max={Math.max(1, ...LEVELS.map((x) => stats.byLevel[x]))} label={`${LEVEL_LABEL[l]} ${stats.byLevel[l]}개`} />
                <span className="bars__value">{stats.byLevel[l]}</span>
              </li>
            ))}
          </ul>
          <dl className="stats__status">
            <div><dt>발행됨</dt><dd>{stats.byStatus.published}</dd></div>
            <div><dt>검토 중</dt><dd>{stats.byStatus.review}</dd></div>
            <div><dt>초안</dt><dd>{stats.byStatus.draft}</dd></div>
          </dl>
        </div>
      </section>

      {stats.recent.length > 0 && (
        <section className="detail__section">
          <h2>최근 갱신</h2>
          <ul className="recent">
            {stats.recent.map((r) => (
              <li key={r.id}>
                <button type="button" className="recent__item" onClick={() => onNavigate({ kind: 'term', id: r.id })}>
                  <span className="recent__term">{r.term}</span>
                  <span className="recent__date">{r.updated}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
