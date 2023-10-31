- [이미지 최적화](#이미지-최적화)
  - [이미지를 최적화 하는 이유](#이미지를-최적화-하는-이유)
  - [이미지 최적화](#이미지-최적화-1)
  - [태그](#태그)
  - [기본적인 사용법](#기본적인-사용법)

# 이미지 최적화

## 이미지를 최적화 하는 이유

- 로딩 속도 개선

  - 큰 이미지 파일은 다운로드에 시간이 걸리며 웹 페이지의 로딩 시간을 증가시킬 수 있습니다. 최적화된 이미지는 빠르게 다운로드되어 사용자 경험을 향상시킵니다.

- 대역폭 절약

  - 더 작은 이미지 파일 크기는 서버 대역폭을 절약하고 웹 호스팅 비용을 낮추는 데 도움이 됩니다.

- 모바일 사용자 고려

  - 모바일 장치의 네트워크 연결은 데스크탑보다 느릴 수 있으므로, 이미지 최적화는 모바일 사용자에게 더 나은 성능을 제공합니다.

- 검색 엔진 최적화(SEO)

  - 검색 엔진은 웹 페이지 로딩 속도를 고려하여 순위를 결정합니다. 이미지 최적화는 SEO에 긍정적인 영향을 미칠 수 있습니다.

- 사용자 경험 개선

  - 이미지가 빠르게 로드되면 사용자는 웹 페이지를 더 즐겁게 이용하고 페이지 간 전환 및 내비게이션이 더 원활해집니다.

## 이미지 최적화

1. 이미지가 다양한 화면 크기에 반응하는지 확인.
2. 다양한 장치에 대한 이미지 크기를 지정.
3. 이미지가 로드될 때 레이아웃이 바뀌는 것을 방지.
4. 사용자 뷰포트 외부에 있는 지연 로드 이미지.

위의 이점을 `next/image` 요소를 사용하여 이미지를 자동으로 최적화합니다.

## <Image>태그

구성 `<Image>`요소는 HTML 태그의 확장 `<img>` 이며 다음과 같은 자동 이미지 최적화 기능을 제공합니다.

- 이미지가 로드될 때 자동으로 레이아웃 이동을 방지합니다.
- 뷰포트가 더 작은 장치에 큰 이미지가 전달되는 것을 방지하기 위해 이미지 크기를 조정합니다.
- 기본적으로 이미지 지연 로딩(이미지가 뷰포트에 들어갈 때 로드됨)
- WebP 와 같은 최신 형식으로 이미지 제공 및 AVIF, 브라우저가 지원하는 경우.

## 기본적인 사용법

```tsx
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    // ...
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop and mobile versions"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      />
    </div>
    //...
  );
}
ㅌ;
```

- `width` - 1000 픽셀 `height` 760픽셀 을 설정합니다.
- `width`레이아웃 변경을 방지하기 위해 원본 파일과 동일한 비율로 설정하는것이 좋습니다.
- 위이미지는 웹 아래는 모바일
