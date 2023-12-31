- [인피니티 스크롤](#인피니티-스크롤)
  - [`Intersection Observer API`](#intersection-observer-api)
    - [사용 목적](#사용-목적)
    - [사용 방법](#사용-방법)
    - [사용 예시](#사용-예시)
    - [속성들](#속성들)
  - [인피니티 스크롤](#인피니티-스크롤-1)

# 인피니티 스크롤

이번주 역시 프론트엔드분 학생분들을 모아서 기능구현을 해보았다.
주제는 인피니티 스크롤!!

앱과 웹을 막론하고 엄청 자주 보이는 이것
바로 구현드가자

인피니티 스크롤하면 대충떠오르는 느낌이 스크롤이 맨 바닥을 바라보면 리스트를 추가하는 것이다.

스터디의 조건은 다음과같다.

> - **STEP 1** : 리스트를 만들고 리스트 밑에 LOAD MORE 버튼을 만들고 LOAD MORE 누르면 목록 추가
>
> - **STEP 2** : 스크롤이 맨 바닥을 바라보면 로드
>
> - **STEP 3** : 확대 축소를 해도 문제없이 되는지

STEP 3를 목표로하고 6시간내에 구현하는것이 목표였다.

나는 예전에 스크롤 길이를 계산하고 리스트를 가져오고
엄청난 헛짓거리를 한 기억이 있어 예전부터 생각해왔던 공부해왔던

- `Intersection Observer API`
- `react-query` 를 통한 인피니티 스크롤 구현에 드갔다.

코드를 적기에앞서 `Intersection Observer API` 에 대해 정리하자.

## `Intersection Observer API`

> `Intersection Observer` 는 는 타겟 요소와 상위 요소 또는 최상위 document 의 viewport 사이의 intersection 내의 변화를 비동기적으로 관찰하는 방법이다. - [mdn](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)

웹 페이지에서 특정 요소가 화면에 보이는지, 또는 두 요소가 서로 어떻게 겹치는지를 알아내는 것은 매우 복잡한 작업이였다. ~~내가한 헛짓거리처럼~~ 이래서 UX에 안좋은 영향이 갔었는데.

엄청나게 반복되는 이벤트루프 또는 getBoundingClientRect()를 사용하는 개발자의 고난이 낳은 API되시겠다 .

### 사용 목적

Intersection Observer를 사용하면 어떤 요소가 뷰포트에 들어가거나 나오는 시점을 알 수 있다.

### 사용 방법

Intersection Observer는 `IntersectionObserver` 생성자로 생성된다. 콜백함수와 옵션객체를 받는다.

콜백 함수는 요소가 교차 영역에 들어가거나 나올 때마다 호출되고, 교차에 대한 정보를 담은 `IntersectionObserverEntry` 객체들의 배열과 `IntersectionObserver` 객체 자신을 인자로 받는다.

옵션 객체는 `root`, `rootMargin`, `threshold` 세가지를 사용할수있다. `root`는 교차를 감지할 기준이 될 요소고, `rootMargin`은 `root`의 여백을 정한다. `threshold`는 교차가 발생한다고 판단할 기준점을 정의한다.

- **메서드와 속성**:

  - `observe(target)`: 주어진 대상을 관찰하기 시작한다.
  - `unobserve(target)`: 주어진 대상의 관찰을 멈춘다.
  - `disconnect()`: 모든 대상의 관찰을 멈춘다.
  - `thresholds`, `root`, `rootMargin`: 생성자에서 지정한 옵션에 해당하는 속성들.

### 사용 예시

```tsx
import React, { useEffect, useRef } from "react";

const Component: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("컴포넌트 보일때");
          } else {
            console.log("!컴포넌트 보일때");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    //옵저버 정리
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); //또는 disconnect()
      }
    };
  }, []); // 빈 의존성 배열을 사용하여 마운트시에만 effect를 실행.

  return <div ref={ref}>godeundol</div>;
};

export default Component;
```

요기서 entry는 `IntersectionObserverEntry` 인스턴스를 가리킨다. 이 인스턴스는 관찰대상의 상태에 대한 정보를 제공한다.

### 속성들

- **time**: 관찰 대상의 교차 상태가 변경된 시간을 DOMHighResTimeStamp로 반환.
- **rootBounds**: root 요소의 경계를 DOMRectReadOnly로 반환.
- **boundingClientRect**: 관찰 대상의 경계를 DOMRectReadOnly로 반환.
- **intersectionRect**: root 요소와 관찰 대상이 교차하는 부분의 경계를 DOMRectReadOnly로 반환.
- **intersectionRatio**: 관찰 대상의 교차하는 부분의 비율을 반환.
- **isIntersecting**: 관찰 대상이 root 요소와 교차하는지 여부를 `boolean`으로 반환.
- **target**: 관찰 대상 요소를 반환.

Intersection Observer API는 비동기적으로 작동하고, 요청 애니메이션 프레임(requestAnimationFrame)과 비슷한 빈도로 교차 상태를 체크한다. 암튼 빠르다.

## 인피니티 스크롤

자 이것과 react-query의 useInfiniteQuery를 사용해서 인피니티 스크롤을 구현해보자.

페이지네이션과 똑같이 리스트를 만들어주고

useInfinityScroll 훅을 만들어주었다.

```ts
import { useRef, useCallback } from "react";
import { UseInfiniteQueryResult } from "react-query";

type InfiniteQueryResultPart<TData = unknown, TError = unknown> = Pick<
  UseInfiniteQueryResult<TData, TError>,
  "isFetchingNextPage" | "fetchNextPage" | "hasNextPage"
>;

const useInfiniteScroll = ({
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: InfiniteQueryResultPart) => {
  const lastRef = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (lastDiv: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (lastRef.current) lastRef.current.disconnect();

      lastRef.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          fetchNextPage(); //
        }
      });

      if (lastDiv) lastRef.current.observe(lastDiv);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  return lastPostRef;
};

export default useInfiniteScroll;
```

깃허브를 돌아다니다가 엄청 깔끔한 코드를 보았고 거기서 약간만 커스텀해보았다.

useCallback 으로 관리를 해주었고 뷰포트에 들어오면 `fetchNextPage`함수를 실행시키게 해놨다 `fetchNextPage`는 axios 비동기함수

그리고 패치하는도중 옵저버를 더 만들지 않으려고 isFetching boolean값도 가져와 썻다 그리고 useEffect보다 useCallback이 더 적합한거같아 useCallback으로 처리해주었다.

```tsx
const lastPostRef = useInfiniteScroll({ isFetchingNextPage, fetchNextPage, hasNextPage });

const content =
  status === "success" &&
  data?.pages.map((page, idx) => {
    return page.map((pagedata, i) => {
      if (page.length === i + 1) {
        return (
          <MainListItem
            num={idx * 10 + (i + 1)}
            key={pagedata.id}
            item={pagedata}
            ref={lastPostRef}
          />
        );
      }
      return <MainListItem num={idx * 10 + (i + 1)} key={pagedata.id} item={pagedata} />;
    });
  });
```

이것을 마지막 아이템한테 ref를 넘겨주었다.

생각보다 인피니티스크롤의 구현은 엄청 간단하였고 react-query useInfiniteQuery 의 효능도 톡톡히 보았다.
