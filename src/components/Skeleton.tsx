/** 로딩 자리표시자. 레이아웃 이동(CLS)을 막기 위해 실제 콘텐츠와 비슷한 크기로 그린다. */
export function Skeleton({ lines = 2, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`skeleton ${className}`.trim()} data-testid="skeleton" aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="skeleton__line" />
      ))}
    </div>
  )
}

export function CardGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid--cards" aria-hidden="true" data-testid="skeleton">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="tcard tcard--skeleton">
          <span className="skeleton__line skeleton__line--title" />
          <span className="skeleton__line" />
          <span className="skeleton__line skeleton__line--short" />
        </div>
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="container page" aria-busy="true">
      <div className="pagehead">
        <span className="skeleton__line skeleton__line--h1" aria-hidden="true" />
        <span className="skeleton__line skeleton__line--short" aria-hidden="true" />
      </div>
      <CardGridSkeleton />
    </div>
  )
}
