import type { Kind } from '../types'

/** 카드 종류 라벨. 도구 카드는 유행 따라 교체되고 개념 카드는 오래 가므로, 한눈에 구분되게 배지로 보여 준다. */
export const KIND_LABEL: Record<Kind, string> = {
  concept: '개념',
  tool: '도구',
  protocol: '프로토콜·표준',
  pattern: '패턴',
  metric: '지표',
  regulation: '규제·인증',
}
