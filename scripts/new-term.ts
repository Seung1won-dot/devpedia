// 새 카드 스캐폴드.  npm run new -- <category> <id> "<표시 이름>"
//   예: npm run new -- infra ssh "SSH"
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadTaxonomy } from './lib/taxonomy'
import { ID_RE } from './lib/schema'
import { RESERVED_IDS } from './lib/validate'

const [category, id, term] = process.argv.slice(2)
const root = process.cwd()
const taxonomy = loadTaxonomy(join(root, 'taxonomy'))
const codes = taxonomy.categories.map((c) => c.code)

function fail(msg: string): never {
  console.error(`오류: ${msg}\n사용법: npm run new -- <category> <id> "<표시 이름>"\n카테고리: ${codes.join(' ')}`)
  process.exit(1)
}

if (!category || !id || !term) fail('인자 3개가 필요합니다')
if (!codes.includes(category)) fail(`알 수 없는 카테고리 "${category}"`)
if (!ID_RE.test(id)) fail(`id 는 영문 소문자·숫자·하이픈만: "${id}"`)
if (RESERVED_IDS.includes(id) || codes.includes(id)) fail(`"${id}" 는 예약어입니다`)

const file = join(root, 'terms', category, `${id}.md`)
if (existsSync(file)) fail(`이미 있습니다: terms/${category}/${id}.md`)

const d = new Date()
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const template = `---
id: ${id}
term: ${term}
aliases: [${term}]
category: ${category}
tags: []
level: 1
related: []
see_also: []
status: draft
created: ${today}
updated: ${today}
---

## 한 줄 정의

<!-- 60자 이내, 문장 하나. 핵심어는 **굵게** -->

## 비유

<!-- 일상 사물로 2문장 이내 -->

## 예시

<!-- 실제로 돌아가는 명령/코드(펜스 + 언어) 또는 실제 문장. 가능하면 내 환경 맥락 -->

## 헷갈리기 쉬운 것

<!-- 비슷한 용어 1~2개와의 차이. 없으면 이 섹션을 지워도 됨 -->
`

mkdirSync(join(root, 'terms', category), { recursive: true })
writeFileSync(file, template)
console.log(`생성: terms/${category}/${id}.md  (status: draft — 채운 뒤 review/published 로 바꾸세요)`)
