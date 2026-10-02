---
id: iam
term: IAM
aliases:
  - Identity and Access Management
  - 아이엠
  - 계정·권한 관리
  - IAM 정책
  - IAM 역할
category: infra
tags:
  - 클라우드
  - 인가
  - 접근제어
  - 보안정책
level: 2
kind: concept
related:
  - least-privilege
  - authentication-authorization
  - rbac
  - aws-core-services
  - secrets-management
  - api-key
see_also:
  - https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

클라우드에서 **누가 어떤 자원에 무엇을 할 수 있는지** 정하는 계정·권한 체계.

## 비유

회사 **출입카드 시스템**. 사람마다(사용자) 또는 직책마다(역할) 어느 문(자원)을 열 수 있는지 등록해 두고, 등록 안 된 문은 카드를 대도 열리지 않는다.

## 예시

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::lab-datasets/ct/*"
  }]
}
```

```bash
aws sts get-caller-identity                            # 지금 내가 누구(어떤 사용자·역할)로 호출 중인지
aws s3 cp model.pt s3://lab-datasets/ct/model.pt       # 허용된 경로 → 성공
aws s3 ls s3://lab-datasets/mri/                       # 정책 밖 → AccessDenied
```

위 정책은 "이 버킷의 `ct/` 아래만 읽고 쓴다" 는 뜻이고, 이걸 **사용자**(사람, 장기 액세스 키) 나 **역할**(EC2·Lambda·GitHub Actions 가 잠깐 빌려 쓰는 임시 자격) 에 붙인다. 코드에 액세스 키를 박는 대신 EC2 에 역할을 붙이면 키 유출 사고 자체가 없어지고, GitHub Actions 에서 S3 로 배포할 때도 OIDC 로 역할을 빌리는 것이 키를 시크릿에 넣는 것보다 낫다. 루트 계정은 MFA 만 걸고 평소엔 안 쓰며, 처음엔 넓게 주고 싶어도 **최소 권한**으로 시작해 거부 로그를 보며 넓히는 쪽이 사고가 적다. GCP IAM·Azure RBAC 도 이름만 다르고 사용자·역할·정책의 구조는 같다.

## 헷갈리기 쉬운 것

- **인증/인가**: IAM 은 "누구인지 확인(인증)" 과 "무엇을 허용(인가)" 을 둘 다 다루지만 실무에서 설계하는 부분은 거의 인가(정책) 쪽이다.
- **IAM 사용자 vs IAM 역할**: 사용자는 사람에게 주는 영구 계정, 역할은 서비스나 사람이 잠깐 "되어 보는" 임시 자격. 서버·CI 에는 역할을 준다.
- **보안 그룹**은 네트워크 층에서 포트와 IP 를 거르고, IAM 은 API 호출 층에서 "이 작업을 해도 되나" 를 거른다. DB 포트는 보안 그룹, S3 접근은 IAM.
