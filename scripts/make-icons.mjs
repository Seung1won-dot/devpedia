// public/icon.svg → PWA 용 PNG 아이콘.  npm run icons
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'

const svg = readFileSync('public/icon.svg', 'utf8')
mkdirSync('public/icons', { recursive: true })

function render(size, { padding = 0, background = null } = {}) {
  const inner = Math.round(size * (1 - padding * 2))
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: inner } }).render().asPng()
  if (!padding) return png
  // maskable: 안전 영역(중앙 80%) 안에 아이콘을 두고 배경색으로 채운다
  const frame = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" fill="${background}"/>
    <image href="data:image/png;base64,${Buffer.from(png).toString('base64')}" x="${(size - inner) / 2}" y="${(size - inner) / 2}" width="${inner}" height="${inner}"/>
  </svg>`
  return new Resvg(frame, { fitTo: { mode: 'width', value: size } }).render().asPng()
}

const out = {
  'public/icons/icon-192.png': render(192),
  'public/icons/icon-512.png': render(512),
  'public/icons/icon-maskable-512.png': render(512, { padding: 0.1, background: '#141419' }),
  'public/icons/apple-touch-icon.png': render(180),
}
for (const [file, png] of Object.entries(out)) {
  writeFileSync(file, png)
  console.log(`${file}  ${(png.length / 1024).toFixed(1)} KB`)
}
