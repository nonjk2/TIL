# React 소개

## React란

### SPA

- 정의 :

### 기존과의 차이점 혹은 문제점

-

### SPA 특징과 장점

## 생성

<details>
      <summary>CRA말고 왜 VITE ?</summary>
      <div markdown="1">

-우선 CRA는 자바스크립트 코드로 구성된 툴인 Webpack을 사용.
자바스크립트는 기본적으로 interpreted 언어이기 때문에 느리다.
코드의 양이 적다면 차이를 느끼기 어려울 수도 있지만, 처리해야 할 코드 양이 방대한 경우에는 그 단점이 확실히 느껴짐.

`create-react-app` (CRA)과 `Vite`는 둘 다 React 애플리케이션을 생성하고 구성하는 도구 하지만 CRA 대신 Vite를 사용하는 이유는 아래와 같음.

1. **빠른 핫 모듈 교체(HMR)**: Vite는 `ESM (ECMAScript Modules)`를 사용하여 모듈을 브라우저에 직접 제공. 이를 통해 전체 페이지 새로 고침 없이 개발자가 수정한 내용을 빠르게 반영할 수 있다.

2. **최적화된 빌드 과정**: Vite는 Rollup을 사용하여 최종 프로덕션 빌드. Rollup은 불필요한 코드를 최대한 제거하는 트리 쉐이킹을 지원하여 최종 번들 크기를 최소화한다. 이것은 CRA가 사용하는 Webpack과 비교할 때 경쟁력이 있다.

3. **프레임워크에 독립적**: Vite는 React 외에도 Vue, Preact, LitElement 등 다양한 프론트엔드 프레임워크를 지원. 그래서 다른 프레임워크로 이동하거나 다양한 프레임워크를 함께 사용해야 할 경우 Vite가 유용할 수 있다.

4. **개발 서버 시작 시간**: Vite의 개발 서버 시작 시간은 CRA보다 빠르다.

5. **외부 플러그인 지원**: Vite는 Rollup 및 ESBuild 플러그인을 지원하므로 개발자가 필요한 기능을 쉽게 확장하고 커스터마이징할 수 있다.

6. **모듈 동적 가져오기 지원**: Vite는 모듈 동적 가져오기를 지원. 필요할 때 코드를 가져오는 능력으로 페이지 로드 속도를 빠르게 할 수 있다.

</div>
</details>

```js
<html>
  <body>
    <div id="app"></div>

    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/jsx">

      const app = document.getElementById("app")

      function Header({ title }) {
        return <h1>{title ? title : "Default title"}</h1>
      }

      function HomePage() {
        const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]

        const [likes, setLikes] = React.useState(0)

        function handleClick() {
          setLikes(likes + 1)
        }

        return (
          <div>
            <Header title="Develop. Preview. Ship. 🚀" />
            <ul>
              {names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>

            <button onClick={handleClick}>Like ({likes})</button>
          </div>
        )
      }
f
      ReactDOM.render(<HomePage />, app)
    </script>
  </body>
</html>
```

그냥 리액트의 모든것

## 컴파일이란 무엇입니까?

개발자는 JSX, TypeScript 및 최신 버전의 JavaScript와 같이 개발자에게 더 친숙한 언어로 코드를 작성합니다 . 이러한 언어는 개발자의 효율성과 자신감을 향상시키지만 브라우저에서 이해할 수 있으려면 먼저 JavaScript로 컴파일해야 합니다.

![컴파일](img/compiling.png)

컴파일이란 한 언어로 된 코드를 다른 언어 또는 해당 언어의 다른 버전으로 출력하는 프로세스를 말합니다.

Next.js에서 컴파일은 개발 단계에서 코드를 편집할 때 발생하며 프로덕션을 위해 애플리케이션을 준비하는 빌드 단계의 일부로 발생합니다.

## 번들링이란 무엇입니까?

개발자는 응용 프로그램을 더 큰 응용 프로그램을 구축하는 데 사용할 수 있는 모듈, 구성 요소 및 기능으로 나눕니다. 이러한 내부 모듈과 외부 타사 패키지를 내보내고 가져오면 파일 종속성의 복잡한 웹이 생성됩니다.

![번들링](img/bundling.png)
번들링은 사용자가 웹 페이지를 방문할 때 파일에 대한 요청 수를 줄이기 위해 종속성 웹을 해결하고 파일(또는 모듈)을 브라우저에 최적화된 번들로 병합(또는 '패키징')하는 프로세스입니다.
