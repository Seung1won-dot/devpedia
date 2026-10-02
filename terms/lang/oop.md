---
id: oop
term: 객체지향(OOP)
aliases:
  - Object-Oriented Programming
  - 객체지향 프로그래밍
  - 객체 지향
  - OOP
category: lang
tags:
  - OOP
  - 면접
level: 1
kind: concept
related:
  - class-instance
  - inheritance-polymorphism
  - functional-programming
  - design-pattern
  - solid
  - metaprogramming
see_also:
  - https://docs.python.org/3/tutorial/classes.html
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

데이터와 그걸 다루는 함수를 **객체**라는 한 덩어리로 묶어 짜는 방식.

## 비유

**자판기**. 안에 돈통과 음료(데이터)가 있고 버튼(함수)만 밖으로 나와 있어서, 쓰는 사람은 내부 구조를 몰라도 버튼만 누르면 된다.

## 예시

```python
class Sensor:
    def __init__(self, name):
        self.name, self.readings = name, []      # 데이터
    def add(self, value):                        # 그 데이터를 다루는 함수(메서드)
        self.readings.append(value)
    def mean(self):
        return sum(self.readings) / len(self.readings)

temp = Sensor("병실 온도")
temp.add(24.1); temp.add(24.8)
print(temp.mean())   # 24.45 — 리스트가 어디 있는지 몰라도 된다
```

## 헷갈리기 쉬운 것

- **클래스/인스턴스**는 OOP 를 구현하는 도구이고, OOP 는 "묶어서 생각하는 방식" 그 자체다.
- **함수형 프로그래밍**은 반대로 데이터와 함수를 떼어 놓고, 데이터를 바꾸지 않는 쪽을 택한다. React 코드는 이쪽에 가깝다.
