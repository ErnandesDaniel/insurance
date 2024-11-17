"use client";
import Flex from "antd/es/flex";
import Page from "@/components/Page/Page";
import Button from "@/components/Universal/Button/Button";
import Spacer from "@/components/Universal/Spacer/Spacer";
import React, { useCallback, useEffect, useState } from "react";
import "./references_list.css";
import { useRouter } from "next/navigation";
import Text from "@/components/Universal/Text/Text";
import axios from "axios";
import Link from "next/link";

export default function referencesListPage() {
  const router = useRouter();
  const createReference = useCallback(
    (values) => {
      router.push("/references_list/create_reference");
    },
    [router]
  );

  interface reference {
    id: number;
    name: string;
  }

  const [referencesList, setReferencesList] = useState<reference[]>([]);

  useEffect(() => {
    axios.get("https://vk-atom-dev.ru/api/cutoffs").then((res) => {
      setReferencesList(res.data);
    });
  }, [setReferencesList]);

  return (
    <Page>
      <Spacer space={50} />
      <Flex justify="space-between">
        <Flex className="references_list" vertical gap={15}>
          <Text className="title"> Список справочников</Text>
          {referencesList.map(({ name, id }) => (
            <div className="reference_item" key={`${name}_${id}`}>
              <Link href={`/references_list/reference?id=${id}`}>{name}</Link>
            </div>
          ))}
        </Flex>
        <Button
          title="Создать новый справочник"
          width={250}
          onClick={createReference}
        />
      </Flex>
    </Page>
  );
}
