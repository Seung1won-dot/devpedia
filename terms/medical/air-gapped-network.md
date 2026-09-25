---
id: air-gapped-network
term: 폐쇄망/망분리
aliases:
  - Air-gapped Network
  - 폐쇄망
  - 망분리
  - 인터넷 분리망
category: medical
tags:
  - 네트워크보안
  - 보안정책
  - 병원시스템
level: 2
related:
  - firewall
  - medical-data-law
  - gpu-cuda
  - container-registry
  - package-manager
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

환자 데이터가 있는 내부망을 **인터넷과 물리적·논리적으로 끊어 놓은** 네트워크 구성.

## 비유

금고 방에 **창문도 인터넷 선도 없는 것**. 밖에서 뭘 가져오려면 직원이 검사대를 거쳐 USB 로 들고 들어가야 한다.

## 예시

```text
[인터넷망 PC] ──(승인된 반입 절차: 망연계 서버 / 검역 USB)──▶ [폐쇄망 GPU 서버]
                                                            - pip install ✗ (외부 접속 없음)
                                                            - 사내 PyPI 미러 / 오프라인 wheel ✓
                                                            - Docker 이미지도 tar 로 반입
```

```bash
# 인터넷 PC 에서: 폐쇄망 서버(리눅스, Python 3.11) 용 wheel 을 미리 내려받기
pip download -r requirements.txt -d ./wheels \
    --platform manylinux2014_x86_64 --python-version 3.11 --only-binary=:all:
# 반입 후 폐쇄망에서
pip install --no-index --find-links ./wheels -r requirements.txt
```

연구실 현실: 병원 데이터로 학습하는 GPU 서버는 폐쇄망에 두는 게 조건이라, `pip install`·`git clone`·Hugging Face 다운로드가 안 된다. 사전학습 가중치·데이터셋·Docker 이미지를 밖에서 받아 반입 절차를 거쳐 넣고, 결과(가중치·집계표)를 내보낼 때도 승인이 필요하다. 병원은 개인정보보호법상 안전조치 의무의 하나로 망분리를 요구한다 [확인 필요].

## 헷갈리기 쉬운 것

- **물리적 망분리** 는 PC 두 대(업무망·인터넷망), **논리적 망분리** 는 한 PC 에서 가상화(VDI)로 두 망을 나누는 것. 병원·금융권은 둘 중 하나를 요구한다.
- **VPN** 은 인터넷을 "통해" 안전하게 들어가는 것이라 폐쇄망과 반대 방향의 개념. 폐쇄망은 애초에 인터넷 경로가 없고, 외부 접속이 꼭 필요하면 승인된 VPN + 망연계 서버 조합을 쓴다.
