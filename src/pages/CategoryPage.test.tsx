// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../App'
import { BUNDLE, BODY_BUNDLE, makeTerm, CATEGORIES } from '../test/fixtures'
import type { Bundle } from '../types'

// infra 에 카드를 몇 장 더 넣어 필터·정렬·묶음을 확인한다
const EXTRA = [
  makeTerm({ id: 'docker', term: 'Docker', category: 'infra', level: 1, tags: ['컨테이너'], created: '2026-10-01', updated: '2026-10-01' }),
  makeTerm({ id: 'vm', term: '가상 머신', category: 'infra', level: 2, tags: ['가상화'] }),
  makeTerm({ id: 'k8s', term: '쿠버네티스', category: 'infra', level: 3, tags: ['컨테이너'] }),
]
const INDEX: Bundle = { ...BUNDLE, categories: CATEGORIES, terms: [...BUNDLE.terms, ...EXTRA] }

function stub(width: number) {
  vi.stubGlobal('fetch', vi.fn(async (u: RequestInfo | URL) => ({ ok: true, status: 200, json: async () => (String(u).endsWith('terms-body.json') ? BODY_BUNDLE : INDEX) })))
  vi.stubGlobal('scrollTo', vi.fn())
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (q: string) => {
      const m = /min-width:\s*(\d+)px/.exec(q)
      return { matches: m ? width >= Number(m[1]) : false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false }
    },
  })
}

const grid = () => screen.getByTestId('term-grid')
const names = () => within(grid()).getAllByRole('link').map((a) => a.querySelector('.tcard__term')?.textContent)

describe('CategoryPage', () => {
  beforeEach(() => {
    history.replaceState(null, '', window.location.pathname)
    try { localStorage.clear() } catch { /* ignore */ }
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('shows the category header and groups cards by first letter by default', async () => {
    stub(1024)
    window.location.hash = '#/c/infra'
    render(<App />)
    expect((await screen.findByRole('heading', { level: 1 })).textContent).toContain('서버 & 인프라')
    expect(screen.getByText(/5개 용어/)).toBeTruthy()
    const keys = within(grid()).getAllByRole('heading', { level: 2 }).map((h) => h.firstChild?.textContent)
    expect(keys).toEqual(['ㄱ', 'ㄹ', 'ㅋ', 'D', 'S'])
    expect(screen.getByRole('navigation', { name: '첫 글자로 이동' })).toBeTruthy()
  })

  it('filters by level and tag and can reset', async () => {
    stub(1024)
    const user = userEvent.setup()
    window.location.hash = '#/c/infra'
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    const levels = screen.getByRole('group', { name: '난이도' })
    await user.click(within(levels).getByRole('button', { name: /기초/ }))
    expect(names().sort()).toEqual(['Docker', 'SSH'])
    await user.click(within(levels).getByRole('button', { name: /전체/ }))
    await user.click(within(screen.getByRole('group', { name: '태그' })).getByRole('button', { name: /컨테이너/ }))
    expect(names().sort()).toEqual(['Docker', '쿠버네티스'])
    await user.click(screen.getByRole('button', { name: /초기화/ }))
    expect(names()).toHaveLength(5)
  })

  it('sorts by level or recency without letter groups', async () => {
    stub(1024)
    const user = userEvent.setup()
    window.location.hash = '#/c/infra'
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    await user.selectOptions(screen.getByRole('combobox', { name: '정렬' }), 'level')
    expect(within(grid()).queryAllByRole('heading', { level: 2 })).toHaveLength(0)
    expect(names()[names().length - 1]).toBe('쿠버네티스')
    await user.selectOptions(screen.getByRole('combobox', { name: '정렬' }), 'recent')
    expect(names()[0]).toBe('Docker')
  })

  it('cards show name, English name, definition and level only (no review badge)', async () => {
    stub(1024)
    window.location.hash = '#/c/infra'
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    const card = within(grid()).getAllByRole('link').find((a) => a.textContent?.includes('리버스 프록시'))!
    expect(card.textContent).toContain('Reverse Proxy')
    expect(card.querySelector('[role="img"]')?.getAttribute('aria-label')).toMatch(/난이도 중급/)
    expect(card.textContent).not.toMatch(/검토/)
  })

  it('opens a preview panel on wide screens instead of leaving the page', async () => {
    stub(1440)
    const user = userEvent.setup()
    window.location.hash = '#/c/infra'
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    const ssh = within(grid()).getAllByRole('link').find((a) => a.textContent?.includes('SSH'))!
    await user.click(ssh)
    expect(window.location.hash).toBe('#/c/infra?p=ssh')
    const panel = await screen.findByRole('complementary', { name: 'SSH' })
    expect(within(panel).getByRole('link', { name: /전체 보기/ }).getAttribute('href')).toBe('#/t/ssh')
    await act(async () => { await user.keyboard('{Escape}') })
    expect(window.location.hash).toBe('#/c/infra')
    expect(screen.queryByRole('complementary', { name: 'SSH' })).toBeNull()
  })

  it('follows the link to the term page on narrow screens', async () => {
    stub(768)
    const user = userEvent.setup()
    window.location.hash = '#/c/infra'
    render(<App />)
    await screen.findByRole('heading', { level: 1 })
    const ssh = within(grid()).getAllByRole('link').find((a) => a.textContent?.includes('SSH'))!
    expect(ssh.getAttribute('href')).toBe('#/t/ssh')
    await user.click(ssh)
    expect(window.location.hash).toBe('#/t/ssh')
    expect((await screen.findByRole('heading', { level: 1 })).textContent).toBe('SSH')
  })
})
