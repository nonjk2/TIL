# 에러 핸들링

## 에러 핸들링 기본 개념

### 에러와 예외의 차이

- **에러(Error)**: 프로그램 실행 중 발생한 예외나 오류를 일반적으로 나타냅니다. 에러는 프로그램의 비정상적인 상태를 나타내며, 예외가 처리되지 않으면 종종 프로그램이 중단될 수 있습니다.

- **예외(Exception)**: 에러의 일종으로, 프로그램 실행 중에 발생한 예외적인 상황을 나타냅니다. 예외는 예상치 못한 조건이나 상황으로 인해 발생할 수 있으며, 예외 처리를 통해 이를 관리할 수 있습니다.

### 예외 처리의 필요성

- 프로그램 안정성: 예외 처리를 통해 예상치 못한 상황에 대응하여 프로그램이 안정적으로 동작할 수 있도록 보장합니다.

- 디버깅 및 유지보수: 예외 처리는 프로그램에서 발생한 에러를 기록하고 디버깅 정보를 제공하여 개발자가 문제를 신속하게 해결할 수 있도록 돕습니다.

### 에러 핸들링의 장점과 이점

- Graceful한 실패 처리: 예외 처리를 통해 프로그램은 일부 작업이 실패하더라도 graceful하게 처리하고 계속 실행될 수 있습니다.

- 사용자 경험 향상: 사용자에게 친숙한 에러 메시지를 제공하여 사용자 경험을 향상시킵니다.

- 시스템 안정성: 예외 처리를 통해 예상치 못한 예외로 인한 시스템 전체의 중단을 방지하고 안정성을 유지할 수 있습니다.

## 에러 핸들링의 기본 원칙

1. try-catch

```js
try {
  // 예외가 발생할 수 있는 코드
  throw new Error("예외 발생!");
} catch (error) {
  console.error("에러 발생:", error.message);
}
```

2. throw

```js
function throwError() {
  throw new Error("직접 예외 발생!");
}

try {
  throwError();
} catch (error) {
  console.error("에러 발생:", error.message);
}
```

## try-catch와 비동기 catch메서드

`try-catch` 블록과 `then-catch` 블록은 비동기 코드에서 예외를 처리하는 두 가지 주요 방법입니다.

### 1. **try-catch 블록**

#### 특징:

- 동기 코드에서 주로 사용됩니다.
- 코드 블록 내에서 동기적으로 예외를 감지하고 처리합니다.
- 에러 핸들링이 즉시 발생하며, 코드 흐름이 바로 중단됩니다.

#### 예제:

```javascript
try {
  // 동기적으로 예외 발생
  throw new Error("동기적 예외 발생!");
} catch (error) {
  console.error("에러 발생:", error.message);
}
```

### 2. **then-catch 블록 (Promise 기반)**

#### 특징:

- 비동기 코드에서 주로 사용됩니다.
- `Promise` 객체의 `then` 메소드를 사용하여 비동기적으로 예외를 처리합니다.
- 에러가 발생하면 `catch` 블록으로 이동하며, 코드 흐름이 중단되지 않습니다.

#### 예제:

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 비동기적으로 예외 발생
  reject(new Error("비동기적 예외 발생!"));
});

myPromise
  .then((result) => console.log(result))
  .catch((error) => console.error("에러 발생:", error.message));
```

### 차이점:

1. **동기/비동기:**

   - `try-catch`: 동기 코드에서 사용되며, 즉시 예외를 감지합니다.
   - `then-catch`: 비동기 코드에서 주로 사용되며, `Promise` 객체의 상태가 변경될 때까지 기다린 후 예외를 처리합니다.

2. **사용 시점:**
   - `try-catch`: 주로 동기 코드에서 사용되고, 예외가 발생하는 순간 즉시 처리해야 할 때 유용합니다.
   - `then-catch`: 비동기적인 작업이 완료된 후에 예외를 처리해야 할 때 유용합니다.

### 왜 try-catch를 더 많이 사용하는지:

1. **동기 코드에서의 간편한 사용:**

   - 동기 코드에서는 `try-catch`가 예외를 간편하게 처리하는 방법입니다.

2. **직관성:**

   - `try-catch`는 예외와 관련된 코드를 한 곳에 집중시키므로 코드의 가독성이 향상됩니다.

3. **즉각적인 예외 처리:**

   - `try-catch`는 예외가 발생하는 순간에 즉시 처리되므로, 디버깅과 유지보수가 간편합니다.

4. **비동기 코드의 복잡성 감소:**
   - `then-catch`는 비동기 코드에서 사용되지만, 동기 코드에서도 사용 가능한 `async/await`와 함께 사용되면 코드의 일관성을 유지하면서 간편한 예외 처리가 가능합니다.

두 가지 방법은 각각의 상황에 맞게 사용됩니다. 동기 코드에서는 `try-catch`가 간편하고 직관적이며 빠른 예외 처리를 제공하며, 비동기 코드에서는 `then-catch`가 비동기성을 다루는 데 효과적입니다.

## ErrorBoundary

`ErrorBoundary`는 React에서 제공하는 특별한 컴포넌트로, 자식 컴포넌트 트리 전체에서 발생하는 JavaScript 에러를 catch하고 이를 처리할 수 있도록 도와줍니다. 이를 통해 애플리케이션 전반에 걸친 예외를 관리하고 사용자에게 친화적인 에러 메시지를 표시할 수 있습니다.

### 1. **ErrorBoundary 컴포넌트 생성**

먼저, `ErrorBoundary` 컴포넌트를 생성합니다.

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생한 경우, 대체 UI를 보여줄 수 있습니다.
      return (
        <div>
          <h1>죄송합니다. 뭔가 문제가 발생했습니다.</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // 에러가 없는 경우 자식 컴포넌트를 그대로 렌더링합니다.
    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 2. **ErrorBoundary 적용**

이제 `ErrorBoundary` 컴포넌트를 사용하여 예외가 발생한 경우에 대한 UI를 정의하고 적용합니다.

```jsx
import React from "react";
import ErrorBoundary from "./ErrorBoundary";

class YourComponent extends React.Component {
  render() {
    // ErrorBoundary로 감싸기
    return (
      <ErrorBoundary>
        {/* 여기에 자식 컴포넌트들을 위치시킵니다. */}
        <YourOtherComponents />
      </ErrorBoundary>
    );
  }
}

export default YourComponent;
```

### 3. **테스트 및 확인**

이제 `YourComponent` 안에서 발생하는 에러는 `ErrorBoundary`에서 캐치되고, 에러가 발생한 경우에는 대체 UI가 보여집니다. 이를 통해 사용자에게 친화적인 에러 메시지를 제공하고, 개발자에게는 디버깅 정보를 제공합니다.

이렇게하면 애플리케이션의 특정 부분에서 발생하는 예외에 대한 처리를 중앙에서 관리하고, 에러가 전체 애플리케이션을 중단시키지 않도록 할 수 있습니다.

### 그렇다면 함수형 컴포넌트에서는 ?

함수형 컴포넌트에서도 `ErrorBoundary`를 사용할 수 있습니다. React 16.8 이상에서 도입된 Hooks를 사용하면 클래스형 컴포넌트의 특성 중 일부를 함수형 컴포넌트에서도 활용할 수 있게 되었습니다. 그 중에서도 `useEffect`와 `useState`를 사용하여 함수형 컴포넌트에서 에러를 처리할 수 있습니다.

다음은 함수형 컴포넌트에서 `ErrorBoundary`를 사용하는 예제입니다.

```jsx
import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      setErrorInfo(errorInfo);
    };

    // 에러 핸들링 함수를 등록
    window.addEventListener("error", handleError);

    return () => {
      // 컴포넌트가 언마운트되면 등록한 핸들러를 제거
      window.removeEventListener("error", handleError);
    };
  }, []); // 빈 배열을 전달하여 한 번만 등록하도록 함

  if (hasError) {
    // 에러가 발생한 경우, 대체 UI를 보여줌
    return (
      <div>
        <h1>죄송합니다. 뭔가 문제가 발생했습니다.</h1>
        <p>{error && error.toString()}</p>
        <details style={{ whiteSpace: "pre-wrap" }}>
          {errorInfo && errorInfo.componentStack}
        </details>
      </div>
    );
  }

  // 에러가 없는 경우 자식 컴포넌트를 그대로 렌더링
  return children;
};

export default ErrorBoundary;

// 함수형 컴포넌트에서 ErrorBoundary 사용 예제
const YourFunctionalComponent = () => {
  return (
    <ErrorBoundary>
      {/* 여기에 자식 컴포넌트들을 위치시킵니다. */}
      <YourOtherFunctionalComponents />
    </ErrorBoundary>
  );
};
```

함수형 컴포넌트에서도 `useState`와 `useEffect`를 사용하여 클래스형 컴포넌트의 `componentDidCatch`와 유사한 에러 핸들링을 할 수 있습니다.

## 메이저한 에러처리 예제

```ts
// Custom Error 객체 생성 함수
const createHttpError = (status, defaultMessage) => ({
  status,
  message: defaultMessage || `HTTP 오류! 상태 코드: ${status}`,
});

// HTTP 에러 처리 함수
const handleHttpError = async (response) => {
  if (!response.ok) {
    const { status } = response;

    switch (status) {
      case 400:
        throw createHttpError(400, "잘못된 요청입니다.");
      case 401:
        throw createHttpError(401, "인증에 실패했습니다.");
      case 403:
        throw createHttpError(403, "접근이 금지되었습니다.");
      case 404:
        throw createHttpError(404, "요청한 리소스를 찾을 수 없습니다.");
      case 500:
        throw createHttpError(500, "서버 내부 오류가 발생했습니다.");
      default:
        throw createHttpError(status);
    }
  }
};

// HTTP 요청 함수
const fetchData = async <T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  method,

}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  method: "GET" | "POST" | etc..
}): Promise<{ status: number; body: T } | never> => {
    const url = `http://error.error.com`
    if (method === 'GET' && query) {
    const queryString = Object.entries(query)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    url += `?${queryString}`;
  }
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: method === 'POST' ? JSON.stringify({
        ...(query && { query }),
      }) : undefined, // POST 메서드인 경우에만 body 추가
      cache,
      ...(tags && { next: { tags } }),
    });

    // HTTP 오류 응답 처리
    await handleHttpError(response);

    // 성공적인 응답의 경우 데이터를 가져옴
    const data = await response.json();
    console.log("데이터:", data);
  } catch (error) {
    // 다양한 종류의 에러 처리
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error("네트워크 오류:", error.message);
    } else if (error.status) {
      console.error("HTTP 에러:", error.message);
    } else if (error instanceof SyntaxError) {
      console.error("JSON 파싱 오류:", error.message);
    } else {
      console.error("알 수 없는 에러:", error.message);
    }
  }
};

// fetchData 함수 호출
fetchData({
  url,
  method: 'POST',
  query: {
    key1: 'value1',
    key2: 'value2',
  },
})
```

## throw된 에러

에러 바운더리에서 처리
