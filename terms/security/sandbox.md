---
id: sandbox
term: 샌드박스
aliases:
  - Sandbox
  - 샌드박싱
  - 격리 실행 환경
category: security
tags:
  - 보안
  - 컨테이너
  - 가상화
  - 에이전트
level: 2
kind: concept
related:
  - vm-vs-container
  - docker
  - least-privilege
  - agent
  - prompt-injection
  - kernel-user-mode
  - webassembly
see_also:
  - https://docs.docker.com/engine/security/
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

믿을 수 없는 코드를 **울타리 친 공간에서만 돌려** 밖의 시스템에 손대지 못하게 하는 격리 기법.

## 비유

아이들 **모래놀이터**. 그 안에서는 뭘 만들든 부수든 상관없지만, 울타리 밖 정원(진짜 시스템)으로는 모래가 넘어오지 못한다.

## 예시

연구실 LLM 에이전트가 "이 CSV 를 분석하는 코드" 를 만들어 냈다고 하자. 모델이 쓴 코드를 서버에서 그냥 실행하면 `rm -rf` 든 외부 전송이든 다 된다. 그래서 네트워크·파일시스템·자원을 전부 잘라 낸 컨테이너 안에서만 돌린다.

```bash
docker run --rm --network none --read-only --cap-drop ALL \
  --memory 512m --cpus 1 --tmpfs /tmp \
  -v "$PWD/untrusted.py:/app/run.py:ro" \
  python:3.12-slim timeout 30 python /app/run.py
```

네트워크 없음, 쓰기는 `/tmp` 만, 메모리 512MB·CPU 1개·30초 제한. 브라우저가 탭마다, 스마트폰이 앱마다 격리하는 것도 같은 원리다. 다만 컨테이너는 호스트와 **커널을 공유**하므로 커널 취약점이 뚫리면 탈출할 수 있다. 정말 모르는 코드(외부 제출물, 악성코드 분석)라면 gVisor 나 Firecracker 같은 마이크로 VM 으로 벽을 한 겹 더 두른다.

## 헷갈리기 쉬운 것

- **VM** 은 샌드박스를 만드는 수단 중 가장 두꺼운 벽이다. 샌드박스는 "격리해서 돌린다" 는 목적, VM·컨테이너·seccomp 는 그 수단.
- **컨테이너**는 기본 설정 그대로는 샌드박스라 부르기 어렵다. root 로 돌고 네트워크가 열려 있어서, 위 예시처럼 옵션을 잠가야 격리가 된다.
- 결제사 API 의 **샌드박스 모드**는 "가짜 돈으로 테스트하는 환경" 이라는 뜻으로, 보안 격리와는 다른 용법이다.
