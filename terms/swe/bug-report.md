---
id: bug-report
term: 버그 리포트/재현 조건
aliases:
  - Bug Report
  - 버그 리포트
  - 버그 신고
  - 재현 조건
  - 재현 단계
  - Steps to Reproduce
  - 최소 재현 예제(MRE)
category: swe
tags:
  - 협업
  - 품질
  - 흔한실수
level: 1
kind: concept
related:
  - github-issues
  - debugging
  - logging
  - exception
  - testing-levels
  - troubleshooting-story
  - mobile-crash-reporting
see_also:
  - https://stackoverflow.com/help/minimal-reproducible-example
status: review
created: 2026-10-02
updated: 2026-10-03
---

## 한 줄 정의

버그를 **남이 똑같이 재현할 수 있게** 환경·순서·기대·실제 결과를 적은 보고.

## 비유

병원에서 증상을 말하는 법. "아파요" 가 아니라 "어제 저녁 식후 30분부터 오른쪽 아랫배가 누르면 아프다" 라고 해야 의사가 바로 짚어 본다.

## 예시

```markdown
## 요약
DICOM 익명화 스크립트가 다중 프레임 파일에서 멈춤

## 환경
- anonymize.py v1.2.0 / Python 3.12 / Ubuntu 22.04 (Proxmox VM)
- pydicom 2.4.4

## 재현 순서
1. `python anonymize.py --in sample/multiframe.dcm --out out/`
2. 약 3초 뒤 CPU 100% 로 응답 없음 (5분 기다려도 동일)

## 기대 결과
out/ 에 익명화된 파일이 생긴다

## 실제 결과
무한 대기. Ctrl+C 를 누르면 트레이스백 마지막 줄:
`File "anonymize.py", line 88, in strip_private_tags ... RecursionError`

## 참고
단일 프레임 파일 20개는 정상. 로그: logs/anon-2026-10-01.log
```

다섯 칸 중 심장은 **재현 순서**다 — 재현이 안 되면 고칠 수도, 고쳤는지 확인할 수도 없다. 에러 메시지는 스크린샷 대신 텍스트로 붙인다(검색이 되고 복사가 된다). 의료 데이터라면 실제 환자 파일을 첨부하지 말고, 같은 증상이 나는 가명화 샘플이나 합성 파일로 **최소 재현 예제**를 만든다. GitHub Issues 의 이슈 폼으로 이 다섯 칸을 필수로 걸어 두면 "안 돼요" 한 줄짜리 신고가 사라진다.

## 헷갈리기 쉬운 것

- **기능 요청**은 "이렇게 됐으면 좋겠다", 버그는 "이렇게 된다고 했는데 안 된다". 라벨(`bug`/`enhancement`)로 처음부터 나눈다.
- **원인 추측**("아마 재귀 때문인 듯")은 적어도 되지만 사실(재현 조건)과 섞지 말고 따로 적는다. 추측이 틀리면 고치는 사람이 엉뚱한 곳을 판다.
- **"안 돼요"**: 환경·순서·기대·실제 중 하나라도 빠지면 첫 답변은 늘 "재현이 안 되는데요" 다.
