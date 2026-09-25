import { describe, it, expect } from 'vitest'
import { parseTermMarkdown } from './parse'
import { validateTerms } from './validate'
import type { Taxonomy } from './taxonomy'

const TAX: Taxonomy = {
  categories: ['os', 'network', 'infra'].map((code, order) => ({ code, name: code, icon: '', description: '', order })),
  tags: ['리눅스', '원격접속'],
}

const BODY = '## 한 줄 정의\n\n원격 접속 프로토콜.\n\n## 비유\n\n뒷문.\n\n## 예시\n\nssh a@b\n'

function card(over: Partial<Record<string, string | undefined>> = {}, body: string = BODY) {
  const fm: Record<string, string | undefined> = {
    id: 'ssh', term: 'SSH', aliases: '[Secure Shell, 시큐어 셸]', category: 'infra', tags: '[리눅스]', level: '1',
    related: '[port]', status: 'published', created: '2026-09-25', ...over,
  }
  const head = Object.entries(fm).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}: ${v}`).join('\n')
  return `---\n${head}\n---\n${body}`
}

const port = parseTermMarkdown(card({ id: 'port', term: '포트', aliases: '[Port, 포트 번호]', related: '[ssh]', category: 'network' }), 'terms/network/port.md')
const errors = (r: ReturnType<typeof validateTerms>) => r.issues.filter((i) => i.level === 'error').map((i) => i.message)
const warns = (r: ReturnType<typeof validateTerms>) => r.issues.filter((i) => i.level === 'warn').map((i) => i.message)

describe('validateTerms', () => {
  it('passes a well-formed pair', () => {
    const r = validateTerms([parseTermMarkdown(card(), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r)).toEqual([])
    expect(r.ok).toBe(true)
    expect(r.terms[0].sections.definition).toBe('원격 접속 프로토콜.')
    expect(r.terms[0].sections.confusions).toBeNull()
  })

  it('accepts Date-typed created and normalizes to YYYY-MM-DD', () => {
    // gray-matter(js-yaml) 는 따옴표 없는 2026-09-25 를 Date 객체로 파싱한다
    const raw = parseTermMarkdown(card({ created: '2026-09-25' }), 'terms/infra/ssh.md')
    expect(raw.frontmatter.created).toBeInstanceOf(Date)
    const r = validateTerms([raw, port], TAX)
    expect(errors(r)).toEqual([])
    expect(r.terms[0].fm.created).toBe('2026-09-25')
    expect(typeof r.terms[0].fm.created).toBe('string')
  })

  it('rejects unknown related id (error) but only warns in lenient mode', () => {
    const raw = parseTermMarkdown(card({ related: '[nope]' }), 'terms/infra/ssh.md')
    expect(errors(validateTerms([raw, port], TAX)).join()).toMatch(/related.*nope/)
    const len = validateTerms([raw, port], TAX, { lenient: true })
    expect(errors(len)).toEqual([])
    expect(len.issues.some((i) => i.level === 'warn' && /nope/.test(i.message))).toBe(true)
  })

  it('rejects definition over 60 chars or with two sentences', () => {
    const long = '가'.repeat(61) + '.'
    const r1 = validateTerms([parseTermMarkdown(card({}, `## 한 줄 정의\n\n${long}\n\n## 비유\n\n비유.\n\n## 예시\n\n예`), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r1).join()).toMatch(/60자/)
    const r2 = validateTerms([parseTermMarkdown(card({}, `## 한 줄 정의\n\n하나. 둘.\n\n## 비유\n\n비유.\n\n## 예시\n\n예`), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r2).join()).toMatch(/문장 하나/)
  })

  it('does not count markdown emphasis markers toward the 60-char limit', () => {
    const def = '**' + '가'.repeat(58) + '**.' // plain text 59자
    const r = validateTerms([parseTermMarkdown(card({}, `## 한 줄 정의\n\n${def}\n\n## 비유\n\n비유.\n\n## 예시\n\n예`), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r)).toEqual([])
  })

  it('rejects path mismatch', () => {
    const bad = parseTermMarkdown(card({ id: 'ssh' }), 'terms/network/ssh.md')
    expect(errors(validateTerms([bad, port], TAX)).join()).toMatch(/경로/)
  })

  it('rejects reserved ids and ids equal to a category code', () => {
    expect(errors(validateTerms([parseTermMarkdown(card({ id: 'stats' }), 'terms/infra/stats.md'), port], TAX)).join()).toMatch(/예약/)
    expect(errors(validateTerms([parseTermMarkdown(card({ id: 'os' }), 'terms/infra/os.md'), port], TAX)).join()).toMatch(/예약/)
  })

  it('rejects duplicate ids', () => {
    const r = validateTerms([parseTermMarkdown(card(), 'terms/infra/ssh.md'), parseTermMarkdown(card(), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r).join()).toMatch(/중복/)
  })

  it('rejects unknown tags, unknown frontmatter keys and unknown sections', () => {
    expect(errors(validateTerms([parseTermMarkdown(card({ tags: '[없는태그]' }), 'terms/infra/ssh.md'), port], TAX)).join()).toMatch(/tags/)
    expect(errors(validateTerms([parseTermMarkdown(card({ alias: 'x' }), 'terms/infra/ssh.md'), port], TAX)).join()).toMatch(/alias/)
    const r = validateTerms([parseTermMarkdown(card({}, BODY + '\n## 역사\n\n옛날'), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r).join()).toMatch(/허용되지 않은 섹션/)
  })

  it('rejects self-reference and duplicate related entries', () => {
    expect(errors(validateTerms([parseTermMarkdown(card({ related: '[ssh, port]' }), 'terms/infra/ssh.md'), port], TAX)).join()).toMatch(/자기 자신/)
    expect(errors(validateTerms([parseTermMarkdown(card({ related: '[port, port]' }), 'terms/infra/ssh.md'), port], TAX)).join()).toMatch(/related.*중복/)
  })

  it('requires the four sections for review/published cards', () => {
    const r = validateTerms([parseTermMarkdown(card({ status: 'review' }, '## 한 줄 정의\n\n정의.'), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r).join()).toMatch(/비유/)
    expect(errors(r).join()).toMatch(/예시/)
  })

  it('lets drafts omit sections and related with warnings only', () => {
    const r = validateTerms([parseTermMarkdown(card({ status: 'draft', related: '[]' }, '## 한 줄 정의\n\n정의.'), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r)).toEqual([])
    expect(warns(r).length).toBeGreaterThan(0)
  })

  it('warns when related < 3, aliases lack Hangul, or nothing links back', () => {
    const lonely = parseTermMarkdown(card({ id: 'vpn', term: 'VPN', aliases: '[Virtual Private Network]', related: '[port]', category: 'network' }), 'terms/network/vpn.md')
    const r = validateTerms([parseTermMarkdown(card(), 'terms/infra/ssh.md'), port, lonely], TAX)
    const w = warns(r).join()
    expect(w).toMatch(/3개/)
    expect(w).toMatch(/한글/)
    expect(w).toMatch(/역링크/)
  })

  it('warns when the analogy exceeds two sentences', () => {
    const r = validateTerms([parseTermMarkdown(card({}, '## 한 줄 정의\n\n정의.\n\n## 비유\n\n하나. 둘. 셋.\n\n## 예시\n\n예'), 'terms/infra/ssh.md'), port], TAX)
    expect(errors(r)).toEqual([])
    expect(warns(r).join()).toMatch(/비유.*2문장/)
  })

  it('warns when a category has fewer than 10 cards', () => {
    const r = validateTerms([parseTermMarkdown(card(), 'terms/infra/ssh.md'), port], TAX)
    expect(warns(r).join()).toMatch(/10개/)
  })

  it('reports schema errors with the file path', () => {
    const r = validateTerms([parseTermMarkdown(card({ level: '9' }), 'terms/infra/ssh.md'), port], TAX)
    const e = r.issues.find((i) => i.level === 'error' && /level/.test(i.message))
    expect(e?.file).toBe('terms/infra/ssh.md')
  })
})
