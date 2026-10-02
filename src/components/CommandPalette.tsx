import type { BundleState } from '../hooks/useBundle'
import type { Route } from '../lib/route'

/** 6단계에서 구현 */
export function CommandPalette({ onClose }: { data: BundleState; onClose: () => void; navigate: (r: Route) => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="용어 검색" className="palette-stub">
      <button type="button" className="btn" onClick={onClose}>닫기</button>
    </div>
  )
}
