import type { RefObject } from 'react'
import { Icon } from './Icon'

interface Props {
  value: string
  onChange: (v: string) => void
  inputRef: RefObject<HTMLInputElement | null>
  resultCount: number | null
}

export function SearchBar({ value, onChange, inputRef, resultCount }: Props) {
  return (
    <div className="search">
      <Icon name="search" className="search__icon" size={18} />
      <input
        ref={inputRef}
        type="search"
        role="searchbox"
        className="search__input"
        placeholder="용어 검색 — 한글·영문·약어·초성 (ㄹㅂㅅ)"
        aria-label="용어 검색"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value ? (
        <span className="search__side">
          {resultCount !== null && <span className="search__count">{resultCount}개</span>}
          <button type="button" className="search__clear" aria-label="검색어 지우기" onClick={() => onChange('')}>
            <Icon name="x" size={16} />
          </button>
        </span>
      ) : (
        <kbd className="search__kbd" aria-hidden="true">/</kbd>
      )}
    </div>
  )
}
