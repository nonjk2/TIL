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
