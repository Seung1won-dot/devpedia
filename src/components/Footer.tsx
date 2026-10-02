import { toHash } from '../lib/route'
import { APP_NAME, REPO_URL } from '../config'
import { Icon } from './Icon'

export function Footer({ generatedAt }: { generatedAt: string | null }) {
  const built = generatedAt ? new Date(generatedAt) : null
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="brand__mark brand__mark--sm" aria-hidden="true">D</span>
          <span>{APP_NAME} — 카테고리별 IT 용어 사전</span>
        </div>
        <ul className="footer__links">
          <li>
            <a href={toHash({ kind: 'stats' })}>통계</a>
          </li>
          {REPO_URL && (
            <li>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={14} /> GitHub
              </a>
            </li>
          )}
          <li>
            <span>코드 MIT · 콘텐츠 CC BY 4.0</span>
          </li>
          {built && !Number.isNaN(built.getTime()) && (
            <li>
              <span>
                빌드 <time dateTime={generatedAt!}>{built.toLocaleDateString('ko-KR')}</time>
              </span>
            </li>
          )}
        </ul>
      </div>
    </footer>
  )
}
