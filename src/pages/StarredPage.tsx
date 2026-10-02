import type { PageContext } from '../App'
import { StubList } from './stub'

export function StarredPage({ ctx }: { ctx: PageContext }) {
  return <StubList ctx={ctx} title="별표" terms={ctx.data.bundle.terms.filter((t) => ctx.stars.has(t.id))} />
}
