import { marked } from 'marked'

// 빌드 시 한 번만 렌더한다. 런타임에는 markdown 파서가 없다. (스펙 11장)
marked.use({ gfm: true, breaks: false, async: false })

/** `<p>` 로 감싸지 않는 인라인 렌더 (한 줄 정의용) */
export function renderInline(md: string): string {
  return (marked.parseInline(md.trim()) as string).trim()
}

/** 블록 렌더 (비유·예시·헷갈리기 쉬운 것) */
export function renderBlock(md: string): string {
  return (marked.parse(md.trim()) as string).trim()
}

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }

function decodeEntities(s: string): string {
  return s.replace(/&(amp|lt|gt|quot|#39);/g, (m) => ENTITIES[m] ?? m)
}

/** 마크다운 → 검색용 plain text (태그 제거, 엔티티 복원, 공백 정리) */
export function toPlainText(md: string): string {
  const html = renderBlock(md)
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}
