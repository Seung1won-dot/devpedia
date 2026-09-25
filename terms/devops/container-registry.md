---
id: container-registry
term: 컨테이너 레지스트리
aliases:
  - Container Registry
  - 이미지 저장소
  - Docker Hub / GHCR
  - 도커 레지스트리
category: devops
tags:
  - 컨테이너
  - 배포
  - CI/CD
level: 2
related:
  - docker-image
  - docker
  - github-actions
  - semver
  - kubernetes
see_also:
  - https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

만들어 둔 **Docker 이미지를 올려 두고 내려받는** 창고 서버.

## 비유

**컨테이너용 앱스토어**. 내가 만든 이미지를 올려 두면 어느 서버에서든 이름과 버전만 대고 내려받아 그대로 실행한다.

## 예시

```bash
docker build -t ghcr.io/eclab/hermes:1.2.0 .        # 이미지 만들기
echo "$GHCR_TOKEN" | docker login ghcr.io -u eclab --password-stdin
docker push ghcr.io/eclab/hermes:1.2.0              # 올리기
# GPU 서버에서
docker pull ghcr.io/eclab/hermes:1.2.0 && docker run -d ghcr.io/eclab/hermes:1.2.0
```

이미지 이름은 `레지스트리/소유자/이름:태그` 순서. GitHub Actions 에서 빌드해 GHCR 에 push 해 두면, 연구실 서버는 빌드 없이 pull 만 하면 된다.

## 헷갈리기 쉬운 것

- **Docker Hub vs GHCR**: 둘 다 레지스트리. Docker Hub 는 `nginx` 처럼 주소를 생략하면 기본으로 가는 곳, GHCR(ghcr.io)은 GitHub 저장소와 붙어 있어 Actions 에서 쓰기 편하다.
- **레지스트리 vs 리포지토리**: 레지스트리는 서버 전체, 리포지토리는 그 안의 이미지 하나(`eclab/hermes`)의 태그 모음.
