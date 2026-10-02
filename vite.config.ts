import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages 는 /<repo>/ 아래에 배포되므로 CI 가 BASE_PATH 를 넣는다. 로컬은 '/'.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // 새 버전은 UpdatePrompt 가 안내하고 사용자가 새로고침
      includeAssets: ['icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Devpedia — IT 용어 사전',
        short_name: 'Devpedia',
        description: '카테고리별 IT 용어 사전 — 한 줄 정의, 비유, 예시, 관련 용어로 10초 안에 이해하기',
        lang: 'ko',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#0e0f11',
        theme_color: '#0e0f11',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // terms.json 까지 프리캐시해 오프라인에서도 사전 전체가 열린다 (스펙 F-09).
        // 웹폰트(Pretendard 92조각, 3MB)는 프리캐시하지 않고 처음 쓸 때 캐시한다 — 첫 설치를 가볍게.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,json,webmanifest}'],
        globIgnores: ['**/*.woff2'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.woff2'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'devpedia-fonts',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: { port: 5173 },
  build: { sourcemap: false, target: 'es2022' },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.ts'],
  },
})
