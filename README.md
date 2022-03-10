# livecode-study_mall

매일 유튜브 스트리밍으로 진행하는 스터디 - 쇼핑몰 만들기

## 학습 내용

react / react-router / react-query / typescript / vite / express / firebase / vercel

### 상세

- 상태관리 : recoil
- GraphQL :

## 공식사이트

- [Mock Service Worker](https://mswjs.io/)

## 참조

- https://keencho.github.io/posts/react-vite-routing/

## 생각해볼거리

- [recoil](https://recoiljs.org/ko/) : 상태관리

- new Map() vs {}

  ```jsx
  const obj = { a: 1, b: 2, c: 3 };
  const arr = Object.entries(obj);
  console.log(arr);

  // map의 경우 key에 문자열 이외의 값도 넣을 수 있다.
  const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);
  console.log([...map.entries()]);
  ```

- 명세를 미리 만들기

  - mock, msw
    : Server 구현 전에 임시로

- GraphQL 장점
  : 서버에서만 필요한 데이터를 받지 않을 수 있음
  : 필요한 데이터만 요청할 수 있음
  rest vs graphql

  ```jsx
  // 사실상 request 2번
  Promise.all(product, user)

  // 쿼리를 통해 한번에 받아올 수 있다.
  Query {
    product {

    }

    user {

    }
  }
  ```
