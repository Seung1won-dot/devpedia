import { describe, it, expect } from 'vitest'
import { highlightSegments } from './highlight'

describe('highlightSegments', () => {
  it('splits text around a case-insensitive match', () => {
    expect(highlightSegments('리버스 프록시 서버', '프록시')).toEqual([
      { text: '리버스 ', hit: false },
      { text: '프록시', hit: true },
      { text: ' 서버', hit: false },
    ])
    expect(highlightSegments('SSH', 'ssh')).toEqual([{ text: 'SSH', hit: true }])
  })

  it('returns the whole text unhit when query is empty or absent', () => {
    expect(highlightSegments('abc', '')).toEqual([{ text: 'abc', hit: false }])
    expect(highlightSegments('abc', 'zzz')).toEqual([{ text: 'abc', hit: false }])
  })

  it('highlights every word of a multi-word query', () => {
    expect(highlightSegments('검색 증강 생성', '생성 검색')).toEqual([
      { text: '검색', hit: true },
      { text: ' 증강 ', hit: false },
      { text: '생성', hit: true },
    ])
  })

  it('returns an empty list for empty text', () => {
    expect(highlightSegments('', 'a')).toEqual([])
  })
})
