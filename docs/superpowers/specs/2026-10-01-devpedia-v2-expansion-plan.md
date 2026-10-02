# Devpedia v2 확장 계획 — 카테고리·태그 정리 및 추가 용어 후보

> 기준: 2026-10-01 · 현재 238개 / 13개 카테고리 기준으로 작성
> 목적: `_inbox.md`에 넣을 후보 용어와, 카드가 400~500장으로 늘어도 꼬이지 않게 할 구조 규칙 정리
> 아래 id는 모두 `existing-terms.md`의 표시 이름·id·별칭과 겹치지 않도록 고른 **제안값**이다.

---

## 1. 구조 규칙 (용어 추가 전에 정할 것)

### 1-1. 카테고리는 13개 유지, 횡단 주제는 태그로

카테고리를 늘리면 탭이 넘치고 "infra인가 devops인가" 경계 고민만 생긴다. 지금도 한 주제가 여러 카테고리에 흩어진 경우가 있는데, 이건 카테고리 축 하나로는 못 잡는 **횡단 주제**라서 태그 축을 하나 더 두면 해결된다.

| 흩어진 주제 | 현재 카드 | 처리 |
| :-- | :-- | :-- |
| Redis / 캐시 | `cache`(backend), `key-value-store`(database) | 유지, `related` 상호 연결 + 태그 `redis` |
| 백업 | `backup-restore`(database), `snapshot-backup`(infra) | 유지, 태그 `backup` |
| 환경변수·시크릿 | `environment-variable`(os), `secrets-management`(devops), `secret-leak`(security) | 유지, 태그 `secrets` |
| 컨테이너 | `docker`, `docker-image`, `lxc`(infra), `container-registry`(devops) | 유지, 태그 `container` |

**카테고리 추가 기준:** 카드 15장 이상 확실히 나오면 카테고리, 아니면 태그.
현재 후보는 두 개뿐이다.

| 후보 코드 | 이름 | 다루는 것 | 판단 |
| :-- | :-- | :-- | :-- |
| `data` | 📊 데이터 엔지니어링 & 분석 | pandas, CSV/Parquet, ETL, 파이프라인, 시각화, 통계 기초, 결측치 | 연구실 실무와 직결. 15장 이상 가능 → **추가 권장** |
| `research` | 🔬 연구 워크플로 | 재현성, 랜덤 시드, 벤치마크, ablation, 실험 관리(W&B/MLflow), arXiv, LaTeX | 10장 내외 → 우선 `ai`/`swe`에 태그 `research`로 두고 커지면 분리 |

### 1-2. 횡단 태그 제안 (`taxonomy/tags.yml`)

| 태그 | 의미 | 예시 카드 |
| :-- | :-- | :-- |
| `linux` | 리눅스 CLI/운영 전반 (os·infra·devops 걸침) | shell, ssh, systemd, cron, file-permission |
| `python` | 파이썬 생태계 | virtualenv, package-manager, orm, regex |
| `homelab` | 자택/연구실 서버 묶음 | proxmox, lxc, tailscale, caddy, reverse-proxy |
| `lab` | 연구실 신입이 첫 달에 읽어야 할 것 | ssh, gpu-cuda, local-llm, irb, de-identification |
| `interview` | 면접·시험 단골 | three-way-handshake, deadlock, big-o, transaction-acid |
| `pitfall` | 초보가 자주 틀리는 것 | n-plus-one, cors, secret-leak, overfitting |
| `redis` `backup` `secrets` `container` | 1-1의 횡단 주제 | 위 표 참고 |
| `research` | 연구 워크플로 (카테고리 분리 전 임시) | — |

`lab` 태그가 있으면 "연구실 온보딩 필터 뷰"를 바로 만들 수 있다.

### 1-3. `kind` 필드 추가

지금은 도구(Proxmox, Caddy), 개념(멱등성), 표준(FHIR), 패턴(블루-그린), 규제(개인정보보호법)가 한 레벨에 섞여 있다. **도구 카드는 유행이 지나면 교체되고 개념 카드는 안 그렇다**는 점에서 관리 단위가 다르다.

```yaml
# frontmatter 예시
kind: concept   # concept | tool | protocol | pattern | metric | regulation
```

| kind | 뜻 | 예 |
| :-- | :-- | :-- |
| `concept` | 원리·개념 | 멱등성, 가상 메모리, 과적합 |
| `tool` | 특정 소프트웨어/서비스 | Proxmox, Docker, GitHub Actions |
| `protocol` | 프로토콜·표준·포맷 | HTTP, FHIR, DICOM, JSON |
| `pattern` | 설계·운영 패턴 | 블루-그린, 서킷 브레이커, TDD |
| `metric` | 지표·수치 | 코드 커버리지, F1, Core Web Vitals |
| `regulation` | 법·규제·인증 | 개인정보보호법, IRB, ISMS |

zod 스키마에 `kind: z.enum([...])`를 추가하고, 기존 238장은 스크립트로 일괄 기본값(`concept`)을 넣은 뒤 리뷰 때 고치면 된다.

### 1-4. 난이도 기준 문서화

| 레벨 | 기준 |
| :-- | :-- |
| L1 기초 | 처음 듣는 사람이 **비유만 읽어도** 이해된다 |
| L2 중급 | 한 번 써본 사람이 "아, 그게 그거였구나" 하는 것 |
| L3 심화 | **설계·운영 판단**이 들어가는 것. 트레이드오프를 설명해야 한다 |

현재 L3가 15개(6%)뿐이고 `os` `network` `lang` `frontend` `swe`는 0개다. 이번 확장에서 카테고리당 L3 3~5장을 의식적으로 채운다.

### 1-5. 묶음 카드 규칙

> 각각 따로 비유를 쓸 수 있으면 **분리**, 비교해야만 이해되면 **묶음**.

현재 별칭 안에만 숨어 있어서 `related`로 가리킬 수 없는 것들은 독립 카드로 빼는 게 관계 밀도를 가장 싸게 올리는 방법이다.

| 숨어 있는 별칭 | 현재 카드 | 분리 제안 id |
| :-- | :-- | :-- |
| SYN/SYN-ACK/ACK | `three-way-handshake` | (유지) |
| 포트포워딩 | `nat` | `port-forwarding` |
| 미디어 쿼리 | `responsive-design` | `media-query` |
| Nginx | `caddy` | `nginx` |
| Redis | `cache`, `key-value-store` | `redis` |
| pgvector / Chroma | `vector-db` | `pgvector` |
| Prisma / SQLAlchemy | `orm` | (유지, 도구는 예시로) |
| 페이징 / 스왑 | `virtual-memory` | `swap` |
| 메모이제이션 | `dynamic-programming` | `memoization` |
| 스로틀링 | `rate-limit` | → frontend `debounce-throttle`와 연결 |

---

## 2. 추가 용어 후보 (카테고리별)

표기: `표시 이름` — `id` · 난이도 · kind · 비고
기존 238개와 별칭까지 대조해 겹치지 않는 것만 담았다. 전부 넣는 게 아니라 `_inbox.md` 후보로 보고 고른다.

### 🧠 os — 컴퓨터 구조 & 운영체제 (현재 18, L3 0)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 파이프/리다이렉션 | `pipe-redirection` | L1 | concept | `\|`, `>`, `2>&1` |
| 시그널(kill/SIGTERM) | `signal` | L1 | concept | SIGKILL vs SIGTERM |
| 데몬 | `daemon` | L1 | concept | systemd와 연결 |
| 심볼릭 링크 | `symlink` | L1 | concept | 하드링크 비교 |
| sudo/root | `sudo-root` | L1 | concept | least-privilege 연결 |
| 패키지 관리자(apt/brew) | `apt` | L1 | tool | lang `package-manager`와 구분 |
| 마운트/파티션 | `mount-partition` | L1 | concept | fstab |
| tmux/screen | `tmux` | L1 | tool | 세션 유지 |
| 리눅스 배포판 | `linux-distro` | L1 | concept | Ubuntu/Debian/RHEL |
| 파일 디스크립터 | `file-descriptor` | L2 | concept | stdin/stdout/stderr |
| 좀비/고아 프로세스 | `zombie-process` | L2 | concept | |
| 인터럽트 | `interrupt` | L2 | concept | |
| 페이지 폴트 | `page-fault` | L2 | concept | virtual-memory 연결 |
| 부팅 과정 | `boot-process` | L2 | concept | BIOS/UEFI→부트로더→커널 |
| 메모리 누수 | `memory-leak` | L2 | concept | garbage-collection 연결 |
| 로그 로테이션 | `log-rotation` | L2 | concept | logrotate |
| RAID | `raid` | L2 | concept | RAID 0/1/5/10 |
| 동시성 vs 병렬성 | `concurrency-parallelism` | L2 | concept | |
| 경쟁 상태 | `race-condition` | L3 | concept | mutex 연결 |
| NUMA | `numa` | L3 | concept | GPU 서버 |

### 🌐 network — 네트워크 (현재 19, L3 0)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 라우터/스위치 | `router-switch` | L1 | concept | |
| 게이트웨이 | `gateway` | L1 | concept | 기본 게이트웨이 |
| DHCP | `dhcp` | L1 | protocol | |
| MAC 주소 | `mac-address` | L1 | concept | |
| ping/traceroute | `ping-traceroute` | L1 | tool | |
| curl | `curl` | L1 | tool | |
| 프록시(포워드) | `forward-proxy` | L1 | concept | reverse-proxy 비교 |
| DNS 레코드(A/CNAME) | `dns-record` | L1 | concept | |
| 패킷 | `packet` | L1 | concept | |
| 포트 포워딩 | `port-forwarding` | L1 | concept | nat에서 분리 |
| 소켓 | `socket` | L2 | concept | |
| ARP | `arp` | L2 | protocol | |
| IPv6 | `ipv6` | L2 | protocol | |
| MTU | `mtu` | L2 | concept | |
| HTTP/2·HTTP/3(QUIC) | `http2-http3` | L2 | protocol | |
| SSE | `sse` | L2 | protocol | LLM 스트리밍 |
| 폴링/롱폴링 | `polling` | L2 | pattern | websocket 비교 |
| mDNS | `mdns` | L2 | protocol | `.local` |
| iptables/nftables | `iptables` | L2 | tool | firewall 연결 |
| TCP 혼잡 제어 | `congestion-control` | L3 | concept | |
| BGP | `bgp` | L3 | protocol | |
| DNS over HTTPS | `doh` | L3 | protocol | |

### 🧩 algo — 자료구조 & 알고리즘 (현재 16, L3 2)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 공간 복잡도 | `space-complexity` | L1 | concept | big-o 연결 |
| 집합/맵(ADT) | `set-map` | L1 | concept | |
| 비트 연산 | `bitwise` | L1 | concept | |
| 투 포인터/슬라이딩 윈도우 | `two-pointers` | L2 | pattern | |
| 분할 정복 | `divide-and-conquer` | L2 | pattern | |
| 백트래킹 | `backtracking` | L2 | pattern | |
| 해시 충돌 | `hash-collision` | L2 | concept | |
| 안정 정렬 | `stable-sort` | L2 | concept | |
| 트라이 | `trie` | L2 | concept | 자동완성 |
| 유니온 파인드 | `union-find` | L2 | concept | |
| 위상 정렬 | `topological-sort` | L2 | concept | 의존성 순서 |
| 메모이제이션 | `memoization` | L2 | concept | DP에서 분리 |
| LRU 캐시 | `lru-cache` | L2 | pattern | |
| 최소 신장 트리 | `mst` | L3 | concept | |
| 세그먼트 트리 | `segment-tree` | L3 | concept | |
| KMP 문자열 매칭 | `kmp` | L3 | concept | |
| 블룸 필터 | `bloom-filter` | L3 | concept | |

### 💬 lang — 프로그래밍 언어 & 패러다임 (현재 17, L3 0)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 스코프 | `scope` | L1 | concept | closure 연결 |
| 모듈/import | `module-import` | L1 | concept | |
| 얕은 복사/깊은 복사 | `shallow-deep-copy` | L1 | concept | |
| null/None 처리 | `null-handling` | L1 | concept | Optional |
| 린터/포매터 | `linter-formatter` | L1 | tool | ESLint/Prettier/ruff |
| 타입 힌트 | `type-hint` | L1 | concept | Python typing |
| 직렬화/역직렬화 | `serialization` | L1 | concept | json 연결 |
| 참조 vs 값 | `reference-value` | L2 | concept | |
| 불변성 | `immutability` | L2 | concept | |
| 제네릭 | `generics` | L2 | concept | |
| 인터페이스/덕 타이핑 | `interface-duck-typing` | L2 | concept | |
| 데코레이터 | `decorator` | L2 | concept | |
| 제너레이터/이터레이터 | `generator-iterator` | L2 | concept | |
| 일급 함수/고차 함수 | `higher-order-function` | L2 | concept | |
| 타입 추론 | `type-inference` | L2 | concept | |
| GIL | `gil` | L3 | concept | Python 멀티스레딩 |
| JIT | `jit` | L3 | concept | |
| 메타프로그래밍 | `metaprogramming` | L3 | concept | |
| 구조적 타이핑 | `structural-typing` | L3 | concept | TypeScript |

### 🖥️ frontend — 프론트엔드 (현재 17, L3 0)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 이벤트 버블링 | `event-bubbling` | L1 | concept | |
| fetch/axios | `fetch` | L1 | tool | |
| Flexbox/Grid | `flexbox-grid` | L1 | concept | |
| 미디어 쿼리 | `media-query` | L1 | concept | responsive-design에서 분리 |
| 라우팅(react-router) | `client-routing` | L1 | concept | |
| Tailwind | `tailwind` | L1 | tool | |
| 폼 처리 | `form-handling` | L1 | concept | |
| 디바운스/스로틀 | `debounce-throttle` | L2 | pattern | |
| 메모이제이션(useMemo) | `react-memo` | L2 | concept | algo `memoization` 연결 |
| 코드 스플리팅/레이지 로딩 | `code-splitting` | L2 | concept | |
| Next.js | `nextjs` | L2 | tool | |
| 렌더링 파이프라인 | `reflow-repaint` | L2 | concept | |
| 웹폰트/이미지 최적화 | `asset-optimization` | L2 | concept | |
| Core Web Vitals | `core-web-vitals` | L2 | metric | LCP/INP/CLS |
| i18n | `i18n` | L2 | concept | 로드맵 영문 모드 |
| E2E 테스트(Playwright) | `playwright` | L2 | tool | |
| 하이드레이션 | `hydration` | L3 | concept | |
| 트리 셰이킹 | `tree-shaking` | L3 | concept | |
| 웹 컴포넌트/Shadow DOM | `web-components` | L3 | concept | |
| 서버 컴포넌트(RSC) | `server-components` | L3 | concept | |

### ⚙️ backend — 백엔드 & API (현재 18, L3 3)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| HTTP 메서드 | `http-method` | L1 | concept | GET/POST/PUT/DELETE |
| 쿼리/경로 파라미터 | `query-path-param` | L1 | concept | |
| 페이지네이션 | `pagination` | L1 | pattern | 오프셋 vs 커서 |
| API 키 | `api-key` | L1 | concept | |
| 유효성 검사 | `validation` | L1 | concept | zod/pydantic |
| FastAPI/Express | `web-framework` | L1 | tool | |
| OpenAPI/Swagger | `openapi` | L2 | protocol | |
| 리프레시 토큰 | `refresh-token` | L2 | concept | jwt 연결 |
| API 버저닝 | `api-versioning` | L2 | pattern | |
| 백그라운드 작업/워커 | `background-job` | L2 | pattern | Celery |
| 재시도/백오프 | `retry-backoff` | L2 | pattern | |
| gRPC | `grpc` | L2 | protocol | |
| 스트리밍 응답 | `streaming-response` | L2 | pattern | SSE 연결 |
| 서킷 브레이커 | `circuit-breaker` | L3 | pattern | |
| 이벤트 드리븐 아키텍처 | `event-driven` | L3 | pattern | |
| CQRS | `cqrs` | L3 | pattern | |
| 사가 패턴 | `saga` | L3 | pattern | |

### 🗄️ database — 데이터베이스 (현재 18, L3 3)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| CRUD | `crud` | L1 | concept | |
| 스키마 | `schema` | L1 | concept | |
| 제약조건 | `constraint` | L1 | concept | NOT NULL/UNIQUE/CHECK |
| GROUP BY/집계 | `aggregation` | L1 | concept | |
| SQLite | `sqlite` | L1 | tool | |
| PostgreSQL | `postgresql` | L1 | tool | |
| UUID vs auto-increment | `uuid-vs-serial` | L1 | concept | |
| Redis | `redis` | L1 | tool | cache/key-value-store에서 분리 |
| 서브쿼리 | `subquery` | L2 | concept | |
| 뷰 | `view` | L2 | concept | |
| EXPLAIN/쿼리 플랜 | `query-plan` | L2 | concept | index 연결 |
| 락 | `lock` | L2 | concept | |
| 소프트 딜리트 | `soft-delete` | L2 | pattern | |
| 비정규화 | `denormalization` | L2 | concept | |
| 트리거/저장 프로시저 | `trigger-procedure` | L2 | concept | |
| 전문 검색 | `full-text-search` | L2 | concept | |
| 시계열 DB | `time-series-db` | L2 | concept | 생체신호 |
| 데이터 웨어하우스/레이크 | `data-warehouse` | L2 | concept | |
| pgvector | `pgvector` | L2 | tool | vector-db에서 분리 |
| 트랜잭션 격리 수준 | `isolation-level` | L3 | concept | |
| 샤딩/파티셔닝 | `sharding` | L3 | pattern | |
| CAP 정리 | `cap-theorem` | L3 | concept | |
| MVCC | `mvcc` | L3 | concept | |

### 🖧 infra — 서버 & 인프라 & 클라우드 (현재 21, L3 1)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| VPS | `vps` | L1 | concept | |
| 포트 매핑(-p) | `port-mapping` | L1 | concept | port-forwarding 연결 |
| 볼륨/바인드 마운트 | `docker-volume` | L1 | concept | |
| NAS | `nas` | L1 | concept | |
| UPS | `ups` | L1 | tool | 홈랩 |
| Let's Encrypt | `lets-encrypt` | L1 | tool | certificate 연결 |
| 컨테이너 vs VM | `container-vs-vm` | L1 | concept | |
| Nginx | `nginx` | L1 | tool | caddy에서 분리 |
| 도커 네트워크 | `docker-network` | L2 | concept | bridge/host |
| 리전/가용영역 | `region-az` | L2 | concept | |
| IAM | `iam` | L2 | concept | |
| 스토리지 유형 비교 | `storage-types` | L2 | concept | 블록/파일/오브젝트 |
| 백업 3-2-1 규칙 | `backup-321` | L2 | pattern | |
| cloud-init | `cloud-init` | L2 | tool | Proxmox 템플릿 |
| 오토스케일링 | `autoscaling` | L2 | concept | |
| 클라우드 비용 모델 | `cloud-pricing` | L2 | concept | |
| 관측성(메트릭·로그·트레이스) | `observability` | L2 | concept | monitoring 연결 |
| 멀티테넌시 | `multi-tenancy` | L3 | concept | |
| Helm | `helm` | L3 | tool | |
| 서비스 메시 | `service-mesh` | L3 | concept | |
| 베어메탈 | `bare-metal` | L3 | concept | GPU 서버 |

### 🔧 devops — DevOps & 개발 도구 (현재 17, L3 2)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 이슈 트래커 | `issue-tracker` | L1 | tool | |
| 깃 태그/릴리스 | `git-tag-release` | L1 | concept | semver 연결 |
| cherry-pick/stash | `cherry-pick-stash` | L1 | concept | |
| lock 파일 | `lockfile` | L1 | concept | package-lock, uv.lock |
| pre-commit 훅 | `pre-commit` | L1 | tool | |
| Makefile/npm scripts | `task-runner` | L1 | tool | |
| 로그 레벨 | `log-level` | L1 | concept | DEBUG/INFO/WARN |
| 브랜치 전략 | `branching-strategy` | L2 | pattern | git flow / trunk |
| 의존성 자동 갱신 | `dependabot` | L2 | tool | |
| 피처 플래그 | `feature-flag` | L2 | pattern | |
| 알림(alerting) | `alerting` | L2 | concept | |
| Dev Container | `devcontainer` | L2 | tool | |
| 모노레포 | `monorepo` | L2 | pattern | |
| dotfiles | `dotfiles` | L2 | concept | |
| CODEOWNERS | `codeowners` | L2 | tool | |
| 분산 트레이싱 | `tracing` | L3 | concept | OpenTelemetry |
| SLO/SLA/SLI | `slo-sla` | L3 | metric | |
| 포스트모템 | `postmortem` | L3 | pattern | |
| 온콜 | `on-call` | L3 | concept | |

### 🔒 security — 보안 (현재 18, L3 1)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| DDoS | `ddos` | L1 | concept | |
| 랜섬웨어 | `ransomware` | L1 | concept | backup 연결 |
| 소셜 엔지니어링 | `social-engineering` | L1 | concept | phishing 연결 |
| SSH 키 관리 | `ssh-key` | L1 | concept | |
| 토큰 저장 위치 | `token-storage` | L1 | concept | 쿠키 vs localStorage |
| 입력 검증 | `input-validation` | L1 | concept | sql-injection/xss 연결 |
| fail2ban | `fail2ban` | L1 | tool | brute-force 연결 |
| 보안 헤더(CSP/HSTS) | `security-headers` | L2 | concept | |
| 세션 하이재킹 | `session-hijacking` | L2 | concept | |
| RBAC | `rbac` | L2 | pattern | rls 연결 |
| SSO/SAML | `sso` | L2 | protocol | oauth 연결 |
| 키 로테이션 | `key-rotation` | L2 | pattern | |
| 감사 로그 | `audit-log` | L2 | concept | 의료 규제 연결 |
| 의존성 취약점 스캔 | `sca` | L2 | tool | cve 연결 |
| 침투 테스트 | `penetration-test` | L2 | concept | |
| 샌드박스 | `sandbox` | L2 | concept | |
| 프롬프트 인젝션 | `prompt-injection` | L2 | concept | ai 교차 |
| 저장/전송 중 암호화 | `encryption-at-rest-in-transit` | L2 | concept | |
| KMS/HSM | `kms-hsm` | L3 | tool | |
| 공급망 공격 | `supply-chain-attack` | L3 | concept | |
| 권한 상승 | `privilege-escalation` | L3 | concept | |

### 🤖 ai — AI / ML / LLM (현재 23, L3 1)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 지도/비지도/강화학습 | `learning-paradigms` | L1 | concept | |
| 분류/회귀 | `classification-regression` | L1 | concept | |
| train/val/test 분할 | `data-split` | L1 | concept | |
| 정확도/F1 | `accuracy-f1` | L1 | metric | |
| 손실 함수/경사하강법 | `loss-gradient-descent` | L1 | concept | |
| 배치/에폭 | `batch-epoch` | L1 | concept | |
| 학습률/하이퍼파라미터 | `hyperparameter` | L1 | concept | |
| 레이블링 | `labeling` | L1 | concept | 의료 어노테이션 |
| PyTorch | `pytorch` | L1 | tool | |
| Hugging Face | `huggingface` | L1 | tool | |
| 체크포인트 | `checkpoint` | L1 | concept | |
| 스트리밍 출력 | `streaming-output` | L1 | concept | sse 연결 |
| CNN | `cnn` | L2 | concept | 의료 영상 |
| 전이학습 | `transfer-learning` | L2 | concept | |
| 데이터 증강 | `data-augmentation` | L2 | concept | |
| top-p/top-k 샘플링 | `sampling` | L2 | concept | temperature 연결 |
| 구조화 출력/JSON 모드 | `structured-output` | L2 | concept | |
| 멀티모달/비전 모델 | `multimodal` | L2 | concept | |
| 청킹 | `chunking` | L2 | concept | rag 연결 |
| 리랭커/하이브리드 검색 | `reranker` | L2 | concept | |
| 가드레일 | `guardrails` | L2 | concept | |
| LLM-as-judge 평가 | `llm-eval` | L2 | concept | |
| fp16/bf16 혼합 정밀도 | `mixed-precision` | L2 | concept | vram 연결 |
| 에이전트 메모리 | `agent-memory` | L2 | concept | |
| 모델 라이선스/모델 카드 | `model-card` | L2 | regulation | |
| 재현성/랜덤 시드 | `reproducibility` | L2 | concept | 태그 `research` |
| 실험 관리(W&B/MLflow) | `experiment-tracking` | L2 | tool | 태그 `research` |
| KV 캐시 | `kv-cache` | L3 | concept | |
| RLHF/DPO | `rlhf` | L3 | concept | |
| 디스틸레이션 | `distillation` | L3 | concept | |
| MoE | `moe` | L3 | concept | |
| 분산 학습 | `distributed-training` | L3 | concept | |
| 스페큘레이티브 디코딩 | `speculative-decoding` | L3 | concept | |

### 🏥 medical — 의료 IT (현재 18, L3 2)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 환자 식별자(MRN) | `mrn` | L1 | concept | de-identification 연결 |
| 오더/처방 | `order` | L1 | concept | ocs 연결 |
| 영상 모달리티(CT/MRI/X-ray) | `imaging-modality` | L1 | concept | dicom 연결 |
| 바이탈/생체신호 | `vital-signs` | L1 | concept | |
| 심전도(ECG) 데이터 | `ecg` | L1 | concept | time-series-db 연결 |
| 임상시험 | `clinical-trial` | L1 | concept | irb 연결 |
| 전자동의서 | `e-consent` | L1 | concept | |
| 민감도/특이도/AUC | `sensitivity-specificity` | L2 | metric | |
| 임상 데이터 웨어하우스(CDW) | `cdw` | L2 | concept | |
| 데이터 활용 심의(DRB) | `drb` | L2 | regulation | |
| 보건의료데이터 활용 가이드라인 | `health-data-guideline` | L2 | regulation | |
| 공개 의료 데이터셋(MIMIC) | `mimic` | L2 | concept | |
| eCRF | `ecrf` | L2 | concept | |
| 인터페이스 엔진(Mirth) | `interface-engine` | L2 | tool | hl7-v2 연결 |
| HL7 CDA | `hl7-cda` | L2 | protocol | |
| 병리 WSI | `wsi` | L2 | concept | |
| 웨어러블 데이터 | `wearable` | L2 | concept | |
| 의료 AI 인허가(식약처) | `mfds-approval` | L3 | regulation | samd 연결 |
| 디지털 치료제(DTx) | `dtx` | L3 | concept | |
| 유전체 데이터(VCF) | `genomic-data` | L3 | concept | |
| ISMS-P | `isms-p` | L3 | regulation | |
| 수가/청구(EDI) | `claims-edi` | L3 | concept | |

### 📐 swe — 소프트웨어 공학 & 협업 (현재 18, L3 0)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| 이슈/백로그 | `backlog` | L1 | concept | |
| 칸반 | `kanban` | L1 | pattern | agile-scrum 연결 |
| 회고 | `retrospective` | L1 | pattern | |
| 코딩 컨벤션 | `coding-convention` | L1 | concept | |
| CHANGELOG | `changelog` | L1 | concept | semver 연결 |
| 버그 리포트/재현 조건 | `bug-report` | L1 | concept | |
| 디버깅 | `debugging` | L1 | concept | |
| 코드 스멜 | `code-smell` | L1 | concept | refactoring 연결 |
| AI 코딩 도구 | `ai-coding-assistant` | L1 | tool | Copilot/Claude Code |
| 결합도/응집도 | `coupling-cohesion` | L2 | concept | |
| 레이어드 아키텍처 | `layered-architecture` | L2 | pattern | |
| 모킹/스텁 | `mocking` | L2 | concept | testing-levels 연결 |
| 프로파일링 | `profiling` | L2 | concept | |
| 페어 프로그래밍 | `pair-programming` | L2 | pattern | |
| 트레이드오프 | `trade-off` | L2 | concept | adr 연결 |
| 레거시 코드 | `legacy-code` | L2 | concept | |
| 기술 스택 선정 | `tech-stack-selection` | L2 | concept | |
| 의존성 역전 | `dependency-inversion` | L3 | concept | solid 연결 |
| 클린 아키텍처 | `clean-architecture` | L3 | pattern | |
| DDD | `ddd` | L3 | pattern | |
| C4 모델 | `c4-model` | L3 | pattern | |

### 📊 data — 데이터 엔지니어링 & 분석 (신설 시)

| 표시 이름 | id | 난이도 | kind | 비고 |
| :-- | :-- | :-: | :-- | :-- |
| pandas/DataFrame | `dataframe` | L1 | tool | |
| CSV/Parquet | `csv-parquet` | L1 | protocol | |
| 결측치 처리 | `missing-data` | L1 | concept | |
| 데이터 타입/스키마 검증 | `data-validation` | L1 | concept | |
| 시각화(matplotlib/plotly) | `visualization` | L1 | tool | |
| 기술 통계/분포 | `descriptive-stats` | L1 | concept | |
| ETL/ELT | `etl` | L2 | concept | |
| 데이터 파이프라인 | `data-pipeline` | L2 | concept | |
| 이상치 | `outlier` | L2 | concept | |
| 상관 vs 인과 | `correlation-causation` | L2 | concept | |
| 가설 검정/p-value | `hypothesis-test` | L2 | concept | 의료 연구 |
| 데이터 누수(leakage) | `data-leakage` | L2 | concept | 태그 `pitfall` |
| 피처 엔지니어링 | `feature-engineering` | L2 | concept | |
| 워크플로 오케스트레이션(Airflow) | `orchestration` | L3 | tool | |
| 데이터 계보(lineage) | `data-lineage` | L3 | concept | |

---

## 3. 후보 집계

| 카테고리 | 현재 | 후보 | 합계(전부 넣을 때) | 후보 L3 |
| :-- | --: | --: | --: | --: |
| os | 18 | 20 | 38 | 2 |
| network | 19 | 22 | 41 | 3 |
| algo | 16 | 17 | 33 | 4 |
| lang | 17 | 19 | 36 | 4 |
| frontend | 17 | 20 | 37 | 4 |
| backend | 18 | 17 | 35 | 4 |
| database | 18 | 23 | 41 | 4 |
| infra | 21 | 21 | 42 | 4 |
| devops | 17 | 19 | 36 | 4 |
| security | 18 | 21 | 39 | 3 |
| ai | 23 | 33 | 56 | 6 |
| medical | 18 | 22 | 40 | 5 |
| swe | 18 | 21 | 39 | 4 |
| data (신설) | 0 | 15 | 15 | 2 |
| **합계** | **238** | **290** | **528** | **53** |

전부 넣으면 528장이라 리뷰가 안 끝난다. **v2 목표는 400장 전후**로 잡고 아래 기준으로 거른다.

---

## 4. 우선순위와 작업 순서

### 고르는 기준 (위에서부터)

1. **연구실에서 이 단어를 몰라서 막힌 적이 있는가** — 태그 `lab`
2. **수업·면접·시험에 나오는가** — 태그 `interview`
3. **기존 카드의 `related`가 가리키고 싶은데 id가 없는가** — 1-5의 분리 목록이 여기 해당. 관계 밀도를 가장 싸게 올린다
4. 도구(`kind: tool`)는 **지금 실제로 쓰는 것만**. 유행 도구는 개념 카드의 예시로 내린다

### 작업 단위

- 카테고리 전체를 한 번에 하지 않는다. "`os` L3 비우기", "`medical` 규제 5장" 같은 **10장 이하 단위**로 돌린다.
- 지금 `published` 3 / `review` 235 상태라, 확장과 병행해서 **published 비율 올리기**를 먼저 두는 게 맞다. 새 카드 10장 추가할 때 기존 카드 10장 리뷰하는 식으로 묶으면 review 적체가 안 쌓인다.
- 순서 제안: ① `kind` 필드·태그 스키마 반영 → ② 1-5 분리 카드(10장) → ③ L3 0개 카테고리 채우기(os·network·lang·frontend·swe, 각 3~4장) → ④ `lab` 태그 카드(medical·ai·infra) → ⑤ 나머지

### 체크리스트 (카드 1장마다)

- [ ] `existing-terms.md` 표시 이름·id·별칭에 없는가
- [ ] `kind`, `level`, 태그를 넣었는가
- [ ] 한 줄 정의 60자 이내, 비유·예시·헷갈리기 쉬운 것 작성
- [ ] `related`에 기존 id 3개 이상 (1-5의 횡단 연결 포함)
- [ ] `npm run validate` 통과
