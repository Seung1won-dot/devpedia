import { describe, it, expect } from 'vitest'
import { renderInline, renderBlock, toPlainText } from './render'

describe('render', () => {
  it('renders inline bold without wrapping <p>', () => {
    expect(renderInline('a **b** c')).toBe('a <strong>b</strong> c')
  })

  it('renders fenced code with language class', () => {
    expect(renderBlock('```bash\nls\n```')).toMatch(/<pre><code class="language-bash">ls/)
  })

  it('renders bullet lists', () => {
    expect(renderBlock('- 하나\n- 둘')).toMatch(/<ul>[\s\S]*<li>하나<\/li>[\s\S]*<li>둘<\/li>/)
  })

  it('strips markdown to plain text', () => {
    expect(toPlainText('**굵게** `code` [링크](http://x)')).toBe('굵게 code 링크')
  })

  it('collapses whitespace and keeps code content in plain text', () => {
    expect(toPlainText('첫 줄\n\n```bash\nssh a@b\n```\n\n- 항목')).toBe('첫 줄 ssh a@b 항목')
  })
})
