import type { Level } from '../types'
import { LEVEL_LABEL } from '../lib/terms'

interface Props {
  level: Level
  /** 막대 옆에 "중급" 글자도 보인다 */
  showLabel?: boolean
  className?: string
}

/** 난이도: 3칸 막대. 색이 아니라 채운 칸 수로 구분한다. 스크린리더에는 "난이도 중급(2/3)" */
export function LevelMeter({ level, showLabel = false, className = '' }: Props) {
  const label = `난이도 ${LEVEL_LABEL[level]} (${level}/3)`
  return (
    <span className={`meter ${className}`.trim()} role="img" aria-label={label} title={label}>
      <span className="meter__bars" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`meter__bar${i <= level ? ' is-on' : ''}`} />
        ))}
      </span>
      {showLabel && (
        <span className="meter__label" aria-hidden="true">
          {LEVEL_LABEL[level]}
        </span>
      )}
    </span>
  )
}
