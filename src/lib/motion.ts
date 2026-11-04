import type { Transition } from 'motion/react'

/**
 * 모션 공통값 (docs/redesign/README.md "모션 규칙").
 * - 움직임은 핵심 요소에만: 화면 전환·섹션 등장·탭 밑줄·메뉴·별표·차트 막대·홈 첫 화면 제목.
 * - 크기 변화·그림자 변화·무한 반복은 쓰지 않는다. 이동 거리는 12px 이하.
 * - prefers-reduced-motion 이면 <MotionConfig reducedMotion="user"> 가 이동을 끄고, anime.js 인트로는 아예 돌지 않는다.
 */

/** tokens.css 의 --ease-out 과 같은 곡선 */
export const EASE_OUT = [0, 0, 0.2, 1] as const

/** 화면 전환 — 짧게 */
export const PAGE: Transition = { duration: 0.24, ease: EASE_OUT }

/** 스크롤해서 섹션이 들어올 때 */
export const REVEAL: Transition = { duration: 0.5, ease: EASE_OUT }

/** 탭 밑줄·작은 조각이 제자리로 갈 때 — 튀지 않는 스프링 */
export const SPRING: Transition = { type: 'spring', stiffness: 520, damping: 42, mass: 0.9 }

/** 별표 같은 눌림 피드백 — 살짝 튀는 스프링 */
export const POP: Transition = { type: 'spring', stiffness: 600, damping: 18 }

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** IntersectionObserver 가 없는 환경(테스트·아주 오래된 브라우저)에서는 whileInView 대신 바로 animate 한다. */
export function canObserve(): boolean {
  return typeof IntersectionObserver !== 'undefined'
}
