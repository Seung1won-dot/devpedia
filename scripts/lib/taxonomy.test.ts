import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { loadTaxonomy } from './taxonomy'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

describe('loadTaxonomy', () => {
  it('loads 24 categories in group order with icons and groups', () => {
    const t = loadTaxonomy(join(ROOT, 'taxonomy'))
    expect(t.categories).toHaveLength(24)
    expect(t.categories.map((c) => c.code)).toEqual([
      'os', 'network', 'algo', 'theory', 'math', 'lang', 'compiler',
      'frontend', 'mobile', 'backend', 'database', 'graphics', 'embedded',
      'distributed', 'infra', 'devops', 'security',
      'ai', 'data',
      'medical', 'swe', 'ux', 'product', 'career',
    ])
    expect(new Set(t.categories.map((c) => c.group))).toEqual(new Set(['CS 기초', '개발', '시스템 · 운영', '데이터 · AI', '도메인 · 협업']))
    expect(t.categories[14]).toMatchObject({ code: 'infra', icon: '🖧', order: 14, group: '시스템 · 운영' })
    for (const c of t.categories) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.description.length).toBeGreaterThan(0)
    }
  })

  it('loads a non-empty unique tag list', () => {
    const t = loadTaxonomy(join(ROOT, 'taxonomy'))
    expect(t.tags.length).toBeGreaterThan(50)
    expect(new Set(t.tags).size).toBe(t.tags.length)
  })
})
