import { useEffect, useMemo, useState } from 'react'
import type { Term } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { neighbors } from '../lib/terms'
import { KIND_LABEL } from '../lib/kind'
import { REPO_URL } from '../config'
import { Breadcrumb } from '../components/Breadcrumb'
import { LevelMeter } from '../components/LevelMeter'
import { StarButton } from '../components/StarButton'
import { TermCard } from '../components/TermCard'
import { Toc, type TocItem } from '../components/Toc'
import { Skeleton } from '../components/Skeleton'
import { Icon } from '../components/Icon'

const STATUS_NOTE: Record<Term['status'], string | null> = {
  draft: '초안 — 아직 채우는 중인 카드예요.',
  review: '검토 중 — LLM 초안을 사람이 읽고 고치는 중인 카드예요. 틀린 곳이 있으면 GitHub 에서 고쳐 주세요.',
  published: null,
}

function shareUrl(id: string): string {
  return `${window.location.origin}${window.location.pathname}${toHash({ kind: 'term', id })}`
}

const COLLAPSED = 6

function RelatedGrid({ ids, ctx, label, collapsible = false }: { ids: string[]; ctx: PageContext; label: string; collapsible?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const all = ids.map((id) => ctx.data.byId.get(id)).filter((t): t is Term => Boolean(t))
  const found = collapsible && !expanded ? all.slice(0, COLLAPSED) : all
  const hidden = all.length - found.length
  const missing = ids.filter((id) => !ctx.data.byId.has(id))
  return (
    <>
      {found.length > 0 && (
        <ul className="grid grid--related" aria-label={label}>
          {found.map((t) => (
            <li key={t.id}>
              <TermCard term={t} category={ctx.data.categories.get(t.category)} compact />
            </li>
          ))}
        </ul>
      )}
      {hidden > 0 && (
        <button type="button" className="btn btn--sm doc__more" onClick={() => setExpanded(true)}>
          {hidden}개 더 보기
        </button>
      )}
      {missing.length > 0 && (
        <p className="doc__missing">
          아직 카드가 없는 용어: {missing.map((id) => <code key={id}>{id}</code>)}
        </p>
      )}
      {ids.length === 0 && <p className="muted">아직 연결된 용어가 없어요.</p>}
    </>
  )
}

/**
 * 용어 페이지. 본문 HTML 은 빌드 때 이 저장소의 Markdown 을 렌더한 것만 들어온다(terms/*.md → terms-body.json).
 * 외부 입력이 아니고 validate 가 raw HTML 을 막으므로 dangerouslySetInnerHTML 을 쓴다. README "콘텐츠 신뢰 경계".
 */
export function TermPage({ ctx, term }: { ctx: PageContext; term: Term }) {
  const { data, stars, toggleStar } = ctx
  const cat = data.categories.get(term.category)
  const body = data.bodies?.get(term.id)
  const [copied, setCopied] = useState(false)
  const { prev, next } = useMemo(() => neighbors(data.bundle.terms, term), [data.bundle.terms, term])
  const aliases = term.aliases.filter((a) => a !== term.term)

  useEffect(() => setCopied(false), [term.id])

  const toc: TocItem[] = useMemo(() => {
    const items: TocItem[] = [
      { id: 'sec-analogy', label: '비유' },
      { id: 'sec-example', label: '예시' },
    ]
    if (body?.confusionsHtml) items.push({ id: 'sec-confusions', label: '헷갈리기 쉬운 것' })
    items.push({ id: 'sec-related', label: '관련 용어' })
    if (term.backlinks.length) items.push({ id: 'sec-backlinks', label: '이 용어를 참조하는 카드' })
    if (term.seeAlso.length) items.push({ id: 'sec-more', label: '더 읽기' })
    return items
  }, [body?.confusionsHtml, term.backlinks.length, term.seeAlso.length])

  async function copyLink() {
    const url = shareUrl(term.id)
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      window.prompt('링크를 복사하세요', url)
    }
  }

  const status = STATUS_NOTE[term.status]

  return (
    <div className="container page">
      <div className="termpage">
        <article className="doc" aria-labelledby="term-title">
          <Breadcrumb
            items={[
              { label: '홈', href: toHash({ kind: 'home' }) },
              ...(cat ? [{ label: `${cat.icon} ${cat.name}`, href: toHash({ kind: 'category', code: cat.code }) }] : []),
              { label: term.term },
            ]}
          />

          <header className="doc__head">
            <h1 className="doc__title" id="term-title">
              {term.term}
            </h1>
            {aliases.length > 0 && <p className="doc__aliases">{aliases.join(' · ')}</p>}
            <div className="doc__meta">
              <LevelMeter level={term.level} showLabel />
              <span className="doc__dot" aria-hidden="true" />
              <span>{KIND_LABEL[term.kind]}</span>
              {term.tags.length > 0 && (
                <>
                  <span className="doc__dot" aria-hidden="true" />
                  <ul className="doc__tags" aria-label="태그">
                    {term.tags.map((t) => (
                      <li key={t}>
                        <span className="tag">#{t}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="doc__actions">
              <StarButton starred={stars.has(term.id)} onToggle={() => toggleStar(term.id)} labeled />
              <button type="button" className="btn btn--ghost" onClick={copyLink}>
                <Icon name={copied ? 'check' : 'link'} size={16} />
                <span>{copied ? '복사됨' : '링크 복사'}</span>
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? '링크를 복사했어요' : ''}
              </span>
            </div>
          </header>

          {body ? (
            <p className="doc__lead" dangerouslySetInnerHTML={{ __html: body.definitionHtml }} />
          ) : (
            <p className="doc__lead">{term.definition}</p>
          )}

          <section className="doc__section" id="sec-analogy" tabIndex={-1} aria-labelledby="h-analogy">
            <h2 id="h-analogy">비유</h2>
            {body ? <div className="prose prose--analogy" dangerouslySetInnerHTML={{ __html: body.analogyHtml }} /> : <Skeleton lines={2} />}
          </section>

          <section className="doc__section" id="sec-example" tabIndex={-1} aria-labelledby="h-example">
            <h2 id="h-example">예시</h2>
            {body ? <div className="prose" dangerouslySetInnerHTML={{ __html: body.exampleHtml }} /> : <Skeleton lines={5} />}
          </section>

          {body?.confusionsHtml && (
            <section className="doc__section" id="sec-confusions" tabIndex={-1} aria-labelledby="h-confusions">
              <h2 id="h-confusions">헷갈리기 쉬운 것</h2>
              <div className="prose prose--confusions" dangerouslySetInnerHTML={{ __html: body.confusionsHtml }} />
            </section>
          )}

          {data.bodiesError && !body && (
            <p className="doc__missing" role="status">
              본문을 불러오지 못했어요 ({data.bodiesError}). 한 줄 정의만 보여요.
            </p>
          )}

          <section className="doc__section" id="sec-related" tabIndex={-1} aria-labelledby="h-related">
            <h2 id="h-related">관련 용어</h2>
            <RelatedGrid ids={term.related} ctx={ctx} label="관련 용어" />
          </section>

          {term.backlinks.length > 0 && (
            <section className="doc__section" id="sec-backlinks" tabIndex={-1} aria-labelledby="h-backlinks">
              <h2 id="h-backlinks">이 용어를 참조하는 카드</h2>
              <RelatedGrid key={term.id} ids={term.backlinks} ctx={ctx} label="이 용어를 참조하는 카드" collapsible />
            </section>
          )}

          {term.seeAlso.length > 0 && (
            <section className="doc__section" id="sec-more" tabIndex={-1} aria-labelledby="h-more">
              <h2 id="h-more">더 읽기</h2>
              <ul className="doc__links">
                {term.seeAlso.map((url) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      <Icon name="external" size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(prev || next) && (
            <nav className="pager" aria-label={`${cat?.name ?? '같은 분야'} 안에서 이동`}>
              {prev ? (
                <a className="pager__link" href={toHash({ kind: 'term', id: prev.id })} rel="prev">
                  <span className="pager__dir">
                    <Icon name="arrow-left" size={14} /> 이전
                  </span>
                  <span className="pager__term">{prev.term}</span>
                </a>
              ) : (
                <span />
              )}
              {next && (
                <a className="pager__link pager__link--next" href={toHash({ kind: 'term', id: next.id })} rel="next">
                  <span className="pager__dir">
                    다음 <Icon name="arrow-right" size={14} />
                  </span>
                  <span className="pager__term">{next.term}</span>
                </a>
              )}
            </nav>
          )}

          <footer className="doc__foot">
            {status && <p className="doc__status">{status}</p>}
            <p className="doc__footmeta">
              <span>
                갱신 <time dateTime={term.updated}>{term.updated}</time>
              </span>
              <code>terms/{term.category}/{term.id}.md</code>
              {REPO_URL && (
                <a href={`${REPO_URL.replace(/\/$/, '')}/edit/main/terms/${term.category}/${term.id}.md`} target="_blank" rel="noopener noreferrer">
                  <Icon name="github" size={14} /> GitHub에서 편집
                </a>
              )}
            </p>
          </footer>
        </article>

        <aside className="termpage__aside">
          <Toc items={toc} />
        </aside>
      </div>
    </div>
  )
}
