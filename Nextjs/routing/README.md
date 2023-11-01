# Nextjs 라우팅

## Nested Routing(중첩 라우팅)

- Next.js는 폴더가 중첩된 경로를 만드는 데 사용되는 파일 시스템 라우팅을 사용한다. 각 폴더는 **URL 세그먼트** 에 매핑되는 **경로 세그먼트**를 나타낸다.
- nextjs 는 일반적으로 폴더구조 라우팅을 사용한다. 예를 들면 app/dashboard/invoices/page.tsx 구조로 되어있으면
  웹의 path는 `도메인/dashboard/invoices` 형태로 path가 정해진다.

## page.tsx

- nextjs 에서는 app 폴더안에 `page.tsx`파일을 생성해주어야 페이지를 만들수있다.

## Layout

- 또한 중첩 세그먼트에서 여러 페이지간에 공유되는 레이아웃을 생성할수있는데

`/dashboard/invoices/page.tsx` `dashboard/customers/page.tsx` 에서 사용되는 공유되는 레이아웃을 생성하려면
`/dashboard/layout.tsx` 를 생성하고

```tsx
import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

이렇게 생성해주면 chidren안에 page.tsx들이 들어가는것을 볼수있다.
예) React-router-dom 에 Outlet과 비슷하다.

- 이러한 레이아웃의 사용이점은 하위 경로가 변경되어도 레이아웃은 재랜더링이 안되는것에있다.
- 이것을 **부분 렌더링**이라고 한다

### 루트 레이아웃

- 루트 레이아웃은 전체 경로에 사용되는 Layout인데 app폴더안에 layout.tsx를 사용하고 파일안에해당 코드와 비슷하게 사용하면 된다.

```tsx
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- 이 레이아웃은 필수로 존재해야 하며 `root layout` 루트레이아웃이라고 한다.
- 루트 레이아웃에 추가하는 모든 UI는 애플리케이션의 모든 페이지 에서 공유된다.
- 메타데이터 또한 전체로 적용이 된다.
- 하지만 하위 경로폴더의 `layout.tsx`는 페이지마다 고유하므로 루트 레이아웃에 추가할 필요없다.
