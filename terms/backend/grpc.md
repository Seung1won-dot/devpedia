---
id: grpc
term: gRPC
aliases:
  - gRPC Remote Procedure Call
  - 지알피씨
  - Protocol Buffers
  - Protobuf
  - 프로토버프
category: backend
tags:
  - API설계
  - HTTP
  - 프로토콜
level: 3
kind: protocol
related:
  - rest
  - graphql
  - http-versions
  - microservices
  - json
  - api
  - serialization
status: review
created: 2026-09-29
updated: 2026-10-02
---

## 한 줄 정의

HTTP/2 위에서 **Protobuf 로 정의한 함수를 원격에서 부르듯** 서버를 호출하는 통신 방식.

## 비유

옆 부서에 자유 형식 메모(JSON)를 보내는 대신 **칸이 정해진 전표**를 내미는 것. 읽고 쓰기가 빠르고, 칸을 잘못 채우면 접수 자체가 안 된다.

## 예시

```protobuf
syntax = "proto3";
service Embedder {
  rpc Embed (EmbedRequest) returns (EmbedReply);   // 함수 시그니처처럼 정의
}
message EmbedRequest { string text = 1; }
message EmbedReply   { repeated float vector = 1; }
```

```python
channel = grpc.insecure_channel("gpu-server:50051")
stub = embed_pb2_grpc.EmbedderStub(channel)
reply = stub.Embed(embed_pb2.EmbedRequest(text="심전도 판독 요약"))   # 그냥 함수 호출처럼
print(len(reply.vector))                                              # 1024
```

`.proto` 파일 하나에서 Python·Java·Go 클라이언트/서버 코드가 생성되므로 필드 이름 오타나 타입 불일치는 컴파일 때 잡힌다. 바이너리라 JSON 보다 작고 빠르며, HTTP/2 덕에 연결 하나로 요청을 겹쳐 보내고 양방향 스트리밍도 된다. 단점은 **브라우저가 직접 못 부른다**는 것(grpc-web + Envoy 같은 프록시 필요)과 `curl` 로 못 읽어 디버깅이 불편하다는 것. 그래서 외부 공개 API 는 REST, API 서버 ↔ GPU 임베딩 서버 같은 **내부 서비스 간 호출**에 gRPC 를 쓰는 조합이 흔하다. 면접에서는 "REST 와 gRPC 의 차이, 언제 gRPC 를 고르나?" 로 나온다.

## 헷갈리기 쉬운 것

- **REST** 는 "자원에 HTTP 메서드" 로 생각하고 JSON 텍스트를 주고받는다. gRPC 는 "함수를 부른다" 로 생각하고 바이너리를 주고받으며, HTTP 상태 코드 대신 자체 상태 코드를 쓴다.
- **GraphQL** 은 클라이언트가 필드를 골라 받는 유연함이 핵심이고, gRPC 는 스키마가 고정된 대신 빠르고 타입이 강하다. 브라우저 친화적인 건 GraphQL 쪽.
- **RPC** 는 "원격 함수 호출" 이라는 오래된 개념이고 gRPC 는 그 구현체 중 하나. JSON-RPC, tRPC 도 RPC 다.
