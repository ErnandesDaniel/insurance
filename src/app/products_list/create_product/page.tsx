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
import dayjs from "dayjs";
import FinalReferences from "@/components/Reference/Final";
//import FinalReferences from "@/components/Reference/Final";

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
        switch (allData.type) {
          case 1: {
            allData.cutOffValues = allData.cutOffValues.map((el) => {
              if (!el.value) return el;
              const parsed = JSON.parse(el.value);
              el["name"] = parsed.name;
              return el;
            });
          }
          case 2: {
            allData.cutOffValues = allData.cutOffValues.map((el) => {
              if (!el.value) return el;
              const parsed = JSON.parse(el.value);
              el["from"] = parsed.from;
              el["to"] = parsed.to;
              return el;
            });
          }
          case 3: {
            allData.cutOffValues = allData.cutOffValues.map((el) => {
              if (!el.value) return el;
              const parsed = JSON.parse(el.value);
              // el["from"] = parsed.from;
              // el["to"] = parsed.to;
              el["range"] = [
                parsed.from ? dayjs(parsed.form) : null,
                parsed.to ? dayjs(parsed.to) : null,
              ];
              return el;
            });
          }
        }
        console.log("allData", allData);
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

      <Form layout="vertical" form={form}>
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
        <Select
          mode="multiple"
          label="Выберите справочники"
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
                    <Form.List
                      name={reference.name}
                      initialValue={reference.cutOffValues}
                    >
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[index, "range"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Date range is required",
                                  },
                                ]}
                              >
                                <RangePicker
                                  placeholder={["От", "До"]}
                                  format="DD.MM.YYYY"
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
                    <Form.List
                      name={reference.name}
                      initialValue={reference.cutOffValues}
                    >
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Flex gap={20}>
                                <Flex gap={10} align="center">
                                  От:
                                  <Form.Item
                                    {...restField}
                                    name={[index, "from"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Range is required",
                                      },
                                    ]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Flex>
                                <Flex gap={10} align="center">
                                  До:
                                  <Form.Item
                                    {...restField}
                                    name={[index, "to"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Range is required",
                                      },
                                    ]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Flex>
                              </Flex>
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
                  <ConditionalRender condition={reference.type == 1}>
                    <Form.List
                      name={reference.name}
                      initialValue={reference.cutOffValues}
                    >
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[index, "name"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Name is required",
                                  },
                                ]}
                              >
                                <Input />
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
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </Form>
      <Spacer space={20} />
      <FinalReferences
        form={form}
        referencesList={referencesList}
        selectedReferences={selectedReferences}
      />
    </Page>
  );
}
