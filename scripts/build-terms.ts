// terms/**/*.md → public/terms.json (인덱스) + public/terms-body.json (본문).  npm run build:terms [-- --lenient]
// 검증(validate)에 실패하면 JSON 을 쓰지 않고 exit 1 → 잘못된 카드는 배포되지 않는다. (스펙 8장 "검증이 곧 품질")
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { runValidation } from './validate'
import { buildBundle } from './lib/bundle'
import { formatIssues, summarize } from './lib/validate'

const lenient = process.argv.includes('--lenient')
const root = process.cwd()

const { taxonomy, result, fileCount } = runValidation(root, lenient)
const errors = result.issues.filter((i) => i.level === 'error').length
const warns = result.issues.length - errors

if (result.issues.length) console.log(formatIssues(result.issues) + '\n')
console.log(summarize(result.terms, taxonomy))
console.log(`\n파일 ${fileCount}개 검사 — error ${errors}, warn ${warns}${lenient ? ' (lenient)' : ''}`)

if (!result.ok) {
  console.error('\n검증 실패: public/terms.json 을 생성하지 않았습니다.')
  process.exit(1)
}

const { index, bodies } = buildBundle(result.terms, taxonomy)
mkdirSync(join(root, 'public'), { recursive: true })
const kb = (s: string) => (Buffer.byteLength(s) / 1024).toFixed(1)
const indexJson = JSON.stringify(index)
const bodyJson = JSON.stringify(bodies)
writeFileSync(join(root, 'public', 'terms.json'), indexJson)
writeFileSync(join(root, 'public', 'terms-body.json'), bodyJson)
console.log(`public/terms.json 생성 — 용어 ${index.terms.length}개, ${kb(indexJson)} KB (인덱스)`)
console.log(`public/terms-body.json 생성 — ${kb(bodyJson)} KB (본문 HTML + 검색 텍스트)`)
