- [Nextjs 글꼴 최적화](#nextjs-글꼴-최적화)
  - [폰트 설정](#폰트-설정)
  - [보조 폰트 설정](#보조-폰트-설정)

# Nextjs 글꼴 최적화

- Nextjs 의 글꼴최적화는 어떤식으로 이루어지는가 ?

Next.js는 모듈을 사용할 때 애플리케이션의 글꼴을 자동으로 최적화합니다 `next/font`. **빌드 시 글꼴 파일을 다운로드하고 다른 정적 파일과 함께 호스팅하여 이를 수행**합니다.

사용자가 **애플리케이션을 방문할 때 성능에 영향을 미칠 수 있는 글꼴에 대한 추가 네트워크 요청이 없음을 의미**합니다

## 폰트 설정

`app/*/fonts.ts` 안에

```tsx
import { Inter } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
```

설정후 `app/layout.tsx`

```tsx
import "./global.css";
import { inter } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

//antialiased 는 글꼴을 부드럽게 만드는 클래스 tailwind
```

## 보조 폰트 설정

`app/*/fonts.ts`

```tsx
import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
```

`page.tsx`

```tsx
//...
<p
  className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
/>
//...
```

1. 정리 fonts.ts 에 각 글꼴 선언 export
2. 기본 폰트 Rootlayout에 import
3. 보조 폰트 쓰려는곳에 import
