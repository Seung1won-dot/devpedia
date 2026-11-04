# 카드 쓰는 법 · 분야 목록

[README](../README.md)에서 옮겨 온 카드 형식·검증 규칙·분야 표입니다. 작성 워크플로와 체크리스트는 [CONTRIBUTING.md](../CONTRIBUTING.md)에 있습니다.

## 용어 추가하기

용어 하나 = `terms/<category>/<id>.md` 하나. 세 가지 방법:

1. **스캐폴드** — `npm run new -- infra ssh "SSH"` → 생긴 파일의 4 섹션을 채운다.
2. **복사** — `terms/infra/reverse-proxy.md` 를 복사해 고친다 (스펙 부록 B 예시).
3. **LLM 초안** — [`docs/llm-draft-prompt.md`](llm-draft-prompt.md) 의 프롬프트로 초안을 받아 **반드시 읽고 고친 뒤** `status: review` 로. 초안 그대로 발행하지 않는 것이 규칙.

모르는 용어를 만난 순간에는 [`terms/_inbox.md`](../terms/_inbox.md) 에 한 줄만 적어 둔다(0초 규칙). 주 1회 10개씩 카드로 옮긴다.

## 카드 형식

```markdown
---
id: ssh                      # URL 슬러그. 영문 소문자·숫자·하이픈. 변경 금지
term: SSH                    # 표시 이름
aliases:                     # 검색용 별칭 — 한글 표기·풀네임 필수
  - Secure Shell
  - 시큐어 셸
category: infra              # 24개 코드 중 하나 (아래 표)
tags: [원격접속, 리눅스운영]   # taxonomy/tags.yml 에 있는 것만
level: 1                     # 1 기초 · 2 중급 · 3 심화
kind: protocol               # concept | tool | protocol | pattern | metric | regulation (기본 concept)
related: [port, firewall, public-key-cryptography, vpn, scp-rsync]  # 존재하는 id 만, 3~5개 권장
see_also:                    # 선택
  - https://www.openssh.com/manual.html
status: published            # draft | review | published
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의
60자 이내, 문장 하나. 핵심어는 **굵게**.

## 비유
일상 사물로 2문장 이내.

## 예시
실제로 돌아가는 명령·코드·문장. 가능하면 내 환경 맥락.

## 헷갈리기 쉬운 것
(선택) 비슷한 용어와의 차이.
```

| 규칙 | 어기면 |
| :-- | :-- |
| `id`·`term`·`aliases`·`category`·`level`·`created` 필수, 알 수 없는 키 금지 | 빌드 실패 |
| 파일 경로가 `terms/<category>/<id>.md` 와 일치 | 빌드 실패 |
| `tags` 는 `taxonomy/tags.yml` 에 정의된 것만 | 빌드 실패 |
| `related` 는 존재하는 id 만, 자기 자신·중복 금지 | 빌드 실패 |
| 본문에 raw HTML 태그·`javascript:` 링크 (코드 펜스 밖) | 빌드 실패 |
| 한 줄 정의 60자 이내(마크다운 기호 제외)·문장 하나 | review/published 는 실패, draft 는 경고 |
| `## 한 줄 정의` `## 비유` `## 예시` 필수, 그 외 섹션 금지 | review/published 는 실패, draft 는 경고 |
| `id` 가 `c` `starred` `stats` `all` 또는 카테고리 코드와 같음 | 빌드 실패 (해시 라우트 예약어) |
| related 3개 미만 / 역링크 없음 / 카테고리 10장 미만 / 비유 3문장 이상 / aliases 에 한글 없음 | 경고 |

`draft` 는 본문이 비어 있어도 커밋할 수 있다 — 완벽주의 금지. 다 채우면 `review` → 검토 후 `published`.

## 카테고리

| 그룹 | 코드 | 이름 | 다루는 것 |
| :-- | :-- | :-- | :-- |
| CS 기초 | `os` | 컴퓨터 구조 & 운영체제 | CPU·메모리·프로세스·파일시스템·리눅스 |
| | `network` | 네트워크 | IP·포트·TCP/HTTP·DNS·TLS·VPN |
| | `algo` | 자료구조 & 알고리즘 | 선형 구조·트리/그래프·정렬/탐색·복잡도·DP |
| | `theory` | 이산수학 & 계산 이론 | 논리·집합·증명·오토마타·P vs NP |
| | `math` | CS를 위한 수학 | 선형대수·미분·확률·정보 이론 |
| | `lang` | 프로그래밍 언어 & 패러다임 | 타입·OOP·함수형·메모리·비동기 |
| | `compiler` | 컴파일러 & 언어 구현 | 렉서·파서·AST·IR·링커·가상 머신 |
| 개발 | `frontend` | 프론트엔드 | HTML/CSS/JS·React·렌더링·PWA |
| | `mobile` | 모바일 앱 개발 | iOS·Android·크로스 플랫폼·스토어 배포·푸시 |
| | `backend` | 백엔드 & API | REST·인증/인가·세션·캐시·큐 |
| | `database` | 데이터베이스 | SQL·인덱스·트랜잭션·NoSQL·ORM |
| | `graphics` | 그래픽스 & 게임 | 셰이더·래스터화·게임 루프·엔진 |
| | `embedded` | 임베디드 & IoT | MCU·펌웨어·GPIO/UART/I2C·RTOS·MQTT |
| 시스템 · 운영 | `distributed` | 분산 시스템 | 합의(Raft)·일관성·쿼럼·분산 락 |
| | `infra` | 서버 & 인프라 & 클라우드 | Proxmox/VM·Docker·SSH·클라우드 |
| | `devops` | DevOps & 개발 도구 | Git·CI/CD·모니터링·크론 |
| | `security` | 보안 | 암호화·인증 공격·웹 취약점·키 관리 |
| 데이터 · AI | `ai` | AI / ML / LLM | ML 기초·LLM·RAG·에이전트/MCP·서빙 |
| | `data` | 데이터 엔지니어링 & 분석 | pandas·CSV/Parquet·ETL·결측치·통계 기초·시각화 |
| 도메인 · 협업 | `medical` | 의료 IT | HL7/FHIR/DICOM·EMR/PACS·규제·의료 AI |
| | `swe` | 소프트웨어 공학 & 협업 | 방법론·설계 원칙·테스트·문서화 |
| | `ux` | UX/UI 디자인 | 사용자 조사·와이어프레임·디자인 시스템·대비 |
| | `product` | IT 비즈니스 & 프로덕트 | 지표·A/B 테스트·퍼널·비즈니스 모델 |
| | `career` | 취업 준비 & 커리어 | 채용 과정·코딩테스트·면접·포트폴리오·자격증·로드맵 |

분야는 24개(카드 15장 이상 확실히 나올 때만 추가, `group` 으로 홈·메뉴에서 묶음), 소분류는 `tags` 로. 새 태그는 `taxonomy/tags.yml` 에 먼저 추가한다.

- **횡단 태그** — 카테고리 축 하나로 못 잡는 주제는 태그로 묶는다: `연구실`(신입 온보딩) · `면접`(시험 단골) · `흔한실수` · `연구`(재현성·실험 관리) · `Redis` `백업` `시크릿` `컨테이너`(여러 카테고리에 흩어진 같은 주제).
- **`kind`** — 개념(concept)·도구(tool)·프로토콜/표준(protocol)·패턴(pattern)·지표(metric)·규제/인증(regulation). 도구 카드는 유행 따라 교체되고 개념 카드는 오래 가므로 관리 단위가 다르다. 기존 카드의 kind 는 2026-10-02 에 일괄 추정값을 넣었으니 리뷰 때 고친다.
