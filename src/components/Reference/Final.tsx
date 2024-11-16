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
  referencesList,
  selectedReferences,
}) {
  const [finalReferences, setFinalReferences] = useState<any>([]);

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
          <Col span={8}>
            <h4>Возраст застрахованного</h4>
            <Spacer space={10} />
            {[
              { label: "от 0 до 25", value: 0.8 },
              { label: "от 18 до 30", value: 0.8 },
              { label: "от 30 до 50", value: 0.8 },
            ].map((option, index) => (
              <Row
                key={index}
                align="middle"
                gutter={[8, 8]}
                style={{ marginBottom: "8px" }}
              >
                <Col span="1">{index + 1}.</Col>
                <Col flex="auto">
                  <Input value={option.label} readOnly />
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
                    defaultValue={option.value ?? 1}
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
                      style={{ display: index === 0 ? "block" : "none" }}
                    />
                  </Popover>
                </Col>
              </Row>
            ))}
          </Col>

          <Col span={8}>
            <h4>Возраст застрахованного</h4>
            <Spacer space={10} />
            {[
              { label: "от 0 до 25", value: 0.8 },
              { label: "от 18 до 30", value: 0.8 },
              { label: "от 30 до 50", value: 0.8 },
            ].map((option, index) => (
              <Row
                key={index}
                align="middle"
                gutter={[8, 8]}
                style={{ marginBottom: "8px" }}
              >
                <Col span="1">{index + 1}.</Col>
                <Col flex="auto">
                  <Input value={option.label} readOnly />
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
                    defaultValue={option.value ?? 1}
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
                      style={{ display: index === 0 ? "block" : "none" }}
                    />
                  </Popover>
                </Col>
              </Row>
            ))}
          </Col>

          <Col span={8}>
            <h4>Возраст застрахованного</h4>
            <Spacer space={10} />
            {[
              { label: "от 0 до 25", value: 0.8 },
              { label: "от 18 до 30", value: 0.8 },
              { label: "от 30 до 50", value: 0.8 },
            ].map((option, index) => (
              <Row
                key={index}
                align="middle"
                gutter={[8, 8]}
                style={{ marginBottom: "8px" }}
              >
                <Col span="1">{index + 1}.</Col>
                <Col flex="auto">
                  <Input value={option.label} readOnly />
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
                    defaultValue={option.value ?? 1}
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
                      style={{ display: index === 0 ? "block" : "none" }}
                    />
                  </Popover>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </div>
      <Spacer space={20} />

      <Button title="Создать таблицу" htmlType="submit" />
    </>
  );
}
