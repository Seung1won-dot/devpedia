import { Fragment, useId, useState, type ReactNode } from 'react'
import { m } from 'motion/react'
import { canObserve, EASE_OUT } from '../lib/motion'

/*
 * 가로 막대 차트 (Motion + SVG).
 * Bklit UI 의 Bar Chart 를 쓰려 했으나 shadcn 레지스트리 + Tailwind + d3-scale + @number-flow 등 20여 개 파일을 끌고 와서,
 * 같은 역할(항목 비교 · 등장 애니메이션 · 호버 값 표시)만 하는 작은 차트를 직접 둔다.
 * - 한 계열(단색) — 범례 없음, 제목이 계열 이름. 값은 오른쪽 숫자로 늘 보이고(표 대용), 호버·포커스하면 비율 툴팁.
 * - 막대는 화면에 들어올 때 한 번 0 → 값으로 자란다(차례로). 모션 축소면 MotionConfig 가 바로 그린다.
 */

export interface BarDatum {
  key: string
  label: ReactNode
  /** 스크린리더·툴팁용 이름 */
  name: string
  value: number
  href?: string
  /** 기준 미달 등 — 숫자를 강조색으로 */
  flag?: boolean
}

export interface BarGroup {
  name: string
  rows: BarDatum[]
}

interface Props {
  groups: BarGroup[]
  /** 비율(%) 분모. 없으면 모든 값의 합 */
  total?: number
  unit?: string
  testId?: string
  /** 눈금 표시 */
  axis?: boolean
}

/** 0 부터 max 를 덮는 보기 좋은 눈금 (1·2·5 × 10^n 간격, 4칸 안팎) */
export function niceTicks(max: number, target = 4): number[] {
  if (max <= 0) return [0, 1]
  const raw = max / target
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 5, 10].map((k) => k * mag).find((s) => s >= raw) ?? raw
  const top = Math.ceil(max / step) * step
  const out: number[] = []
  for (let v = 0; v <= top + step / 2; v += step) out.push(Math.round(v * 1000) / 1000)
  return out
}

/** 툴팁이 카드 밖으로 나가지 않게 막대 끝 기준 정렬을 바꾼다 */
const tipX = (pct: number) => (pct > 72 ? '-100%' : pct < 18 ? '0%' : '-50%')

const LIST = { hidden: {}, shown: { transition: { staggerChildren: 0.025 } } }
const FILL = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: 0.7, ease: EASE_OUT } },
}

export function BarChart({ groups, total, unit = '개', testId, axis = false }: Props) {
  const all = groups.flatMap((g) => g.rows)
  const sum = total ?? all.reduce((a, r) => a + r.value, 0)
  const ticks = niceTicks(Math.max(1, ...all.map((r) => r.value)))
  const top = ticks[ticks.length - 1]
  const [active, setActive] = useState<string | null>(null)
  const tipId = useId()
  const view = canObserve() ? { whileInView: 'shown', viewport: { once: true, margin: '0px 0px -10% 0px' } } : { animate: 'shown' }
  const showGroups = groups.length > 1

  const grid = (
    <svg className="chart__grid" aria-hidden="true" preserveAspectRatio="none">
      {ticks.map((t) => (
        <line key={t} x1={`${(t / top) * 100}%`} x2={`${(t / top) * 100}%`} y1="0" y2="100%" />
      ))}
    </svg>
  )

  return (
    <div className={`chart${active ? ' has-active' : ''}`} onPointerLeave={() => setActive(null)}>
      <m.ul className="chart__rows" variants={LIST} initial="hidden" {...view}>
        {groups.map((g) => {
          const gsum = g.rows.reduce((a, r) => a + r.value, 0)
          return (
            <Fragment key={g.name}>
              {showGroups && (
                <li className="chart__group" aria-hidden="true">
                  <span>{g.name}</span>
                  <span className="chart__gsum">{gsum}</span>
                </li>
              )}
              {g.rows.map((r) => {
                const pct = top > 0 ? (r.value / top) * 100 : 0
                const share = sum > 0 ? Math.round((r.value / sum) * 1000) / 10 : 0
                const isActive = active === r.key
                const label = r.href ? (
                  <a className="chart__label" href={r.href} onFocus={() => setActive(r.key)} onBlur={() => setActive(null)} aria-describedby={isActive ? tipId : undefined}>
                    {r.label}
                  </a>
                ) : (
                  <span className="chart__label">{r.label}</span>
                )
                return (
                  <li key={r.key} className={`chart__row${isActive ? ' is-active' : ''}`} onPointerEnter={() => setActive(r.key)}>
                    {label}
                    <span
                      className="chart__track"
                      role="meter"
                      aria-valuemin={0}
                      aria-valuemax={top}
                      aria-valuenow={r.value}
                      aria-label={`${r.name} ${r.value}${unit}`}
                      data-testid={testId}
                    >
                      {grid}
                      <m.span className="chart__fill" style={{ width: `${pct}%` }} variants={FILL} />
                      {isActive && (
                        <m.span
                          id={tipId}
                          role="tooltip"
                          className="chart__tip"
                          style={{ left: `${pct}%` }}
                          initial={{ opacity: 0, y: 4, x: tipX(pct) }}
                          animate={{ opacity: 1, y: 0, x: tipX(pct) }}
                          transition={{ duration: 0.15, ease: EASE_OUT }}
                        >
                          <strong>{r.name}</strong>
                          <span>
                            {r.value}
                            {unit} · 전체의 {share}%
                          </span>
                        </m.span>
                      )}
                    </span>
                    <span className={`chart__value${r.flag ? ' chart__value--flag' : ''}`}>{r.value}</span>
                  </li>
                )
              })}
            </Fragment>
          )
        })}
      </m.ul>
      {axis && (
        <div className="chart__axis" aria-hidden="true">
          <span />
          <span className="chart__ticks">
            {ticks.map((t) => (
              <span key={t} style={{ left: `${(t / top) * 100}%` }}>
                {t}
              </span>
            ))}
          </span>
          <span />
        </div>
      )}
    </div>
  )
}
