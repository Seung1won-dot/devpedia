// terms/**/*.md → public/terms.json.  npm run build:terms [-- --lenient]
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

const bundle = buildBundle(result.terms, taxonomy)
const json = JSON.stringify(bundle)
mkdirSync(join(root, 'public'), { recursive: true })
writeFileSync(join(root, 'public', 'terms.json'), json)
console.log(`public/terms.json 생성 — 용어 ${bundle.terms.length}개, ${(Buffer.byteLength(json) / 1024).toFixed(1)} KB`)
