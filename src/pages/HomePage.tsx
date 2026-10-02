import type { PageContext } from '../App'
import { StubList } from './stub'

export function HomePage({ ctx }: { ctx: PageContext }) {
  return <StubList ctx={ctx} title="Devpedia" terms={ctx.data.bundle.terms.slice(0, 12)} />
}
