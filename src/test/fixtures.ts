import type { Bundle, Category, Term } from '../types'

export const CATEGORIES: Category[] = [
  { code: 'network', name: '네트워크', icon: '🌐', description: '', order: 0 },
  { code: 'infra', name: '서버 & 인프라 & 클라우드', icon: '🖧', description: '', order: 1 },
  { code: 'ai', name: 'AI / ML / LLM', icon: '🤖', description: '', order: 2 },
]

export function makeTerm(over: Partial<Term> & { id: string }): Term {
  return {
    term: over.id,
    aliases: [],
    category: 'infra',
    tags: [],
    level: 1,
    related: [],
    backlinks: [],
    seeAlso: [],
    status: 'published',
    created: '2026-09-25',
    updated: '2026-09-25',
    definition: `${over.id} 정의.`,
    definitionHtml: `${over.id} 정의.`,
    analogyHtml: '<p>비유.</p>',
    exampleHtml: '<pre><code class="language-bash">예시</code></pre>',
    confusionsHtml: null,
    searchText: '',
    ...over,
  }
}

export const TERMS: Term[] = [
  makeTerm({
    id: 'reverse-proxy', term: '리버스 프록시', aliases: ['Reverse Proxy', '역방향 프록시'], category: 'infra', level: 2,
    tags: ['서버운영', 'HTTPS'], related: ['port', 'ssh'], backlinks: ['port'],
    definition: '외부 요청을 대신 받아 뒤의 서버로 나눠 전달하는 중간 서버.',
    definitionHtml: '외부 요청을 <strong>대신 받아</strong> 뒤의 서버로 나눠 전달하는 중간 서버.',
    searchText: '안내 데스크 Caddy',
  }),
  makeTerm({
    id: 'ssh', term: 'SSH', aliases: ['Secure Shell', '시큐어 셸'], category: 'infra', level: 1, tags: ['원격접속'],
    related: ['port'], backlinks: ['reverse-proxy'], definition: '암호화된 통신으로 원격 접속하는 프로토콜.', searchText: '열쇠 달린 뒷문',
  }),
  makeTerm({
    id: 'port', term: '포트', aliases: ['Port', '포트 번호'], category: 'network', level: 1, tags: ['TCP/IP'],
    related: ['reverse-proxy'], backlinks: ['reverse-proxy', 'ssh'], definition: '한 컴퓨터 안에서 서비스를 구분하는 번호.',
    searchText: 'SSH 는 22번 포트를 쓴다',
  }),
  makeTerm({
    id: 'rag', term: 'RAG', aliases: ['Retrieval-Augmented Generation', '검색 증강 생성'], category: 'ai', level: 2, tags: ['LLM', '검색'],
    related: ['embedding'], definition: 'LLM 이 답하기 전에 관련 문서를 먼저 검색해서 같이 읽게 하는 기법.', searchText: '오픈북 시험',
  }),
]

export const BUNDLE: Bundle = {
  version: 1,
  generatedAt: '2026-09-25T00:00:00.000Z',
  categories: CATEGORIES,
  tags: ['서버운영', 'HTTPS', '원격접속', 'TCP/IP', 'LLM', '검색'],
  terms: TERMS,
  stats: {
    total: 4,
    byCategory: { network: 1, infra: 2, ai: 1 },
    byLevel: { 1: 2, 2: 2, 3: 0 },
    byStatus: { draft: 0, review: 0, published: 4 },
    recent: TERMS.map((t) => ({ id: t.id, term: t.term, updated: t.updated })),
    avgRelated: 1.25,
    orphanCount: 0,
  },
}
