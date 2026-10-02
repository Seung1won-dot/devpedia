import type { Category } from '../types'

export interface CategoryGroup {
  name: string
  categories: Category[]
}

/** taxonomy 순서를 지키며 group 이름으로 묶는다. group 이 없는 분야는 '기타'. */
export function groupCategories(categories: Category[]): CategoryGroup[] {
  const out: CategoryGroup[] = []
  for (const c of categories) {
    const name = c.group ?? '기타'
    const g = out.find((x) => x.name === name)
    if (g) g.categories.push(c)
    else out.push({ name, categories: [c] })
  }
  return out
}
