# 디자인 토큰 대비 측정 (WCAG 2.x)

`src/styles/tokens.css` 의 텍스트 조합. 반투명 배경은 `--surface-1` 위에 합성한 값으로 계산했다. 난이도 막대(`--meter-on`)는 비텍스트 기준 3.0.

| 테마 | 글자 | 배경 | 대비 | 기준 | 결과 |
| :-- | :-- | :-- | --: | :-- | :-- |
| dark | `--text` | `--bg` | 16.40 | AA 4.5 | AAA |
| dark | `--text` | `--surface-1` | 15.46 | AA 4.5 | AAA |
| dark | `--text` | `--surface-2` | 14.43 | AA 4.5 | AAA |
| dark | `--text` | `--surface-3` | 13.10 | AA 4.5 | AAA |
| dark | `--text-2` | `--bg` | 9.05 | AA 4.5 | AAA |
| dark | `--text-2` | `--surface-1` | 8.54 | AA 4.5 | AAA |
| dark | `--text-2` | `--surface-2` | 7.97 | AA 4.5 | AAA |
| dark | `--text-2` | `--surface-3` | 7.23 | AA 4.5 | AAA |
| dark | `--text-3` | `--bg` | 5.93 | AA 4.5 | AA |
| dark | `--text-3` | `--surface-1` | 5.59 | AA 4.5 | AA |
| dark | `--text-3` | `--surface-2` | 5.22 | AA 4.5 | AA |
| dark | `--text-3` | `--surface-3` | 4.73 | AA 4.5 | AA |
| dark | `--accent` | `--bg` | 10.71 | AA 4.5 | AAA |
| dark | `--accent` | `--surface-1` | 10.10 | AA 4.5 | AAA |
| dark | `--accent` | `--surface-2` | 9.43 | AA 4.5 | AAA |
| dark | `--accent` | `--surface-3` | 8.56 | AA 4.5 | AAA |
| dark | `--accent` | `--accent-soft on --surface-1` | 8.00 | AA 4.5 | AAA |
| dark | `--on-accent` | `--accent` | 10.21 | AA 4.5 | AAA |
| dark | `--mark-text` | `--mark-bg on --surface-1` | 9.11 | AA 4.5 | AAA |
| dark | `--text` | `--accent-soft on --surface-1` | 12.24 | AA 4.5 | AAA |
| dark | `--text` | `--mark-bg on --surface-1` | 9.54 | AA 4.5 | AAA |
| dark | `--meter-on` | `--surface-1` | 12.94 | AA 비텍스트 3.0 | AAA |
| dark | `--meter-on` | `--surface-2` | 12.08 | AA 비텍스트 3.0 | AAA |
| light | `--text` | `--bg` | 16.68 | AA 4.5 | AAA |
| light | `--text` | `--surface-1` | 17.44 | AA 4.5 | AAA |
| light | `--text` | `--surface-2` | 15.56 | AA 4.5 | AAA |
| light | `--text` | `--surface-3` | 14.23 | AA 4.5 | AAA |
| light | `--text-2` | `--bg` | 7.98 | AA 4.5 | AAA |
| light | `--text-2` | `--surface-1` | 8.35 | AA 4.5 | AAA |
| light | `--text-2` | `--surface-2` | 7.45 | AA 4.5 | AAA |
| light | `--text-2` | `--surface-3` | 6.81 | AA 4.5 | AA |
| light | `--text-3` | `--bg` | 5.58 | AA 4.5 | AA |
| light | `--text-3` | `--surface-1` | 5.83 | AA 4.5 | AA |
| light | `--text-3` | `--surface-2` | 5.20 | AA 4.5 | AA |
| light | `--text-3` | `--surface-3` | 4.76 | AA 4.5 | AA |
| light | `--accent` | `--bg` | 5.53 | AA 4.5 | AA |
| light | `--accent` | `--surface-1` | 5.78 | AA 4.5 | AA |
| light | `--accent` | `--surface-2` | 5.16 | AA 4.5 | AA |
| light | `--accent` | `--surface-3` | 4.72 | AA 4.5 | AA |
| light | `--accent` | `--accent-soft on --surface-1` | 5.12 | AA 4.5 | AA |
| light | `--on-accent` | `--accent` | 5.78 | AA 4.5 | AA |
| light | `--mark-text` | `--mark-bg on --surface-1` | 11.34 | AA 4.5 | AAA |
| light | `--text` | `--accent-soft on --surface-1` | 15.44 | AA 4.5 | AAA |
| light | `--text` | `--mark-bg on --surface-1` | 14.02 | AA 4.5 | AAA |
| light | `--meter-on` | `--surface-1` | 11.57 | AA 비텍스트 3.0 | AAA |
| light | `--meter-on` | `--surface-2` | 10.32 | AA 비텍스트 3.0 | AAA |


가장 낮은 값: 라이트 `--accent` on `--surface-3` 4.72, 다크 `--text-3` on `--surface-3` 4.73 — 둘 다 AA(4.5) 이상.
