import { describe, it, expect } from 'vitest'
import { buildBundle } from './bundle'
import { validateTerms } from './validate'
import { parseTermMarkdown } from './parse'
import type { Taxonomy } from './taxonomy'

const TAX: Taxonomy = {
  categories: [
    { code: 'infra', name: '인프라', icon: '🖧', description: '', order: 0 },
    { code: 'network', name: '네트워크', icon: '🌐', description: '', order: 1 },
  ],
  tags: ['리눅스'],
}

const md = (id: string, cat: string, related: string, created: string, extra = '') =>
  `---\nid: ${id}\nterm: ${id.toUpperCase()}\naliases: [${id}한글]\ncategory: ${cat}\ntags: [리눅스]\nlevel: 1\nrelated: [${related}]\nstatus: published\ncreated: ${created}\n${extra}---\n## 한 줄 정의\n\n**정의** ${id}.\n\n## 비유\n\n비유.\n\n## 예시\n\n\`\`\`bash\n${id}\n\`\`\`\n`

describe('buildBundle', () => {
  const v = validateTerms(
    [
      parseTermMarkdown(md('ssh', 'infra', 'port', '2026-09-01'), 'terms/infra/ssh.md'),
      parseTermMarkdown(md('port', 'network', 'ssh', '2026-09-20', 'see_also: [https://example.com/port]\n'), 'terms/network/port.md'),
    ],
    TAX,
  )
  expect(v.ok).toBe(true)
  const b = buildBundle(v.terms, TAX, new Date('2026-09-25T00:00:00Z'))

  it('emits rendered html, plain definition, backlinks', () => {
    const ssh = b.terms.find((t) => t.id === 'ssh')!
    expect(ssh.definition).toBe('정의 ssh.')
    expect(ssh.definitionHtml).toBe('<strong>정의</strong> ssh.')
    expect(ssh.exampleHtml).toMatch(/language-bash/)
    expect(ssh.analogyHtml).toMatch(/<p>비유\.<\/p>/)
    expect(ssh.confusionsHtml).toBeNull()
    expect(ssh.backlinks).toEqual(['port'])
    expect(ssh.updated).toBe('2026-09-01')
    expect(ssh.searchText).toContain('ssh')
    expect(ssh.tags).toEqual(['리눅스'])
  })

  it('maps see_also to seeAlso', () => {
    expect(b.terms.find((t) => t.id === 'port')!.seeAlso).toEqual(['https://example.com/port'])
  })

  it('computes stats and recent ordering', () => {
    expect(b.stats.total).toBe(2)
    expect(b.stats.byCategory).toEqual({ infra: 1, network: 1 })
    expect(b.stats.byLevel).toEqual({ 1: 2, 2: 0, 3: 0 })
    expect(b.stats.byStatus).toEqual({ draft: 0, review: 0, published: 2 })
    expect(b.stats.recent[0].id).toBe('port')
    expect(b.stats.avgRelated).toBe(1)
    expect(b.stats.orphanCount).toBe(0)
  })

  it('sorts terms by category order, level, then term', () => {
    expect(b.terms.map((t) => t.id)).toEqual(['ssh', 'port'])
  })

  it('carries taxonomy and metadata', () => {
    expect(b.version).toBe(1)
    expect(b.generatedAt).toBe('2026-09-25T00:00:00.000Z')
    expect(b.categories.map((c) => c.code)).toEqual(['infra', 'network'])
    expect(b.tags).toEqual(['리눅스'])
  })
})
