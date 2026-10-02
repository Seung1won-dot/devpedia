// 해시 라우팅. GitHub Pages 에서 서버 없이 딥링크가 동작해야 하므로 경로 대신 해시를 쓴다.
//   #/              홈
//   #/c/<code>      분야 (선택: ?p=<id> 데스크톱 미리보기 패널)
//   #/t/<id>        용어
//   #/starred       별표
//   #/stats         통계
// 예전 주소(#ssh, #/ssh, #c/os, #starred, #stats)도 그대로 읽고, useRoute 가 새 주소로 바꿔 준다(replaceState).
export type Route =
  | { kind: 'home' }
  | { kind: 'category'; code: string; preview?: string }
  | { kind: 'term'; id: string }
  | { kind: 'starred' }
  | { kind: 'stats' }
  | { kind: 'notFound'; path: string }

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const ID = /^[^/?#\s]+$/
const HOME: Route = { kind: 'home' }

export function parseHash(hash: string): Route {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  let s: string
  try {
    s = decodeURIComponent(raw).trim()
  } catch {
    return { kind: 'notFound', path: raw }
  }
  if (s === '' || s === '/') return HOME

  const q = s.indexOf('?')
  const pathPart = q === -1 ? s : s.slice(0, q)
  const params = new URLSearchParams(q === -1 ? '' : s.slice(q + 1))
  const segs = pathPart.replace(/^\/+/, '').replace(/\/+$/, '').split('/')

  if (segs.length === 1) {
    const [a] = segs
    if (a === 'starred') return { kind: 'starred' }
    if (a === 'stats') return { kind: 'stats' }
    if (ID.test(a) && a !== 'c' && a !== 't') return { kind: 'term', id: a } // 예전 공유 링크 #ssh
  }
  if (segs.length === 2) {
    const [a, b] = segs
    if (a === 'c' && SLUG.test(b)) {
      const p = params.get('p')
      return p && ID.test(p) ? { kind: 'category', code: b, preview: p } : { kind: 'category', code: b }
    }
    if (a === 't' && ID.test(b)) return { kind: 'term', id: b }
  }
  return { kind: 'notFound', path: pathPart }
}

export function toHash(r: Route): string {
  switch (r.kind) {
    case 'home':
      return '#/'
    case 'category':
      return `#/c/${r.code}${r.preview ? `?p=${encodeURIComponent(r.preview)}` : ''}`
    case 'term':
      return `#/t/${encodeURIComponent(r.id)}`
    case 'starred':
      return '#/starred'
    case 'stats':
      return '#/stats'
    case 'notFound':
      return `#/${r.path.replace(/^\/+/, '')}`
  }
}

/** 예전 형식이거나 표기가 다른 해시면 표준 해시를, 이미 표준이거나 비어 있거나 404 면 null. */
export function canonicalHash(hash: string): string | null {
  if (!hash || hash === '#') return null
  const r = parseHash(hash)
  if (r.kind === 'notFound') return null
  const c = toHash(r)
  return c === hash ? null : c
}

/** 스크롤 복원·페이지 전환 단위. 미리보기 패널(?p=)만 바뀌면 같은 페이지다. */
export function pageKey(r: Route): string {
  return r.kind === 'category' ? `c/${r.code}` : toHash(r)
}

export function sameRoute(a: Route, b: Route): boolean {
  return toHash(a) === toHash(b)
}
