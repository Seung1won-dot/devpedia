// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { TermDetail } from './TermDetail'
import { TERMS, CATEGORIES, BODIES } from '../test/fixtures'
import { indexById } from '../lib/terms'

const byId = indexById(TERMS)
const categories = new Map(CATEGORIES.map((c) => [c.code, c]))

function renderDetail(id: string, over: Partial<Parameters<typeof TermDetail>[0]> = {}) {
  const onNavigate = vi.fn()
  const onToggleStar = vi.fn()
  const onClose = vi.fn()
  const term = byId.get(id)!
  render(
    <TermDetail
      term={term}
      body={BODIES[id]}
      byId={byId}
      categories={categories}
      starred={false}
      onToggleStar={onToggleStar}
      onNavigate={onNavigate}
      onClose={onClose}
      repoUrl=""
      {...over}
    />,
  )
  return { onNavigate, onToggleStar, onClose }
}

describe('TermDetail', () => {
  afterEach(() => cleanup())

  it('renders the four sections, aliases and rendered html', () => {
    renderDetail('reverse-proxy')
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('리버스 프록시')
    expect(screen.getByText(/Reverse Proxy/)).toBeTruthy()
    for (const h of ['한 줄 정의', '비유', '예시', '관련 용어']) expect(screen.getByRole('heading', { name: h })).toBeTruthy()
    expect(screen.queryByRole('heading', { name: '헷갈리기 쉬운 것' })).toBeNull()
    expect(document.querySelector('.detail__definition strong')?.textContent).toBe('대신 받아')
    expect(document.querySelector('.detail__example code.language-bash')).toBeTruthy()
  })

  it('shows the plain definition and a skeleton while the body is still loading', () => {
    renderDetail('reverse-proxy', { body: undefined })
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('리버스 프록시')
    expect(document.querySelector('.detail__definition')?.textContent).toBe('외부 요청을 대신 받아 뒤의 서버로 나눠 전달하는 중간 서버.')
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0)
    expect(document.querySelector('.detail__example code')).toBeNull()
  })

  it('renders related chips: existing ones navigate, missing ones are disabled', () => {
    const { onNavigate } = renderDetail('rag')
    const missing = screen.getByRole('button', { name: /embedding/ })
    expect(missing.hasAttribute('disabled')).toBe(true)
    cleanup()
    const r = renderDetail('reverse-proxy')
    // '포트' 는 관련 용어와 역링크 양쪽에 나타나므로 첫 번째(관련 용어) 칩을 누른다
    fireEvent.click(screen.getAllByRole('button', { name: /포트/ })[0])
    expect(r.onNavigate).toHaveBeenCalledWith({ kind: 'term', id: 'port' })
    expect(onNavigate).not.toHaveBeenCalled()
  })

  it('lists backlinks under "이 용어를 참조하는 카드"', () => {
    renderDetail('port')
    expect(screen.getByRole('heading', { name: /참조하는 카드/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /SSH/ })).toBeTruthy()
  })

  it('copies a shareable deep link', async () => {
    const writeText = vi.fn(async () => {})
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    renderDetail('ssh')
    fireEvent.click(screen.getByRole('button', { name: /링크 복사/ }))
    expect(writeText).toHaveBeenCalledWith(`${window.location.origin}${window.location.pathname}#ssh`)
  })

  it('toggles star and closes', () => {
    const { onToggleStar, onClose } = renderDetail('ssh')
    fireEvent.click(screen.getByRole('button', { name: /별표/ }))
    expect(onToggleStar).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: /닫기|목록으로/ }))
    expect(onClose).toHaveBeenCalled()
  })

  it('shows a status badge for non-published cards and the edit link when repoUrl is set', () => {
    renderDetail('ssh', { term: { ...byId.get('ssh')!, status: 'review' }, repoUrl: 'https://github.com/x/devpedia' })
    expect(screen.getByText('검토 중')).toBeTruthy()
    const edit = screen.getByRole('link', { name: /GitHub에서 편집/ }) as HTMLAnchorElement
    expect(edit.href).toBe('https://github.com/x/devpedia/edit/main/terms/infra/ssh.md')
  })
})
