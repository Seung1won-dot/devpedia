import { describe, it, expect } from 'vitest'
import { toChosung, isChosungQuery } from './hangul'

describe('toChosung', () => {
  it('converts each syllable to its initial consonant', () => {
    expect(toChosung('리버스 프록시')).toBe('ㄹㅂㅅ ㅍㄹㅅ')
  })
  it('keeps non-Hangul characters untouched', () => {
    expect(toChosung('SSH 접속')).toBe('SSH ㅈㅅ')
    expect(toChosung('')).toBe('')
  })
  it('handles double consonants', () => {
    expect(toChosung('까치')).toBe('ㄲㅊ')
  })
})

describe('isChosungQuery', () => {
  it('is true only when every non-space char is a consonant jamo', () => {
    expect(isChosungQuery('ㄹㅂㅅ')).toBe(true)
    expect(isChosungQuery('ㄹㅂ ㅍ')).toBe(true)
    expect(isChosungQuery('리버')).toBe(false)
    expect(isChosungQuery('ㄹㅂ스')).toBe(false)
    expect(isChosungQuery('ㅏ')).toBe(false)
    expect(isChosungQuery('')).toBe(false)
    expect(isChosungQuery('   ')).toBe(false)
  })
})
