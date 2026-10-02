---
id: rollback
term: 롤백
aliases:
  - Rollback
  - 되돌리기
  - 이전 버전 복구
  - 배포 되돌리기
category: devops
tags:
  - 배포
  - 운영
level: 2
kind: pattern
related:
  - blue-green-canary
  - ci-cd
  - semver
  - snapshot-backup
  - migration
  - git-tag-release
  - feature-flag
see_also:
  - https://git-scm.com/docs/git-revert
status: review
created: 2026-09-25
updated: 2026-10-02
---

## 한 줄 정의

새 배포가 문제를 일으켰을 때 **직전 정상 버전으로 되돌리는** 것.

## 비유

폰 업데이트가 폰을 느리게 만들면 **이전 버전으로 되돌리는 것**. 원인을 찾는 건 그 다음 일이고, 일단 쓸 수 있는 상태부터 만든다.

## 예시

```bash
# Ender Chest (Vercel): 직전 배포를 다시 프로덕션으로 승격
vercel rollback
# Devpedia (GitHub Pages): 문제 커밋을 뒤집는 커밋을 올리면 Actions 가 재배포
git revert HEAD && git push
# 컨테이너: compose 의 image 태그를 1.4.2 → 1.4.1 로 고친 뒤 다시 띄우기
docker compose up -d api
```

롤백이 1분 안에 되려면 이전 버전이 아직 남아 있어야 한다. 그래서 이미지에 버전 태그를 붙이고(latest 만 쓰지 않기), DB 스키마 변경은 되돌릴 수 있게 나눠서 배포한다.

## 헷갈리기 쉬운 것

- **git revert vs git reset**: revert 는 "되돌리는 커밋"을 새로 만들어 이력을 보존, reset 은 이력을 지운다. 이미 push 한 것은 revert 로.
- **롤백 vs 백업 복구**: 롤백은 코드·이미지를 이전 버전으로, 백업 복구는 데이터(DB·파일)를 이전 시점으로. 코드만 되돌려도 DB 는 안 돌아간다.
