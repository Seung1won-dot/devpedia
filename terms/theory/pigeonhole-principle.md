---
id: pigeonhole-principle
term: 비둘기집 원리
aliases:
  - Pigeonhole Principle
  - 서랍 원리
  - 디리클레 원리
category: theory
tags:
  - 이산수학
  - 해시
level: 1
kind: concept
related:
  - hash-collision
  - hash-table
  - hash
  - combinatorics
  - proof-techniques
status: review
created: 2026-10-03
updated: 2026-10-03
---

## 한 줄 정의

물건이 상자보다 많으면 **어떤 상자엔 반드시 둘 이상** 들어간다는 원리.

## 비유

**양말 서랍**. 검정·흰색 양말이 섞인 서랍에서 불 끄고 세 짝만 꺼내면 같은 색 한 켤레는 무조건 나온다.

## 예시

```python
# 해시 테이블 버킷 8개에 키 9개를 넣으면 충돌은 '운'이 아니라 필연
buckets = [[] for _ in range(8)]
for key in range(9):
    buckets[hash(key) % 8].append(key)
print(max(len(b) for b in buckets) >= 2)   # 항상 True
```

**해시 충돌이 없는 해시 함수는 불가능하다**는 근거다. SHA-256 출력은 2^256 가지뿐인데 입력 파일은 무한히 많으니 같은 해시를 갖는 두 파일은 반드시 존재한다. 그래서 안전한 해시는 "충돌이 없다"가 아니라 "충돌을 **찾기 어렵다**"를 목표로 한다. 손실 없는 압축이 모든 파일을 줄일 수 없는 것도 같은 이유.

## 헷갈리기 쉬운 것

- 원리는 "적어도 하나의 상자에 둘 이상"만 말한다. **어느 상자인지**는 알려 주지 않는다.
- **생일 문제**와 다르다. 생일 문제는 상자보다 물건이 훨씬 적어도 충돌 확률이 생각보다 높다(23명이면 약 50%)는 확률 이야기다.
