import type { RefObject } from 'react'
import type { ThemePref } from '../lib/theme'
import { toHash } from '../lib/route'
import { APP_NAME } from '../config'
import { Icon } from './Icon'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'

interface Props {
  query: string
  onQueryChange: (q: string) => void
  searchRef: RefObject<HTMLInputElement | null>
  resultCount: number | null
  themePref: ThemePref
  onCycleTheme: () => void
  statsActive: boolean
}

export function Header({ query, onQueryChange, searchRef, resultCount, themePref, onCycleTheme, statsActive }: Props) {
  return (
    <header className="header">
      <a className="brand" href={toHash({ kind: 'home' })} aria-label={`${APP_NAME} 홈`}>
        <span className="brand__mark" aria-hidden="true">D</span>
        <span className="brand__name">{APP_NAME}</span>
      </a>
      <SearchBar value={query} onChange={onQueryChange} inputRef={searchRef} resultCount={resultCount} />
      <nav className="header__actions" aria-label="도구">
        <a
          className="icon-btn"
          href={toHash({ kind: 'stats' })}
          aria-label="통계"
          title="통계"
          aria-current={statsActive ? 'page' : undefined}
        >
          <Icon name="chart" size={18} />
        </a>
        <ThemeToggle pref={themePref} onCycle={onCycleTheme} />
      </nav>
    </header>
  )
}
