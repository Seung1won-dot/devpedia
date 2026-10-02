import { useEffect, useLayoutEffect } from 'react'

const SAVE_EVERY_MS = 200

function scrollToY(y: number) {
  try {
    window.scrollTo({ top: y, left: 0, behavior: 'instant' as ScrollBehavior })
  } catch {
    /* jsdom 등 */
  }
}

/**
 * 해시 라우팅에서 페이지 스크롤을 문서처럼 다룬다.
 * - 스크롤 위치를 현재 history 항목의 state 에 저장한다.
 * - 페이지가 바뀔 때 그 항목에 저장된 위치가 있으면(뒤로/앞으로) 복원, 없으면(새 페이지) 맨 위로.
 */
export function useScrollRestoration(pageKey: string, ready: boolean) {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    let last = 0
    let timer = 0
    const save = () => {
      last = Date.now()
      try {
        history.replaceState({ ...(history.state ?? {}), y: window.scrollY }, '')
      } catch {
        /* ignore */
      }
    }
    const onScroll = () => {
      window.clearTimeout(timer)
      if (Date.now() - last > SAVE_EVERY_MS) save()
      else timer = window.setTimeout(save, SAVE_EVERY_MS)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [])

  useLayoutEffect(() => {
    if (!ready) return
    const y = (history.state as { y?: unknown } | null)?.y
    if (typeof y === 'number') {
      // 콘텐츠가 그려진 뒤에 복원해야 높이가 맞는다
      requestAnimationFrame(() => scrollToY(y))
    } else {
      scrollToY(0)
    }
  }, [pageKey, ready])
}
