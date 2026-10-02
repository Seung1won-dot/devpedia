import type { PageContext } from '../App'

export function StatsPage({ ctx }: { ctx: PageContext }) {
  return (
    <div className="container page">
      <h1 className="pagehead__title">통계</h1>
      <p className="pagehead__meta">{ctx.data.bundle.stats.total}개 용어</p>
    </div>
  )
}
