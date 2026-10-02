import { highlightSegments } from '../lib/highlight'

/** 검색어가 나타나는 구간을 <mark> 로 감싼다 */
export function Highlighted({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  return (
    <>
      {highlightSegments(text, query).map((s, i) => (s.hit ? <mark key={i}>{s.text}</mark> : <span key={i}>{s.text}</span>))}
    </>
  )
}
