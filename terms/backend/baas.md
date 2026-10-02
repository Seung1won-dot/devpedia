---
id: baas
term: BaaS(Supabase/Firebase)
aliases:
  - Backend as a Service
  - 바스
  - 서비스형 백엔드
  - 수파베이스
category: backend
tags:
  - 클라우드
  - 인증
  - 아키텍처
level: 1
kind: tool
related:
  - serverless
  - rls
  - authentication-authorization
  - rest
  - object-storage
see_also:
  - https://supabase.com/docs
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

**인증·DB·파일 저장 같은 백엔드를 완제품으로 빌려** 쓰는 서비스.

## 비유

집을 직접 짓는 대신 **가구·전기·수도가 다 들어 있는 오피스텔에 입주**하는 것. 벽지(화면)만 내가 고르면 오늘 바로 살 수 있지만, 구조를 바꾸긴 어렵다.

## 예시

Ender Chest 는 백엔드 서버 코드 없이 Supabase 만으로 돌아간다:

```ts
import { createClient } from "@supabase/supabase-js"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

await supabase.auth.signInWithPassword({ email, password })   // 인증
const { data } = await supabase.from("items").select("*")     // DB (자동 REST)
await supabase.storage.from("files").upload("a.pdf", file)    // 파일 저장
```

브라우저가 DB 를 직접 부르는데도 안전한 이유는 **RLS** — 테이블마다 "누가 어떤 행을 볼 수 있나"를 DB 안에서 정해 두기 때문이다. 복잡한 로직은 Edge Function 으로 붙인다. Supabase 는 PostgreSQL 기반이라 SQL 을 그대로 쓰고 Docker 로 자체 호스팅도 된다 — 연구실 Proxmox 에 올릴 수 있는 이유. Firebase 는 Google 의 같은 부류 서비스(DB 는 NoSQL 인 Firestore).

## 헷갈리기 쉬운 것

- **서버리스 함수**는 "내 코드"를 올리는 곳, BaaS 는 "코드 없이" 쓰는 완제품 기능. BaaS 위에 서버리스 함수를 얹는 게 보통.
- **IaaS(VM 빌리기) / PaaS(앱 올리기)** 와 나란히 놓이는 말. VM 은 전부 내가 깔아야 하고, PaaS(Vercel 등)는 내 서버 코드를 올리고, BaaS 는 서버 코드 자체가 필요 없다.
