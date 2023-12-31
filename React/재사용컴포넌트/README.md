- [재사용 컴포넌트](#재사용-컴포넌트)
  - [재사용컴포넌트 장점](#재사용컴포넌트-장점)
    - [코드 재사용](#코드-재사용)
    - [일관성](#일관성)
    - [유지 보수 용이성](#유지-보수-용이성)
    - [생산성 향상](#생산성-향상)
    - [인터넷에 많음](#인터넷에-많음)
  - [TIL](#til)
    - [getBoundingClientRect()](#getboundingclientrect)
    - [ReactDOM.createPortal()](#reactdomcreateportal)
      - [타입](#타입)
      - [사용 예](#사용-예)
    - [Question](#question)

# 재사용 컴포넌트

재사용 컴포넌트는 개발을 함에 있어서 엄청난 이점을 가져다 준다.

## 재사용컴포넌트 장점

장점 차례대로 보자

### 코드 재사용

- 말그대로 다시 작성할 필요없이 코드를 재사용해서 컴포넌트를 단일화하고 중복을 제거해서 코드의 양을 줄이고 개발 시간을 엄청나게 단축시킬 수있다.

### 일관성

- 프론트엔드 개발자는 개발을 할때 디자인을 생각을 안할 수가 없다. 동일한 혹은 일관된 UI는 UX를 상승시킬수 있다. 또는 개발자가 일관성있게 코드를 작성할수 있다. 그리고 가독성도 엄청나게 상승을 기대할수있다.

### 유지 보수 용이성

- 재사용 컴포넌트는 개별적으로 테스트하고 유지관리 하기 쉽다.

### 생산성 향상

- 재사용 컴포넌트를 사용하면 이것을 활용하여 새로운 기능을 빠르게 구현할 수 있다. 조합혹은 확장하기 디게 쉽다.

### 인터넷에 많음

- 재사용 컴포넌트는 깃헙이나 커뮤니티에 많이 공유되고 있다. 그래서 그 재사용 컴포넌트는 점점 코드의 품질이 향상되면서 개발자들끼리의 지식을 공유 혹은 협업을 촉진시킨다.

## TIL

재사용 컴포넌트를 몇개 만들어보다가 알아낸것을 적음

### getBoundingClientRect()

`ref.current.getBoundingClientRect()` 얘는 DOM 요소의 위치와 크기 정보를 반환하는 JavaScript의 메서드다.

얘는 DOM 요소의 사각형 정보를 반환하며

- getBoundingClientRect() 메서드는 DOM 요소의 경계 정보를 반환한다.
- left: 요소의 좌측 가장자리에서 뷰포트 왼쪽 가장자리까지의 거리를 나타낸다.
- top: 요소의 상단 가장자리에서 뷰포트 상단 가장자리까지의 거리를 나타낸다.
- right: 요소의 우측 가장자리에서 뷰포트 왼쪽 가장자리까지의 거리를 나타낸다.
- bottom: 요소의 하단 가장자리에서 뷰포트 상단 가장자리까지의 거리를 나타낸다.
- width: 요소의 가로 길이를 나타낸다.
- height: 요소의 세로 길이를 나타낸다.

코드로보자

```jsx
import React, { useRef, useEffect } from "react";

const Example = () => {
  const ref = useRef(null);
  const { left, top, right, bottom, width, height } = ref.current.getBoundingClientRect();

  return <div ref={ref}>"<<" 얘기준에서</div>;
};
```

### ReactDOM.createPortal()

ReactDOM.createPortal은 React 애플리케이션에서 특정 컴포넌트를 다른 DOM 노드로 렌더링하기 위해 사용되는 메서드다. 기본적으로 React는 컴포넌트를 루트 DOM 노드에 렌더링하지만, createPortal을 사용하면 컴포넌트를 다른 DOM 노드로 렌더링할 수 있다.

#### 타입

자 안에 들어가는 인자를 살펴보자

```ts
declare function createPortal(children: ReactNode, container: HTMLElement | null): ReactPortal;
```

안에는 reactNode 즉 JSX.element가 들어간다.
컴포넌트넣어주면 됨

두번째인자로 보내고싶은 element 의 최상위 id를 넣어주면된다.

그리고 태그안에정의한 스타일과 onClick같은 함수도 같이 포탈된다.

#### 사용 예

모달 div 를 modal-root div안에 전송

```jsx
ReactDOM.createPortal(
  <div className="modal">{children}</div>,
  document.getElementById("modal-root")
);
```

일반적으로 모달, 툴팁, 팝오버 등과 같은 오버레이 컴포넌트를 렌더링할 때 사용한다.

### Question

재사용컴포넌트를 만들다가 내 코드가 엄청 길어지는거 같아서 개발자님께 여쭤보니 재사용컴포넌트는 원래 각각 설정할수있는게 많아야해서 길어지는게 당연한거라고 하셨다.

음 생각해보면 당연하즤,,,

아그리고 버튼이나 인풋같은것을 만들때 사이즈 , 색 크게크게 나눠서 여러 스타일들을
나누고 공통인것을 먼저 생각을 해보고 짜는것이 현명한것 같다.

괜히 엄청나게 세분화하다가 시간 다 날린다.
