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
  const { index, bodies } = buildBundle(v.terms, TAX, new Date('2026-09-25T00:00:00Z'))

  it('keeps only list/search fields in the index', () => {
    const ssh = index.terms.find((t) => t.id === 'ssh')!
    expect(ssh.definition).toBe('정의 ssh.')
    expect(ssh.backlinks).toEqual(['port'])
    expect(ssh.updated).toBe('2026-09-01')
    expect(ssh.tags).toEqual(['리눅스'])
    expect('definitionHtml' in ssh).toBe(false)
    expect('searchText' in ssh).toBe(false)
  })

  it('puts rendered html and search text in the body bundle', () => {
    const b = bodies.bodies.ssh
    expect(b.definitionHtml).toBe('<strong>정의</strong> ssh.')
    expect(b.exampleHtml).toMatch(/language-bash/)
    expect(b.analogyHtml).toMatch(/<p>비유\.<\/p>/)
    expect(b.confusionsHtml).toBeNull()
    expect(b.searchText).toContain('ssh')
    expect(Object.keys(bodies.bodies).sort()).toEqual(['port', 'ssh'])
    expect(bodies.generatedAt).toBe(index.generatedAt)
  })

  it('maps see_also to seeAlso', () => {
    expect(index.terms.find((t) => t.id === 'port')!.seeAlso).toEqual(['https://example.com/port'])
  })

  it('computes stats and recent ordering', () => {
    expect(index.stats.total).toBe(2)
    expect(index.stats.byCategory).toEqual({ infra: 1, network: 1 })
    expect(index.stats.byLevel).toEqual({ 1: 2, 2: 0, 3: 0 })
    expect(index.stats.byStatus).toEqual({ draft: 0, review: 0, published: 2 })
    expect(index.stats.recent[0].id).toBe('port')
    expect(index.stats.avgRelated).toBe(1)
    expect(index.stats.orphanCount).toBe(0)
  })

  it('sorts terms by category order, level, then term', () => {
    expect(index.terms.map((t) => t.id)).toEqual(['ssh', 'port'])
  })

  it('carries taxonomy and metadata', () => {
    expect(index.version).toBe(1)
    expect(index.generatedAt).toBe('2026-09-25T00:00:00.000Z')
    expect(index.categories.map((c) => c.code)).toEqual(['infra', 'network'])
    expect(index.tags).toEqual(['리눅스'])
  })
})
