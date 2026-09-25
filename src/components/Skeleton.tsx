/** 로딩 자리표시자. 레이아웃 이동(CLS)을 막기 위해 실제 콘텐츠와 비슷한 높이로 그린다. */
export function Skeleton({ lines = 2, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`skeleton ${className}`.trim()} data-testid="skeleton" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="skeleton__line" />
      ))}
    </div>
  )
}

export function ListSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <ul className="list" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <li key={i} className="row-item">
          <div className="row row--skeleton">
            <span className="row__dot skeleton__dot" />
            <Skeleton lines={2} />
          </div>
        </li>
      ))}
    </ul>
  )
}
