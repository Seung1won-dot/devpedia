---
id: serverless
term: 서버리스/Edge Function
aliases:
  - Serverless
  - 서버리스
  - 엣지 펑션
  - FaaS
category: backend
tags:
  - 클라우드
  - 아키텍처
  - 배포
level: 2
related:
  - baas
  - endpoint
  - on-premise-vs-cloud
  - static-hosting
  - webhook
see_also:
  - https://supabase.com/docs/guides/functions
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

서버를 직접 두지 않고 **함수 단위로 올려 두면 요청 때만 실행**되는 방식.

## 비유

상주 직원 대신 **부르면 오는 심부름 대행**. 평소엔 아무도 없어 인건비(서버 비용)가 안 들고, 부를 때마다 와서 그 일만 하고 간다.

## 예시

Ender Chest 의 Supabase Edge Function — Slack 알림 하나 보내려고 서버를 켜 둘 필요가 없다:

```ts
// supabase/functions/notify-slack/index.ts (Deno)
Deno.serve(async (req) => {
  const { text } = await req.json()
  await fetch(Deno.env.get("SLACK_WEBHOOK_URL")!, {
    method: "POST",
    body: JSON.stringify({ text }),
  })
  return new Response("ok")
})
```

```bash
supabase functions deploy notify-slack
curl -X POST https://<ref>.supabase.co/functions/v1/notify-slack \
  -H "Authorization: Bearer <anon-key>" -d '{"text":"배포 완료"}'
```

"Edge" 는 이 함수가 사용자와 가까운 여러 지역 서버에서 돈다는 뜻. 대가로 (1) 첫 호출이 느릴 수 있고(콜드 스타트), (2) 실행 시간·메모리 제한이 있으며, (3) 파일·변수를 다음 호출까지 기억하지 못한다(상태는 DB/Redis 에).

## 헷갈리기 쉬운 것

- **서버가 없다는 뜻이 아니다** — 남(클라우드)이 서버를 관리해서 나는 함수만 신경 쓴다는 뜻. 연구실 Proxmox 에 FastAPI 를 직접 올리는 것과 반대 극단.
- **BaaS** 는 인증·DB·스토리지를 통째로 빌려 주는 것이고, 서버리스 함수는 그 위에 "내 코드 한 조각"을 얹는 자리. Supabase 는 둘 다 제공한다.
