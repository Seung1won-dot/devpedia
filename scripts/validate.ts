// 용어 카드 검증 CLI.  npm run validate [-- --lenient]
//   --lenient : 존재하지 않는 related id 를 error 대신 warn 으로 (콘텐츠 작성 중 병렬 작업용)
import { join } from 'node:path'
import { loadTaxonomy } from './lib/taxonomy'
import { collectTermFiles } from './lib/files'
import { parseTermMarkdown } from './lib/parse'
import { validateTerms, formatIssues, summarize } from './lib/validate'

export function runValidation(root: string, lenient: boolean) {
  const taxonomy = loadTaxonomy(join(root, 'taxonomy'))
  const sources = collectTermFiles(root)
  const raws = sources.map((s) => parseTermMarkdown(s.source, s.file))
  const result = validateTerms(raws, taxonomy, { lenient })
  return { taxonomy, result, fileCount: sources.length }
}

const isMain = process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/validate.ts')
if (isMain) {
  const lenient = process.argv.includes('--lenient')
  const { taxonomy, result, fileCount } = runValidation(process.cwd(), lenient)
  const errors = result.issues.filter((i) => i.level === 'error').length
  const warns = result.issues.length - errors

  if (result.issues.length) console.log(formatIssues(result.issues) + '\n')
  console.log(summarize(result.terms, taxonomy))
  console.log(`\n파일 ${fileCount}개 검사 — error ${errors}, warn ${warns}${lenient ? ' (lenient)' : ''}`)
  if (!result.ok) {
    console.error('\n검증 실패: 위 ERROR 를 고치기 전에는 빌드되지 않습니다.')
    process.exit(1)
  }
}
