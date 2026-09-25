import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

interface Props {
  icon?: IconName
  title: string
  hint?: ReactNode
  action?: ReactNode
}

export function EmptyState({ icon = 'search', title, hint, action }: Props) {
  return (
    <div className="empty" role="status">
      <div className="empty__icon"><Icon name={icon} size={28} /></div>
      <p className="empty__title">{title}</p>
      {hint && <p className="empty__hint">{hint}</p>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  )
}
