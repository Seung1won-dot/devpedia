import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// GitHub Pages 는 /<repo>/ 아래에 배포되므로 CI 가 BASE_PATH 를 넣는다. 로컬은 '/'.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: { port: 5173 },
  build: { sourcemap: false, target: 'es2022' },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.ts'],
  },
})
