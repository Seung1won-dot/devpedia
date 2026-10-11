import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react'

/**
 * 뷰포트에 들어올 때 한 번 페이드인하는 <section>.
 * - 이미 화면 안이거나 위에 있는 요소(뒤로 가기 복원 등)는 즉시 보인다.
 * - IntersectionObserver 가 없거나(테스트 환경) 모션 축소 설정이면 애니메이션 없이 보인다.
 */
export function Reveal({ className = '', children, ...rest }: ComponentPropsWithoutRef<'section'>) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => el.classList.add('is-in')
    const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (typeof IntersectionObserver === 'undefined' || reduce || el.getBoundingClientRect().top < window.innerHeight) {
      show()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show()
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className={`reveal${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </section>
  )
}
