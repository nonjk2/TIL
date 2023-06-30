- [인피니티 스크롤 웹디자인](https://webflow.com/made-in-webflow/website/gsap-flip-grid-view?ref=made-in-webflow-search&searchValue=list)
- [페이지네이션](https://#)
- [검색창](https://github.com/)

TypeScript 전환
배포하기전에 빌드 과정이 바뀌게 된다.

Github Actions / Workflow 작성
2-1. 자동 배포 트리거 시점 만들기
2-2. Commit 메세지 보고 SEMVer => NPM Update
2-3. Commit 메세지 보고 SEMVer => Release 문서 생성
2-4. Storybook Page 배포
https://thecatapi.com/
최적화
CJS, ESM 어떤 빌드 방법을 가질지? 최적화

아래의 Workflow 만들기
깃 커밋 => 배포 시점 트리거 => NPM Update => Release 문서 생성 => Storybook Page 배포

Figma 수정 => JSON 생성 => 디자인 토큰 생성 => Github Action Trigger => 저장소에서 사용 가능

Storybook 커스텀하기
https://storybook.js.org/showcase 참고

기타
노드 버전 관리는 volta, fnm, n 추천

---

우리가 사용할 ""앱을 위한 라이브러리""
예) react, antd, mui, react-hooks-form tanStack Query

라이브러리로 (사용될) 저장소 만들기
npm 환경 초기화 (pnpm)
스토리북 설치 (vite, react)
styled 설치
불필요한 스토리북 파일 제거 (오로지 버튼만 남김)
스토리북 디렉터리 경로 수정 후 config 반영
번들러 설치 (rollup)
진입점
esbuild 설치
peerDeps 설치 및 설정
ESM, CJS output 설정 변경
npm Login & npm 패키지명 중복 확인
npm publish

---

사용할 라이브러리에서 배포한 npm 패키지 설치
Github Pages <= Storybook 배포
https://www.npmjs.com/package/cdd-storybook-wanted
https://github.com/pocojang/cdd-storybook-wanted

https://www.wanted.co.kr/events/series_78

// 1. React 환경 (Vite)
npm create vite 디렉터리명 --template react

// 2. Storybook
cd 디렉터리명
npm dlx storybook@latest init

// 3. 기타
npm install @vanilla-extract/css

// React 환경 실행
npm dev

// Storybook 환경 실행
npm storybook

https://product.kyobobook.co.kr/detail/S000001810064

<!-- React와 TypeScript 함께 사용하기: TypeScript는 JavaScript에 정적 타입을 추가하여 코드의 안정성을 높이고, 에디터의 지원을 받아 개발 생산성을 향상시킬 수 있는 스크립트 언어입니다. React 프로젝트에 TypeScript를 어떻게 적용하고 최적화하는지에 대해 설명해보세요.

React에서의 Context API와 활용: React의 Context API는 컴포넌트 트리 안에서 전역적으로 사용할 수 있는 데이터를 관리하는 방법입니다. 이를 이용하여 어떻게 state 관리를 할 수 있는지, 어떻게 컴포넌트 간에 데이터를 공유할 수 있는지를 다루는 것이 좋습니다.

React Hooks (useEffect, useReducer, useRef 등) 사용법과 패턴: useState 외에도 다양한 React Hooks가 있으며, 이러한 Hooks을 사용하면 함수형 컴포넌트에서 상태와 생명주기 등을 관리할 수 있습니다. 각각의 Hook이 어떤 목적으로 사용되며 어떻게 사용하는지에 대해 기술해보세요.

React에서의 Error Boundary와 오류 처리: 어플리케이션에서 오류가 발생했을 때 어떻게 대응할 수 있는지, Error Boundary가 어떻게 동작하는지를 다루는 것이 좋습니다.

React Testing Library를 이용한 테스트 작성: 테스트 주도 개발(TDD)은 훌륭한 개발 방법론 중 하나입니다. React Testing Library를 이용해 어떻게 컴포넌트를 테스트하는지, 테스트를 통해 어떤 이점을 얻을 수 있는지를 설명하는 것도 흥미롭습니다.

React에서의 애니메이션 처리: React Transition Group이나 React Spring과 같은 라이브러리를 활용해서 애니메이션을 어떻게 구현하는지 설명해보세요. -->

<!-- https://quick-search-widget.webflow.io/ -->
<!-- https://wf-live-search.webflow.io/ -->

https://autocompletejs.webflow.io/

https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide
