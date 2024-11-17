import type { Metadata } from "next";
import "../styles/reset.css";
import "../styles/global.css";
import React from "react";
import { Suspense } from "react";
import clsx from "clsx";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import TopHeader from "@/components/TopHeader/TopHeader";
import Header from "@/components/Header/Header";
//import {FontMono, FontSans, FontSerif} from "@/components/Base/Font/Font";

export const metadata: Metadata = {
  title: "Разработка страховых продуктов",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="ru"
      //className={clsx(FontSans.variable, FontSerif.variable, FontMono.variable)}
      style={{
        overflow: "hidden",

        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
      }}
    >
      <body style={{ height: "100%" }}>
        <Suspense>
          <TopHeader />
          <Header />
          <AntdRegistry>{children}</AntdRegistry>
        </Suspense>
      </body>
    </html>
  );
}
