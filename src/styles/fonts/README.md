# 웹폰트 (self-host)

| 폰트 | 버전 | 출처 | 라이선스 |
| :-- | :-- | :-- | :-- |
| Pretendard Variable — 동적 서브셋 92조각 | 1.3.9 | npm `pretendard` (`dist/web/variable/woff2-dynamic-subset`) | SIL OFL 1.1 (`pretendard.css` 머리말) |
| JetBrains Mono Variable — latin 서브셋 | 5.3.0 | npm `@fontsource-variable/jetbrains-mono` | SIL OFL 1.1 (`jetbrains-mono/OFL.txt`) |

패키지를 의존성으로 두지 않고 파일만 복사했다. 조각마다 `unicode-range` 가 있어서 브라우저는 화면에 실제로 나온 글자의 조각만 받는다.
서비스 워커는 이 파일들을 프리캐시하지 않고(첫 설치가 3MB 무거워지므로) 처음 쓸 때 런타임 캐시에 넣는다 — `vite.config.ts` 참고.
