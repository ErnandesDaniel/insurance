import type { Metadata } from "next";
import "../styles/reset.css";
import "../styles/global.css";

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Виртуальный ассистент",
};

export default function RootLayout({ children }: React.PropsWithChildren){
  return (
    <html lang="ru">
    <body>
      <Header />
        <AntdRegistry>{children}</AntdRegistry>
      <Footer />
    </body>
    </html>
  );
}