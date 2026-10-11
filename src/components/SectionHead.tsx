import type { ReactNode } from 'react'

interface Props {
  /** 제목 요소 id — section 의 aria-labelledby 와 짝 */
  id?: string
  /** 작은 오렌지 라벨 (분야 그룹 이름, 날짜 등) */
  eyebrow?: ReactNode
  /** 제목. 강조할 한 단어만 <em> 으로 감싼다 */
  title: ReactNode
  /** 한 줄 설명 */
  lead?: ReactNode
  /** 오른쪽 메타 (개수, 날짜) */
  aside?: ReactNode
  level?: 1 | 2
  /** lg: 페이지 머리·홈의 큰 섹션, md: 그 외 */
  size?: 'md' | 'lg'
  className?: string
}

/** 모든 섹션이 같은 리듬을 갖게 하는 머리글: 라벨 → 제목 → 설명. */
export function SectionHead({ id, eyebrow, title, lead, aside, level = 2, size = 'md', className = '' }: Props) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <header className={`sechead sechead--${size}${className ? ` ${className}` : ''}`}>
      <div className="sechead__main">
        {eyebrow && <p className="sechead__eyebrow">{eyebrow}</p>}
        <Heading id={id} className="sechead__title">
          {title}
        </Heading>
        {lead && <p className="sechead__lead">{lead}</p>}
      </div>
      {aside && <div className="sechead__aside">{aside}</div>}
    </header>
  )
}
