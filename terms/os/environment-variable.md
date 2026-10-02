---
id: environment-variable
term: 환경변수
aliases:
  - Environment Variable
  - 환경 변수
  - env
  - .env
category: os
tags:
  - 셸
  - 리눅스
  - 시크릿
  - 연구실
level: 1
kind: concept
related:
  - shell
  - secrets-management
  - docker-compose
  - secret-leak
  - process
  - dotfiles
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

프로그램이 실행될 때 **바깥(셸·OS)에서 넘겨받는 이름=값 설정**.

## 비유

출근할 때 받는 **오늘의 근무 메모**. "오늘 창구는 3번, 금고 비밀번호는 1234" 처럼, 프로그램 코드는 그대로 두고 메모만 바꿔서 다른 환경에서 똑같이 돌린다.

## 예시

```bash
export OLLAMA_HOST=0.0.0.0:11434   # 이 셸과 자식 프로세스에만 적용
echo $OLLAMA_HOST
env | grep -i supabase             # 현재 설정된 환경변수 훑기
```

```bash
# .env — 코드가 아닌 설정. .gitignore 에 반드시 넣는다
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

```ts
// Ender Chest (Vite): VITE_ 접두사가 붙은 것만 브라우저 번들에 들어간다
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)
```

Docker Compose 는 같은 폴더의 `.env` 를 자동으로 읽고, GitHub Actions 는 Settings → Secrets 에 넣은 값을 `${{ secrets.NAME }}` 로 환경변수처럼 꺼낸다.

## 헷갈리기 쉬운 것

- **셸 변수 vs 환경변수**: `A=1` 은 이 셸 안에서만, `export A=1` 을 해야 자식 프로세스(파이썬 등)까지 전달된다.
- **시크릿**은 환경변수에 담는 '내용' 중 비밀인 것. 환경변수 = 그릇, 시크릿 = 그 안에 든 비밀번호·API 키.
