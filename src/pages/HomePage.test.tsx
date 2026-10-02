// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../App'
import { BUNDLE, BODY_BUNDLE } from '../test/fixtures'

function stub() {
  vi.stubGlobal('fetch', vi.fn(async (u: RequestInfo | URL) => ({ ok: true, status: 200, json: async () => (String(u).endsWith('terms-body.json') ? BODY_BUNDLE : BUNDLE) })))
  vi.stubGlobal('scrollTo', vi.fn())
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false }),
  })
}

describe('HomePage', () => {
  beforeEach(() => {
    stub()
    history.replaceState(null, '', window.location.pathname)
    try { localStorage.clear() } catch { /* ignore */ }
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('shows the hero, totals, today’s term and one tile per category', async () => {
    render(<App />)
    expect((await screen.findByRole('heading', { level: 1 })).textContent).toMatch(/10초/)
    expect(screen.getByText(/개 용어 ·/).textContent).toMatch(/4개 용어 · 3개 분야/)
    expect(screen.getByRole('heading', { name: '오늘의 용어' })).toBeTruthy()
    const tiles = within(screen.getByRole('region', { name: '분야' })).getAllByRole('link')
    expect(tiles.map((a) => a.getAttribute('href'))).toEqual(['#/c/network', '#/c/infra', '#/c/ai'])
    expect(screen.getAllByRole('img', { name: /난이도 비율/ })).toHaveLength(3)
  })

  it('hides recent and starred sections until there is something to show', async () => {
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    expect(screen.queryByRole('heading', { name: '최근 본 용어' })).toBeNull()
    expect(screen.queryByRole('heading', { name: '별표한 용어' })).toBeNull()
  })

  it('lists recently viewed and starred terms from this device', async () => {
    localStorage.setItem('devpedia:recent-terms', JSON.stringify(['rag', 'ghost', 'ssh']))
    localStorage.setItem('devpedia:stars', JSON.stringify(['port']))
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    const recent = screen.getByRole('region', { name: '최근 본 용어' })
    expect(within(recent).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#/t/rag', '#/t/ssh'])
    const starred = screen.getByRole('region', { name: '별표한 용어' })
    expect(within(starred).getByRole('link', { name: /포트/ })).toBeTruthy()
  })

  it('opens the search palette from the hero search box', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    await user.click(document.querySelector('.hero__search') as HTMLElement)
    expect(screen.getByRole('dialog', { name: '용어 검색' })).toBeTruthy()
  })

  it('records a visited term as recently viewed', async () => {
    window.location.hash = '#/t/ssh'
    render(<App />)
    await screen.findByRole('heading', { level: 1, name: 'SSH' })
    expect(JSON.parse(localStorage.getItem('devpedia:recent-terms') ?? '[]')).toEqual(['ssh'])
  })
})
