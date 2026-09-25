import { describe, it, expect, vi, afterEach } from 'vitest'
import { loadTheme, saveTheme, resolveTheme, nextTheme, THEME_KEY } from './theme'

describe('theme', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('resolves system preference to light or dark', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })

  it('cycles system → light → dark → system', () => {
    expect(nextTheme('system')).toBe('light')
    expect(nextTheme('light')).toBe('dark')
    expect(nextTheme('dark')).toBe('system')
  })

  it('persists explicit choices and clears on system', () => {
    const m = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => m.get(k) ?? null,
      setItem: (k: string, v: string) => void m.set(k, v),
      removeItem: (k: string) => void m.delete(k),
    })
    saveTheme('dark')
    expect(m.get(THEME_KEY)).toBe('dark')
    expect(loadTheme()).toBe('dark')
    saveTheme('system')
    expect(m.has(THEME_KEY)).toBe(false)
    expect(loadTheme()).toBe('system')
  })

  it('rejects unknown stored values', () => {
    vi.stubGlobal('localStorage', { getItem: () => 'purple', setItem: () => {}, removeItem: () => {} })
    expect(loadTheme()).toBe('system')
  })

  it('loadTheme returns system when storage throws', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('blocked') },
      setItem: () => { throw new Error('blocked') },
      removeItem: () => { throw new Error('blocked') },
    })
    expect(loadTheme()).toBe('system')
    expect(() => saveTheme('dark')).not.toThrow()
  })
})
