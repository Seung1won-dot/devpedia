import { Icon } from './Icon'

interface Props {
  starred: boolean
  onToggle: () => void
  size?: number
}

export function StarButton({ starred, onToggle, size = 18 }: Props) {
  return (
    <button
      type="button"
      className="star"
      aria-pressed={starred}
      aria-label={starred ? '별표 해제' : '별표 (복습 목록에 추가)'}
      title={starred ? '별표 해제' : '별표'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
    >
      <Icon name={starred ? 'star-filled' : 'star'} size={size} />
    </button>
  )
}
