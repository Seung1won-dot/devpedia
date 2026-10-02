# LLM 초안 프롬프트 (스펙 9-3)

낯선 용어는 연구실 Qwen(또는 다른 LLM)에 아래 프롬프트를 주고 초안을 받는다.
**초안은 반드시 내가 읽고 고친 뒤 `status: review` 로 커밋한다.** 그대로 발행하지 않는 것이 규칙 — 고치는 과정이 학습이다.

`{existing_ids}` 는 `npm run validate` 출력이나 `docs/seed-terms.md` 의 id 목록으로, `{allowed_tags}` 는 `taxonomy/tags.yml` 로 채운다.

---

```
너는 컴퓨터공학 3학년에게 IT 용어를 설명하는 조교다.
아래 템플릿과 규칙에 맞춰 "{용어}" 카드 초안을 Markdown 으로 써라.

규칙:
- 한 줄 정의는 60자 이내, 문장 하나, 마침표로 끝난다. 핵심어는 **굵게**.
- 비유는 일상 사물로 2문장 이내. 비전공자도 이해할 것.
- 예시는 실제 명령어/코드(코드 펜스 + 언어 태그) 또는 실제 문장. 가능하면 연구실 맥락(Proxmox VM, Caddy, Docker Compose, 로컬 Qwen, GPU 서버).
- 관련 용어 id 는 이 목록에서만 3~5개 고른다: {existing_ids}
- tags 는 이 목록에서만 1~3개: {allowed_tags}
- 헷갈리기 쉬운 것은 비슷한 용어 1~2개와의 차이만 불릿으로.
- 역사·연도로 시작하지 않는다. 위키백과 문장을 옮기지 않는다.
- 확신 없는 내용은 [확인 필요] 라고 표시한다.
- kind 는 concept(개념) / tool(도구) / protocol(프로토콜·표준) / pattern(패턴) / metric(지표) / regulation(규제·인증) 중 하나.
- status 는 review 로 둔다.

템플릿:
---
id: {id}
term: {용어}
aliases: [영문 풀네임, 한글 표기, 흔한 별칭]
category: {category}
tags: []
level: 1
kind: concept
related: []
status: review
created: {오늘}
updated: {오늘}
---

## 한 줄 정의

## 비유

## 예시

## 헷갈리기 쉬운 것
```

---

## 받은 초안 검토 순서

1. `terms/<category>/<id>.md` 로 저장
2. `npm run validate` — 60자·문장 수·related·tags 오류를 잡아준다
3. 스펙 10-2 체크리스트(CONTRIBUTING.md)로 자기 검토 → 틀린 곳 고치기
4. 예시가 실제로 돌아가는지 한 번 실행
5. `status: published` 로 바꾸고 `term(<category>): add <id>` 로 커밋
