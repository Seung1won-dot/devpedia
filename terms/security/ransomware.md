---
id: ransomware
term: 랜섬웨어
aliases:
  - Ransomware
  - 랜섬웨어
  - 몸값 요구 악성코드
  - 파일 암호화 악성코드
category: security
tags:
  - 보안
  - 백업
  - 의료데이터
level: 1
kind: concept
related:
  - backup-restore
  - snapshot-backup
  - backup-321
  - phishing
  - encryption
  - air-gapped-network
see_also:
  - https://www.cisa.gov/stopransomware
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

파일을 **몰래 암호화해 잠근 뒤** 풀어 주는 대가로 돈을 요구하는 악성코드.

## 비유

집에 든 도둑이 물건을 가져가는 대신 **모든 서랍에 자기 자물쇠를 채우고** "열쇠 값 내놔" 하는 것. 서랍 내용물의 복사본이 다른 집에 있다면 자물쇠째 버리고 새로 꺼내면 된다.

## 예시

흔한 시나리오: 연구원 노트북에 메일 첨부파일로 들어온 악성코드가 노트북 파일을 암호화하고, 네트워크 드라이브로 연결된 **연구실 NAS 공유 폴더까지** 같이 잠근다. NAS 에 매일 rsync 로 "백업" 하고 있었다면 암호화된 파일이 그대로 덮어써져 백업도 함께 사라진다.

그래서 방어의 핵심은 **감염된 기기가 손댈 수 없는 이전 버전**을 남기는 것이다.

```bash
# restic: 덮어쓰지 않고 시점별 스냅샷을 쌓는다 (저장소는 NAS 쪽)
restic -r sftp:backup@nas:/srv/restic backup /srv/lab-data
restic -r sftp:backup@nas:/srv/restic snapshots            # 감염 전 시점 고르기
restic -r sftp:backup@nas:/srv/restic restore latest --target /srv/restore
```

저장소 쪽에서 삭제를 막아 두면(restic rest-server 의 append-only 모드 등) 감염된 기기가 과거 스냅샷을 지울 수 없다. 여기에 3-2-1 규칙(사본 3개·매체 2종·외부 1개)대로 한 부는 오프라인이나 폐쇄망에 둔다. 감염을 발견하면 네트워크 케이블부터 뽑아 번지는 것을 막고, 돈은 내지 않는다 — 내도 키를 준다는 보장이 없고, 국내는 KISA 118 로 신고한다. 병원은 EMR 이 멈추면 진료가 멈추기 때문에 공격자가 즐겨 노리는 표적으로 꼽힌다. [확인 필요]

## 헷갈리기 쉬운 것

- **스냅샷**은 같은 디스크 안의 되돌리기 지점이라, 그 서버가 감염돼 관리자 권한을 뺏기면 스냅샷도 같이 지워질 수 있다. 감염 기기에서 삭제할 수 없는 곳(NAS 쪽 스냅샷·오프라인 백업)에 있어야 백업이다.
- **암호화**는 기술 자체로는 내 데이터를 지키는 수단이고, 랜섬웨어는 같은 기술을 공격자가 자기 키로 쓰는 것. 저장 중 암호화를 해 둬도 랜섬웨어는 그 위에 한 번 더 잠근다.
- **피싱**은 들어오는 문(전달 경로)이고 랜섬웨어는 들어와서 하는 일(결과). 첨부파일을 안 열면 가장 흔한 입구 하나가 닫힌다.
