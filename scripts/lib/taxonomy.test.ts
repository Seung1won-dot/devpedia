import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { loadTaxonomy } from './taxonomy'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

describe('loadTaxonomy', () => {
  it('loads 13 categories in spec order with icons', () => {
    const t = loadTaxonomy(join(ROOT, 'taxonomy'))
    expect(t.categories).toHaveLength(13)
    expect(t.categories.map((c) => c.code)).toEqual([
      'os', 'network', 'algo', 'lang', 'frontend', 'backend', 'database',
      'infra', 'devops', 'security', 'ai', 'medical', 'swe',
    ])
    expect(t.categories[7]).toMatchObject({ code: 'infra', icon: '🖧', order: 7 })
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
