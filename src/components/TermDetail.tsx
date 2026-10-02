import { useEffect, useRef, useState } from 'react'
import type { Category, Term, TermBody } from '../types'
import type { Route } from '../lib/route'
import { toHash } from '../lib/route'
import { catStyle } from '../lib/catStyle'
import { Icon } from './Icon'
import { StarButton } from './StarButton'
import { RelatedChips } from './RelatedChips'
import { Skeleton } from './Skeleton'
import { LEVEL_LABEL } from './FilterBar'
import { KIND_LABEL } from '../lib/kind'
import { STATUS_LABEL } from './TermRow'

interface Props {
  term: Term
  /** 본문은 인덱스보다 늦게 도착할 수 있다. 없으면 스켈레톤. */
  body: TermBody | undefined
  byId: Map<string, Term>
  categories: Map<string, Category>
  starred: boolean
  onToggleStar: () => void
  onNavigate: (r: Route) => void
  onClose: () => void
  repoUrl: string
}

function shareUrl(id: string): string {
  return `${window.location.origin}${window.location.pathname}${toHash({ kind: 'term', id })}`
}

/**
 * 카드 상세. 본문 HTML 은 빌드 시 우리가 marked 로 렌더한 것만 들어온다(terms/*.md → terms-body.json).
 * 외부 입력이 아니므로 dangerouslySetInnerHTML 을 쓴다. README "콘텐츠 신뢰 경계" 참고.
 */
export function TermDetail({ term, body, byId, categories, starred, onToggleStar, onNavigate, onClose, repoUrl }: Props) {
  const cat = categories.get(term.category)
  const status = STATUS_LABEL[term.status]
  const [copied, setCopied] = useState(false)
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setCopied(false)
    const pane = rootRef.current?.closest<HTMLElement>('.pane')
    if (pane) pane.scrollTop = 0
    document.documentElement.scrollTop = 0
  }, [term.id])

  async function copyLink() {
    const url = shareUrl(term.id)
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      window.prompt('링크를 복사하세요', url)
    }
  }

  return (
    <article className="detail" style={catStyle(term.category)} ref={rootRef} aria-labelledby="detail-title">
      <div className="detail__topbar">
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          <Icon name="arrow-left" size={16} />
          목록으로
        </button>
        <div className="detail__tools">
          <button type="button" className="icon-btn" onClick={copyLink} aria-label="링크 복사" title="공유 링크 복사">
            <Icon name="link" size={18} />
          </button>
          {copied && <span className="detail__copied" role="status">복사됨</span>}
          <StarButton starred={starred} onToggle={onToggleStar} size={20} />
        </div>
      </div>

      <header className="detail__head">
        <div className="detail__meta">
          {cat && (
            <button
              type="button"
              className="chip chip--cat"
              onClick={() => onNavigate({ kind: 'category', code: cat.code })}
              title={cat.description}
            >
              {cat.icon} {cat.name}
            </button>
          )}
          <span className={`badge badge--level-${term.level}`}>{LEVEL_LABEL[term.level]}</span>
          <span className="badge badge--kind" title="카드 종류">{KIND_LABEL[term.kind]}</span>
          {status && <span className="badge badge--status">{status}</span>}
        </div>
        <h1 className="detail__title" id="detail-title">{term.term}</h1>
        {term.aliases.length > 0 && <p className="detail__aliases">{term.aliases.join(' · ')}</p>}
        {term.tags.length > 0 && (
          <div className="detail__tags">
            {term.tags.map((t) => (
              <span key={t} className="tag">#{t}</span>
            ))}
          </div>
        )}
      </header>

      <section className="detail__section">
        <h2>한 줄 정의</h2>
        {body ? (
          <p className="detail__definition" dangerouslySetInnerHTML={{ __html: body.definitionHtml }} />
        ) : (
          <p className="detail__definition">{term.definition}</p>
        )}
      </section>

      <section className="detail__section">
        <h2>비유</h2>
        {body ? <div className="detail__prose" dangerouslySetInnerHTML={{ __html: body.analogyHtml }} /> : <Skeleton lines={2} />}
      </section>

      <section className="detail__section">
        <h2>예시</h2>
        {body ? (
          <div className="detail__prose detail__example" dangerouslySetInnerHTML={{ __html: body.exampleHtml }} />
        ) : (
          <Skeleton lines={4} className="skeleton--block" />
        )}
      </section>

      {body?.confusionsHtml && (
        <section className="detail__section">
          <h2>헷갈리기 쉬운 것</h2>
          <div className="detail__prose" dangerouslySetInnerHTML={{ __html: body.confusionsHtml }} />
        </section>
      )}

      <section className="detail__section">
        <h2>관련 용어</h2>
        <RelatedChips ids={term.related} byId={byId} categories={categories} onNavigate={onNavigate} />
      </section>

      {term.backlinks.length > 0 && (
        <section className="detail__section">
          <h2>이 용어를 참조하는 카드</h2>
          <RelatedChips ids={term.backlinks} byId={byId} categories={categories} onNavigate={onNavigate} />
        </section>
      )}

      {term.seeAlso.length > 0 && (
        <section className="detail__section">
          <h2>더 읽기</h2>
          <ul className="detail__links">
            {term.seeAlso.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url.replace(/^https?:\/\//, '')} <Icon name="external" size={13} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="detail__foot">
        <span>갱신 {term.updated}</span>
        <code>terms/{term.category}/{term.id}.md</code>
        {repoUrl && (
          <a href={`${repoUrl.replace(/\/$/, '')}/edit/main/terms/${term.category}/${term.id}.md`} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={14} /> GitHub에서 편집
          </a>
        )}
      </footer>
    </article>
  )
}
