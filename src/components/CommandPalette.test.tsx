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

async function ready() {
  render(<App />)
  await screen.findByRole('heading', { level: 1 })
}
const dialog = () => screen.queryByRole('dialog', { name: '용어 검색' })
const options = () => within(screen.getByRole('listbox')).getAllByRole('option')

describe('CommandPalette', () => {
  beforeEach(() => {
    stub()
    history.replaceState(null, '', window.location.pathname)
    try { localStorage.clear() } catch { /* ignore */ }
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('opens from the header button, `/` and Ctrl+K, and closes with Escape', async () => {
    const user = userEvent.setup()
    await ready()
    await user.click(screen.getByRole('button', { name: '용어 검색 열기' }))
    expect(dialog()).toBeTruthy()
    expect(document.activeElement).toBe(screen.getByRole('combobox', { name: '용어 검색' }))
    await user.keyboard('{Escape}')
    expect(dialog()).toBeNull()
    await user.keyboard('/')
    expect(dialog()).toBeTruthy()
    await user.keyboard('{Escape}')
    await user.keyboard('{Control>}k{/Control}')
    expect(dialog()).toBeTruthy()
  })

  it('shows results with category, level and highlighted matches', async () => {
    const user = userEvent.setup()
    await ready()
    await user.keyboard('/')
    await user.keyboard('프록시')
    const opts = options()
    expect(opts).toHaveLength(1)
    expect(opts[0].querySelector('mark')?.textContent).toBe('프록시')
    expect(opts[0].textContent).toContain('서버 & 인프라')
    expect(within(opts[0]).getByRole('img', { name: /난이도 중급/ })).toBeTruthy()
  })

  it('moves with arrow keys and opens the active result with Enter', async () => {
    const user = userEvent.setup()
    await ready()
    await user.keyboard('/')
    await user.keyboard('s')
    const input = screen.getByRole('combobox')
    const first = options()[0]
    expect(first.getAttribute('aria-selected')).toBe('true')
    expect(input.getAttribute('aria-activedescendant')).toBe(first.id)
    await user.keyboard('{ArrowDown}')
    const second = options()[1]
    expect(second.getAttribute('aria-selected')).toBe('true')
    await user.keyboard('{ArrowUp}{Enter}')
    expect(dialog()).toBeNull()
    expect(window.location.hash).toMatch(/^#\/t\//)
  })

  it('supports initial-consonant search and saves recent searches', async () => {
    const user = userEvent.setup()
    await ready()
    await user.keyboard('/')
    await user.keyboard('ㄹㅂㅅ')
    expect(options()[0].textContent).toContain('리버스 프록시')
    await user.keyboard('{Enter}')
    expect(window.location.hash).toBe('#/t/reverse-proxy')
    await user.keyboard('/')
    const recent = screen.getByText('최근 검색').parentElement!.parentElement!
    expect(within(recent).getByRole('button', { name: /ㄹㅂㅅ/ })).toBeTruthy()
    // 방금 본 용어가 최근 본 용어로 뜬다
    expect(within(screen.getByRole('listbox', { name: '최근 본 용어' })).getByRole('option').textContent).toContain('리버스 프록시')
  })

  it('tells the user when nothing matches', async () => {
    const user = userEvent.setup()
    await ready()
    await user.keyboard('/')
    await user.keyboard('zzzzqq')
    expect(screen.getByText(/에 맞는 용어가 없어요/)).toBeTruthy()
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('searches body text after the body bundle arrives (typo-tolerant index)', async () => {
    const user = userEvent.setup()
    await ready()
    await user.keyboard('/')
    await user.keyboard('오픈북')
    expect(options()[0].textContent).toContain('RAG')
  })
})
