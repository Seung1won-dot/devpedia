import { Icon } from './Icon'

interface Props {
  starred: boolean
  onToggle: () => void
  size?: number
  className?: string
}

export function StarButton({ starred, onToggle, size = 18, className = '' }: Props) {
  return (
    <button
      type="button"
      className={`star ${className}`.trim()}
      aria-pressed={starred}
      aria-label={starred ? '별표 해제' : '별표 (복습 목록에 추가)'}
      title={starred ? '별표 해제' : '별표'}
      onClick={onToggle}
    >
      <Icon name={starred ? 'star-filled' : 'star'} size={size} />
    </button>
  )
}
