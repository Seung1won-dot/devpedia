import { describe, it, expect } from 'vitest'
import { initialOf, groupByInitial } from './group'
import { makeTerm } from '../test/fixtures'

describe('initialOf', () => {
  it('maps Hangul syllables to their initial consonant, folding tense consonants', () => {
    expect(initialOf('리버스 프록시')).toBe('ㄹ')
    expect(initialOf('까다로운')).toBe('ㄱ')
    expect(initialOf('쓰레드')).toBe('ㅅ')
  })
  it('maps Latin letters to upper case and everything else to #', () => {
    expect(initialOf('docker')).toBe('D')
    expect(initialOf('3-way handshake')).toBe('#')
    expect(initialOf('.gitignore')).toBe('#')
  })
})

describe('groupByInitial', () => {
  it('orders groups ㄱ…ㅎ, then A…Z, then #, and sorts inside a group', () => {
    const terms = ['SSH', '포트', '리버스 프록시', 'RAG', '라우터', '2의 보수'].map((term, i) => makeTerm({ id: `t${i}`, term }))
    const groups = groupByInitial(terms)
    expect(groups.map((g) => g.key)).toEqual(['ㄹ', 'ㅍ', 'R', 'S', '#'])
    expect(groups[0].terms.map((t) => t.term)).toEqual(['라우터', '리버스 프록시'])
  })
})
