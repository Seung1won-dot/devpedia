import { z } from 'zod'

/** URL 슬러그 규칙: 영문 소문자·숫자·하이픈. 변경 금지(링크가 깨짐). */
export const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** 카드 종류. 도구 카드는 유행이 지나면 교체되고 개념 카드는 안 그렇다 — 관리 단위가 달라서 구분한다. */
export const KINDS = ['concept', 'tool', 'protocol', 'pattern', 'metric', 'regulation'] as const

// js-yaml 은 따옴표 없는 2026-09-25 를 Date 로 파싱하므로 문자열로 되돌린다.
const dateish = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 함'),
)

export function makeFrontmatterSchema(categoryCodes: string[], tags: string[]) {
  return z.strictObject({
    id: z.string().regex(ID_RE, 'id 는 영문 소문자·숫자·하이픈만 허용'),
    term: z.string().min(1, 'term 은 비울 수 없음'),
    aliases: z.array(z.string().min(1)).min(1, 'aliases 는 1개 이상'),
    category: z.enum(categoryCodes as [string, ...string[]]),
    tags: z.array(z.enum(tags as [string, ...string[]])).default([]),
    level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    kind: z.enum(KINDS).default('concept'),
    related: z.array(z.string().regex(ID_RE, 'related 의 id 형식이 잘못됨')).default([]),
    see_also: z.array(z.url({ protocol: /^https?$/, error: 'see_also 는 http(s) URL 만 허용' })).default([]),
    status: z.enum(['draft', 'review', 'published']).default('draft'),
    created: dateish,
    updated: dateish.optional(),
  })
}

export type Frontmatter = z.infer<ReturnType<typeof makeFrontmatterSchema>>
