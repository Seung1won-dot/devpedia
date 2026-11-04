import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import type { Term } from '../types'
import type { BundleState } from '../hooks/useBundle'
import type { Route } from '../lib/route'
import { englishName } from '../lib/terms'
import { RECENT_SEARCHES_KEY } from '../lib/storage'
import { useRecentList } from '../hooks/useRecentList'
import { Highlighted } from './Highlighted'
import { LevelMeter } from './LevelMeter'
import { Icon } from './Icon'

const LIMIT = 30

interface Props {
  data: BundleState
  onClose: () => void
  navigate: (r: Route) => void
  recentTerms: string[]
}

/**
 * 검색 팔레트. 헤더 검색 버튼, `/`, ⌘K·Ctrl+K 로 연다.
 * 결과는 combobox + listbox 패턴: 포커스는 입력창에 두고 aria-activedescendant 로 현재 항목을 알린다.
 */
export function CommandPalette({ data, onClose, navigate, recentTerms }: Props) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const listId = useId()
  const searches = useRecentList(RECENT_SEARCHES_KEY, 6)

  const ready = data.state === 'ready'
  const q = query.trim()

  const results: Term[] = useMemo(() => {
    if (data.state !== 'ready' || !q) return []
    return data.search
      .search(q, LIMIT)
      .map((h) => data.byId.get(h.id))
      .filter((t): t is Term => Boolean(t))
  }, [data, q])

  const recents: Term[] = useMemo(() => {
    if (data.state !== 'ready') return []
    return recentTerms.map((id) => data.byId.get(id)).filter((t): t is Term => Boolean(t)).slice(0, 5)
  }, [data, recentTerms])

  // 빈 검색어일 때는 최근 본 용어가 선택 대상
  const items = q ? results : recents

  useEffect(() => setActive(0), [q])

  // 열릴 때: 입력창 포커스, 배경 스크롤 잠금. 닫힐 때: 원래 포커스 복귀.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      prev?.focus?.()
    }
  }, [])

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)
    el?.scrollIntoView?.({ block: 'nearest' })
  }, [active])

  function open(t: Term) {
    if (q) searches.push(q)
    onClose()
    navigate({ kind: 'term', id: t.id })
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (items.length) setActive((i) => (i + 1) % items.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (items.length) setActive((i) => (i - 1 + items.length) % items.length)
    } else if (e.key === 'Home' && items.length) {
      e.preventDefault()
      setActive(0)
    } else if (e.key === 'End' && items.length) {
      e.preventDefault()
      setActive(items.length - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const t = items[active]
      if (t) open(t)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      onClose()
    } else if (e.key === 'Tab') {
      // 대화상자 안에 머문다 (조작은 입력창 하나로 충분)
      e.preventDefault()
    }
  }

  const activeId = items[active] ? `${listId}-${active}` : undefined
  const categories = data.state === 'ready' ? data.categories : null

  const row = (t: Term, i: number) => {
    const cat = categories?.get(t.category)
    const en = englishName(t)
    return (
      <li
        key={t.id}
        id={`${listId}-${i}`}
        data-index={i}
        role="option"
        aria-selected={i === active}
        className="presult"
        onMouseMove={() => i !== active && setActive(i)}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => open(t)}
      >
        <span className="presult__main">
          <span className="presult__term">
            <span>
              <Highlighted text={t.term} query={q} />
            </span>
            {en && (
              <span className="presult__en">
                <Highlighted text={en} query={q} />
              </span>
            )}
          </span>
          <span className="presult__def">
            <Highlighted text={t.definition} query={q} />
          </span>
        </span>
        <span className="presult__side">
          {cat && (
            <span className="presult__cat">
              <span aria-hidden="true">{cat.icon}</span> {cat.name}
            </span>
          )}
          <LevelMeter level={t.level} />
        </span>
      </li>
    )
  }

  return (
    <div className="palette-wrap">
      <div className="palette-scrim" onClick={onClose} aria-hidden="true" />
      <div className="palette" role="dialog" aria-modal="true" aria-label="용어 검색">
        <div className="palette__field">
          <Icon name="search" size={18} className="palette__icon" />
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            role="combobox"
            aria-expanded={items.length > 0}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label="용어 검색"
            placeholder="한글 · 영문 · 약어 · 초성(ㄹㅂㅅ)"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
          {query ? (
            <button
              type="button"
              className="icon-btn"
              aria-label="검색어 지우기"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
            >
              <Icon name="x" size={16} />
            </button>
          ) : (
            <kbd className="palette__esc" aria-hidden="true">
              Esc
            </kbd>
          )}
        </div>

        <div className="palette__body">
          {!ready && <p className="palette__note">용어 목록을 불러오는 중…</p>}

          {ready && !q && (
            <>
              {searches.list.length > 0 && (
                <div className="palette__group">
                  <div className="palette__grouphead">
                    <span>최근 검색</span>
                    <button type="button" className="palette__clear" onClick={searches.clear}>
                      지우기
                    </button>
                  </div>
                  <ul className="palette__chips">
                    {searches.list.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          className="chip"
                          onClick={() => {
                            setQuery(s)
                            inputRef.current?.focus()
                          }}
                        >
                          <Icon name="clock" size={13} /> {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {recents.length > 0 ? (
                <div className="palette__group">
                  <div className="palette__grouphead">
                    <span>최근 본 용어</span>
                  </div>
                  <ul className="palette__list" id={listId} role="listbox" aria-label="최근 본 용어" ref={listRef}>
                    {recents.map(row)}
                  </ul>
                </div>
              ) : (
                searches.list.length === 0 && (
                  <p className="palette__note">
                    예: <code>SSH</code> · <code>리버스 프록시</code> · <code>ㄹㅂㅅ</code> · <code>cors</code>. 철자가 조금 틀려도 찾아요.
                  </p>
                )
              )}
            </>
          )}

          {ready && q && results.length > 0 && (
            <ul className="palette__list" id={listId} role="listbox" aria-label="검색 결과" ref={listRef}>
              {results.map(row)}
            </ul>
          )}

          {ready && q && results.length === 0 && (
            <div className="palette__empty" role="status">
              <p className="palette__emptytitle">‘{q}’ 에 맞는 용어가 없어요</p>
              <p className="palette__note">
                영문 약어나 초성으로 다시 찾아보세요. 꼭 필요한 용어라면 <code>terms/_inbox.md</code> 에 한 줄 적어 두세요.
              </p>
            </div>
          )}
        </div>

        <div className="palette__foot" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> 이동
          </span>
          <span>
            <kbd>
              <Icon name="enter" size={11} />
            </kbd>{' '}
            열기
          </span>
          <span>
            <kbd>Esc</kbd> 닫기
          </span>
          <span className="palette__count">
            {q ? `${results.length}${results.length === LIMIT ? '+' : ''}개` : ''}
            {data.state === 'ready' && !data.search.hasBodies ? ' · 본문 검색 준비 중' : ''}
          </span>
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {q ? `${results.length}개 결과` : ''}
        </p>
      </div>
    </div>
  )
}
