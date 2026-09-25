import type { CSSProperties } from 'react'

/**
 * 카테고리 코드 → `--cat` 색 변수 (OKLCH: 색상마다 명도·채도가 균일).
 * hue 는 global.css 의 --hue-<code> 에서 오고, 없는 코드는 70(앰버). 카테고리 색은 항상 아이콘·이름과 함께 쓰이므로
 * 색만으로 구분하지 않는다. oklch 미지원 브라우저는 global.css 의 @supports 폴백이 accent 로 덮어쓴다.
 */
export function catStyle(code: string): CSSProperties {
  return { '--cat': `oklch(var(--cat-l) var(--cat-c) var(--hue-${code}, 70))` } as CSSProperties
}
