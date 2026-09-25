import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { loadStars, saveStars, toggleStar, STARS_KEY } from './stars'

function memoryStorage() {
  const m = new Map<string, string>()
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
    removeItem: (k: string) => void m.delete(k),
    _map: m,
  }
}

describe('stars storage', () => {
  beforeEach(() => vi.stubGlobal('localStorage', memoryStorage()))
  afterEach(() => vi.unstubAllGlobals())

  it('round-trips a set', () => {
    saveStars(new Set(['ssh', 'port']))
    expect(loadStars()).toEqual(new Set(['ssh', 'port']))
  })

  it('returns an empty set when nothing is stored', () => {
    expect(loadStars()).toEqual(new Set())
  })

  it('ignores malformed JSON and non-string entries', () => {
    localStorage.setItem(STARS_KEY, '{not json')
    expect(loadStars()).toEqual(new Set())
    localStorage.setItem(STARS_KEY, JSON.stringify(['ssh', 3, null]))
    expect(loadStars()).toEqual(new Set(['ssh']))
  })

  it('loadStars returns empty set when storage throws', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('blocked') },
      setItem: () => { throw new Error('blocked') },
    })
    expect(loadStars()).toEqual(new Set())
    expect(() => saveStars(new Set(['ssh']))).not.toThrow()
  })

  it('toggleStar returns a new set without mutating the input', () => {
    const a = new Set(['ssh'])
    const b = toggleStar(a, 'port')
    expect(b).toEqual(new Set(['ssh', 'port']))
    expect(a).toEqual(new Set(['ssh']))
    expect(toggleStar(b, 'ssh')).toEqual(new Set(['port']))
  })
})
