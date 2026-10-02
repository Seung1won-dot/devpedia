import { Icon } from './Icon'

export interface Crumb {
  label: string
  href?: string
}

/** 홈 › 분야 › 용어. 마지막 항목은 현재 페이지(링크 아님) */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="현재 위치">
      <ol>
        {items.map((c, i) => (
          <li key={i}>
            {i > 0 && <Icon name="chevron-right" size={14} className="crumbs__sep" />}
            {c.href && i < items.length - 1 ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
