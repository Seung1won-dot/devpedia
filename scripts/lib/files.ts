import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import fg from 'fast-glob'

export interface TermSource {
  /** `terms/<category>/<id>.md` (슬래시 통일) */
  file: string
  source: string
}

/** terms/ 아래 모든 카드를 읽는다. `_` 로 시작하는 파일(_inbox.md 등)은 제외. */
export function collectTermFiles(root: string): TermSource[] {
  const files = fg.sync('terms/**/*.md', { cwd: root, ignore: ['**/_*'], onlyFiles: true }).sort()
  return files.map((file) => ({ file: file.replace(/\\/g, '/'), source: readFileSync(join(root, file), 'utf8') }))
}
