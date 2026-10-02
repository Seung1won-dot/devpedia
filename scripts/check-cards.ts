// 카드 몇 장만 골라 검증 결과를 본다.  npm run check:cards -- terms/os/daemon.md terms/os/symlink.md
//   전체 저장소를 lenient 로 검증한 뒤(related 가 가리키는 id 가 실제로 있는지 보려면 전체가 필요하다)
//   인자로 준 파일의 이슈만 출력한다. 여러 장을 병렬로 쓰는 중에 내 카드만 확인할 때 쓴다.
import { runValidation } from './validate'
import { formatIssues } from './lib/validate'

const files = process.argv.slice(2).map((f) => f.replace(/\\/g, '/').replace(/^\.\//, ''))
if (files.length === 0) {
  console.error('사용법: npm run check:cards -- terms/<category>/<id>.md [...]')
  process.exit(2)
}

const { result } = runValidation(process.cwd(), true)
const wanted = new Set(files)
const mine = result.issues.filter((i) => wanted.has(i.file.replace(/\\/g, '/')))
const found = new Set(result.terms.map((t) => t.file.replace(/\\/g, '/')))
for (const f of files) {
  if (!found.has(f) && !mine.some((i) => i.file.replace(/\\/g, '/') === f)) console.log(`WARN  ${f}  파일을 읽지 못했거나 frontmatter 파싱 실패`)
}

const errors = mine.filter((i) => i.level === 'error').length
if (mine.length) console.log(formatIssues(mine))
console.log(`\n${files.length}개 파일 — error ${errors}, warn ${mine.length - errors}`)
process.exit(errors ? 1 : 0)
