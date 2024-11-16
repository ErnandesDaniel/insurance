import type { Metadata } from "next";
import "../styles/reset.css";
import "../styles/global.css";

import React from "react";
import clsx from "clsx";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import { FontSans, FontSerif, FontMono } from "@/components/Base/Font/Font";
import TopHeader from "@/components/TopHeader/TopHeader";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Разработка страховых продуктов",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="ru"
      className={clsx(FontSans.variable, FontSerif.variable, FontMono.variable)}
      style={{overflow:'hidden '}}
    >
      <body style={{height:'100%'}}>
        <TopHeader />
        <Header />
        <AntdRegistry style={{height:'100%'}}>{children}</AntdRegistry>
      </body>
    </html>
  );
}
