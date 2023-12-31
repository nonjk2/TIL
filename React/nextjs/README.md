# Nextjs

Next.js는 웹앱을 만들기위한 여러 기능을 제공하는 React 프레임워크다.
너무나도 핫하고 좋다고 소문이 무성한 이것에 무엇이 좋은지 특징이 무엇인지 알아보려한다

Nextjs 는 코드분할을 기본적으로 지원한다.

Next.js를 사용하면 서버 측 렌더링 , 정적 사이트 생성 및 클라이언트 측 렌더링 의 세 가지 유형의 렌더링 방법을 사용할 수 있습니다 .

사전 렌더링
서버 측 렌더링 및 정적 사이트 생성 은 결과가 클라이언트로 전송되기 전에 외부 데이터를 가져오고 React 구성 요소를 HTML로 변환하기 때문에 사전 렌더링 이라고도 합니다 .

클라이언트측 렌더링과 사전 렌더링
표준 React 애플리케이션에서 브라우저는 UI를 구성하기 위한 JavaScript 지침과 함께 서버에서 빈 HTML 셸을 받습니다. 초기 렌더링 작업은 사용자 장치에서 발생하므로 이를 클라이언트 측 렌더링 이라고 합니다 .

참고: React 또는 useSWRuseEffect() 과 같은 데이터 가져오기 후크를 사용하여 데이터를 가져오도록 선택하여 Next.js 애플리케이션의 특정 구성 요소에 대해 클라이언트 측 렌더링을 사용하도록 선택할 수 있습니다 .

반대로 Next.js는 기본적으로 모든 페이지를 사전 렌더링합니다 . 사전 렌더링은 HTML이 사용자 장치의 JavaScript에 의해 모두 수행되는 대신 서버에서 미리 생성됨을 의미합니다.

실제로 이것은 완전히 클라이언트 측에서 렌더링된 앱의 경우 렌더링 작업이 수행되는 동안 사용자에게 빈 페이지가 표시됨을 의미합니다. 사용자가 구성된 HTML을 볼 수 있는 사전 렌더링된 앱과 비교:

사전 렌더링의 두 가지 유형에 대해 살펴보겠습니다.

서버측 렌더링
서버 측 렌더링을 사용하면 페이지의 HTML이 각 요청에 대해 서버에서 생성됩니다. 그런 다음 생성된 HTML, JSON 데이터 및 페이지를 대화형으로 만들기 위한 JavaScript 지침이 클라이언트로 전송됩니다.

클라이언트에서 HTML은 빠른 비대화형 페이지를 표시하는 데 사용되는 반면 React는 JSON 데이터 및 JavaScript 명령을 사용하여 구성 요소를 대화형으로 만듭니다(예: 버튼에 이벤트 핸들러 첨부). 이 과정을 수화 라고 합니다 .

Next.js에서 getServerSideProps를 사용하여 서버 측 렌더링 페이지를 선택할 수 있습니다 .

참고: React 18 및 Next 12 에는 React 서버 구성 요소 의 알파 버전이 도입되었습니다 . 서버 구성 요소는 서버에서 완전히 렌더링되며 렌더링을 위해 클라이언트 측 JavaScript가 필요하지 않습니다. 또한 서버 구성 요소를 사용하면 개발자가 일부 논리를 서버에 유지하고 해당 논리의 결과만 클라이언트에 보낼 수 있습니다. 이렇게 하면 클라이언트로 전송되는 번들 크기가 줄어들고 클라이언트 측 렌더링 성능이 향상됩니다. 여기에서 React 서버 구성요소에 대해 자세히 알아보세요 .

정적 사이트 생성
정적 사이트 생성을 사용하면 HTML이 서버에서 생성되지만 서버측 렌더링과 달리 런타임에는 서버가 없습니다. 대신 콘텐츠는 빌드 시 애플리케이션이 배포될 때 한 번 생성되며 HTML은 CDN에 저장되고 각 요청에 대해 재사용됩니다.

Next.js에서 getStaticProps를 사용하여 페이지를 정적으로 생성하도록 선택할 수 있습니다 .

참고: 점진적 정적 재생성을 사용하여 사이트를 구축한 후 정적 페이지를 생성하거나 업데이트 할 수 있습니다. 즉, 데이터가 변경되더라도 전체 사이트를 재구축할 필요가 없습니다.

Next.js의 장점은 정적 사이트 생성, 서버측 렌더링 또는 클라이언트측 렌더링 등 페이지별로 사용 ​​사례에 가장 적합한 렌더링 방법을 선택할 수 있다는 것입니다. 특정 사용 사례에 적합한 렌더링 방법에 대해 자세히 알아보려면 데이터 가져오기 문서를 참조하세요 .
ㄹ
다음 섹션에서는 배포 후 코드를 저장하거나 실행할 수 있는 위치에 대해 설명합니다.
