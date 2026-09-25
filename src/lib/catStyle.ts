import type { CSSProperties } from 'react'

/** 카테고리 코드 → `--cat` 색 변수. hue 는 global.css 의 --hue-<code> 에서 온다(없는 코드는 accent). */
export function catStyle(code: string): CSSProperties {
  return { '--cat': `hsl(var(--hue-${code}, 40) var(--cat-sat) var(--cat-lum))` } as CSSProperties
}
