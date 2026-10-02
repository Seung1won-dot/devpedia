import type { Category } from '../types'
import type { ThemePref } from '../lib/theme'
import type { Route } from '../lib/route'
import { toHash } from '../lib/route'
import { APP_NAME } from '../config'
import { Icon } from './Icon'
import { ThemeToggle } from './ThemeToggle'
import { CategoryMenu } from './CategoryMenu'

interface Props {
  route: Route
  categories: Category[]
  counts: Record<string, number>
  starredCount: number
  onOpenSearch: () => void
  themePref: ThemePref
  onCycleTheme: () => void
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

export function Header({ route, categories, counts, starredCount, onOpenSearch, themePref, onCycleTheme }: Props) {
  const activeCode = route.kind === 'category' ? route.code : null
  return (
    <header className="header">
      <div className="header__inner">
        <a className="brand" href={toHash({ kind: 'home' })} aria-label={`${APP_NAME} 홈`}>
          <span className="brand__mark" aria-hidden="true">D</span>
          <span className="brand__name">{APP_NAME}</span>
        </a>

        <button type="button" className="hsearch" onClick={onOpenSearch} aria-haspopup="dialog" aria-label="용어 검색 열기">
          <Icon name="search" size={16} className="hsearch__icon" />
          <span className="hsearch__text">용어 검색</span>
          <span className="hsearch__keys" aria-hidden="true">
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd>K</kbd>
          </span>
        </button>

        <nav className="header__nav" aria-label="주 메뉴">
          {categories.length > 0 && <CategoryMenu categories={categories} counts={counts} activeCode={activeCode} />}
          <a
            className="hbtn"
            href={toHash({ kind: 'starred' })}
            aria-current={route.kind === 'starred' ? 'page' : undefined}
          >
            <Icon name={starredCount ? 'star-filled' : 'star'} size={16} />
            <span className="hbtn__label">별표</span>
            {starredCount > 0 && <span className="hbtn__count">{starredCount}</span>}
          </a>
          <a className="hbtn" href={toHash({ kind: 'stats' })} aria-current={route.kind === 'stats' ? 'page' : undefined}>
            <Icon name="chart" size={16} />
            <span className="hbtn__label">통계</span>
          </a>
          <ThemeToggle pref={themePref} onCycle={onCycleTheme} />
        </nav>
      </div>
    </header>
  )
}
