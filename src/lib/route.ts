// 해시 라우팅. 서버 없이 GitHub Pages 에서 딥링크가 동작해야 하므로 경로 대신 해시를 쓴다.
//   #/            홈(전체)
//   #c/<code>     카테고리
//   #<id>         용어 카드 (공유 링크, 스펙 F-05)
//   #starred      별표 목록
//   #stats        통계
export type Route =
  | { kind: 'home' }
  | { kind: 'category'; code: string }
  | { kind: 'term'; id: string }
  | { kind: 'starred' }
  | { kind: 'stats' }

const CODE_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const HOME: Route = { kind: 'home' }

export function parseHash(hash: string): Route {
  let raw = hash.startsWith('#') ? hash.slice(1) : hash
  if (raw.startsWith('/')) raw = raw.slice(1)
  let s: string
  try {
    s = decodeURIComponent(raw).trim()
  } catch {
    return HOME
  }
  if (!s) return HOME
  if (s === 'starred') return { kind: 'starred' }
  if (s === 'stats') return { kind: 'stats' }
  if (s.startsWith('c/')) {
    const code = s.slice(2)
    return CODE_RE.test(code) ? { kind: 'category', code } : HOME
  }
  if (s.includes('/')) return HOME
  return { kind: 'term', id: s }
}

export function toHash(r: Route): string {
  switch (r.kind) {
    case 'home':
      return '#/'
    case 'category':
      return `#c/${r.code}`
    case 'term':
      return `#${encodeURIComponent(r.id)}`
    case 'starred':
      return '#starred'
    case 'stats':
      return '#stats'
  }
}

export function sameRoute(a: Route, b: Route): boolean {
  return toHash(a) === toHash(b)
}
