import { useCallback, useMemo, useState } from 'react'
import type { Level } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { filterTerms, levelCounts, sortTerms, tagsIn, LEVEL_LABEL, type SortMode } from '../lib/terms'
import { groupByInitial } from '../lib/group'
import { SORT_KEY } from '../lib/storage'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Breadcrumb } from '../components/Breadcrumb'
import { FilterBar } from '../components/FilterBar'
import { TermCard } from '../components/TermCard'
import { PreviewPanel } from '../components/PreviewPanel'
import { EmptyState } from '../components/EmptyState'

const PREVIEW_MQ = '(min-width: 1280px)'

function loadSort(): SortMode {
  try {
    const v = localStorage.getItem(SORT_KEY)
    return v === 'level' || v === 'recent' || v === 'name' ? v : 'name'
  } catch {
    return 'name'
  }
}

function jumpTo(key: string) {
  const el = document.getElementById(`group-${key}`)
  if (!el) return
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export function CategoryPage({ ctx, code, preview }: { ctx: PageContext; code: string; preview?: string }) {
  const { data, navigate } = ctx
  const cat = data.categories.get(code)!
  const [level, setLevel] = useState<Level | null>(null)
  const [tag, setTag] = useState<string | null>(null)
  const [sort, setSortState] = useState<SortMode>(loadSort)
  const wide = useMediaQuery(PREVIEW_MQ)

  const setSort = (s: SortMode) => {
    setSortState(s)
    try {
      localStorage.setItem(SORT_KEY, s)
    } catch {
      /* ignore */
    }
  }

  const scoped = useMemo(() => data.bundle.terms.filter((t) => t.category === code), [data.bundle.terms, code])
  const counts = useMemo(() => levelCounts(scoped), [scoped])
  const tags = useMemo(() => tagsIn(scoped), [scoped])
  const filtered = useMemo(
    () => sortTerms(filterTerms(scoped, { levels: level ? new Set([level]) : undefined, tag }), sort),
    [scoped, level, tag, sort],
  )
  const groups = useMemo(() => (sort === 'name' ? groupByInitial(filtered) : null), [filtered, sort])

  const previewTerm = wide && preview ? data.byId.get(preview) : undefined
  const openPreview = useCallback(
    (id: string) => {
      navigate({ kind: 'category', code, preview: id }, { replace: Boolean(preview) })
      return true
    },
    [navigate, code, preview],
  )
  const closePreview = useCallback(() => navigate({ kind: 'category', code }, { replace: true }), [navigate, code])

  const card = (t: (typeof filtered)[number]) => (
    <li key={t.id}>
      <TermCard term={t} selected={previewTerm?.id === t.id} onPreview={wide ? openPreview : undefined} />
    </li>
  )

  return (
    <div className="container page">
      <Breadcrumb items={[{ label: '홈', href: toHash({ kind: 'home' }) }, { label: cat.name }]} />
      <header className="pagehead pagehead--cat">
        <h1 className="pagehead__title">
          <span className="pagehead__icon" aria-hidden="true">
            {cat.icon}
          </span>
          {cat.name}
        </h1>
        <p className="pagehead__desc">{cat.description}</p>
        <p className="pagehead__meta">
          {scoped.length}개 용어 · {LEVEL_LABEL[1]} {counts[1]} · {LEVEL_LABEL[2]} {counts[2]} · {LEVEL_LABEL[3]} {counts[3]}
        </p>
      </header>

      <FilterBar
        level={level}
        onLevel={setLevel}
        levelCounts={counts}
        total={scoped.length}
        tags={tags}
        tag={tag}
        onTag={setTag}
        sort={sort}
        onSort={setSort}
        resultCount={filtered.length}
        index={groups ? { keys: groups.map((g) => g.key), onJump: jumpTo } : undefined}
      />

      <div className={`catbody${previewTerm ? ' catbody--preview' : ''}`}>
        <div className="catbody__list" data-testid="term-grid">
          {filtered.length === 0 ? (
            <EmptyState
              icon="inbox"
              title="조건에 맞는 용어가 없어요"
              hint="난이도나 태그 필터를 풀어 보세요."
              action={
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setLevel(null)
                    setTag(null)
                  }}
                >
                  필터 초기화
                </button>
              }
            />
          ) : groups ? (
            groups.map((g) => (
              <section key={g.key} className="lettergroup" id={`group-${g.key}`} aria-labelledby={`gh-${g.key}`}>
                <h2 className="lettergroup__key" id={`gh-${g.key}`}>
                  {g.key}
                  <span className="lettergroup__count">{g.terms.length}</span>
                </h2>
                <ul className="grid grid--cards">{g.terms.map(card)}</ul>
              </section>
            ))
          ) : (
            <ul className="grid grid--cards">{filtered.map(card)}</ul>
          )}
        </div>
        {previewTerm && <PreviewPanel ctx={ctx} term={previewTerm} onClose={closePreview} />}
      </div>
    </div>
  )
}
