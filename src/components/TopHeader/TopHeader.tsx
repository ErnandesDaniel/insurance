"use client";
import "./TopHeader.css";
import React from "react";
import Text from "@/components/Universal/Text/Text";
import clsx from "clsx";

import Flex from "antd/es/flex";

export default function TopHeader() {
  return (
    <div className="topHeader">
      <div className="content">
        <Flex className="brandBlock" gap={20}>
          <Text>Лого</Text>
          <Text>Страхование это легко</Text>
        </Flex>
      </div>
    </div>
  );
}
