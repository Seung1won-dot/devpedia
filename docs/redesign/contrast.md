# 디자인 토큰 대비 측정 (WCAG 2.x)

`src/styles/tokens.css` 의 텍스트 조합. 반투명 글자색(`--text-2`, `--text-3`)과 반투명 배경(`--accent-soft`, `--mark-bg`)은 해당 면 위에 합성한 값으로 계산했다. 난이도 막대(`--meter-on`)는 비텍스트 기준 3.0.

- 2026-10-11 오렌지 팔레트(`#ff8e20` / 라이트 `#a34400`)로 교체하며 다시 측정. 계산 스크립트는 WCAG 2.x 상대 휘도 공식 그대로.
- 이전(앰버 `#f2b84b`) 측정값은 git 이력(2026-10-03)에 있다.

| 테마 | 글자 | 배경 | 대비 | 기준 | 결과 |
| :-- | :-- | :-- | --: | :-- | :-- |
| dark | `--text` | `--bg` | 19.90 | AA 4.5 | AAA |
| dark | `--text` | `--surface-1` | 18.56 | AA 4.5 | AAA |
| dark | `--text` | `--surface-2` | 17.56 | AA 4.5 | AAA |
| dark | `--text` | `--surface-3` | 16.06 | AA 4.5 | AAA |
| dark | `--text-2` | `--bg` | 10.26 | AA 4.5 | AAA |
| dark | `--text-2` | `--surface-1` | 9.88 | AA 4.5 | AAA |
| dark | `--text-2` | `--surface-2` | 9.55 | AA 4.5 | AAA |
| dark | `--text-2` | `--surface-3` | 8.93 | AA 4.5 | AAA |
| dark | `--text-3` | `--bg` | 6.48 | AA 4.5 | AA |
| dark | `--text-3` | `--surface-1` | 6.36 | AA 4.5 | AA |
| dark | `--text-3` | `--surface-2` | 6.24 | AA 4.5 | AA |
| dark | `--text-3` | `--surface-3` | 5.93 | AA 4.5 | AA |
| dark | `--accent` | `--bg` | 8.66 | AA 4.5 | AAA |
| dark | `--accent` | `--surface-1` | 8.08 | AA 4.5 | AAA |
| dark | `--accent` | `--surface-2` | 7.64 | AA 4.5 | AAA |
| dark | `--accent` | `--surface-3` | 6.99 | AA 4.5 | AA |
| dark | `--accent` | `--accent-soft on --surface-1` | 6.98 | AA 4.5 | AA |
| dark | `--on-accent` | `--accent` | 8.16 | AA 4.5 | AAA |
| dark | `--mark-text` | `--mark-bg on --surface-1` | 8.99 | AA 4.5 | AAA |
| dark | `--text` | `--accent-soft on --surface-1` | 16.03 | AA 4.5 | AAA |
| dark | `--text` | `--mark-bg on --surface-1` | 11.93 | AA 4.5 | AAA |
| dark | `--meter-on` | `--surface-1` | 13.28 | AA 비텍스트 3.0 | AAA |
| dark | `--meter-on` | `--surface-2` | 12.57 | AA 비텍스트 3.0 | AAA |
| light | `--text` | `--bg` | 17.14 | AA 4.5 | AAA |
| light | `--text` | `--surface-1` | 17.90 | AA 4.5 | AAA |
| light | `--text` | `--surface-2` | 16.11 | AA 4.5 | AAA |
| light | `--text` | `--surface-3` | 14.72 | AA 4.5 | AAA |
| light | `--text-2` | `--bg` | 6.91 | AA 4.5 | AA |
| light | `--text-2` | `--surface-1` | 7.11 | AA 4.5 | AAA |
| light | `--text-2` | `--surface-2` | 6.71 | AA 4.5 | AA |
| light | `--text-2` | `--surface-3` | 6.42 | AA 4.5 | AA |
| light | `--text-3` | `--bg` | 5.66 | AA 4.5 | AA |
| light | `--text-3` | `--surface-1` | 5.74 | AA 4.5 | AA |
| light | `--text-3` | `--surface-2` | 5.49 | AA 4.5 | AA |
| light | `--text-3` | `--surface-3` | 5.32 | AA 4.5 | AA |
| light | `--accent` | `--bg` | 5.94 | AA 4.5 | AA |
| light | `--accent` | `--surface-1` | 6.21 | AA 4.5 | AA |
| light | `--accent` | `--surface-2` | 5.59 | AA 4.5 | AA |
| light | `--accent` | `--surface-3` | 5.10 | AA 4.5 | AA |
| light | `--accent` | `--accent-soft on --surface-1` | 5.60 | AA 4.5 | AA |
| light | `--on-accent` | `--accent` | 6.21 | AA 4.5 | AA |
| light | `--mark-text` | `--mark-bg on --surface-1` | 10.57 | AA 4.5 | AAA |
| light | `--text` | `--accent-soft on --surface-1` | 16.16 | AA 4.5 | AAA |
| light | `--text` | `--mark-bg on --surface-1` | 13.91 | AA 4.5 | AAA |
| light | `--meter-on` | `--surface-1` | 11.57 | AA 비텍스트 3.0 | AAA |
| light | `--meter-on` | `--surface-2` | 10.42 | AA 비텍스트 3.0 | AAA |

가장 낮은 값: 라이트 `--accent` on `--surface-3` 5.10, 라이트 `--text-3` on `--surface-3` 5.32 — 전부 AA(4.5) 이상. 다크는 최저가 `--text-3` on `--surface-3` 5.93.

라이트 테마에서 오렌지 원색(`#ff8e20`)은 흰 배경 대비 2.3:1 이라 글자색으로 쓸 수 없다. 그래서 라이트의 `--accent` 는 `#a34400` 으로 내렸고, 원색은 `--accent-soft`(배경 12%)와 `--mark-bg`(형광펜 30%)처럼 배경에만 남겼다.
