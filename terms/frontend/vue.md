---
id: vue
term: Vue
aliases:
  - Vue.js
  - 뷰
  - 뷰JS
  - Nuxt
  - 뷰제이에스
category: frontend
tags:
  - JavaScript
  - 렌더링
level: 1
kind: tool
related:
  - react
  - nextjs
  - component-props-state
  - state-management
  - virtual-dom
  - html-css-js
see_also:
  - https://ko.vuejs.org/guide/introduction
status: review
created: 2026-09-29
updated: 2026-09-29
---

## 한 줄 정의

HTML 템플릿에 **데이터를 묶어 쓰는 방식**으로 배우기 쉬운 화면 프레임워크.

## 비유

React 가 **재료를 직접 볶는 요리**라면 Vue 는 **레시피 카드(템플릿)에 재료 이름만 적으면 되는 밀키트**. 결과는 비슷하고 시작 문턱이 낮다.

## 예시

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
const query = ref('')                                  // 반응형 상태
const terms = ['데드락', '뮤텍스', '세마포어']
const hits = computed(() => terms.filter((t) => t.includes(query.value)))
</script>

<template>
  <input v-model="query" placeholder="용어 검색" />     <!-- 양방향 바인딩 -->
  <ul><li v-for="t in hits" :key="t">{{ t }}</li></ul>
</template>
```

`v-model` 하나로 입력값과 상태가 서로 묶이고(React 는 `value` + `onChange` 두 줄), `v-if`·`v-for` 같은 디렉티브를 HTML 속성처럼 쓴다. 단일 파일 컴포넌트(`.vue`)에 script·template·style 이 한 파일에 들어가 구조가 한눈에 보인다. **Nuxt** 는 Vue 판 Next.js 로 라우팅·SSR 을 얹어 준다. 면접에서는 "React 와 Vue 의 차이는?" 으로 나오며 JSX vs 템플릿, 단방향 vs 양방향 바인딩, 생태계 크기로 답한다.

## 헷갈리기 쉬운 것

- **JSX vs 템플릿**: React 는 JS 안에 HTML 을 쓰고(로직이 자유로움), Vue 는 HTML 안에 지시어를 쓴다(구조가 잘 보임). 어느 쪽이 우월하다기보다 팀 관례와 취향이다.
- **채용 비중**: 국내 채용 공고는 React 가 훨씬 많고 Vue 는 공공·SI·일부 서비스 기업에서 보인다 [확인 필요]. 하나를 깊게 하면 다른 쪽으로 옮기는 건 빠르다.
- **Angular**: 셋 중 규칙이 가장 많은 프레임워크(TypeScript 필수, 의존성 주입). 대기업·엔터프라이즈 프로젝트에서 남아 있다.
