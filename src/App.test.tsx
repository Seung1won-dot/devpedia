// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within, cleanup, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from './App'
import { BUNDLE } from './test/fixtures'

function stubEnvironment() {
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, status: 200, json: async () => BUNDLE })))
  const matchMedia = vi.fn((query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  }))
  Object.defineProperty(window, 'matchMedia', { value: matchMedia, writable: true, configurable: true })
}

async function setHash(hash: string) {
  await act(async () => {
    window.location.hash = hash
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

describe('App', () => {
  beforeEach(() => {
    stubEnvironment()
    window.location.hash = ''
    try { localStorage.clear() } catch { /* ignore */ }
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('renders category tabs and the term list from the bundle', async () => {
    render(<App />)
    expect(await screen.findByText('리버스 프록시')).toBeTruthy()
    const tabs = screen.getAllByRole('tab')
    // 전체 + 카테고리 3 + 별표
    expect(tabs).toHaveLength(5)
    expect(tabs.map((t) => t.textContent)).toEqual(expect.arrayContaining([expect.stringContaining('네트워크')]))
    const list = screen.getByTestId('term-list')
    expect(within(list).getAllByRole('link')).toHaveLength(4)
  })

  it('filters the list instantly as the user types', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByText('리버스 프록시')
    await user.type(screen.getByRole('searchbox'), '프록시')
    const links = within(screen.getByTestId('term-list')).getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0].textContent).toMatch(/리버스\s*프록시/)
    expect(links[0].querySelector('mark')?.textContent).toBe('프록시')
  })

  it('shows only that category on #c/<code> and marks the tab selected', async () => {
    render(<App />)
    await screen.findByText('리버스 프록시')
    await setHash('#c/ai')
    const list = screen.getByTestId('term-list')
    expect(await within(list).findByText('RAG')).toBeTruthy()
    expect(within(list).queryByText('SSH')).toBeNull()
    const selected = screen.getAllByRole('tab').find((t) => t.getAttribute('aria-selected') === 'true')
    expect(selected?.textContent).toContain('AI')
  })

  it('narrows the list with the level filter', async () => {
    const user = userEvent.setup()
    render(<App />)
    await screen.findByText('리버스 프록시')
    // 기본은 전체 표시. '기초' 를 누르면 기초만, 다시 누르면 전체로.
    await user.click(screen.getByRole('button', { name: '기초' }))
    let links = within(screen.getByTestId('term-list')).getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links.map((l) => l.textContent).join()).toContain('SSH')
    expect(links.map((l) => l.textContent).join()).not.toContain('리버스')
    await user.click(screen.getByRole('button', { name: '기초' }))
    links = within(screen.getByTestId('term-list')).getAllByRole('link')
    expect(links).toHaveLength(4)
  })

  it('opens the detail on #<id> and keeps the list scoped to that category on cold start', async () => {
    window.location.hash = '#ssh'
    render(<App />)
    expect((await screen.findByRole('heading', { level: 1 })).textContent).toBe('SSH')
    const selected = screen.getAllByRole('tab').find((t) => t.getAttribute('aria-selected') === 'true')
    expect(selected?.textContent).toContain('서버')
    expect(document.title).toBe('SSH · Devpedia')
  })

  it('unknown term id renders not-found state', async () => {
    window.location.hash = '#nonexistent'
    render(<App />)
    expect(await screen.findByText(/해당 용어가 없/)).toBeTruthy()
    expect(screen.getByRole('link', { name: /홈으로/ })).toBeTruthy()
  })

  it('shows a loading error when the bundle cannot be fetched', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 404, json: async () => ({}) })))
    render(<App />)
    expect(await screen.findByText(/불러오지 못했/)).toBeTruthy()
  })
})
