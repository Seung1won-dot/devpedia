// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, act, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'
import { BUNDLE, BODY_BUNDLE } from './test/fixtures'

function fetchStub(opts: { index?: unknown; bodies?: unknown; indexOk?: boolean; hang?: boolean } = {}) {
  return vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input)
    if (opts.hang) return new Promise(() => {})
    if (url.endsWith('terms-body.json')) return { ok: true, status: 200, json: async () => opts.bodies ?? BODY_BUNDLE }
    return { ok: opts.indexOk ?? true, status: opts.indexOk === false ? 404 : 200, json: async () => opts.index ?? BUNDLE }
  })
}

export function stubEnvironment(width = 1024) {
  vi.stubGlobal('fetch', fetchStub())
  vi.stubGlobal('scrollTo', vi.fn())
  const matchMedia = vi.fn((query: string) => {
    const m = /min-width:\s*(\d+)px/.exec(query)
    return {
      matches: m ? width >= Number(m[1]) : false,
      media: query, onchange: null,
      addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
    }
  })
  Object.defineProperty(window, 'matchMedia', { value: matchMedia, writable: true, configurable: true })
}

async function setHash(hash: string) {
  await act(async () => {
    window.location.hash = hash
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

describe('App shell', () => {
  beforeEach(() => {
    stubEnvironment()
    history.replaceState(null, '', window.location.pathname)
    try { localStorage.clear() } catch { /* ignore */ }
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('renders the header and a skeleton while the index is loading', () => {
    vi.stubGlobal('fetch', fetchStub({ hang: true }))
    render(<App />)
    expect(screen.getByRole('button', { name: /용어 검색/ })).toBeTruthy()
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0)
  })

  it('redirects a legacy #<id> share link to #/t/<id> without adding history', async () => {
    window.location.hash = '#ssh'
    const before = history.length
    render(<App />)
    expect((await screen.findByRole('heading', { level: 1 })).textContent).toBe('SSH')
    expect(window.location.hash).toBe('#/t/ssh')
    expect(history.length).toBe(before)
    expect(document.title).toBe('SSH · Devpedia')
  })

  it('redirects a legacy #c/<code> link and shows that category', async () => {
    window.location.hash = '#c/ai'
    render(<App />)
    expect((await screen.findByRole('heading', { level: 1 })).textContent).toContain('AI')
    expect(window.location.hash).toBe('#/c/ai')
  })

  it('renders a not-found page for unknown terms, categories and paths', async () => {
    window.location.hash = '#/t/nonexistent'
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: /찾을 수 없/ })).toBeTruthy()
    expect(screen.getByRole('link', { name: '홈으로' })).toBeTruthy()
    await setHash('#/c/nope')
    expect(await screen.findByRole('heading', { level: 1, name: /분야/ })).toBeTruthy()
    await setHash('#/a/b/c')
    expect(await screen.findByRole('heading', { level: 1, name: /페이지/ })).toBeTruthy()
  })

  it('opens the category menu with every category and closes it on Escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findAllByRole('heading', { level: 1 })
    const btn = screen.getByRole('button', { name: /분야/ })
    await user.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('true')
    const nav = screen.getByRole('navigation', { name: '주 메뉴' })
    const links = within(nav).getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('#/c/'))
    expect(links).toHaveLength(3)
    await user.keyboard('{Escape}')
    expect(btn.getAttribute('aria-expanded')).toBe('false')
  })

  it('cycles the theme system → light → dark → system and shows the state as text', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findAllByRole('heading', { level: 1 })
    const toggle = screen.getByRole('button', { name: /테마/ })
    expect(toggle.textContent).toContain('시스템')
    await user.click(toggle)
    expect(document.documentElement.dataset.theme).toBe('light')
    await user.click(toggle)
    expect(document.documentElement.dataset.theme).toBe('dark')
    await user.click(toggle)
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('shows a retryable error when the index cannot be fetched', async () => {
    vi.stubGlobal('fetch', fetchStub({ indexOk: false }))
    render(<App />)
    expect(await screen.findByText(/불러오지 못했/)).toBeTruthy()
    expect(screen.getByRole('button', { name: '다시 시도' })).toBeTruthy()
  })
})
