// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { TermPage } from './TermPage'
import type { PageContext } from '../App'
import { TERMS, CATEGORIES, BODY_MAP, BUNDLE } from '../test/fixtures'
import { indexById } from '../lib/terms'
import { createSearch } from '../lib/search'
import type { Term } from '../types'

function ctxWith(over: Partial<PageContext> = {}, withBodies = true): PageContext {
  return {
    data: {
      state: 'ready',
      bundle: BUNDLE,
      byId: indexById(TERMS),
      categories: new Map(CATEGORIES.map((c) => [c.code, c])),
      search: createSearch(TERMS),
      bodies: withBodies ? BODY_MAP : null,
      bodiesError: null,
    },
    route: { kind: 'home' },
    navigate: vi.fn(),
    stars: new Set(),
    toggleStar: vi.fn(),
    recentTerms: [],
    openSearch: vi.fn(),
    ...over,
  }
}
const term = (id: string) => TERMS.find((t) => t.id === id)!

describe('TermPage', () => {
  afterEach(() => cleanup())

  it('renders title, aliases, lead definition and the sections', () => {
    render(<TermPage ctx={ctxWith()} term={term('reverse-proxy')} />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('리버스 프록시')
    expect(screen.getByText(/Reverse Proxy/)).toBeTruthy()
    expect(document.querySelector('.doc__lead strong')?.textContent).toBe('대신 받아')
    for (const h of ['비유', '예시', '관련 용어']) expect(screen.getByRole('heading', { level: 2, name: h })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: '헷갈리기 쉬운 것' })).toBeNull()
    expect(document.querySelector('.prose code.language-bash')).toBeTruthy()
  })

  it('shows a breadcrumb home › category › term', () => {
    render(<TermPage ctx={ctxWith()} term={term('ssh')} />)
    const crumbs = screen.getByRole('navigation', { name: '현재 위치' })
    expect(crumbs.textContent).toMatch(/홈.*서버 & 인프라.*SSH/)
    expect(crumbs.querySelector('a[href="#/c/infra"]')).toBeTruthy()
  })

  it('shows the plain definition and skeletons until the body arrives', () => {
    render(<TermPage ctx={ctxWith({}, false)} term={term('reverse-proxy')} />)
    expect(document.querySelector('.doc__lead')?.textContent).toBe('외부 요청을 대신 받아 뒤의 서버로 나눠 전달하는 중간 서버.')
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0)
  })

  it('links related terms as cards and lists missing ids as text', () => {
    render(<TermPage ctx={ctxWith()} term={term('rag')} />)
    expect(screen.getByText('embedding')).toBeTruthy()
    cleanup()
    render(<TermPage ctx={ctxWith()} term={term('reverse-proxy')} />)
    const related = screen.getByRole('list', { name: '관련 용어' })
    expect(related.querySelector('a[href="#/t/port"]')).toBeTruthy()
  })

  it('lists backlinks and previous/next inside the category', () => {
    render(<TermPage ctx={ctxWith()} term={term('ssh')} />)
    expect(screen.getByRole('heading', { name: /참조하는 카드/ })).toBeTruthy()
    const pager = screen.getByRole('navigation', { name: /안에서 이동/ })
    expect(pager.querySelector('a[rel="prev"]')?.getAttribute('href')).toBe('#/t/reverse-proxy')
  })

  it('shows the review status only in the footer, and the edit link', () => {
    const t: Term = { ...term('ssh'), status: 'review' }
    render(<TermPage ctx={ctxWith()} term={t} />)
    expect(document.querySelector('.doc__head')?.textContent).not.toMatch(/검토 중/)
    expect(document.querySelector('.doc__foot')?.textContent).toMatch(/검토 중/)
    const edit = screen.getByRole('link', { name: /GitHub에서 편집/ }) as HTMLAnchorElement
    expect(edit.href).toMatch(/\/edit\/main\/terms\/infra\/ssh\.md$/)
  })

  it('toggles the star and copies a canonical share link', async () => {
    const writeText = vi.fn(async () => {})
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    const ctx = ctxWith()
    render(<TermPage ctx={ctx} term={term('ssh')} />)
    fireEvent.click(screen.getByRole('button', { name: /별표/ }))
    expect(ctx.toggleStar).toHaveBeenCalledWith('ssh')
    fireEvent.click(screen.getByRole('button', { name: /링크 복사/ }))
    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}${window.location.pathname}#/t/ssh`)
  })

  it('renders a table of contents with the visible sections', () => {
    render(<TermPage ctx={ctxWith()} term={term('ssh')} />)
    const toc = screen.getByRole('navigation', { name: '이 페이지 목차' })
    expect(toc.textContent).toContain('비유')
    expect(toc.textContent).toContain('이 용어를 참조하는 카드')
  })
})
