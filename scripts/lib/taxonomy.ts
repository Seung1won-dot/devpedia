import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import type { Category } from '../../src/types'

export interface Taxonomy {
  categories: Category[]
  tags: string[]
}

/** taxonomy/ 폴더의 categories.yml + tags.yml 을 읽는다. 태그 중복은 즉시 실패. */
export function loadTaxonomy(dir: string): Taxonomy {
  const cats = parse(readFileSync(join(dir, 'categories.yml'), 'utf8')) as {
    categories: Omit<Category, 'order'>[]
  }
  const tags = parse(readFileSync(join(dir, 'tags.yml'), 'utf8')) as { tags: string[] }

  const seen = new Set<string>()
  for (const t of tags.tags) {
    if (seen.has(t)) throw new Error(`tags.yml 중복 태그: ${t}`)
    seen.add(t)
  }
  const codes = new Set<string>()
  for (const c of cats.categories) {
    if (codes.has(c.code)) throw new Error(`categories.yml 중복 코드: ${c.code}`)
    codes.add(c.code)
  }

  return {
    categories: cats.categories.map((c, i) => ({ ...c, order: i })),
    tags: tags.tags,
  }
}
