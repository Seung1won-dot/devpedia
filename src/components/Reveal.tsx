import { m, type HTMLMotionProps } from 'motion/react'
import { canObserve, REVEAL } from '../lib/motion'

const HIDDEN = { opacity: 0, y: 12 }
const SHOWN = { opacity: 1, y: 0 }

/**
 * 뷰포트에 들어올 때 한 번 떠오르는 <section> (Motion whileInView).
 * - 모션 축소 설정이면 MotionConfig(reducedMotion="user") 가 이동을 빼고 투명도만 바꾼다.
 * - IntersectionObserver 가 없으면 바로 보인다.
 */
export function Reveal({ className = '', children, ...rest }: HTMLMotionProps<'section'>) {
  const view = canObserve()
    ? { whileInView: SHOWN, viewport: { once: true, margin: '0px 0px -8% 0px' } }
    : { animate: SHOWN }
  return (
    <m.section className={`reveal${className ? ` ${className}` : ''}`} initial={HIDDEN} transition={REVEAL} {...view} {...rest}>
      {children}
    </m.section>
  )
}
