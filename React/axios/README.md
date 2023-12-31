- [Axios 알아보자](#axios-알아보자)
- [1. 소개](#1-소개)
  - [1.1 axios란](#11-axios란)
  - [1.2 왜 axios를 사용해야 하는가?](#12-왜-axios를-사용해야-하는가)
  - [1.3 axios의 특징과 장점](#13-axios의-특징과-장점)
  - [2. 설치 및 기본 사용법](#2-설치-및-기본-사용법)
  - [2.1 axios 설치 방법](#21-axios-설치-방법)
  - [2.2 GET 요청 보내기](#22-get-요청-보내기)
  - [2.3 POST 요청 보내기](#23-post-요청-보내기)
  - [2.4 응답 처리하기](#24-응답-처리하기)
- [3. 고급 기능](#3-고급-기능)
  - [3.1 요청과 응답 인터셉터](#31-요청과-응답-인터셉터)
  - [3.2 동시에 여러 요청 보내기](#32-동시에-여러-요청-보내기)
  - [3.3 쿠키와 인증 처리하기](#33-쿠키와-인증-처리하기)
- [4. 설정과 활용##](#4-설정과-활용)
  - [4.1 기본 설정 변경하기##](#41-기본-설정-변경하기)
  - [4.2 인스턴스 생성과 커스터마이징##](#42-인스턴스-생성과-커스터마이징)
  - [4.3 axios와 함께 사용하는 Promise 기반 비동기 처리##](#43-axios와-함께-사용하는-promise-기반-비동기-처리)
- [5. 에러 처리와 예외 처리](#5-에러-처리와-예외-처리)
  - [5.1 HTTP 상태 코드 처리](#51-http-상태-코드-처리)
  - [5.2 네트워크 에러와 타임아웃 처리](#52-네트워크-에러와-타임아웃-처리)
  - [5.3 에러 핸들링과 예외 처리 방법](#53-에러-핸들링과-예외-처리-방법)
- [6. 효율적인 HTTP 요청 관리](#6-효율적인-http-요청-관리)
- [7. 테스팅과 디버깅](#7-테스팅과-디버깅)
  - [7.1 axios를 사용한 API 테스트](#71-axios를-사용한-api-테스트)
  - [7.2 개발자 도구와 axios 디버깅](#72-개발자-도구와-axios-디버깅)
  - [8. 활용해보자](#8-활용해보자)
  - [8.1 RESTful API와의 통신](#81-restful-api와의-통신)
  - [8.2 서버 사이드 렌더링과의 통합](#82-서버-사이드-렌더링과의-통합)
  - [9. 주의사항과 보안 고려사항](#9-주의사항과-보안-고려사항)
  - [9.1 CSRF 공격 방어와 보안 헤더 설정](#91-csrf-공격-방어와-보안-헤더-설정)
  - [9.2 인증과 토큰 관리에 대한 주의사항](#92-인증과-토큰-관리에-대한-주의사항)
  - [9.3 브라우저 환경에서의 쿠키 처리](#93-브라우저-환경에서의-쿠키-처리)
  - [10. axios vs fetch](#10-axios-vs-fetch)
  - [10.1 axios와 fetch의 차이점](#101-axios와-fetch의-차이점)
  - [10.2 어떤 상황에서 어떤 것을 선택해야 하는가?](#102-어떤-상황에서-어떤-것을-선택해야-하는가)

# Axios 알아보자

# 1. 소개

## 1.1 axios란

axios는 JavaScript를 사용하여 웹 브라우저 또는 Node.js에서 HTTP 요청을 쉽게 만들 수 있는 라이브러리다.

## 1.2 왜 axios를 사용해야 하는가?

- Promise API를 사용하여 비동기 처리를 쉽게 할 수 있다.
- HTTP 요청을 중단할 수 있다.
- HTTP 요청을 보내기 전후에 데이터를 변형하거나 처리할 수 있다.
- HTTP 요청에 대한 오류를 쉽게 처리할 수 있다.
- 단일 HTTP 요청을 쉽게 설정할 수 있다.

## 1.3 axios의 특징과 장점

axios 장점

- 요청과 응답 데이터의 변환 -> 원하는대로 데이터 변형가능
- HTTP 요청 취소가능.
- 타임아웃 설정가능.

## 2. 설치 및 기본 사용법

## 2.1 axios 설치 방법

아래로 설치

```bash
npm install axios
```

## 2.2 GET 요청 보내기

```ts
import axios, { AxiosResponse } from "axios";

axios
  .get<User>("/user?ID=12345")
  .then((response: AxiosResponse<User>) => {
    //response.data 의타입은 User
    console.log(response.data);
  })
  .catch((error: any) => {
    console.error(error);
  });

interface User {
  name: string;
  age: number;
}
```

## 2.3 POST 요청 보내기

```ts
import axios, { AxiosResponse } from "axios";

const data: User = {
  name: "Fred",
  lastName: "Flintstone",
};

axios
  .post<User>("/user", data)
  .then((response: AxiosResponse<User>) => {
    console.log(response.data);
  })
  .catch((error: any) => {
    console.error(error);
  });

interface User {
  name: string;
  lastName: string;
}
```

## 2.4 응답 처리하기

다음은 응답을 처리하는 예제코드

```ts
import axios, { AxiosResponse, CancelTokenSource } from "axios";

const source: CancelTokenSource = axios.CancelToken.source();

axios
  .get<User>("/user/12345", {
    cancelToken: source.token,
  })
  .catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // 다른 오류 처리
    }
  });

//요청취소
source.cancel("Operation canceled by the user.");

// 사용자 정의 User 타입
interface User {
  name: string;
  age: number;
}
```

# 3. 고급 기능

## 3.1 요청과 응답 인터셉터

axios 인터셉터를 사용하면 요청이나 응답을 그때그때 가공하거나 오류를 처리하는 등의 작업을 수행할 수 있다.

```ts
import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.authorization = `Bearer ${token}`;
  return config;
});
```

## 3.2 동시에 여러 요청 보내기

axios를 사용하면 `axios.all()` 함수를 이용하여 여러 개의 요청을 동시에 보낼 수 있다

```ts
import axios, { AxiosResponse } from "axios";

axios
  .all<AxiosResponse<User>[]>([
    axios.get<User>("/user?ID=12345"),
    axios.get<User>("/user/info?ID=12345"),
  ])
  .then(
    axios.spread((userRes: AxiosResponse<User>, userInfoRes: AxiosResponse<User>) => {
      console.log(userRes.data);
      console.log(userInfoRes.data);
    })
  );

// 사용자 정의 User 타입
interface User {
  name: string;
  age: number;
  //...다른 속성들
}
```

## 3.3 쿠키와 인증 처리하기

axios는 ## 쿠키나 인증 정보를 자동으로 처리하지는 않지만## , 요청 구성에서 이들을 쉽게 설정할 수 있다.

```ts
import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  withCredentials: true,
};

axios.get<User>("/user", config).then((response) => {
  console.log(response.data);
});

// 사용자 정의 User 타입
interface User {
  name: string;
  age: number;
}
```

# 4. 설정과 활용##

## 4.1 기본 설정 변경하기##

axios는 기본 설정을 제공하여 전역에서 사용할 수 있다.

```typescript
import axios from "axios";

axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = "Bearer your_token";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
```

## 4.2 인스턴스 생성과 커스터마이징##

axios는 개별 요청 또는 API 클라이언트의 고유한 설정을 가진 인스턴스를 만들수있다.

```typescript
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 1000,
  headers: { Authorization: `Bearer ${token}` },
});
```

## 4.3 axios와 함께 사용하는 Promise 기반 비동기 처리##

promise니깐 `async` `await` 사용하자

```typescript
import axios, { AxiosResponse } from "axios";

const getUser: Promise<void> = async () => {
  try {
    const response: AxiosResponse<User> = await axios.get<User>("/user?ID=12345");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// 사용자 정의 User 타입
interface User {
  name: string;
  age: number;
  //...다른 속성들
}
```

# 5. 에러 처리와 예외 처리

## 5.1 HTTP 상태 코드 처리

HTTP 상태 코드는 웹 서버에서 응답의 상태를 나나낸다.

```typescript
import axios, { AxiosError } from "axios";

axios.get("/user/12345").catch((error: AxiosError) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
});
```

## 5.2 네트워크 에러와 타임아웃 처리

네트워크 문제나 요청 타임아웃과 같은 일반적인 문제를 처리하는 방법.

```typescript
import axios, { AxiosError } from "axios";

axios
  .get("/user/12345", {
    timeout: 5000, // 타임아웃을 5초
  })
  .catch((error: AxiosError) => {
    if (error.code == "ECONNABORTED") {
      console.log(error.config.url);
      //타임아웃
    } else {
      console.log(error);
    }
  });
```

## 5.3 에러 핸들링과 예외 처리 방법

비동기적으로 발생하는 오류를 처리하는 가장 좋은 방법인 try/catch 블록을 사용하자

```typescript
import axios, { AxiosResponse, AxiosError } from "axios";

const getUser = async () => {
  try {
    const response: AxiosResponse<User> = await axios.get<User>("/user?ID=12345");
    console.log(response.data);
  } catch (error: AxiosError) {
    console.error(error);
  }
};
```

# 6. 효율적인 HTTP 요청 관리

axios는 HTTP 요청을 관리하는데 도움이 되는 기능들을 제공하지 않는다 예를들면 DevTools같은것을 ㅜ. 이를 위해서는 추가적인 라이브러리나 도구를 사용해야함.

# 7. 테스팅과 디버깅

## 7.1 axios를 사용한 API 테스트

axios 요청을 테스트하려면, 모킹 라이브러리를 사용하여 요청을 가로채고 가상의 응답 줄수 있다. `Jest`와 `axios-mock-adapter` 등을 사용.

## 7.2 개발자 도구와 axios 디버깅

Network 탭을 보는법을 배우자

## 8. 활용해보자

## 8.1 RESTful API와의 통신

각 CRUD

```typescript
import axios, { AxiosResponse } from "axios";

// GET 요청
axios.get("/users").then((response: AxiosResponse) => console.log(response.data));

// POST 요청
axios
  .post("/users", { name: "eun", ages: 30 })
  .then((response: AxiosResponse) => console.log(response.data));

// PUT 요청
axios
  .put("/users/1", { name: "eun", age: 31 })
  .then((response: AxiosResponse) => console.log(response.data));

// DELETE 요청
axios.delete("/users/1").then((response: AxiosResponse) => console.log(response.data));
```

## 8.2 서버 사이드 렌더링과의 통합

서버 사이드 렌더링(SSR)을 사용하면 초기 로드 시간을 줄이고 SEO를 개선할 수 있다.
물론 axios는 ssr에서도 잘작동함

## 9. 주의사항과 보안 고려사항

## 9.1 CSRF 공격 방어와 보안 헤더 설정

보안에 중요한 역할을 하는 헤더를 설정하는 것은 axios 사용 시 고려해야 할 중요한 사항이다. 예를 들어, CSRF 공격을 방어하기 위해 `X-CSRF-TOKEN` 헤더를 설정할 수 있다:

```typescript
axios.defaults.headers.common["X-CSRF-TOKEN"] = "your_csrf_token";
```

## 9.2 인증과 토큰 관리에 대한 주의사항

인증 토큰은 보통 `Authorization` 헤더를 통해 서버로 전송된다. ~~근데 요즘은 서버에서 `http only : true`를 통해 서버에서 관리해줌~~

```typescript
axios.defaults.headers.common["Authorization"] = "Bearer token";
```

## 9.3 브라우저 환경에서의 쿠키 처리

브라우저에서 axios를 사용할 때, `withCredentials` 옵션을 `true`로 설정하면 쿠키를 자동으로 포함시킬 수 있다

```typescript
axios.defaults.withCredentials = true;
```

## 10. axios vs fetch

## 10.1 axios와 fetch의 차이점

axios와 fetch는 모두 비동기 HTTP 요청을 보내는 데 사용되는 라이브러리다. 그러나 몇 가지 중요한 **차이점**이 있다. 예를 들어
`axios`는 HTTP 상태 코드 200-300 범위 이외의 응답을 자동으로 오류로 간주하는 반면
`fetch`는 네트워크 요청이 실패하지 않는 한 모든 응답을 성공으로 간주한다.

## 10.2 어떤 상황에서 어떤 것을 선택해야 하는가?

어떤 것을 선택할지 결정할 때는 여러 요소를 고려해야 한다. axios는 더 많은 기능을 제공하며, fetch는 브라우저 내장이므로 별도의 설치가 필요하지 않다. 사용 사례에 따라 적합한 선택이 다를 수 있다.
