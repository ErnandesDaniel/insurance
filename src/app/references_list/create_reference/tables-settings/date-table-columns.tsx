"use client";
import Input from "antd/es/input";
import { Flex } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Form } from "antd";

export const dateColumns = (
  deleteRow: any,
  dataSource: any,
  setDataSource: any
) => [
  {
    title: "Название",
    dataIndex: "name",
    render: (name: any, record) => {
      const itemName = "table_row_" + record.key;

      const rules = [
        {
          required: true,
          message: "Введите значение",
          //   type: "string",
          validator: (_, value) =>
            !value ? Promise.reject(new Error("errorText")) : Promise.resolve(),
        },
      ];

      let newValue = name;
      const onChangeInputValue = (event) => {
        newValue = event.target.value;
      };

      const save = () => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => record.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...record,
          name: newValue,
        });
        setDataSource(newData);
      };

      return (
        <Form.Item
          name={["tableItem", record.key]}
          rules={rules}
          initialValue={name}
        >
          <Input
            onPressEnter={save}
            onBlur={save}
            onChange={onChangeInputValue}
          />
        </Form.Item>
      );
    },
  },

  {
    title: "Удалить",
    dataIndex: "delete",
    render: (_: any, record) => (
      <Flex justify="center">
        <DeleteOutlined
          style={{ cursor: "pointer", fontSize: "22px" }}
          onClick={() => {
            deleteRow(record.key);
          }}
        />
      </Flex>
    ),
  },
];
