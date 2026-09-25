import type { ThemePref } from '../lib/theme'
import { Icon, type IconName } from './Icon'

const LABEL: Record<ThemePref, string> = { system: '시스템', light: '라이트', dark: '다크' }
const ICON: Record<ThemePref, IconName> = { system: 'monitor', light: 'sun', dark: 'moon' }

interface Props {
  pref: ThemePref
  onCycle: () => void
}

export function ThemeToggle({ pref, onCycle }: Props) {
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={onCycle}
      aria-label={`테마: ${LABEL[pref]}`}
      title={`테마: ${LABEL[pref]} (누르면 바뀜)`}
    >
      <Icon name={ICON[pref]} size={18} />
    </button>
  )
}
