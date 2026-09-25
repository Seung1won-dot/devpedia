import { describe, it, expect } from 'vitest'
import { parseTermMarkdown, splitSections } from './parse'

const SAMPLE = `---
id: ssh
term: SSH
aliases: [Secure Shell, 시큐어 셸]
category: infra
level: 1
related: [port, firewall]
created: 2026-09-25
---

## 한 줄 정의

다른 컴퓨터에 **암호화된 통신으로 원격 접속**하는 프로토콜이자 명령어.

## 비유

열쇠 달린 뒷문.

## 예시

\`\`\`bash
## 설치 (이 줄은 섹션이 아니다)
ssh user@10.0.0.5
\`\`\`
`

describe('parseTermMarkdown', () => {
  it('returns frontmatter and named sections', () => {
    const r = parseTermMarkdown(SAMPLE, 'terms/infra/ssh.md')
    expect(r.file).toBe('terms/infra/ssh.md')
    expect(r.frontmatter.id).toBe('ssh')
    expect(r.frontmatter.aliases).toEqual(['Secure Shell', '시큐어 셸'])
    expect(r.sections['한 줄 정의']).toBe('다른 컴퓨터에 **암호화된 통신으로 원격 접속**하는 프로토콜이자 명령어.')
    expect(r.sections['비유']).toBe('열쇠 달린 뒷문.')
  })

  it('splitSections ignores headings inside code fences', () => {
    const r = parseTermMarkdown(SAMPLE)
    expect(Object.keys(r.sections)).toEqual(['한 줄 정의', '비유', '예시'])
    expect(r.sections['예시']).toContain('## 설치')
    expect(r.sections['예시']).toContain('ssh user@10.0.0.5')
    expect(r.sections['예시'].startsWith('```bash')).toBe(true)
  })

  it('returns empty sections for a body without headings', () => {
    expect(splitSections('그냥 텍스트')).toEqual({})
  })

  it('keeps ### subheadings inside the current section', () => {
    expect(splitSections('## 예시\n### 세부\n내용')['예시']).toBe('### 세부\n내용')
  })

  it('handles CRLF line endings', () => {
    expect(splitSections('## 비유\r\n\r\n뒷문.\r\n')['비유']).toBe('뒷문.')
  })

  it('defaults file to <memory> and exposes the raw body', () => {
    const r = parseTermMarkdown('---\nid: x\n---\n## 비유\n\n비.')
    expect(r.file).toBe('<memory>')
    expect(r.body.trim()).toBe('## 비유\n\n비.')
  })
})
