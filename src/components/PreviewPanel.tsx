import { useEffect, useRef } from 'react'
import type { Term } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { englishName } from '../lib/terms'
import { LevelMeter } from './LevelMeter'
import { StarButton } from './StarButton'
import { Skeleton } from './Skeleton'
import { Icon } from './Icon'

interface Props {
  ctx: PageContext
  term: Term
  onClose: () => void
}

/** 데스크톱 분야 페이지의 오른쪽 미리보기. 정의·비유·예시까지 보이고 전체 페이지로 넘어갈 수 있다. */
export function PreviewPanel({ ctx, term, onClose }: Props) {
  const body = ctx.data.bodies?.get(term.id)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const en = englishName(term)

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true })
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [term.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('.palette')) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const related = term.related.map((id) => ctx.data.byId.get(id)).filter((t): t is Term => Boolean(t))

  return (
    <aside className="preview" aria-labelledby="preview-title">
      <div className="preview__bar">
        <span className="preview__label">미리보기</span>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="미리보기 닫기" title="닫기 (Esc)">
          <Icon name="x" size={16} />
        </button>
      </div>
      <div className="preview__scroll" ref={scrollRef}>
        <h2 className="preview__title" id="preview-title" tabIndex={-1} ref={titleRef}>
          {term.term}
        </h2>
        {en && <p className="preview__en">{en}</p>}
        <div className="preview__meta">
          <LevelMeter level={term.level} showLabel />
        </div>
        {body ? (
          <p className="preview__lead" dangerouslySetInnerHTML={{ __html: body.definitionHtml }} />
        ) : (
          <p className="preview__lead">{term.definition}</p>
        )}
        <h3 className="preview__h">비유</h3>
        {body ? <div className="prose prose--sm" dangerouslySetInnerHTML={{ __html: body.analogyHtml }} /> : <Skeleton lines={2} />}
        <h3 className="preview__h">예시</h3>
        {body ? <div className="prose prose--sm" dangerouslySetInnerHTML={{ __html: body.exampleHtml }} /> : <Skeleton lines={4} />}
        {related.length > 0 && (
          <>
            <h3 className="preview__h">관련 용어</h3>
            <ul className="preview__related">
              {related.map((t) => (
                <li key={t.id}>
                  <a className="chip" href={toHash({ kind: 'term', id: t.id })}>
                    {t.term}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="preview__foot">
        <StarButton starred={ctx.stars.has(term.id)} onToggle={() => ctx.toggleStar(term.id)} labeled />
        <a className="btn btn--primary" href={toHash({ kind: 'term', id: term.id })}>
          전체 보기 <Icon name="arrow-right" size={14} />
        </a>
      </div>
    </aside>
  )
}
