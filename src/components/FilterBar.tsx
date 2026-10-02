import { useEffect, useId, useRef, useState } from 'react'
import type { Level } from '../types'
import { LEVEL_LABEL, LEVELS, SORT_LABEL, type SortMode } from '../lib/terms'
import { Icon } from './Icon'

const TOP_TAGS = 8
const SORTS: SortMode[] = ['name', 'level', 'recent']

interface Props {
  level: Level | null
  onLevel: (l: Level | null) => void
  levelCounts: Record<Level, number>
  total: number
  tags: { tag: string; count: number }[]
  tag: string | null
  onTag: (t: string | null) => void
  sort: SortMode
  onSort: (s: SortMode) => void
  resultCount: number
  /** 가나다순일 때 빠른 이동 인덱스 */
  index?: { keys: string[]; onJump: (key: string) => void }
}

function TagMore({ tags, tag, onTag }: { tags: { tag: string; count: number }[]; tag: string | null; onTag: (t: string | null) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const btn = useRef<HTMLButtonElement | null>(null)
  const id = useId()
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    ref.current?.querySelector<HTMLButtonElement>('.tagpop .chip')?.focus()
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  return (
    <div className="tagmore" ref={ref}>
      <button ref={btn} type="button" className="chip chip--ghost" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        더보기 <span className="chip__count">+{tags.length}</span>
      </button>
      <div id={id} className="tagpop" hidden={!open} role="group" aria-label="모든 태그">
        {tags.map(({ tag: t, count }) => (
          <button
            key={t}
            type="button"
            className="chip"
            aria-pressed={tag === t}
            onClick={() => {
              onTag(tag === t ? null : t)
              setOpen(false)
            }}
          >
            {t}
            <span className="chip__count">{count}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/** 스크롤하면 헤더 아래에 붙는 필터 바 */
/** 붙어 있는 필터 바 높이를 --filter-stick 으로 알려 준다 (섹션 스크롤 여백·미리보기 패널 위치) */
function useStickHeight() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const root = document.documentElement
    const ro = new ResizeObserver(() => root.style.setProperty('--filter-stick', `${el.offsetHeight}px`))
    ro.observe(el)
    return () => {
      ro.disconnect()
      root.style.removeProperty('--filter-stick')
    }
  }, [])
  return ref
}

export function FilterBar({ level, onLevel, levelCounts, total, tags, tag, onTag, sort, onSort, resultCount, index }: Props) {
  const barRef = useStickHeight()
  const top = tags.slice(0, TOP_TAGS)
  // 고른 태그가 상위 8개 밖이면 앞에 붙여 보이게 한다
  const selectedOutside = tag && !top.some((t) => t.tag === tag) ? tags.find((t) => t.tag === tag) : undefined
  const rest = tags.slice(TOP_TAGS).filter((t) => t.tag !== tag)
  const active = level !== null || tag !== null

  return (
    <div className="filterbar" ref={barRef}>
      <div className="filterbar__row">
        <div className="seg" role="group" aria-label="난이도">
          <button type="button" aria-pressed={level === null} onClick={() => onLevel(null)}>
            전체 <span className="seg__count">{total}</span>
          </button>
          {LEVELS.map((l) => (
            <button key={l} type="button" aria-pressed={level === l} onClick={() => onLevel(level === l ? null : l)} disabled={levelCounts[l] === 0}>
              {LEVEL_LABEL[l]} <span className="seg__count">{levelCounts[l]}</span>
            </button>
          ))}
        </div>

        <div className="filterbar__tags" role="group" aria-label="태그">
          {selectedOutside && (
            <button type="button" className="chip" aria-pressed onClick={() => onTag(null)}>
              {selectedOutside.tag}
              <span className="chip__count">{selectedOutside.count}</span>
            </button>
          )}
          {top.map(({ tag: t, count }) => (
            <button key={t} type="button" className="chip" aria-pressed={tag === t} onClick={() => onTag(tag === t ? null : t)}>
              {t}
              <span className="chip__count">{count}</span>
            </button>
          ))}
          {rest.length > 0 && <TagMore tags={rest} tag={tag} onTag={onTag} />}
        </div>

        <div className="filterbar__end">
          <span className="filterbar__count" role="status" aria-live="polite">
            {resultCount}개
          </span>
          {active && (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                onLevel(null)
                onTag(null)
              }}
            >
              <Icon name="x" size={14} /> 초기화
            </button>
          )}
          <label className="sortsel">
            <span className="sr-only">정렬</span>
            <select value={sort} onChange={(e) => onSort(e.target.value as SortMode)} aria-label="정렬">
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {SORT_LABEL[s]}순
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={14} className="sortsel__chev" />
          </label>
        </div>
      </div>

      {index && index.keys.length > 1 && (
        <nav className="jumpidx" aria-label="첫 글자로 이동">
          {index.keys.map((k) => (
            <button key={k} type="button" onClick={() => index.onJump(k)} aria-label={`${k} 로 이동`}>
              {k}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
