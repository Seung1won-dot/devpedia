import type { PageContext } from '../App'
import { StubList } from './stub'

export function CategoryPage({ ctx, code }: { ctx: PageContext; code: string; preview?: string }) {
  const c = ctx.data.categories.get(code)!
  return <StubList ctx={ctx} title={`${c.icon} ${c.name}`} terms={ctx.data.bundle.terms.filter((t) => t.category === code)} />
}
