import { describe, it, expect } from 'vitest'
import { sortTerms, filterTerms, tagsIn, bundleUrl, bodiesUrl, indexById, englishName, dailyTerm, neighbors, recentlyAdded, representative, levelCounts } from './terms'
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
    expect(bodiesUrl('/devpedia/')).toBe('/devpedia/terms-body.json')
  })
  it('indexes by id', () => {
    expect(indexById(TERMS).get('rag')?.term).toBe('RAG')
  })
})


describe('card helpers', () => {
  it('picks the first Latin alias as the English name, none for Latin terms', () => {
    expect(englishName(makeTerm({ id: 'a', term: '리버스 프록시', aliases: ['Reverse Proxy', '역방향 프록시'] }))).toBe('Reverse Proxy')
    expect(englishName(makeTerm({ id: 'b', term: 'SSH', aliases: ['Secure Shell'] }))).toBeNull()
    expect(englishName(makeTerm({ id: 'c', term: '포트', aliases: ['포트 번호'] }))).toBeNull()
  })

  it('chooses a stable daily term', () => {
    const d = new Date(2026, 9, 3)
    expect(dailyTerm(TERMS, d)?.id).toBe(dailyTerm(TERMS, new Date(2026, 9, 3, 23, 0))?.id)
    expect(dailyTerm([], d)).toBeNull()
  })

  it('finds previous/next in the same category by name', () => {
    const ssh = TERMS.find((t) => t.id === 'ssh')!
    const n = neighbors(TERMS, ssh)
    expect(n.prev?.id).toBe('reverse-proxy')
    expect(n.next).toBeNull()
  })

  it('ranks representative terms by backlinks and recent ones by created date', () => {
    expect(representative(TERMS, 1)[0].id).toBe('port')
    const r = recentlyAdded([makeTerm({ id: 'old', created: '2026-01-01' }), makeTerm({ id: 'new', created: '2026-10-01' })], 1)
    expect(r[0].id).toBe('new')
    expect(levelCounts(TERMS)).toEqual({ 1: 2, 2: 2, 3: 0 })
  })
})
