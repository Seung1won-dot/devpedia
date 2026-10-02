---
id: cloud-init
term: cloud-init
aliases:
  - 클라우드 이닛
  - 클라우드-init
  - VM 초기 설정 자동화
  - user-data
category: infra
tags:
  - 가상화
  - 클라우드
  - IaC
  - 서버운영
level: 2
kind: tool
related:
  - proxmox
  - vm
  - iac
  - ssh-key
  - vps
  - ssh
see_also:
  - https://cloudinit.readthedocs.io/
  - https://pve.proxmox.com/wiki/Cloud-Init_Support
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

VM 이 **처음 켜질 때 사용자·SSH 키·네트워크를 자동으로 넣어 주는** 초기화 도구.

## 비유

새 휴대폰을 켜면 나오는 **초기 설정 마법사**를 미리 답안지로 채워 두는 것. 상자를 열자마자 내 계정과 와이파이가 이미 들어가 있어 바로 쓸 수 있다.

## 예시

```bash
# (한 번만) Ubuntu 클라우드 이미지로 Proxmox 템플릿 만들기
wget https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img
qm create 9000 --name ubuntu-2404-tpl --memory 2048 --cores 2 --net0 virtio,bridge=vmbr0
qm importdisk 9000 noble-server-cloudimg-amd64.img local-lvm
qm set 9000 --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-9000-disk-0 --boot order=scsi0
qm set 9000 --ide2 local-lvm:cloudinit                 # 설정을 담아 넣을 cloud-init 디스크
qm set 9000 --ciuser eclab --sshkeys ~/.ssh/id_ed25519.pub --ipconfig0 ip=dhcp
qm template 9000

# (매번) 복제 세 줄이면 "SSH 바로 되는" VM 이 1분 안에 나온다
qm clone 9000 121 --name rag-dev --full
qm set 121 --ipconfig0 ip=192.168.10.121/24,gw=192.168.10.1
qm start 121 && ssh eclab@192.168.10.121
```

Proxmox 가 사용자·키·IP 를 작은 가상 CD(ide2)에 담아 꽂아 주면, VM 안에 미리 들어 있는 cloud-init 가 첫 부팅에 그걸 읽어 적용한다. AWS 의 EC2 user-data, 대부분의 VPS 가 같은 메커니즘이라 클라우드 이미지라면 어디서나 통한다. 패키지 설치처럼 더 복잡한 것은 `--cicustom` 으로 user-data YAML 을 직접 넘긴다.

## 헷갈리기 쉬운 것

- **Ansible/IaC** 는 이미 켜진 서버에 SSH 로 들어가 반복 설정하는 것, cloud-init 는 첫 부팅 한 번만 돈다. cloud-init 로 SSH 되게 만든 뒤 Ansible 로 나머지를 하는 조합이 흔하다.
- **ISO 설치**는 설치 화면을 사람이 클릭하는 방식. 클라우드 이미지 + cloud-init 는 설치 과정 자체가 없다.
- **Dockerfile** 은 이미지를 빌드할 때 돌지만, cloud-init 는 VM 이 켜질 때 돈다.
