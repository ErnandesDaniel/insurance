"use client";
import Page from "@/components/Page/Page";
import Text from "@/components/Universal/Text/Text";
import "./create_product.css";
import Spacer from "@/components/Universal/Spacer/Spacer";
import TextField from "@/components/Universal/TextField/TextField";
import Form from "antd/es/form";
import Select from "@/components/Universal/Select/Select";
import Button from "@/components/Universal/Button/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "antd/es/date-picker";
import ConditionalRender from "@/components/Universal/ConditionalRender/ConditionalRender";
import Flex from "antd/es/flex";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Input from "antd/es/input";
import AntButton from "antd/es/button";
import { Space } from "antd";

const { RangePicker } = DatePicker;

export default function CurrentPage() {
  const referenceTypeList = [
    { text: "Элитная недвижимость", id: 1 },
    { text: "Хрущевки", id: 2 },
  ];

  const { useForm } = Form;

  const [form] = useForm();

  const [referencesList, setReferencesList] = useState<any>();

  useEffect(() => {
    const apiUrl = "http://51.250.66.112/api/cutoffs";
    axios.get(apiUrl).then(async (response) => {
      const referencesArray: any[] = [];
      const allReferences: any[] = response.data;
      for await (const reference of allReferences) {
        const allData = (
          await axios.get(`http://51.250.66.112/api/cutoffs/${reference.id}`)
        ).data;
        referencesArray.push(allData);
      }
      setReferencesList(referencesArray);
      console.log(referencesArray);
    });
  }, [setReferencesList]);

  const [selectedReferences, setSelectedReferences] = useState<any>([]);

  return (
    <Page>
      <Spacer space={20} />
      <Text className="title"> Создание нового продукта</Text>
      <Spacer space={20} />

      <Form
        layout="vertical"
        form={form}
        //   style={{ width: 300 }}
      >
        <TextField
          label="Название"
          errorText="Название продукта обязательное"
          name="productName"
        />
        <Select
          label="Категория"
          name="projectCategory"
          errorText="Категория проекта обязательное поле"
          options={referenceTypeList.map(({ text, id }) => {
            return { value: id, label: text };
          })}
        />
        <Spacer space={20} />

        <Select
          mode="multiple"
          placeholder="Выберите справочники"
          onChange={(values) => {
            setSelectedReferences(values);
          }}
          options={referencesList?.map(({ name, id }) => {
            return { value: id, label: name };
          })}
        />

        <div className="references_data_list" style={{ height: "100%" }}>
          {referencesList?.map((reference) => {
            if (selectedReferences.includes(reference.id)) {
              return (
                <div className="reference_data" key={reference.id}>
                  <Text fontSize={18}>{reference.name}</Text>
                  <Spacer space={10} />

                  <ConditionalRender condition={reference.type == 3}>
                    <Form.List name={reference.name}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "first"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing first name",
                                  },
                                ]}
                              >
                                <RangePicker
                                  format={{
                                    format: "DD.MM.YYYY",
                                    type: "mask",
                                  }}
                                />
                              </Form.Item>

                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <AntButton
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                              style={{ width: "300px" }}
                            >
                              Добавить
                            </AntButton>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </ConditionalRender>

                  <Spacer space={20} />

                  <ConditionalRender condition={reference.type == 2}>
                    <Form.List name={reference.name}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "first"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing first name",
                                  },
                                ]}
                              >
                                <Flex gap={20}>
                                  <Flex gap={10} align="center">
                                    От: <Input />
                                  </Flex>
                                  <Flex gap={10} align="center">
                                    До: <Input />
                                  </Flex>
                                </Flex>
                              </Form.Item>

                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <AntButton
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                              style={{ width: "300px" }}
                            >
                              Добавить
                            </AntButton>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </ConditionalRender>

                  <ConditionalRender condition={reference.type == 1}>
                    <Form.List
                      name={reference.name}
                      initialValue={reference.cutOffValues}
                    >
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field) => (
                            <Space
                              key={field.key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                initialValue="test"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing first name",
                                  },
                                ]}
                              >
                                <Input
                                  value={
                                    JSON.parse(
                                      reference.cutOffValues[field.key].value
                                    ).name
                                  }
                                />
                              </Form.Item>

                              <MinusCircleOutlined
                                onClick={() => remove(field.name)}
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <AntButton
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                              style={{ width: "300px" }}
                            >
                              Добавить
                            </AntButton>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </ConditionalRender>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <Text fontSize={18}>Дата заключения</Text>
        <Spacer space={10} />
        <RangePicker
          format={{
            format: "DD.MM.YYYY",
            type: "mask",
          }}
        />

        <Spacer space={20} />
        <Button title="Создать таблицу" htmlType="submit" />
      </Form>

      <Spacer space={20} />
    </Page>
  );
}
