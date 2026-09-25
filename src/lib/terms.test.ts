import { describe, it, expect } from 'vitest'
import { sortTerms, filterTerms, tagsIn, bundleUrl, indexById } from './terms'
import { TERMS, makeTerm } from '../test/fixtures'

describe('sortTerms', () => {
  it('orders by level then Korean locale of the display name', () => {
    const sorted = sortTerms([
      makeTerm({ id: 'c', term: '하나', level: 3 }),
      makeTerm({ id: 'b', term: '나', level: 1 }),
      makeTerm({ id: 'a', term: '가', level: 1 }),
    ])
    expect(sorted.map((t) => t.id)).toEqual(['a', 'b', 'c'])
  })

  it('does not mutate the input', () => {
    const input = [makeTerm({ id: 'b', level: 2 }), makeTerm({ id: 'a', level: 1 })]
    sortTerms(input)
    expect(input.map((t) => t.id)).toEqual(['b', 'a'])
  })
})

describe('filterTerms', () => {
  it('filters by category', () => {
    expect(filterTerms(TERMS, { category: 'infra' }).map((t) => t.id)).toEqual(['reverse-proxy', 'ssh'])
    expect(filterTerms(TERMS, { category: null }).length).toBe(4)
  })

  it('filters by levels, tag and id set', () => {
    expect(filterTerms(TERMS, { levels: new Set([2]) }).map((t) => t.id)).toEqual(['reverse-proxy', 'rag'])
    expect(filterTerms(TERMS, { tag: 'LLM' }).map((t) => t.id)).toEqual(['rag'])
    expect(filterTerms(TERMS, { ids: new Set(['ssh', 'port']) }).map((t) => t.id)).toEqual(['ssh', 'port'])
  })

  it('combines filters', () => {
    expect(filterTerms(TERMS, { category: 'infra', levels: new Set([1]) }).map((t) => t.id)).toEqual(['ssh'])
  })
})

describe('tagsIn', () => {
  it('counts tags sorted by count then name', () => {
    const tags = tagsIn([
      makeTerm({ id: 'a', tags: ['x', 'y'] }),
      makeTerm({ id: 'b', tags: ['y'] }),
      makeTerm({ id: 'c', tags: ['x', 'y', 'z'] }),
    ])
    expect(tags).toEqual([{ tag: 'y', count: 3 }, { tag: 'x', count: 2 }, { tag: 'z', count: 1 }])
  })
})

describe('bundleUrl / indexById', () => {
  it('joins base and file name', () => {
    expect(bundleUrl('/devpedia/')).toBe('/devpedia/terms.json')
    expect(bundleUrl('/')).toBe('/terms.json')
    expect(bundleUrl('/x')).toBe('/x/terms.json')
  })
  it('indexes by id', () => {
    expect(indexById(TERMS).get('rag')?.term).toBe('RAG')
  })
})
