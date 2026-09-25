import { describe, it, expect } from 'vitest'
import { createSearch } from './search'
import { TERMS, BODY_MAP } from '../test/fixtures'

const search = createSearch(TERMS, BODY_MAP)
const ids = (q: string) => search.search(q).map((h) => h.id)

describe('createSearch', () => {
  it('matches term, alias, korean alias and english prefix', () => {
    expect(ids('프록시')).toContain('reverse-proxy')
    expect(ids('secure')).toContain('ssh')
    expect(ids('시큐어')).toContain('ssh')
    expect(ids('검색 증강')[0]).toBe('rag')
  })

  it('finds by chosung query', () => {
    expect(ids('ㄹㅂㅅ')[0]).toBe('reverse-proxy')
    expect(ids('ㅍㅌ')).toContain('port')
  })

  it('finds by mid-word substring fallback', () => {
    expect(ids('록시')).toContain('reverse-proxy')
  })

  it('ranks exact term above body mention', () => {
    expect(ids('SSH')[0]).toBe('ssh')
    expect(ids('SSH')).toContain('port')
  })

  it('searches definition and body text', () => {
    expect(ids('오픈북')).toEqual(['rag'])
    expect(ids('중간 서버')).toContain('reverse-proxy')
  })

  it('works before bodies arrive (index-only phase)', () => {
    const light = createSearch(TERMS)
    expect(light.search('오픈북')).toEqual([])
    expect(light.search('SSH')[0].id).toBe('ssh')
    expect(light.search('중간 서버').map((h) => h.id)).toContain('reverse-proxy')
  })

  it('returns [] for empty or whitespace query', () => {
    expect(ids('')).toEqual([])
    expect(ids('   ')).toEqual([])
  })

  it('respects the limit', () => {
    expect(search.search('포', 1)).toHaveLength(1)
  })

  it('does not throw on punctuation-only queries', () => {
    expect(ids('...')).toEqual([])
  })
})
