import type { MouseEvent } from 'react'
import type { Category, Term } from '../types'
import { toHash } from '../lib/route'
import { englishName } from '../lib/terms'
import { LevelMeter } from './LevelMeter'

interface Props {
  term: Term
  /** 다른 분야 카드가 섞이는 목록(홈·별표·관련 용어)에서는 분야를 같이 보인다 */
  category?: Category
  compact?: boolean
  selected?: boolean
  /** 있으면 클릭을 가로채 미리보기 패널을 연다 (데스크톱 분야 페이지). 수정키 클릭·가운데 클릭은 그대로 새 탭. */
  onPreview?: (id: string) => boolean
}

/** 용어 카드: 이름 · 영문명 · 한 줄 정의 · 난이도. 그 외 상태(검토 중 등)는 목록에서 보이지 않는다. */
export function TermCard({ term, category, compact = false, selected = false, onPreview }: Props) {
  const en = englishName(term)
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onPreview || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (onPreview(term.id)) e.preventDefault()
  }
  return (
    <a
      className={`tcard${compact ? ' tcard--compact' : ''}`}
      href={toHash({ kind: 'term', id: term.id })}
      aria-current={selected ? 'true' : undefined}
      onClick={onClick}
    >
      <span className="tcard__head">
        <span className="tcard__term">{term.term}</span>
        {en && <span className="tcard__en">{en}</span>}
      </span>
      <span className="tcard__def">{term.definition}</span>
      <span className="tcard__foot">
        <LevelMeter level={term.level} />
        {category && (
          <span className="tcard__cat">
            <span aria-hidden="true">{category.icon}</span> {category.name}
          </span>
        )}
      </span>
    </a>
  )
}
