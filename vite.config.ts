import { defineConfig } from 'vitest/config'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages 는 /<repo>/ 아래에 배포되므로 CI 가 BASE_PATH 를 넣는다. 로컬은 '/'.
const base = process.env.BASE_PATH ?? '/'

/**
 * GitHub Pages 는 없는 경로(/devpedia/t/ssh 처럼 해시 없이 붙여 넣은 주소, 오타)에 404.html 을 준다.
 * 앱은 해시 라우팅이므로 경로를 해시로 옮겨 앱 안의 화면(용어·분야·찾을 수 없음)으로 보낸다.
 */
function pagesFallback(basePath: string): Plugin {
  const html = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Devpedia — IT 용어 사전</title>
    <script>
      ;(function () {
        var base = ${JSON.stringify(basePath)}
        var path = location.pathname
        var rest = path.indexOf(base) === 0 ? path.slice(base.length) : path.replace(/^\\/+/, '')
        rest = rest.replace(/\\/+$/, '').replace(/(^|\\/)index\\.html$/, '')
        var hash = location.hash || (rest ? '#/' + rest : '')
        location.replace(base + hash)
      })()
    </script>
  </head>
  <body>
    <p><a href="${basePath}">Devpedia 첫 화면으로 이동</a></p>
  </body>
</html>
`
  return {
    name: 'devpedia-pages-404',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: '404.html', source: html })
    },
  }
}

export default defineConfig({
  base,
  plugins: [
    react(),
    pagesFallback(base),
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
        background_color: '#09090b', // tokens.css 다크 --bg 와 같게 (스플래시 → 첫 화면 색 튐 방지)
        theme_color: '#09090b',
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
        globIgnores: ['**/*.woff2', '404.html'],
        // 오프라인 대체(index.html)는 앱 루트에만. 다른 경로는 네트워크로 보내 Pages 의 404.html 이 해시 주소로 옮기게 한다.
        navigateFallbackAllowlist: [new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(index\\.html)?(\\?.*)?$`)],
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
