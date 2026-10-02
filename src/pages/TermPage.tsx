import type { Term } from '../types'
import type { PageContext } from '../App'

export function TermPage({ term }: { ctx: PageContext; term: Term }) {
  return (
    <div className="container page">
      <h1 className="pagehead__title">{term.term}</h1>
      <p className="pagehead__desc">{term.definition}</p>
    </div>
  )
}
