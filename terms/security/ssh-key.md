---
id: ssh-key
term: SSH 키 관리
aliases:
  - SSH Key
  - SSH 키
  - 공개키 인증
  - authorized_keys
  - ssh-keygen
category: security
tags:
  - 원격접속
  - 키관리
  - 연구실
  - 흔한실수
level: 1
kind: concept
related:
  - ssh
  - public-key-cryptography
  - key-rotation
  - fail2ban
  - secret-leak
  - brute-force
see_also:
  - https://man.openbsd.org/ssh-keygen
  - https://man.openbsd.org/sshd#AUTHORIZED_KEYS_FILE_FORMAT
status: review
created: 2026-10-02
updated: 2026-10-02
---

## 한 줄 정의

비밀번호 대신 **공개키를 서버에 등록해** SSH 로그인하고, 그 키를 관리하는 일.

## 비유

공개키는 **내가 서버 문에 달아 두는 자물쇠**, 개인키는 내 주머니 속 열쇠. 자물쇠는 누구에게 보여 줘도 되지만 열쇠는 복사해 돌리면 안 되고, 사람이 나가면 자물쇠를 떼야 한다.

## 예시

```bash
# 노트북마다 키 하나. passphrase 를 꼭 건다 — 노트북을 잃어버려도 바로는 못 쓰게
ssh-keygen -t ed25519 -C "may@laptop-2026"
cat ~/.ssh/id_ed25519.pub        # 서버에 보내는 건 이 .pub 한 줄뿐. .pub 없는 파일은 절대 밖으로 안 나간다

# 서버 쪽: 등록된 자물쇠 목록. 한 줄 = 사람(기기) 하나
cat ~/.ssh/authorized_keys
# ssh-ed25519 AAAAC3...  may@laptop-2026
# ssh-ed25519 AAAAC3...  kim@desktop
sed -i '/kim@desktop/d' ~/.ssh/authorized_keys          # 떠난 사람 자물쇠 떼기
chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys    # 권한이 느슨하면 sshd 가 키를 무시한다
```

규칙은 세 가지. (1) 키는 **사람이 아니라 기기 단위**로 만든다 — 노트북을 잃어버리면 그 한 줄만 지우면 된다. (2) `-C` 주석에 누구의 어느 기기인지 적어 둬야 나중에 떼어 낼 줄을 찾을 수 있다. (3) 같은 공개키를 GitHub Settings → SSH keys 에도 등록하면 `git push` 까지 비밀번호 없이 된다. passphrase 를 매번 치기 귀찮으면 `ssh-add` 로 ssh-agent 에 한 번만 풀어 둔다.

## 헷갈리기 쉬운 것

- **호스트 키**는 반대 방향 — 서버가 "내가 그 서버 맞다" 고 증명하는 키로 `~/.ssh/known_hosts` 에 쌓인다. 첫 접속 때 뜨는 fingerprint 질문이 이것이고, 어느 날 "호스트 키가 바뀌었다" 고 경고하면 서버를 재설치했거나 중간자가 끼어든 것이다.
- **개인키를 서버에 복사하는 실수** — 서버에서 `git pull` 하려고 노트북의 `id_ed25519` 를 올리는 것. 서버가 털리면 내 모든 접속이 같이 털린다. 서버용 키를 따로 만들어 GitHub Deploy key 로 등록하거나 `ssh -A` 에이전트 포워딩을 쓴다.
- **인증서(CA)** 는 TLS 쪽 이야기. SSH 는 CA 없이 공개키를 서버마다 직접 넣는 방식이라 서버가 100대면 100번 등록해야 한다 — 그게 귀찮아지면 SSH 인증서나 Tailscale SSH 를 본다.
