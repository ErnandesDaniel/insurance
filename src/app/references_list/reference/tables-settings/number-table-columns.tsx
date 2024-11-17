"use client";
import Input from "antd/es/input";
import { Flex } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Form } from "antd";
import InputNumber from "antd/es/input-number";

export const numberColumns = (
  deleteRow: any,
  dataSource: any,
  setDataSource: any
) => [
  {
    title: "От",
    dataIndex: "startValue",
    render: (startValue: any, record) => {
      const rules = [
        {
          required: true,
          message: "Введите значение",
          // type: 'string',
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
          name={["tableNumberItem", "startValues", record.key]}
          rules={rules}
          initialValue={startValue}
        >
          <InputNumber
            onPressEnter={save}
            onBlur={save}
            controls={false}
            onChange={onChangeInputValue}
          />
        </Form.Item>
      );
    },
  },

  {
    title: "До",
    dataIndex: "endValue",
    render: (endValue: any, record) => {
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
          endValue: newValue,
        });
        setDataSource(newData);
      };

      return (
        <Form.Item
          name={["tableNumberItem", "endValues", record.key]}
          rules={rules}
          initialValue={endValue}
        >
          <InputNumber
            onPressEnter={save}
            onBlur={save}
            controls={false}
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
