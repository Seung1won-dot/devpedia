import type { ThemePref } from '../lib/theme'
import { Icon, type IconName } from './Icon'

const LABEL: Record<ThemePref, string> = { system: '시스템', light: '라이트', dark: '다크' }
const ICON: Record<ThemePref, IconName> = { system: 'monitor', light: 'sun', dark: 'moon' }

interface Props {
  pref: ThemePref
  onCycle: () => void
}

/** 시스템 → 라이트 → 다크 순환. 현재 상태를 글자로도 보인다. */
export function ThemeToggle({ pref, onCycle }: Props) {
  return (
    <button
      type="button"
      className="hbtn"
      onClick={onCycle}
      aria-label={`테마: ${LABEL[pref]} (누르면 바뀜)`}
      title={`테마: ${LABEL[pref]} — 누르면 바뀜`}
    >
      <Icon name={ICON[pref]} size={16} />
      <span className="hbtn__label" aria-hidden="true">{LABEL[pref]}</span>
    </button>
  )
}
