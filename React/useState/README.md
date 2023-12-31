# State란

- react docs에서 `state` 를 컴포넌트 별 **메모리**라고 부른다. `state` 가 변경 되는 컴포넌트는 화면의 표시되는 내용이 바뀐다.

자세히 예를 들면 Caroucel 에서 다음버튼을 누르면 이미지가 바뀌어야 하고 , 장바구니 담기 버튼을 누르면 장바구니에 제품이 장바구니에 담겨야한다.

그리고 컴포넌트는 입력 값 , 이미지 , 장바구니 등을 기억해야한다.
`React` 에서 이러한 컴포넌트별 메모리를 State라고한다.
<br>

## useState

<br>
`useState`를 기술 하기에 앞서 일반 변수로 위와같은것이 가능한지 알아보자.

```jsx
export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>Next</button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
```

출처 : [React Docs](https://react.dev/learn/state-a-components-memory)

- `handleClick` 함수로 index를 바꿔 데이터를 핸들링 하고 있다. 하지만 React에서는 새 랜더링이 될때마다 지역변수를 기억하지않는다 즉 index의 값을 기억을 하지못하고 계속 0값으로 초기화 된다.
- 그리고나서 React는 초기화된 값을 가지고 컴포넌트를 랜더링을 시킨다.

`useState` 는 데이터를 유지하기 위한 **상태 변수** Hook 이라 볼수있다.
또한 `setState` 를 통해 컴포넌트를 다시 렌더링하도록 트리거하는 상태 설정 함수라 볼수있다.
<br>

## 사용법

<br>
```jsx
import { useState } from "react";
```

```jsx
const [상태, set상태] = useState(초기값);
//원하는 대로 이름을 지어도 된다. 하지만 규칙성을 지켜 네이밍을 하자 가독성,이해
```

```jsx
const handleClick = () => {
  setIndex(index + 1);
};
```

- `초기값`은 처음으로 랜더를 위한 값
- `set상태`는 상태를 업데이트하고 React가 현재 상태가 바뀌고 이것임을 알리는 `비동기 함수`
  <br>

### setState 작동 원리에대해 감을 잡아보자

<br>
- 아래 예제코드를 보고 약간 감을 잡아보자

```js
let state = [];
let index = 0;

function useState(initialValue) {
  const currentIndex = index;
  state[currentIndex] = state[currentIndex] || initialValue;

  function setState(newState) {
    state[currentIndex] = newState;
    //리랜더 컴포넌트
  }

  index++;
  return [state[currentIndex], setState];
}

const [count, setCount] = useState(0);
console.log(count); // 0
setCount(1);
console.log(count); // 1
```

- useState 호출 시 현재 인덱스를 기록하고, 상태가 없으면 초기값을 할당한다. 그리고 setState 함수를 사용하여 상태를 업데이트하고 index는 호출할 때마다 증가한다.

- React가 이러한 로직으로 돌아가는것이 아니지만 이러한 메커니즘으로 컴포넌트의 상태관리를 한다.

- `setState`는 비동기함수이지만 동기적으로 작동되게 보인다

<br>

### setState는 비동기함수 ?

<br>

```jsx
export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  const handleCallback = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    console.log(count);
  };

  return (
    <div>
      <button onClick={handleIncrement}>one</button>
      <button onClick={handleCallback}>callback</button>
      <p>Count: {count}</p>
    </div>
  );
}
```

위의 예제를 실행해보면 `handleIncrement` 함수는 1씩 증가하고 `handleCallback` 함수는 4가 증가하는걸 볼수있다.

- React에서는 각각의 리랜더를 막기위해서 한 번의 업데이트로 여러 상태 변경을 처리한다. 이것을 배치(Batch)한다고 표현한다.

- `handleCallback` 은 setState에 콜백함수를 전달해 콜백함수내에서 `State`에 접근을 한다. 이 콜백함수는 이미 업데이트된 state를 가지고실행한다.
  <br>

## useState 독립성

<br>

```jsx
import Counter from "./Counter.js";

export default function Page() {
  return (
    <div className="Page">
      <Counter />
      <Counter />
    </div>
  );
}
```

- 위의 Counter 내에 state는 독립적으로 실행이 된다.
- Counter 내에 있는 변경된 State와 현재 State는 부모요소인 Page가 알수없다.

---

## 정리 및 알아야하는내용

1. `state`는 컴포넌트가 렌더링 사이에 일부 정보를 **기억**해야 할 때 사용된다.
2. `state`는 `useState Hook`을 호출하여 선언된다.
3. `Hook`은 use로 시작하는 특별한 함수로, `State`와 같은 React의 다른 기능에 연계하여 사용할수 있다.
4. `Hook`은 import문과 유사한 역할을 할 수 있는데, 조건 없이 호출되어야 한다.
5. `useState를` 포함한 `Hook`의 호출은 컴포넌트나 다른 `Hook`의 최상위 수준에서만 유효하다.
6. `useState Hook`은 현재 상태와 상태를 업데이트하는 함수의 쌍을 반환한다.
7. 여러 개의 `state`를 가질 수 있다. 내부적으로 React는 순서에 따라 `state`를 매칭한다.
8. `state`는 컴포넌트에 대해 독립적이다. 같은 컴포넌트를 두 군데에서 렌더링한다면, 각각의 복사본은 고유한 상태를 가진다.

<br>
다음은 React의 Lifecycle 을 알아보아 useState와의 연관성을 정리해보려한다.
