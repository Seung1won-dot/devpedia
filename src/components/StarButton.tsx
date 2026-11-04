import { useState } from 'react'
import { m } from 'motion/react'
import { Icon } from './Icon'
import { POP } from '../lib/motion'

interface Props {
  starred: boolean
  onToggle: () => void
  /** 글자 라벨(별표 / 별표됨)을 같이 보인다 */
  labeled?: boolean
  className?: string
}

export function StarButton({ starred, onToggle, labeled = false, className = '' }: Props) {
  // 누를 때마다 아이콘을 새로 그려, 켜질 때만 튀게 한다 (처음 그릴 때는 가만히)
  const [presses, setPresses] = useState(0)
  return (
    <m.button
      type="button"
      whileTap={{ scale: 0.92 }}
      className={`btn btn--ghost star ${className}`.trim()}
      aria-pressed={starred}
      aria-label={labeled ? undefined : starred ? '별표 해제' : '별표 (복습 목록에 추가)'}
      title={starred ? '별표 해제' : '복습 목록에 추가'}
      onClick={() => {
        setPresses((n) => n + 1)
        onToggle()
      }}
    >
      {/* 별표를 켤 때만 별이 한 번 튄다 */}
      <m.span
        key={presses}
        className="star__icon"
        initial={presses > 0 && starred ? { scale: 0.4, rotate: -40 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={POP}
      >
        <Icon name={starred ? 'star-filled' : 'star'} size={16} />
      </m.span>
      {labeled && <span>{starred ? '별표됨' : '별표'}</span>}
    </m.button>
  )
}
