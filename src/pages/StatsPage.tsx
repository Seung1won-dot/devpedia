import { useMemo } from 'react'
import type { Kind } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { LEVEL_LABEL, LEVELS } from '../lib/terms'
import { KIND_LABEL } from '../lib/kind'
import { Breadcrumb } from '../components/Breadcrumb'
import { SectionHead } from '../components/SectionHead'
import { BarChart, type BarGroup } from '../components/BarChart'
import { groupCategories } from '../lib/groups'

const MIN_PER_CATEGORY = 10
const KINDS: Kind[] = ['concept', 'tool', 'protocol', 'pattern', 'metric', 'regulation']

/** 통계 (스펙 F-11). 막대는 한 가지 색이고, 식별은 행 라벨(아이콘·이름)이 맡는다. */
export function StatsPage({ ctx }: { ctx: PageContext }) {
  const { bundle } = ctx.data
  const { stats, categories, terms } = bundle
  const covered = categories.filter((c) => (stats.byCategory[c.code] ?? 0) >= MIN_PER_CATEGORY).length
  const starredCount = terms.filter((t) => ctx.stars.has(t.id)).length
  const byKind = useMemo(() => {
    const m: Record<Kind, number> = { concept: 0, tool: 0, protocol: 0, pattern: 0, metric: 0, regulation: 0 }
    for (const t of terms) m[t.kind]++
    return m
  }, [terms])
  const catGroups: BarGroup[] = useMemo(
    () =>
      groupCategories(categories).map((g) => ({
        name: g.name,
        rows: g.categories.map((c) => {
          const n = stats.byCategory[c.code] ?? 0
          return {
            key: c.code,
            name: c.name,
            value: n,
            href: toHash({ kind: 'category', code: c.code }),
            flag: n < MIN_PER_CATEGORY,
            label: (
c.name
            ),
          }
        }),
      })),
    [categories, stats.byCategory],
  )
  const generated = new Date(bundle.generatedAt)
  const published = stats.total ? Math.round((stats.byStatus.published / stats.total) * 100) : 0

  return (
    <div className="container page stats">
      <Breadcrumb items={[{ label: '홈', href: toHash({ kind: 'home' }) }, { label: '통계' }]} />
      <SectionHead
        level={1}
        size="lg"
        className="sechead--page"
        eyebrow="숫자로 보는 Devpedia"
        title="통계"
        lead="카드 수·분야 커버·관계 밀도처럼 사전이 얼마나 채워졌는지를 빌드 시점 기준으로 보여 줍니다."
        aside={
          <>
            빌드 <time dateTime={bundle.generatedAt}>{generated.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}</time> 기준
          </>
        }
      />

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
          <p className="stats__sub">그룹별로 묶었습니다. 막대에 올리면 전체 대비 비율이 보이고, 이름을 누르면 그 분야로 갑니다.</p>
          <BarChart groups={catGroups} total={stats.total} testId="stats-cat-bar" axis />
        </section>

        <section className="stats__card" aria-labelledby="h-level">
          <h2 className="stats__h" id="h-level">
            난이도
          </h2>
          <BarChart
            groups={[{ name: '난이도', rows: LEVELS.map((l) => ({ key: String(l), name: LEVEL_LABEL[l], label: LEVEL_LABEL[l], value: stats.byLevel[l] })) }]}
            total={stats.total}
          />
          <h2 className="stats__h stats__h--gap">카드 종류</h2>
          <BarChart groups={[{ name: '카드 종류', rows: KINDS.map((k) => ({ key: k, name: KIND_LABEL[k], label: KIND_LABEL[k], value: byKind[k] })) }]} total={stats.total} />
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
