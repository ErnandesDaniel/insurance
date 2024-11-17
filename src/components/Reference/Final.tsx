"use client";
import Text from "@/components/Universal/Text/Text";
import Spacer from "@/components/Universal/Spacer/Spacer";
import TextField from "@/components/Universal/TextField/TextField";
import Form from "antd/es/form";
import Select from "@/components/Universal/Select/Select";
import Button from "@/components/Universal/Button/Button";
import { useState, useEffect } from "react";
import {
  DatePicker,
  InputNumber,
  Switch,
  Space,
  Row,
  Col,
  Popover,
} from "antd";
import ConditionalRender from "@/components/Universal/ConditionalRender/ConditionalRender";
import Flex from "antd/es/flex";
import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input";
import AntButton from "antd/es/button";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function FinalReferences({
  form,
  referencesList,
  selectedReferences,
}) {
  const [finalReferences, setFinalReferences] = useState<any>([]);

  const formFields: any = Form.useWatch([], form);
  // useEffect(() => {
  //   console.log("formFields", formFields);
  //   console.log("finalReferences", finalReferences);
  // }, [formFields, finalReferences]);

  return (
    <>
      <Space>
        <Input
          style={{
            fontSize: 18,
            border: "transparent",
          }}
          defaultValue={"Тариф"}
        />
        <Popover content={"Введите название создаваемого параметра"}>
          <QuestionCircleOutlined />
        </Popover>
      </Space>
      <Spacer space={10} />
      <Form.Item label="Базовое значение" layout="horizontal">
        <Space>
          <InputNumber required defaultValue={1} step={0.1} />
          <Popover content={"Значение параметра до применения корректировок"}>
            <QuestionCircleOutlined />
          </Popover>
        </Space>
      </Form.Item>
      <Select
        mode="multiple"
        placeholder="Выберите справочники"
        onChange={(values) => {
          setFinalReferences(values);
        }}
        options={referencesList
          ?.filter(({ id }) => {
            return selectedReferences.includes(id);
          })
          ?.map(({ name, id }) => {
            return { value: id, label: name };
          })}
      />
      <div>
        <Row gutter={[16, 16]}>
          {referencesList
            ?.filter(({ id }) => {
              return finalReferences.includes(id);
            })
            .map(({ name }, index) => {
              return (
                <Col key={index} span={8}>
                  <h4>{name}</h4>
                  <Spacer space={10} />

                  {formFields &&
                    formFields[name] &&
                    formFields[name].map(({ name, from, to, range }, index) => {
                      let value;
                      if (name) {
                        value = name;
                      } else if (from || to) {
                        value = "";
                        if (range[0]) {
                          value += `от ${from} `;
                        }
                        if (range[1]) {
                          value += `до ${to}`;
                        }
                      } else if (range.length > 0) {
                        value = "";
                        if (range[0]) {
                          value += `от ${range[0].format("DD.MM.YYYY")} `;
                        }
                        if (range[1]) {
                          value += `до ${range[1].format("DD.MM.YYYY")}`;
                        }
                      } else {
                        value = "Не определено";
                      }

                      return (
                        <Row
                          key={index}
                          align="middle"
                          gutter={[8, 8]}
                          style={{ marginBottom: "8px" }}
                        >
                          <Col span="1">{index + 1}.</Col>
                          <Col flex="auto">
                            <Input value={value} readOnly />
                          </Col>
                          <Col flex="44px">
                            <Switch
                              checkedChildren={<CloseOutlined />}
                              unCheckedChildren={<PlusOutlined />}
                              defaultChecked
                              style={{ background: "#4096ff" }}
                            />
                          </Col>
                          <Col flex="88px">
                            <InputNumber
                              required
                              defaultValue={1}
                              step={0.1}
                              style={{ width: 88 }}
                            />
                          </Col>
                          <Col flex="22px">
                            <Popover
                              content={
                                "Выбор действий над базовым значением для корректировок (умножение или сложение)"
                              }
                            >
                              <QuestionCircleOutlined
                                style={{
                                  display: index === 0 ? "block" : "none",
                                }}
                              />
                            </Popover>
                          </Col>
                        </Row>
                      );
                    })}
                </Col>
              );
            })}
        </Row>
      </div>
      <Spacer space={20} />

      {selectedReferences.length > 0 && (
        <Button title="Создать таблицу" htmlType="submit" />
      )}
    </>
  );
}
