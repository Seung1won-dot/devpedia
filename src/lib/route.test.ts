import { describe, it, expect } from 'vitest'
import { parseHash, toHash, canonicalHash, pageKey, type Route } from './route'

describe('parseHash', () => {
  it('maps empty hashes to home', () => {
    for (const h of ['', '#', '#/', '/']) expect(parseHash(h)).toEqual({ kind: 'home' })
  })

  it('reads the new path-style routes', () => {
    expect(parseHash('#/t/ssh')).toEqual({ kind: 'term', id: 'ssh' })
    expect(parseHash('#/c/network')).toEqual({ kind: 'category', code: 'network' })
    expect(parseHash('#/c/network?p=dns')).toEqual({ kind: 'category', code: 'network', preview: 'dns' })
    expect(parseHash('#/starred')).toEqual({ kind: 'starred' })
    expect(parseHash('#/stats')).toEqual({ kind: 'stats' })
  })

  it('still reads legacy share links', () => {
    expect(parseHash('#ssh')).toEqual({ kind: 'term', id: 'ssh' })
    expect(parseHash('#/ssh')).toEqual({ kind: 'term', id: 'ssh' })
    expect(parseHash('#c/ai')).toEqual({ kind: 'category', code: 'ai' })
    expect(parseHash('#starred')).toEqual({ kind: 'starred' })
    expect(parseHash('#stats')).toEqual({ kind: 'stats' })
  })

  it('decodes percent-encoded ids', () => {
    expect(parseHash('#/t/%73sh')).toEqual({ kind: 'term', id: 'ssh' })
  })

  it('returns notFound for unknown shapes instead of silently going home', () => {
    expect(parseHash('#/x/y/z').kind).toBe('notFound')
    expect(parseHash('#/c/').kind).toBe('notFound')
    expect(parseHash('#/c/Bad_Code').kind).toBe('notFound')
    expect(parseHash('#%E0%A4%A').kind).toBe('notFound')
  })
})

describe('toHash / canonicalHash', () => {
  it('round-trips', () => {
    const routes: Route[] = [
      { kind: 'home' },
      { kind: 'category', code: 'infra' },
      { kind: 'category', code: 'infra', preview: 'ssh' },
      { kind: 'term', id: 'reverse-proxy' },
      { kind: 'starred' },
      { kind: 'stats' },
    ]
    for (const r of routes) expect(parseHash(toHash(r))).toEqual(r)
  })

  it('rewrites legacy hashes to the canonical form and leaves canonical ones alone', () => {
    expect(canonicalHash('#ssh')).toBe('#/t/ssh')
    expect(canonicalHash('#c/os')).toBe('#/c/os')
    expect(canonicalHash('#stats')).toBe('#/stats')
    expect(canonicalHash('#/t/ssh')).toBeNull()
    expect(canonicalHash('')).toBeNull()
    expect(canonicalHash('#/nope/nope')).toBeNull()
  })

  it('treats the preview param as the same page for scroll purposes', () => {
    expect(pageKey({ kind: 'category', code: 'os', preview: 'cpu' })).toBe(pageKey({ kind: 'category', code: 'os' }))
    expect(pageKey({ kind: 'term', id: 'a' })).not.toBe(pageKey({ kind: 'term', id: 'b' }))
  })
})
