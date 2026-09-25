import { describe, it, expect } from 'vitest'
import { parseHash, toHash } from './route'

describe('parseHash', () => {
  it('maps empty hashes to home', () => {
    expect(parseHash('')).toEqual({ kind: 'home' })
    expect(parseHash('#')).toEqual({ kind: 'home' })
    expect(parseHash('#/')).toEqual({ kind: 'home' })
  })

  it('maps a bare id to a term', () => {
    expect(parseHash('#ssh')).toEqual({ kind: 'term', id: 'ssh' })
    expect(parseHash('#reverse-proxy')).toEqual({ kind: 'term', id: 'reverse-proxy' })
  })

  it('maps c/<code> to a category and rejects an empty code', () => {
    expect(parseHash('#c/network')).toEqual({ kind: 'category', code: 'network' })
    expect(parseHash('#c/')).toEqual({ kind: 'home' })
  })

  it('maps reserved words', () => {
    expect(parseHash('#starred')).toEqual({ kind: 'starred' })
    expect(parseHash('#stats')).toEqual({ kind: 'stats' })
  })

  it('decodes percent-encoded ids', () => {
    expect(parseHash('#%EC%9A%A9%EC%96%B4')).toEqual({ kind: 'term', id: '용어' })
  })

  it('parseHash falls back to home on garbage', () => {
    expect(parseHash('#a/b/c')).toEqual({ kind: 'home' })
    expect(parseHash('#%E0%A4%A')).toEqual({ kind: 'home' })
  })
})

describe('toHash', () => {
  it('produces shareable hashes', () => {
    expect(toHash({ kind: 'term', id: 'ssh' })).toBe('#ssh')
    expect(toHash({ kind: 'category', code: 'ai' })).toBe('#c/ai')
    expect(toHash({ kind: 'home' })).toBe('#/')
    expect(toHash({ kind: 'starred' })).toBe('#starred')
    expect(toHash({ kind: 'stats' })).toBe('#stats')
  })

  it('round-trips through parseHash', () => {
    const routes = [{ kind: 'term', id: 'ssh' }, { kind: 'category', code: 'ai' }, { kind: 'home' }, { kind: 'starred' }] as const
    for (const r of routes) expect(parseHash(toHash(r))).toEqual(r)
  })
})
