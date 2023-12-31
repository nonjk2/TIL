# 컴포넌트 최적화 (1)

## 컴포넌트 최적화의 중요성

리액트의 컴포넌트 성능 최적화에대해 기술하려고 한다.

- 컴포넌트 최적화는 앱의 성능을 올리는데에 중요한 과정이다. 특히 대형 프로젝트나 복잡한 UI 구조를 가진 웹,앱에서는 컴포넌트의 효율적인 렌더링이 클라이언트한테 엄청난 영향을 끼친다. 특히 한국인한텐,,

자 성능 최적화를 통해 얻을수 있는 기대값을 살펴보자

## 성능 개선의 장점

- **향상된 사용자 경험**

  - 사용자 경험(UX)은 클라이언트가 페이지를 볼때의 느낌 이런것을 뜻하는데 그러한 느낌이 개선되었다 볼수있다. 이러한 느낌을 개선은 페이지 로딩에서 나오기때문이다.

- **자원 사용의 효율성**

  - 쓸대없는 랜더링 , 메모리사용량 감소 등을 기대해볼수있다.

- **유지 관리의 용이성**

  - 최적화된 코드는 가독성이 유리하고 유지보수가 좀더 쉬워진다.

## 컴포넌트 최적화 방법

자 그럼 컴포넌트단위에서 할 수 있는 최적화 방법을 알아보자
일단 컴포넌트가 리랜더 되는 조건은 여러가지다 (더있으면 말해주세요)

- `state`가 변경되었을때
- `props`가 변경되었을때
- 부모 컴포넌트가 렌더링될 때
- `ContextAPI` 값이 변경될 때
- `forceUpdate` 함수 호출시
- 그외 `useEffect` 같은 hook 들의 의존성배열들

이때에 쓸대없는 리랜더링을 방지해 성능을 올려보자

### React.memo를 활용한 컴포넌트 메모이제이션

`React.memo`란 고차 컴포넌트다.
컴포넌트가 랜더링 될때 전과 동일한 `props`로 결과를 랜더한다면 `React.memo`를 호출하고 기억해서 렌더링 하지않고 마지막으로 렌더링 된 결과를 재사용 한다.

여기서 몇가지 조건들을 살펴보자

- `React.memo`는 `props`의 변화에만 영향을 준다.
- 부모 컴포넌트 구현에 `useState`, `useReduce` ,`useContext` 훅을 사용한다면 똑같이 `state`나 `context`가 변할때 다시 랜더된다.
- props가 복잡한 구조를 가지고 있으면 안됨, props에 대해 얕은 비교만을 수행한단다. 그럴땐 비교함수를 쓸수 있는데

  ```js
  function MyComponent(props) {
    /* props를 사용하여 렌더링 */
  }
  function areEqual(prevProps, nextProps) {
    /*
  nextProps가 prevProps와 동일한 값을 가지면 true를 반환하고, 그렇지 않다면 false를 반환
  */
  }
  export default React.memo(MyComponent, areEqual);
  ```

  두 번째 인자로 비교함수를 넣어주면 된다.

#### 그럼 어떨때 쓰일까 보통

React.memo 는 보통 **랜더링 비용이 높고 props의 변경이 자주 발생하지 않는 컴포넌트에 사용된다** 주로 리스트나 테이블에 많이 쓰이는데 예제를 살펴보자

```js
import React from "react";

const ItemElement = ({ item }) => {
  return <div>{item.name}</div>;
};

const MemoizedItemElement = React.memo(ItemElement);

const MyList = ({ list }) => {
  return (
    <div>
      {list.map((item) => (
        <MemoizedItemElement key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MyList;
```

보통 리스트 아이템을 보여주는데 리랜더링을 하는데 시간이 걸리는데 이러한 구조를 가진 컴포넌트는 각 item이 변하지않으면 `ItemElement는` 리렌더가 되지않는다.

근데 여기서 의문점 "`React.memo`는 props에 대해 얕은 비교를 수행한다고 했는데,,,?"

만약 복잡한 객체 구조를 가진 props가 있을경우 동작하지 않을 수도 있다.
내부의 값이 안바뀌어도 객체의 참조 자체가 바뀌면 React.memo는 컴포넌트를 다시 렌더링 하게 된다.

### `useMemo`

위와 같은 상황을 해결하기위해선 불필요한 객체,함수의 재생성을 `useMemo`나 useCallback을 통하여 방지할 수 있다.

```js
const Parent = () => {
  const [count, setCount] = useState(0);
  const item = { name: "Test", id: "123" };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <MemoizedChild item={item} />
    </>
  );
};
```

위 처럼 코드를 짤시 `item`이라는 객체가 랜더링 될때마다 새로 생성된다.

또 그럴때마다 `React.memo`된 `MemoziedChild` 또한 리랜더링이 되고,,

이것을 방지하려고 쓰이는 것이 `useMemo`다

```jsx
const Parent = () => {
  const [count, setCount] = useState(0);
  const item = `useMemo`(() => ({ name: "Test", id: "123" }), []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <      <MemoizedChild item={item} />
 item={item} />
    </>
  );
};
```

이렇게 하면 `items`의 참조가 변경되지 않기 때문에 `MemoizedChild` 는 리렌더링이 되지 않는다.

### useCallback

`useCallback`은 `useMemo`랑 비슷하지만 `useMemo`는 값을 메모이제이션하고 useCallback은 함수의 재생성을 방지한다. useCallback 또한 랜더 사이클에서 함수의 재생성을 방지해서 성능을 향상시킬수 있다.

백문이불여일견 코드보자

```jsx
const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click Me!</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Child onClick={incrementCount} />
      <div>Count: {count}</div>
    </>
  );
};
```

`useMemo`때랑도 비슷하게 `Parent`가 랜더될때마다 `incremenCount` 함수가 새로 생성된다. 이때문에 props로 함수를 받아가는 Child 컴포넌트는 불필요하게 리렌더가 된다. (`parent`가 리랜더 될때마다 `incremenCount`는 매번 새로운 참조로 간주)

`useCallback` 사용 예시를 보자

```jsx
const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click Me!</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <>
      <Child onClick={incrementCount} />
      <div>Count: {count}</div>
    </>
  );
};
```

요로코롬 쓰면 이제 `incrementCount`함수는 `count` 상태 값이 변경 될 때만 재생성 된다. 위와같이 `Parent`가 리랜더 되도 Child는 쓸데없이 리렌더가 되지않는다.

## 근본적인 최적화

위에는 React의 기능들을 통해 최적화를 하였지만 사실 근본적인 최적화를 하는것이 중요하다. 위의 최적화를 하려면 근본적인 최적화를 먼저 해야만 사용이 가능하다.

그중 몇가지 방법이있는데

### 컴포넌트 분할

컴포넌트 분할을 하자 한파일에 하나로 몰아넣지말자 ... 가독성이 좋지 않을뿐더러
보수 유지도 힘들고 각각 랜더를 관리하기도 힘들다.

```jsx
function UserProfile({ user }) {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      {/* ...기타 사용자 정보 렌더링... */}
      <h2>User Posts</h2>
      {/* 사용자 게시글 렌더링... */}
    </div>
  );
}
```

이런식보단

```jsx
function UserInfo({ user }) {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      {/* ...기타 사용자 정보 렌더링... */}
    </div>
  );
}

function UserPosts({ user }) {
  return (
    <div>
      <h2>User Posts</h2>
      {/* 사용자 게시글 렌더링... */}
    </div>
  );
}

function UserProfile({ user }) {
  return (
    <div>
      <UserInfo user={user} />
      <UserPosts user={user} />
    </div>
  );
}
```

이런식으로 나눠주어야 추후 랜더관리도 쉬워진다 예를들면 `Info`나 `Post`가 변경되면 해당하는 컴포넌트만 리렌더하면 되니까 성능 최적화에도 도움이 된다.

### 조건부 렌더링

이것 또한 최적화에 도움이된다. 필요할 때만 컴포넌트를 렌더링 하도록 하는것
백문이불여일견

```jsx
function WelcomeMessage({ isLoggedIn }) {
  return <h2>{isLoggedIn ? "Welcome back!" : "Please sign up."}</h2>;
}
```

조건부 렌더링은 **논리 연산자**(`&&, ||`)와 **삼항 연산자**(`condition ? true : false`)를 사용하여 한 줄로도 표현할 수 있다.

### 불변 데이터 사용

JavaScript의 기본 데이터 타입인 **원시 타입**(`string`, `number`, `boolean`, `null`, `undefined`, `symbol`)은 자체적으로 불변이다.

> 그러므로 얘내들을 변경하려고 하면 사실 새로운 값을 생성한다.
>
> 하지만 객체와 배열을 보자 얘내같은 참조타입은 가변적이다.
> 안쪽의 값을 변경할수있기때문에 불변성을 유지하려면 조심히해야한다.

새객체 , 새배열을 만들자

```js
const eun = {
  name: "eun",
  age: 30,
};
const numbers = [1, 2, 3];

const updatedEun = {
  ...eun,
  age: 29,
};

const updatedNumbers = [...numbers, 4]; // [1, 2, 3, 4]
```

### 리스트의 키사용

요즘은 필수적으로 키를사용하지만 이것또한 랜더링을 수월하게 하는데 한몫을 한다.
React는 이 key를 보고 어떤 것을 업뎃을 해야하는지 본다. 꼭 고유Key를 넣어주자

그 외에 좋은 코드들을 사용해서 쓸대없는 리랜더링을 막을 수 있는 방법은 여러가지다.

다음은 최적화에대해 좀더 자세하게 적어보려한다.
