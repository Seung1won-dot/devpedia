import { Icon } from './Icon'

interface Props {
  starred: boolean
  onToggle: () => void
  /** 글자 라벨(별표 / 별표됨)을 같이 보인다 */
  labeled?: boolean
  className?: string
}

export function StarButton({ starred, onToggle, labeled = false, className = '' }: Props) {
  return (
    <button
      type="button"
      className={`btn btn--ghost star ${className}`.trim()}
      aria-pressed={starred}
      aria-label={labeled ? undefined : starred ? '별표 해제' : '별표 (복습 목록에 추가)'}
      title={starred ? '별표 해제' : '복습 목록에 추가'}
      onClick={onToggle}
    >
      <Icon name={starred ? 'star-filled' : 'star'} size={16} />
      {labeled && <span>{starred ? '별표됨' : '별표'}</span>}
    </button>
  )
}
