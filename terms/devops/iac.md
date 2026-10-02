---
id: iac
term: IaC(Terraform/Ansible)
aliases:
  - Infrastructure as Code
  - 코드형 인프라
  - 인프라 자동화
  - 테라폼/앤서블
category: devops
tags:
  - IaC
  - 서버운영
  - 배포
level: 3
kind: tool
related:
  - docker-compose
  - proxmox
  - vm
  - ci-cd
  - ssh
see_also:
  - https://developer.hashicorp.com/terraform/docs
status: review
created: 2026-09-25
updated: 2026-09-25
---

## 한 줄 정의

서버·네트워크 설정을 **클릭 대신 코드 파일로** 적어 자동으로 만드는 방식.

## 비유

가구를 눈대중으로 조립하는 대신 **조립 설명서를 써 두는 것**. 설명서만 있으면 누가 해도, 몇 번을 해도 똑같은 가구가 나온다.

## 예시

```yaml
# ansible/gpu-server.yml — 연구실 GPU 서버 초기 세팅
- hosts: gpu
  become: true
  tasks:
    - apt: { name: [nvidia-driver-550, docker.io], state: present }
    - user: { name: lab, groups: docker, append: true }
    - copy: { src: node_exporter.service, dest: /etc/systemd/system/ }
```

`ansible-playbook -i hosts gpu-server.yml` 한 줄로 새 GPU 서버를 똑같은 상태로 맞춘다. Terraform 은 VM·클라우드 자원을 "만드는" 쪽, Ansible 은 만들어진 서버 "안을 설정하는" 쪽에 강하다.

## 헷갈리기 쉬운 것

- **Terraform vs Ansible**: Terraform 은 "VM 3대, 네트워크 1개가 있어야 함" 같은 최종 상태를 선언하고 자원을 만든다. Ansible 은 이미 있는 서버에 SSH 로 들어가 패키지 설치·설정을 한다. 둘을 같이 쓰는 경우가 많다.
- **Docker Compose** 도 "코드로 적는 설정"이지만 범위가 컨테이너 묶음 하나. IaC 는 서버·네트워크·계정까지 다룬다.
