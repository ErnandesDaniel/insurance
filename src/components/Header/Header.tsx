"use client";
import "./Header.css";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import Text from "@/components/Universal/Text/Text";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Flex from "antd/es/flex";
import Link from "next/link";
import Button from "antd/es/button";
import Image from 'next/image'
import logo from './logo.svg';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const exit = useCallback(() => {
    router.push("/login/auth");
  }, [router]);

  if (pathname == "/login/auth") {
    return null;
  }

  return (
    <div className="header">
      <div className="content">
        <Flex className="brandBlock">
          <Image
              src={logo}
              alt='logo'
          />
        </Flex>
        <Flex className="linkBlock" gap={20}>
          <Button
            className={clsx("link", { active: pathname == "/products_list" })}
          >
            <Link href="/products_list">Продукты</Link>
          </Button>
          <Button
            className={clsx("link", {
              active: pathname == "/references_list",
            })}
          >
            <Link href="/references_list">Справочники</Link>
          </Button>
        </Flex>
        <Text className="outLink">
          <span onClick={exit}>Выйти</span>
        </Text>
      </div>
    </div>
  );
}
