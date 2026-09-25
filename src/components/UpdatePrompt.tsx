import { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Icon } from './Icon'

const CHECK_INTERVAL_MS = 60 * 60 * 1000
const OFFLINE_TOAST_MS = 3000

/** 서비스 워커 상태 토스트: 새 버전이면 새로고침 제안, 첫 설치 후엔 오프라인 준비 알림. (스펙 F-09) */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (registration) window.setInterval(() => registration.update(), CHECK_INTERVAL_MS)
    },
  })

  useEffect(() => {
    if (!offlineReady) return
    const t = window.setTimeout(() => setOfflineReady(false), OFFLINE_TOAST_MS)
    return () => window.clearTimeout(t)
  }, [offlineReady, setOfflineReady])

  if (!needRefresh && !offlineReady) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      {needRefresh ? (
        <>
          <span>새 버전이 있어요.</span>
          <button type="button" className="btn btn--primary" onClick={() => updateServiceWorker(true)}>
            새로고침
          </button>
          <button type="button" className="icon-btn" aria-label="닫기" onClick={() => setNeedRefresh(false)}>
            <Icon name="x" size={16} />
          </button>
        </>
      ) : (
        <>
          <span>오프라인에서도 열 수 있어요.</span>
          <button type="button" className="icon-btn" aria-label="닫기" onClick={() => setOfflineReady(false)}>
            <Icon name="x" size={16} />
          </button>
        </>
      )}
    </div>
  )
}
