import { useEffect, useState } from 'react'

export interface TocItem {
  id: string
  label: string
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  // 키보드 사용자도 그 섹션에서 이어 읽도록 포커스를 옮긴다
  el.focus({ preventScroll: true })
}

/**
 * 넓은 화면의 sticky 목차. 해시 라우팅이라 #anchor 링크 대신 버튼으로 스크롤한다.
 * 현재 읽는 섹션은 IntersectionObserver 로 표시한다.
 */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e))
    const visible = new Map<string, boolean>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting)
        const first = items.find((i) => visible.get(i.id))
        if (first) setActive(first.id)
      },
      { rootMargin: '-80px 0px -55% 0px' },
    )
    for (const el of els) io.observe(el)
    return () => io.disconnect()
  }, [items])

  return (
    <nav className="toc" aria-label="이 페이지 목차">
      <p className="toc__title">목차</p>
      <ul className="toc__list">
        {items.map((i) => (
          <li key={i.id}>
            <button
              type="button"
              className="toc__link"
              aria-current={active === i.id ? 'location' : undefined}
              onClick={() => {
                setActive(i.id)
                scrollToId(i.id)
              }}
            >
              {i.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
