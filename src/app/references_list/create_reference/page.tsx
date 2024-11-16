"use client";
import Table from "antd/es/table";
import Page from "@/components/Page/Page";
//import {categoryColumns} from "@/app/references_list/create_reference/tables-settings/category-table-columns";
import Button from "@/components/Universal/Button/Button";
import Spacer from "@/components/Universal/Spacer/Spacer";
import { useState } from "react";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import TextField from "@/components/Universal/TextField/TextField";
import Select from "@/components/Universal/Select/Select";
import ConditionalRender from "@/components/Universal/ConditionalRender/ConditionalRender";
import { numberColumns } from "@/app/references_list/create_reference/tables-settings/number-table-columns";

export default function CurrentPage() {
  const { useWatch, useForm } = Form;

  const [form] = useForm();

  const referenceTypeList = [
    { text: "Да/нет", id: 1 },
    { text: "Категориальный тип", id: 2 },
    { text: "Числовой тип", id: 3 },
    { text: "Даты", id: 4 },
  ];

  interface categoryDataType {
    name: string;
    key: number;
  }

  interface numberDataType {
    startValue: number;
    endValue: number;
    key: number;
  }

  interface dateDataType {
    startDate: string;
    endDate: string;
    key: number;
  }

  //const defaultDataSource=[{name:'test 1', key:0}]

  const defaultCategoryDataSource = [{ name: 0, key: 0 }];
  const defaultNumberDataSource = [{ startValue: 0, endValue: 0, key: 0 }];
  const defaultDateDataSource = [{ startDate: "", endDate: "", key: 0 }];

  const [dataSource, setDataSource] = useState<any[]>([]);

  const handleAdd = () => {
    let newKey = 0;

    if (dataSource.length > 0) {
      newKey = dataSource[dataSource.length - 1].key + 1;
    }

    const newData: any = {
      name: "test 1",
      key: newKey,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleDelete = (key: number) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const selectedReferenceType = useWatch("referenceType", form);

  const onFinishCreate = (values) => {
    console.log(values);

    const { referenceName } = values;

    const { referenceType } = values;

    if (selectedReferenceType == 1) {
      const sentValues = [];
    }
    if (selectedReferenceType == 2) {
      const { referenceType } = values;

      //const values

      const sentValues = [];
    } else if (selectedReferenceType == 3) {
      const sentValues = [];
      console.log(values);
    } else if (selectedReferenceType == 4) {
      const sentValues = [];
    }
  };

  return (
    <Page>
      <Form form={form} onFinish={onFinishCreate} layout="vertical">
        <Spacer space={20} />
        <TextField
          errorText="Название справочника обязательное"
          label="Введите название справочника"
          name="referenceName"
        />
        <Spacer space={10} />
        <Select
          label="Выберите тип данных справочника"
          name="referenceType"
          errorText="Тип данных справочника обязательное"
          options={referenceTypeList.map(({ text, id }) => {
            return { value: id, label: text };
          })}
        />
        <ConditionalRender condition={selectedReferenceType == 2}>
          <Spacer space={10} />
          <Table<categoryDataType>
            style={{ width: "80%" }}
            size="small"
            dataSource={dataSource}
            columns={numberColumns(handleDelete, dataSource, setDataSource)}
            pagination={false}
            scroll={{ y: 350 }}
          />
        </ConditionalRender>
        <ConditionalRender condition={selectedReferenceType == 3}>
          <Spacer space={10} />
          <Table<numberDataType>
            style={{ width: "80%" }}
            size="small"
            dataSource={dataSource}
            columns={numberColumns(handleDelete, dataSource, setDataSource)}
            pagination={false}
            scroll={{ y: 350 }}
          />
        </ConditionalRender>
        <ConditionalRender condition={selectedReferenceType == 4}>
          <Spacer space={10} />
          <Table<dateDataType>
            style={{ width: "80%" }}
            size="small"
            dataSource={dataSource}
            columns={numberColumns(handleDelete, dataSource, setDataSource)}
            pagination={false}
            scroll={{ y: 350 }}
          />
        </ConditionalRender>
        <Spacer space={20} />
        <Flex gap={20}>
          <Button
            onClick={handleAdd}
            type="primary"
            title="Добавить значение"
          />
          <Button title="Сохранить" htmlType="submit" />
        </Flex>
        <Spacer space={10} />
      </Form>
    </Page>
  );
}
