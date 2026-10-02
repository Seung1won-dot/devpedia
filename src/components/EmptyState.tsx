import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

interface Props {
  icon?: IconName
  title: string
  hint?: ReactNode
  action?: ReactNode
  /** 페이지 전체를 차지하는 상태(404 등)면 제목을 h1 으로 */
  asPage?: boolean
}

export function EmptyState({ icon = 'search', title, hint, action, asPage = false }: Props) {
  const Title = asPage ? 'h1' : 'p'
  return (
    <div className={`empty${asPage ? ' empty--page' : ''}`} role={asPage ? undefined : 'status'}>
      <div className="empty__icon">
        <Icon name={icon} size={24} />
      </div>
      <Title className="empty__title">{title}</Title>
      {hint && <p className="empty__hint">{hint}</p>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  )
}
