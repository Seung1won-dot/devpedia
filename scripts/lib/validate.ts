import type { RawTerm } from './parse'
import type { Taxonomy } from './taxonomy'
import { makeFrontmatterSchema, type Frontmatter } from './schema'

export const SECTION_NAMES = {
  definition: '한 줄 정의',
  analogy: '비유',
  example: '예시',
  confusions: '헷갈리기 쉬운 것',
} as const

/** 해시 라우트가 쓰는 예약어. 용어 id 로 쓸 수 없다. (카테고리 코드도 마찬가지) */
export const RESERVED_IDS = ['c', 'starred', 'stats', 'all']

export const DEFINITION_MAX_CHARS = 60
export const MIN_CARDS_PER_CATEGORY = 10
export const RELATED_RECOMMENDED_MIN = 3
export const RELATED_MAX = 7

export interface Issue {
  level: 'error' | 'warn'
  file: string
  id?: string
  message: string
}

export interface ValidatedTerm {
  file: string
  fm: Frontmatter
  sections: { definition: string; analogy: string; example: string; confusions: string | null }
}

export interface ValidationResult {
  ok: boolean
  issues: Issue[]
  terms: ValidatedTerm[]
}

/** `**굵게**`, `` `코드` ``, `[텍스트](url)` 같은 인라인 마크다운을 걷어낸 plain text */
export function stripInline(md: string): string {
  return md
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*|__|`/g, '')
    .trim()
}

/** 마침표·물음표·느낌표 뒤 공백 기준 문장 수 (한국어 문장 휴리스틱) */
export function sentenceCount(text: string): number {
  const t = text.trim()
  if (!t) return 0
  return t.split(/(?<=[.!?])\s+/).filter((s) => s.length > 0).length
}

/** 관계 통계: 평균 related 수, 고아(들어오는·나가는 링크 모두 0) 수, id별 역링크 목록 */
export function relationStats(terms: { id: string; related: string[] }[]) {
  const ids = new Set(terms.map((t) => t.id))
  const inbound = new Map<string, string[]>()
  for (const t of terms) inbound.set(t.id, [])
  for (const t of terms) {
    for (const r of t.related) if (ids.has(r)) inbound.get(r)!.push(t.id)
  }
  let orphanCount = 0
  let relatedTotal = 0
  for (const t of terms) {
    const out = t.related.filter((r) => ids.has(r)).length
    relatedTotal += out
    if (out === 0 && inbound.get(t.id)!.length === 0) orphanCount++
  }
  const avgRelated = terms.length ? Math.round((relatedTotal / terms.length) * 100) / 100 : 0
  for (const list of inbound.values()) list.sort()
  return { avgRelated, orphanCount, inbound }
}

export function validateTerms(raws: RawTerm[], taxonomy: Taxonomy, opts: { lenient?: boolean } = {}): ValidationResult {
  const issues: Issue[] = []
  const codes = taxonomy.categories.map((c) => c.code)
  const schema = makeFrontmatterSchema(codes, taxonomy.tags)
  const allowedSections = Object.values(SECTION_NAMES) as string[]
  const missingRelatedLevel: Issue['level'] = opts.lenient ? 'warn' : 'error'

  const terms: ValidatedTerm[] = []
  const byId = new Map<string, ValidatedTerm>()

  for (const raw of raws) {
    const err = (message: string, id?: string) => issues.push({ level: 'error', file: raw.file, id, message })
    const warn = (message: string, id?: string) => issues.push({ level: 'warn', file: raw.file, id, message })

    const parsed = schema.safeParse(raw.frontmatter)
    if (!parsed.success) {
      for (const i of parsed.error.issues) {
        const path = i.path.map(String).join('.')
        err(path ? `${path}: ${i.message}` : i.message)
      }
      continue
    }
    const fm = parsed.data
    const id = fm.id
    const isDraft = fm.status === 'draft'
    const strict = (message: string) => (isDraft ? warn(message, id) : err(message, id))

    for (const name of Object.keys(raw.sections)) {
      if (!allowedSections.includes(name)) err(`허용되지 않은 섹션 "## ${name}" (가능: ${allowedSections.join(' / ')})`, id)
    }

    if (raw.file !== '<memory>') {
      const expected = `terms/${fm.category}/${id}.md`
      const actual = raw.file.replace(/\\/g, '/').replace(/^\.\//, '')
      if (actual !== expected) err(`파일 경로가 ${expected} 와 다름 (실제: ${actual})`, id)
    }

    if (RESERVED_IDS.includes(id) || codes.includes(id)) err(`id "${id}" 는 예약어(라우트·카테고리 코드)라 쓸 수 없음`, id)

    if (byId.has(id)) {
      err(`중복 id "${id}" (먼저 나온 파일: ${byId.get(id)!.file})`, id)
      continue
    }

    const definition = raw.sections[SECTION_NAMES.definition] ?? ''
    const analogy = raw.sections[SECTION_NAMES.analogy] ?? ''
    const example = raw.sections[SECTION_NAMES.example] ?? ''
    const confusions = raw.sections[SECTION_NAMES.confusions] ?? null

    if (!definition) strict(`"## ${SECTION_NAMES.definition}" 섹션이 비어 있음`)
    if (!analogy) strict(`"## ${SECTION_NAMES.analogy}" 섹션이 비어 있음`)
    if (!example) strict(`"## ${SECTION_NAMES.example}" 섹션이 비어 있음`)

    if (definition) {
      const plain = stripInline(definition)
      if (/\n/.test(plain)) strict('한 줄 정의는 한 줄이어야 함 (줄바꿈 포함)')
      if (plain.length > DEFINITION_MAX_CHARS) strict(`한 줄 정의가 ${DEFINITION_MAX_CHARS}자를 넘음 (${plain.length}자)`)
      if (sentenceCount(plain) > 1) strict('한 줄 정의는 문장 하나여야 함 (마침표 하나)')
    }
    if (analogy && sentenceCount(stripInline(analogy)) > 2) warn('비유가 2문장을 넘음 (권장 2문장 이내)', id)

    if (fm.related.includes(id)) err('related 에 자기 자신이 들어 있음', id)
    const seenRel = new Set<string>()
    for (const r of fm.related) {
      if (seenRel.has(r)) err(`related 에 중복 id: ${r}`, id)
      seenRel.add(r)
    }

    const hasHangul = (s: string) => /[가-힣]/.test(s)
    if (!hasHangul(fm.term) && !fm.aliases.some(hasHangul)) warn('aliases 에 한글 표기가 없음 (한글 검색이 안 됨)', id)

    const term: ValidatedTerm = { file: raw.file, fm, sections: { definition, analogy, example, confusions } }
    byId.set(id, term)
    terms.push(term)
  }

  // ---- 카드 간 검사 ----
  for (const t of terms) {
    const id = t.fm.id
    const isDraft = t.fm.status === 'draft'
    for (const r of t.fm.related) {
      if (!byId.has(r)) issues.push({ level: missingRelatedLevel, file: t.file, id, message: `related 에 없는 id: ${r}` })
    }
    if (!isDraft && t.fm.related.length === 0) issues.push({ level: 'error', file: t.file, id, message: 'related 가 비어 있음 (3~5개 권장)' })
    else if (!isDraft && t.fm.related.length < RELATED_RECOMMENDED_MIN)
      issues.push({ level: 'warn', file: t.file, id, message: `related 가 ${RELATED_RECOMMENDED_MIN}개 미만 (권장 3~5개)` })
    if (t.fm.related.length > RELATED_MAX) issues.push({ level: 'warn', file: t.file, id, message: `related 가 ${RELATED_MAX}개를 넘음 (카테고리 전체를 나열하지 말 것)` })
  }

  const { inbound } = relationStats(terms.map((t) => ({ id: t.fm.id, related: t.fm.related })))
  for (const t of terms) {
    if (inbound.get(t.fm.id)!.length === 0)
      issues.push({ level: 'warn', file: t.file, id: t.fm.id, message: '역링크 없음 — 어떤 카드도 이 용어를 related 에 넣지 않음' })
  }

  for (const c of taxonomy.categories) {
    const n = terms.filter((t) => t.fm.category === c.code).length
    if (n < MIN_CARDS_PER_CATEGORY)
      issues.push({ level: 'warn', file: `terms/${c.code}/`, message: `카테고리 ${c.code} 카드가 ${MIN_CARDS_PER_CATEGORY}개 미만 (${n}개)` })
  }

  return { ok: !issues.some((i) => i.level === 'error'), issues, terms }
}

const useColor = Boolean(process.stdout.isTTY) && !process.env.NO_COLOR
const paint = (code: string, s: string) => (useColor ? `\u001b[${code}m${s}\u001b[0m` : s)

export function formatIssues(issues: Issue[]): string {
  const order = { error: 0, warn: 1 }
  return [...issues]
    .sort((a, b) => order[a.level] - order[b.level] || a.file.localeCompare(b.file))
    .map((i) => `${i.level === 'error' ? paint('31', 'ERROR') : paint('33', 'WARN ')} ${i.file}${i.id ? ` [${i.id}]` : ''}  ${i.message}`)
    .join('\n')
}

export function summarize(terms: ValidatedTerm[], taxonomy: Taxonomy): string {
  const lines: string[] = []
  const counts = new Map(taxonomy.categories.map((c) => [c.code, 0]))
  for (const t of terms) counts.set(t.fm.category, (counts.get(t.fm.category) ?? 0) + 1)
  for (const c of taxonomy.categories) {
    const n = counts.get(c.code) ?? 0
    const mark = n >= MIN_CARDS_PER_CATEGORY ? paint('32', '✓') : paint('33', '·')
    lines.push(`  ${mark} ${c.icon} ${c.name.padEnd(18, ' ')} ${String(n).padStart(3)}`)
  }
  const covered = [...counts.values()].filter((n) => n >= MIN_CARDS_PER_CATEGORY).length
  const { avgRelated, orphanCount } = relationStats(terms.map((t) => ({ id: t.fm.id, related: t.fm.related })))
  const byStatus = { draft: 0, review: 0, published: 0 }
  for (const t of terms) byStatus[t.fm.status]++
  lines.push('')
  lines.push(`  K1 용어 수         ${terms.length}  (draft ${byStatus.draft} / review ${byStatus.review} / published ${byStatus.published})`)
  lines.push(`  K2 카테고리 커버   ${covered}/${taxonomy.categories.length} 카테고리가 ${MIN_CARDS_PER_CATEGORY}개 이상`)
  lines.push(`  K7 관계 밀도       평균 related ${avgRelated} / 고아 ${orphanCount}`)
  return lines.join('\n')
}
