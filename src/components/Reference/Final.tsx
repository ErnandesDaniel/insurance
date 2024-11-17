"use client";
import Text from "@/components/Universal/Text/Text";
import Spacer from "@/components/Universal/Spacer/Spacer";
import TextField from "@/components/Universal/TextField/TextField";
import Form from "antd/es/form";
import Button from "@/components/Universal/Button/Button";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  DatePicker,
  InputNumber,
  Switch,
  Space,
  Row,
  Col,
  Popover,
  Table,
  Card,
  Select,
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
import type { ColumnsType } from "antd/es/table";

interface ParamItem {
  text: string;
  action: "plus" | "mul";
  param: number;
}

interface CategoryValues {
  [key: string]: ParamItem;
}

interface TableRow {
  [key: string]: string | number;
}

interface ParamsDict {
  [key: string]: {
    [key: string]: number;
  };
}

export default function FinalReferences({
  key,
  name,
  add,
  remove,
  form,
  referencesList,
  selectedReferences,
  addFinalData,
}) {
  const [finalReferences, setFinalReferences] = useState<any>([]);
  const [finalData, setFinalData] = useState<any>({
    name: "Новый параметр",
    baseParam: 1.0,
    data: {},
  });

  const formFields: any = Form.useWatch([], form);
  useEffect(() => {
    // console.log("finalData", finalData);
    addFinalData(name, finalData);
  }, [finalData]);

  useEffect(() => {
    const newData = { ...finalData };

    referencesList
      ?.filter(({ id }) => finalReferences.includes(id))
      .forEach(({ name }) => {
        if (formFields && formFields[name]) {
          newData.data[name] = {};
          formFields[name].forEach((option, index) => {
            let value;
            if (option.name) {
              value = option.name;
            } else if (option.from || option.to) {
              value = "";
              if (option.from) {
                value += `от ${option.from} `;
              }
              if (option.to) {
                value += `до ${option.to}`;
              }
            } else if (option.range.length > 0) {
              value = "";
              if (option.range[0]) {
                value += `от ${option.range[0].format("DD.MM.YYYY")} `;
              }
              if (option.range[1]) {
                value += `до ${option.range[1].format("DD.MM.YYYY")}`;
              }
            } else {
              value = "Не определено";
            }

            newData.data[name][index] = {
              text: value,
              action: finalData.data[name][index]?.action ?? "mul",
              param: finalData.data[name][index]?.param ?? 1.0,
            };
          });
        }
      });

    referencesList
      ?.filter(({ id }) => !finalReferences.includes(id))
      .forEach(({ name }) => {
        delete newData.data[name];
      });

    setFinalData(newData);
  }, [finalReferences, formFields, referencesList]);

  const handleNameChange = (value) => {
    setFinalData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleBaseParamChange = (value) => {
    setFinalData((prev) => ({
      ...prev,
      baseParam: value,
    }));
  };

  const handleParamChange = (name, index, value) => {
    setFinalData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: {
          ...prev.data[name],
          [index]: {
            ...prev.data[name][index],
            param: value,
          },
        },
      },
    }));
  };

  const handleActionChange = (name, index, value) => {
    setFinalData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: {
          ...prev.data[name],
          [index]: {
            ...prev.data[name][index],
            action: value,
          },
        },
      },
    }));
  };

  const [combinations, setCombinations] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);

  const createTable = () => {
    const { name, baseParam, data: categoryData } = finalData;

    // Создаем расширенный словарь с параметрами и действиями
    const paramsDict: {
      [key: string]: {
        [key: string]: { param: number; action: "plus" | "mul" };
      };
    } = {};

    Object.entries(categoryData).forEach(
      ([category, values]: [string, CategoryValues]) => {
        paramsDict[category] = Object.values(values).reduce((acc, curr) => {
          acc[curr.text] = {
            param: curr.param,
            action: curr.action,
          };
          return acc;
        }, {} as { [key: string]: { param: number; action: "plus" | "mul" } });
      }
    );

    // Функция для генерации всех комбинаций
    const generateCombinations = (
      categories: string[],
      current: TableRow = {},
      index: number = 0,
      result: number = baseParam
    ): TableRow[] => {
      if (index === categories.length) {
        const returnResult = { ...current };
        returnResult[name] = result;
        return [returnResult];
      }

      const category = categories[index];
      const values = paramsDict[category];
      const combinations: TableRow[] = [];

      Object.entries(values).forEach(([text, { param, action }]) => {
        const newCurrent = { ...current, [category]: text };
        // Применяем соответствующую операцию в зависимости от action
        const newResult = action === "mul" ? result * param : result + param;
        combinations.push(
          ...generateCombinations(categories, newCurrent, index + 1, newResult)
        );
      });

      return combinations;
    };

    const categories = Object.keys(categoryData);
    const allCombinations = generateCombinations(categories);

    // Сортировка комбинаций
    const sortedCombinations = allCombinations.sort((a, b) => {
      for (const category of categories) {
        if (a[category] < b[category]) return -1;
        if (a[category] > b[category]) return 1;
      }
      return 0;
    });

    setColumns([...categories, name]);
    setCombinations(sortedCombinations);
    setShowTable(true);
  };

  const antColumns: ColumnsType = columns.map((column) => ({
    title: column,
    dataIndex: column,
    key: column,
    render: (text) => (typeof text === "number" ? text.toLocaleString() : text),
  }));

  return (
    <Card
      size="small"
      title={
        <Space>
          <Popover content={"Введите название создаваемого параметра"}>
            <QuestionCircleOutlined />
          </Popover>
          <Input
            style={{
              fontSize: 18,
              paddingLeft: 0,
              paddingRight: 0,
              border: "transparent",
              boxShadow: "none",
            }}
            defaultValue={"Новый параметр"}
            onChange={(event) => handleNameChange(event.target.value)}
          />
        </Space>
      }
      key={name}
      extra={
        <CloseOutlined
          onClick={() => {
            remove(name);
          }}
        />
      }
    >
      <Form.Item label="Базовое значение" layout="horizontal" noStyle>
        <Space>
          <Text>Базовое значение</Text>
          <InputNumber
            required
            defaultValue={1.0}
            step={0.1}
            onChange={(value) => handleBaseParamChange(value)}
          />
          <Popover content={"Значение параметра до применения корректировок"}>
            <QuestionCircleOutlined />
          </Popover>
        </Space>
      </Form.Item>
      <Spacer space={10} />

      <Select
        mode="multiple"
        placeholder="Выберите справочники"
        maxCount={selectedReferences.length}
        style={{ width: "100%" }}
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
      {finalReferences.length > 0 && <Spacer space={10} />}

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
                    formFields[name].map((option, index) => {
                      return (
                        <Row
                          key={index}
                          align="middle"
                          gutter={[8, 8]}
                          style={{ marginBottom: "8px" }}
                        >
                          <Col span="1">{index + 1}.</Col>
                          <Col flex="auto">
                            <Input
                              value={
                                finalData.data[name]
                                  ? finalData.data[name][index]?.text
                                  : "Не определено"
                              }
                              readOnly
                            />
                          </Col>
                          <Col flex="44px">
                            <Switch
                              checkedChildren={<CloseOutlined />}
                              unCheckedChildren={<PlusOutlined />}
                              defaultChecked
                              style={{ background: "#4096ff" }}
                              onChange={(value) =>
                                handleActionChange(
                                  name,
                                  index,
                                  value ? "mul" : "plus"
                                )
                              }
                            />
                          </Col>
                          <Col flex="88px">
                            <InputNumber
                              required
                              defaultValue={1.0}
                              step={0.1}
                              style={{ width: 88 }}
                              onChange={(value) =>
                                handleParamChange(name, index, value)
                              }
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

      {finalReferences.length > 0 && (
        <>
          <Spacer space={20} />
          <Button title="Создать таблицу" onClick={() => createTable()} />
        </>
      )}
      {showTable && (
        <>
          <Spacer space={20} />
          <Table
            columns={antColumns}
            dataSource={combinations.map((item, index) => ({
              ...item,
              key: index,
            }))}
            pagination={false}
            bordered
            size="middle"
            scroll={{ x: true }}
          />
        </>
      )}
    </Card>
  );
}
