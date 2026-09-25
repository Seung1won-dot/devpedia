// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'

const state = { needRefresh: false, offlineReady: false, update: vi.fn() }

vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: () => ({
    needRefresh: [state.needRefresh, vi.fn()],
    offlineReady: [state.offlineReady, vi.fn()],
    updateServiceWorker: state.update,
  }),
}))

import { UpdatePrompt } from './UpdatePrompt'

describe('UpdatePrompt', () => {
  afterEach(() => {
    cleanup()
    state.needRefresh = false
    state.offlineReady = false
    state.update.mockReset()
  })

  it('renders nothing when there is nothing to say', () => {
    render(<UpdatePrompt />)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('offers a refresh when a new version is waiting', () => {
    state.needRefresh = true
    render(<UpdatePrompt />)
    expect(screen.getByRole('status').textContent).toMatch(/새 버전/)
    fireEvent.click(screen.getByRole('button', { name: /새로고침/ }))
    expect(state.update).toHaveBeenCalledWith(true)
  })

  it('announces offline readiness', () => {
    state.offlineReady = true
    render(<UpdatePrompt />)
    expect(screen.getByRole('status').textContent).toMatch(/오프라인/)
  })
})
