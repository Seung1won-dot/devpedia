import { prefersReducedMotion } from './motion'

/**
 * 홈 첫 화면 인트로 (anime.js v4).
 * - anime.js 는 별도 조각으로, 홈에 들어올 때 데이터와 함께 미리 받는다. 첫 번들에는 들어가지 않는다.
 * - 한 탭(세션)에서 처음 홈을 그릴 때 한 번만 돈다. 홈에 다시 돌아오면 바로 보인다.
 * - 모션 축소 설정이면 받지도, 돌지도 않는다.
 */
type Anime = typeof import('./intro-anime')

let mod: Anime | null = null
let loading: Promise<Anime | null> | null = null
let played = false

export function preloadIntro(): Promise<Anime | null> {
  if (prefersReducedMotion()) return Promise.resolve(null)
  if (!loading) {
    loading = import('./intro-anime')
      .then((m) => (mod = m))
      .catch(() => null)
  }
  return loading
}

/** 인트로를 아직 안 돌렸고 돌려도 되는 상황인가 */
export function shouldPlayIntro(): boolean {
  return !played && !prefersReducedMotion() && typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function'
}

/**
 * 히어로 인트로: 제목 글자가 하나씩 떠오르고(stagger), 그 뒤 설명·검색창·숫자가 차례로 들어온다.
 * anime.js 가 제때(최대 waitMs) 오지 않으면 애니메이션 없이 보인다. 반환값은 정리 함수.
 */
export function playHeroIntro(root: HTMLElement, waitMs = 700): () => void {
  played = true
  let cancelled = false
  let done = false
  let revert: (() => void) | null = null
  // .is-intro 가 붙어 있는 동안 CSS 가 글자를 숨긴다. anime.js 는 각 글자 차례가 오면 인라인 스타일로 덮어쓴다.
  const reveal = () => root.classList.remove('is-intro')

  const run = (anime: Anime) => {
    if (cancelled) return
    const { createTimeline, stagger } = anime
    const chars = root.querySelectorAll<HTMLElement>('.hero__char')
    const after = root.querySelectorAll<HTMLElement>('[data-intro]')
    const glow = root.querySelector<HTMLElement>('.hero__glow')
    const tl = createTimeline({
      defaults: { ease: 'outExpo' },
      onComplete: () => {
        done = true
        reveal()
      },
    })
    if (glow) tl.add(glow, { opacity: [0, 1], duration: 1400, ease: 'outQuad' }, 0)
    tl.add(chars, { opacity: [0, 1], y: ['0.55em', '0em'], duration: 900, delay: stagger(34) }, 80)
    tl.add(after, { opacity: [0, 1], y: [10, 0], duration: 700, delay: stagger(90) }, '-=650')
    revert = () => tl.revert()
  }

  if (mod) run(mod)
  else {
    const timer = window.setTimeout(() => {
      cancelled = true
      reveal()
    }, waitMs)
    void preloadIntro().then((m) => {
      window.clearTimeout(timer)
      if (m) run(m)
      else reveal()
    })
  }

  return () => {
    cancelled = true
    // 도중에 내려갔으면(StrictMode 의 두 번 마운트 포함) 다음에 다시 돌 수 있게 한다
    if (!done) played = false
    revert?.()
    reveal()
  }
}
