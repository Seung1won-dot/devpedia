# 시드 용어 마스터 목록 (v1)

스펙 부록 A 를 카드 id 로 확정한 목록. **`related` 에는 이 목록(또는 이미 존재하는 카드)의 id 만 쓴다.**
형식: `id | 표시 이름 | level(1 기초 · 2 중급 · 3 심화)`. 폴더 = 카테고리 코드.

## os — 🧠 컴퓨터 구조 & 운영체제 (18)

cpu | CPU | 1
ram | RAM | 1
cache-memory | 캐시 메모리 | 2
virtual-memory | 가상 메모리 | 2
process | 프로세스 | 1
thread | 스레드 | 1
context-switching | 컨텍스트 스위칭 | 2
scheduler | 스케줄러 | 2
deadlock | 데드락 | 2
mutex | 뮤텍스/세마포어 | 2
kernel | 커널 | 2
system-call | 시스템 콜 | 2
file-system | 파일 시스템 | 1
shell | 셸(bash) | 1
environment-variable | 환경변수 | 1
file-permission | 권한(chmod/chown) | 1
systemd | systemd | 2
cron | 크론 | 1

## network — 🌐 네트워크 (19)

ip-address | IP 주소 | 1
subnet-cidr | 서브넷/CIDR | 2
private-ip | 공인 IP/사설 IP | 1
nat | NAT | 2
port | 포트 | 1
tcp-udp | TCP/UDP | 1
three-way-handshake | 3-way handshake | 2
http | HTTP | 1
https | HTTPS | 1
http-status-code | HTTP 상태 코드 | 1
dns | DNS | 1
osi-model | OSI 7계층 | 2
tls | TLS/SSL | 2
load-balancer | 로드 밸런서 | 2
cdn | CDN | 2
websocket | WebSocket | 2
vpn | VPN | 1
firewall | 방화벽 | 1
latency-bandwidth | 대역폭/지연시간 | 1

## algo — 🧩 자료구조 & 알고리즘 (16)

array | 배열 | 1
linked-list | 연결 리스트 | 1
stack-queue | 스택/큐 | 1
hash-table | 해시 테이블 | 1
tree | 트리 | 1
binary-search-tree | 이진 탐색 트리 | 2
heap | 힙 | 2
graph | 그래프 | 1
bfs-dfs | BFS/DFS | 2
dijkstra | 다익스트라 | 3
sorting | 정렬 | 1
binary-search | 이진 탐색 | 1
big-o | 시간 복잡도/Big-O | 1
recursion | 재귀 | 1
dynamic-programming | 동적 프로그래밍 | 3
greedy | 그리디 | 2

## lang — 💬 프로그래밍 언어 & 패러다임 (17)

variable-type | 변수/타입 | 1
static-dynamic-typing | 정적 타입/동적 타입 | 1
compiler-interpreter | 컴파일러/인터프리터 | 1
oop | 객체지향(OOP) | 1
class-instance | 클래스/인스턴스 | 1
inheritance-polymorphism | 상속/다형성/캡슐화 | 2
functional-programming | 함수형 프로그래밍 | 2
closure | 클로저 | 2
garbage-collection | 가비지 컬렉션 | 2
stack-heap-memory | 스택/힙 메모리 | 2
exception | 예외 처리 | 1
sync-async | 동기/비동기 | 1
promise-async-await | Promise/async-await | 2
event-loop | 이벤트 루프 | 2
package-manager | 패키지 매니저 | 1
virtualenv | 가상환경(venv) | 1
regex | 정규표현식 | 2

## frontend — 🖥️ 프론트엔드 (17)

html-css-js | HTML/CSS/JS | 1
dom | DOM | 1
responsive-design | 반응형 디자인 | 1
spa-mpa | SPA/MPA | 2
react | React | 1
component-props-state | 컴포넌트/props/state | 1
virtual-dom | 가상 DOM | 2
hooks | 훅(Hooks) | 2
state-management | 상태 관리 | 2
bundler | 번들러(Vite/Webpack) | 2
typescript | TypeScript | 1
csr-ssr-ssg | CSR/SSR/SSG | 2
pwa | PWA | 2
service-worker | 서비스 워커 | 2
cors | CORS | 2
local-storage | 쿠키/localStorage | 1
a11y | 웹 접근성(a11y) | 2

## backend — ⚙️ 백엔드 & API (18)

api | API | 1
rest | REST | 1
endpoint | 엔드포인트 | 1
json | JSON | 1
graphql | GraphQL | 2
authentication-authorization | 인증/인가 | 1
session-auth | 세션/쿠키 인증 | 2
jwt | JWT | 2
oauth | OAuth 2.0 | 2
middleware | 미들웨어 | 2
cache | 캐시(Redis) | 2
message-queue | 메시지 큐 | 3
webhook | 웹훅 | 2
rate-limit | 레이트 리밋 | 2
idempotency | 멱등성 | 3
serverless | 서버리스/Edge Function | 2
baas | BaaS(Supabase/Firebase) | 1
microservices | 마이크로서비스/모놀리식 | 3

## database — 🗄️ 데이터베이스 (18)

rdbms | RDBMS | 1
sql | SQL | 1
primary-foreign-key | 기본키/외래키 | 1
join | JOIN | 1
index | 인덱스 | 2
normalization | 정규화 | 2
transaction-acid | 트랜잭션/ACID | 2
orm | ORM | 2
migration | 마이그레이션 | 2
nosql | NoSQL | 1
document-db | 문서형 DB(MongoDB) | 2
key-value-store | 키-값 저장소 | 2
vector-db | 벡터 DB | 2
replication | 레플리케이션 | 3
backup-restore | 백업/복구 | 1
rls | RLS(Row Level Security) | 3
connection-pool | 커넥션 풀 | 3
n-plus-one | N+1 문제 | 2

## infra — 🖧 서버 & 인프라 & 클라우드 (21)

server | 서버 | 1
on-premise-vs-cloud | 온프레미스/클라우드 | 1
virtualization | 가상화 | 1
hypervisor | 하이퍼바이저 | 2
proxmox | Proxmox | 1
vm | VM | 1
lxc | LXC 컨테이너 | 2
docker | Docker | 1
docker-image | 이미지/컨테이너 | 1
docker-compose | Docker Compose | 2
kubernetes | 쿠버네티스 | 3
ssh | SSH | 1
scp-rsync | SCP/rsync | 1
reverse-proxy | 리버스 프록시 | 2  (이미 있음)
caddy | Caddy/Nginx | 2
snapshot-backup | 스냅샷/백업 | 1
object-storage | 오브젝트 스토리지(S3) | 2
static-hosting | 정적 호스팅(Vercel/Pages) | 1
gpu-cuda | GPU 서버/CUDA | 1
tailscale | Tailscale/WireGuard | 2
homelab | 홈랩 | 1

## devops — 🔧 DevOps & 개발 도구 (17)

git | Git | 1
commit-branch-merge | 커밋/브랜치/머지 | 1
pull-request | PR/코드 리뷰 | 1
rebase | rebase | 2
gitignore | .gitignore | 1
github-actions | GitHub Actions | 1
ci-cd | CI/CD | 1
environments | 환경 분리(dev/stage/prod) | 2
secrets-management | 환경변수/시크릿 관리 | 1
iac | IaC(Terraform/Ansible) | 3
monitoring | 모니터링(Prometheus/Grafana) | 2
logging | 로깅 | 1
healthcheck | 헬스체크 | 2
rollback | 롤백 | 2
blue-green-canary | 블루-그린/카나리 | 3
container-registry | 컨테이너 레지스트리 | 2
semver | 시맨틱 버저닝 | 1

## security — 🔒 보안 (18)

encryption | 암호화(대칭/비대칭) | 1
hash | 해시(SHA-256) | 1
salt | 솔트 | 2
public-key-cryptography | 공개키/개인키 | 1
digital-signature | 디지털 서명 | 2
certificate | 인증서(CA) | 2
mfa | 2FA/MFA | 1
password-hashing | 비밀번호 해싱(bcrypt/argon2) | 2
sql-injection | SQL 인젝션 | 1
xss | XSS | 2
csrf | CSRF | 2
least-privilege | 최소 권한 원칙 | 1
brute-force | 브루트포스 | 1
phishing | 피싱 | 1
zero-trust | 제로 트러스트 | 3
secret-leak | 시크릿 유출(.env 커밋) | 1
cve | 취약점/CVE | 2
owasp-top-10 | OWASP Top 10 | 2

## ai — 🤖 AI / ML / LLM (23)

machine-learning | 머신러닝 | 1
training-inference | 학습/추론 | 1
overfitting | 과적합 | 2
neural-network | 신경망/딥러닝 | 1
transformer | Transformer/어텐션 | 2
llm | LLM | 1
token | 토큰/토크나이저 | 1
context-window | 컨텍스트 윈도우 | 1
model-parameters | 파라미터(7B/70B) | 1
fine-tuning | 사전학습/파인튜닝 | 2
lora | LoRA | 3
quantization | 양자화(GGUF/4bit) | 2
embedding | 임베딩 | 2
rag | RAG | 2  (이미 있음)
prompt-engineering | 프롬프트 엔지니어링 | 1
system-prompt | 시스템 프롬프트 | 1
temperature | 온도(temperature) | 1
hallucination | 할루시네이션 | 1
agent | 에이전트 | 2
tool-calling | 툴 콜링/함수 호출 | 2
mcp | MCP | 2
local-llm | 로컬 LLM(Ollama/vLLM) | 1
vram | GPU 메모리(VRAM) | 1

## medical — 🏥 의료 IT (18)

emr-ehr | EMR/EHR | 1
his | HIS | 1
pacs | PACS | 1
dicom | DICOM | 2
hl7-v2 | HL7 v2 | 2
fhir | FHIR | 2  (이미 있음)
ocs | OCS | 1
lis | LIS | 1
de-identification | 마스킹/익명화/가명화 | 2
medical-data-law | 개인정보보호법/의료법 | 2
irb | IRB | 1
cdss | 의료 AI/CDSS | 2
samd | 의료기기 소프트웨어(SaMD) | 3
telemedicine | 원격의료 | 1
clinical-code-systems | 코드 체계(ICD/SNOMED/LOINC) | 2
omop-cdm | 데이터 표준화(CDM/OMOP) | 3
medical-image-segmentation | 의료 영상 세그멘테이션 | 2
air-gapped-network | 폐쇄망/망분리 | 2

## swe — 📐 소프트웨어 공학 & 협업 (18)

requirements-spec | 요구사항 명세 | 1
agile-scrum | 애자일/스크럼 | 1
mvp | MVP | 1
user-story | 유스케이스/사용자 스토리 | 1
sequence-diagram | UML/시퀀스 다이어그램 | 2
erd | ERD | 1
design-pattern | 디자인 패턴 | 2
solid | SOLID | 2
dry-kiss-yagni | DRY/KISS/YAGNI | 1
refactoring | 리팩토링 | 1
technical-debt | 기술 부채 | 1
testing-levels | 단위/통합/E2E 테스트 | 1
tdd | TDD | 2
code-coverage | 코드 커버리지 | 2
readme | 문서화/README | 1
adr | ADR | 2
open-source-license | 오픈소스 라이선스(MIT/GPL) | 1
semantic-commit | 시맨틱 커밋 | 1

---

## 전체 id (related 용, 238개)

cpu ram cache-memory virtual-memory process thread context-switching scheduler deadlock mutex kernel system-call file-system shell environment-variable file-permission systemd cron
ip-address subnet-cidr private-ip nat port tcp-udp three-way-handshake http https http-status-code dns osi-model tls load-balancer cdn websocket vpn firewall latency-bandwidth
array linked-list stack-queue hash-table tree binary-search-tree heap graph bfs-dfs dijkstra sorting binary-search big-o recursion dynamic-programming greedy
variable-type static-dynamic-typing compiler-interpreter oop class-instance inheritance-polymorphism functional-programming closure garbage-collection stack-heap-memory exception sync-async promise-async-await event-loop package-manager virtualenv regex
html-css-js dom responsive-design spa-mpa react component-props-state virtual-dom hooks state-management bundler typescript csr-ssr-ssg pwa service-worker cors local-storage a11y
api rest endpoint json graphql authentication-authorization session-auth jwt oauth middleware cache message-queue webhook rate-limit idempotency serverless baas microservices
rdbms sql primary-foreign-key join index normalization transaction-acid orm migration nosql document-db key-value-store vector-db replication backup-restore rls connection-pool n-plus-one
server on-premise-vs-cloud virtualization hypervisor proxmox vm lxc docker docker-image docker-compose kubernetes ssh scp-rsync reverse-proxy caddy snapshot-backup object-storage static-hosting gpu-cuda tailscale homelab
git commit-branch-merge pull-request rebase gitignore github-actions ci-cd environments secrets-management iac monitoring logging healthcheck rollback blue-green-canary container-registry semver
encryption hash salt public-key-cryptography digital-signature certificate mfa password-hashing sql-injection xss csrf least-privilege brute-force phishing zero-trust secret-leak cve owasp-top-10
machine-learning training-inference overfitting neural-network transformer llm token context-window model-parameters fine-tuning lora quantization embedding rag prompt-engineering system-prompt temperature hallucination agent tool-calling mcp local-llm vram
emr-ehr his pacs dicom hl7-v2 fhir ocs lis de-identification medical-data-law irb cdss samd telemedicine clinical-code-systems omop-cdm medical-image-segmentation air-gapped-network
requirements-spec agile-scrum mvp user-story sequence-diagram erd design-pattern solid dry-kiss-yagni refactoring technical-debt testing-levels tdd code-coverage readme adr open-source-license semantic-commit
