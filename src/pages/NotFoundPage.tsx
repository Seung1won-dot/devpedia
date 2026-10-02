import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { EmptyState } from '../components/EmptyState'

export function NotFoundPage({ what, name }: { ctx: PageContext; what: string; name: string }) {
  return (
    <div className="container page">
      <EmptyState
        asPage
        icon="inbox"
        title={`해당 ${what}를 찾을 수 없어요`}
        hint={`'${name}' 은(는) 아직 없거나 주소가 바뀌었어요.`}
        action={<a className="btn btn--primary" href={toHash({ kind: 'home' })}>홈으로</a>}
      />
    </div>
  )
}
