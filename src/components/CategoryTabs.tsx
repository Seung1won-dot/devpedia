import type { Category } from '../types'
import { toHash } from '../lib/route'
import { catStyle } from '../lib/catStyle'
import { Icon } from './Icon'

export type TabKey = 'all' | 'starred' | string

interface Props {
  categories: Category[]
  counts: Record<string, number>
  total: number
  starredCount: number
  active: TabKey
}

export function CategoryTabs({ categories, counts, total, starredCount, active }: Props) {
  return (
    <nav className="tabs" role="tablist" aria-label="카테고리">
      <a role="tab" className="tab" href={toHash({ kind: 'home' })} aria-selected={active === 'all'}>
        <span className="tab__label">전체</span>
        <span className="tab__count">{total}</span>
      </a>
      {categories.map((c) => (
        <a
          key={c.code}
          role="tab"
          className="tab"
          href={toHash({ kind: 'category', code: c.code })}
          aria-selected={active === c.code}
          style={catStyle(c.code)}
          title={c.description}
        >
          <span className="tab__icon" aria-hidden="true">{c.icon}</span>
          <span className="tab__label">{c.name}</span>
          <span className="tab__count">{counts[c.code] ?? 0}</span>
        </a>
      ))}
      <a role="tab" className="tab tab--starred" href={toHash({ kind: 'starred' })} aria-selected={active === 'starred'}>
        <Icon name="star-filled" size={14} />
        <span className="tab__label">별표</span>
        <span className="tab__count">{starredCount}</span>
      </a>
    </nav>
  )
}
