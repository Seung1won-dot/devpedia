---
id: scp-rsync
term: SCP/rsync
aliases:
  - scp
  - rsync
  - 원격 파일 복사
  - 알싱크
category: infra
tags:
  - 원격접속
  - 리눅스운영
  - 스토리지
level: 1
related:
  - ssh
  - snapshot-backup
  - backup-restore
  - file-permission
  - cron
see_also:
  - https://rsync.samba.org/documentation.html
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

SSH 위로 파일을 **원격 복사(scp)** 하거나 **바뀐 부분만 동기화(rsync)** 하는 명령.

## 비유

scp 는 상자를 통째로 **택배**로 보내는 것, rsync 는 지난번과 **달라진 물건만** 골라 보내는 똑똑한 택배. 매일 보내야 하면 두 번째가 훨씬 빠르다.

## 예시

```bash
# scp: 학습 결과 파일 하나를 GPU 서버에서 노트북으로
scp lab@gpu:/data/runs/exp01/best.pt ./
# rsync: 실험 폴더 전체를 바뀐 것만 동기화 (-a 권한·시간 유지, -z 압축, --delete 지운 것도 반영)
rsync -avz --delete --exclude 'checkpoints/' ./exp01/ lab@gpu:/data/runs/exp01/
# -n(dry-run) 으로 뭘 복사·삭제할지 먼저 확인
rsync -avzn --delete ./exp01/ lab@gpu:/data/runs/exp01/
```

끝의 슬래시(`exp01/`)가 있으면 "폴더 안 내용", 없으면 "폴더 자체" 가 복사되니 `-n` 으로 먼저 보는 습관을 들인다.

## 헷갈리기 쉬운 것

- **sftp** 는 SSH 위에서 FTP 처럼 대화식으로 파일을 넣고 빼는 것. FileZilla 같은 GUI 가 이걸 쓴다.
- **rsync 는 백업이 아니다.** `--delete` 를 쓰면 원본에서 지운 파일이 사본에서도 사라지므로, 실수 복구용으로는 스냅샷이 따로 필요하다.
