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
  title: "Виртуальный ассистент",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="ru"
      className={clsx(FontSans.variable, FontSerif.variable, FontMono.variable)}
    >
      <body>
        <TopHeader />
        <Header />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
