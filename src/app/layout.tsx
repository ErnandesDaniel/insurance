import type { Metadata } from "next";
import "../styles/reset.css";
import "../styles/global.css";

import React from "react";
import clsx from "clsx";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import TopHeader from "@/components/TopHeader/TopHeader";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Виртуальный ассистент",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="ru"
      style={{
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
      }}
    >
      <body>
        <TopHeader />
        <Header />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
