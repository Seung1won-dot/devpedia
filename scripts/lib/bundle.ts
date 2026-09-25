import type { BodyBundle, Bundle, Level, Stats, Status, Term, TermBody } from '../../src/types'
import type { Taxonomy } from './taxonomy'
import { relationStats, stripInline, type ValidatedTerm } from './validate'
import { renderBlock, renderInline, toPlainText } from './render'

const RECENT_COUNT = 10

export interface BuildOutput {
  /** terms.json — 목록·검색·카드 헤더용 */
  index: Bundle
  /** terms-body.json — 렌더된 본문 + 본문 검색 텍스트 (첫 화면 뒤에 받는다) */
  bodies: BodyBundle
}

/** 검증을 통과한 카드들을 앱이 읽는 두 JSON(인덱스 + 본문)으로 조립한다. */
export function buildBundle(validated: ValidatedTerm[], taxonomy: Taxonomy, now: Date = new Date()): BuildOutput {
  const order = new Map(taxonomy.categories.map((c) => [c.code, c.order]))
  const { avgRelated, orphanCount, inbound } = relationStats(
    validated.map((t) => ({ id: t.fm.id, related: t.fm.related })),
  )

  const terms: Term[] = validated.map(({ fm, sections }) => ({
    id: fm.id,
    term: fm.term,
    aliases: fm.aliases,
    category: fm.category,
    tags: fm.tags,
    level: fm.level,
    related: fm.related,
    backlinks: inbound.get(fm.id) ?? [],
    seeAlso: fm.see_also,
    status: fm.status,
    created: fm.created,
    updated: fm.updated ?? fm.created,
    definition: stripInline(sections.definition),
  }))

  terms.sort(
    (a, b) =>
      (order.get(a.category) ?? 99) - (order.get(b.category) ?? 99) ||
      a.level - b.level ||
      a.term.localeCompare(b.term, 'ko'),
  )

  const bodies: Record<string, TermBody> = {}
  for (const { fm, sections } of validated) {
    bodies[fm.id] = {
      definitionHtml: renderInline(sections.definition),
      analogyHtml: renderBlock(sections.analogy),
      exampleHtml: renderBlock(sections.example),
      confusionsHtml: sections.confusions ? renderBlock(sections.confusions) : null,
      searchText: toPlainText([sections.analogy, sections.example, sections.confusions ?? ''].join('\n\n')),
    }
  }

  const byCategory: Record<string, number> = {}
  const byLevel: Record<Level, number> = { 1: 0, 2: 0, 3: 0 }
  const byStatus: Record<Status, number> = { draft: 0, review: 0, published: 0 }
  for (const t of terms) {
    byCategory[t.category] = (byCategory[t.category] ?? 0) + 1
    byLevel[t.level]++
    byStatus[t.status]++
  }
  const recent = [...terms]
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.term.localeCompare(b.term, 'ko'))
    .slice(0, RECENT_COUNT)
    .map((t) => ({ id: t.id, term: t.term, updated: t.updated }))

  const stats: Stats = { total: terms.length, byCategory, byLevel, byStatus, recent, avgRelated, orphanCount }
  const generatedAt = now.toISOString()

  return {
    index: { version: 1, generatedAt, categories: taxonomy.categories, tags: taxonomy.tags, terms, stats },
    bodies: { version: 1, generatedAt, bodies },
  }
}
