import { useEffect, useId, useRef, useState } from 'react'
import type { Category } from '../types'
import { toHash } from '../lib/route'
import { Icon } from './Icon'

interface Props {
  categories: Category[]
  counts: Record<string, number>
  activeCode: string | null
}

/** 헤더의 "분야" 버튼 → 분야 그리드 드롭다운. 바깥 클릭·Esc·링크 선택으로 닫힌다. */
export function CategoryMenu({ categories, counts, activeCode }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    // 열리면 첫 링크로 포커스
    rootRef.current?.querySelector<HTMLAnchorElement>('.catmenu__item')?.focus()
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // 라우트가 바뀌면 닫는다
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <div className="catmenu" ref={rootRef}>
      <button
        ref={btnRef}
        type="button"
        className={`hbtn${activeCode ? ' is-active' : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="grid" size={16} />
        <span className="hbtn__label">분야</span>
        <Icon name="chevron-down" size={14} className="hbtn__chev" />
      </button>
      <div id={panelId} className="catmenu__panel" hidden={!open}>
        <p className="catmenu__title">분야 {categories.length}개</p>
        <ul className="catmenu__grid">
          {categories.map((c) => (
            <li key={c.code}>
              <a
                className="catmenu__item"
                href={toHash({ kind: 'category', code: c.code })}
                aria-current={activeCode === c.code ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="catmenu__icon" aria-hidden="true">{c.icon}</span>
                <span className="catmenu__name">{c.name}</span>
                <span className="catmenu__count">{counts[c.code] ?? 0}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
