---
id: osi-model
term: OSI 7계층
aliases:
  - OSI 7 Layer Model
  - OSI 참조 모델
  - "7계층 모델"
  - TCP/IP 4계층
category: network
tags:
  - TCP/IP
  - 프로토콜
  - 표준화
  - 면접
level: 2
kind: concept
related:
  - tcp-udp
  - ip-address
  - http
  - tls
  - port
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

네트워크 통신을 **역할별로 7개 층으로 나눠** 설명하는 기준 틀.

## 비유

**택배 회사의 분업**. 상자에 물건 넣는 사람(응용), 주소 라벨 붙이는 사람(네트워크), 트럭 모는 사람(물리)이 따로 있어서, 문제가 나면 어느 단계 탓인지 바로 좁힐 수 있다.

## 예시

| 층 | 이름 | 연구실에서 만나는 것 (대략) |
|---|---|---|
| 7 | 응용 | HTTP, DNS, SSH, Ollama API |
| 6 | 표현 | TLS 암호화, JSON 직렬화 |
| 5 | 세션 | 연결 유지(keep-alive), WebSocket 세션 |
| 4 | 전송 | TCP/UDP, 포트 번호 |
| 3 | 네트워크 | IP 주소, 라우터, Tailscale 터널 |
| 2 | 데이터링크 | MAC 주소, 스위치, Proxmox 의 vmbr0 브리지 |
| 1 | 물리 | 랜선, 광케이블, Wi-Fi 전파 |

"서버에 안 붙어요" 는 아래층부터 확인한다:

```bash
ping 192.168.10.20          # 3층: IP 까지 닿나
nc -zv 192.168.10.20 443    # 4층: 포트가 열려 있나
curl -I https://notes.lab.example.com   # 7층: 앱이 답하나
```

## 헷갈리기 쉬운 것

- **TCP/IP 4계층**은 실제 인터넷이 쓰는 더 단순한 모델(응용·전송·인터넷·링크). OSI 7층은 교과서·면접용 기준 틀이고, 5~7층은 현실에선 뭉뚱그려 "응용"이다.
- 층 번호는 **L4 로드밸런서, L7 방화벽** 처럼 장비 설명에 그대로 나온다. L4 는 포트까지만, L7 은 HTTP 내용까지 본다는 뜻.
