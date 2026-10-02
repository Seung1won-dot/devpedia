import { useCallback, useState } from 'react'
import { loadList, pushRecent, saveList } from '../lib/storage'

/** 최근 본 용어 / 최근 검색 — localStorage 에 저장되는 앞쪽 우선 목록 */
export function useRecentList(key: string, max: number) {
  const [list, setList] = useState<string[]>(() => loadList(key))
  const push = useCallback(
    (item: string) => {
      setList((prev) => {
        const next = pushRecent(prev, item, max)
        if (next !== prev) saveList(key, next)
        return next
      })
    },
    [key, max],
  )
  const clear = useCallback(() => {
    setList([])
    saveList(key, [])
  }, [key])
  return { list, push, clear }
}
