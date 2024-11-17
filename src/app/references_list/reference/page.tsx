"use client";
import Table from "antd/es/table";
import Page from "@/components/Page/Page";
import { categoryColumns } from "@/app/references_list/create_reference/tables-settings/category-table-columns";
import Button from "@/components/Universal/Button/Button";
import Spacer from "@/components/Universal/Spacer/Spacer";
import { useCallback, useEffect, useState } from "react";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import TextField from "@/components/Universal/TextField/TextField";
import Select from "@/components/Universal/Select/Select";
import ConditionalRender from "@/components/Universal/ConditionalRender/ConditionalRender";
import { numberColumns } from "@/app/references_list/create_reference/tables-settings/number-table-columns";
import { dateColumns } from "@/app/references_list/create_reference/tables-settings/date-table-columns";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const { useWatch } = Form;

export default function CurrentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dataSource, setDataSource] = useState<any[]>([]);

  const { useForm } = Form;

  const [form] = useForm();

  const selectedReferenceType = useWatch("referenceType", form);

  useEffect(() => {
    const id = searchParams.get("id");
    axios.get(`http://51.250.66.112/api/cutoffs/${id}`).then((res) => {
      console.log(res.data);

      const { type } = res.data;
      const { name } = res.data;

      form.setFieldsValue({ referenceType: type, referenceName: name });

      let referenceArrayData;

      if (type == 1) {
        referenceArrayData = res.data.cutOffValues.map(
          ({ value, number }, index) => {
            return { name: JSON.parse(value).name, key: index };
          }
        );
        setDataSource(referenceArrayData);
      }

      console.log(referenceArrayData);

      if (type == 2) {
        const tableNumberItem: any = {
          endValues: [],
          startValues: [],
        };
        res.data.cutOffValues.forEach(({ value }) => {
          if (JSON.parse(value).to) {
            tableNumberItem.endValues.push(JSON.parse(value).to);
          }
          if (JSON.parse(value).from) {
            tableNumberItem.startValues.push(JSON.parse(value).from);
          }
        });

        //setDataSource(tableNumberItem);
        //console.log(tableNumberItem);
      }

      /*


            else if(selectedReferenceType==3){

                referenceArrayData=values.tableItem.map((el)=>{
                    return {
                        from:dayjs(el['0']).toJSON(),
                        to:dayjs(el['1']).toJSON()
                    }
                });

            }
            console.log(referenceArrayData);

            referenceArrayData=referenceArrayData.map((el, index)=>{
                return {
                    number:index+1,
                    value:JSON.stringify(el),
                }
            })

            console.log(referenceArrayData);

            axios.post('http://51.250.66.112/api/cutoffs', {
                    name: referenceName,
                    type: referenceType,
                    cutOffValues:referenceArrayData
                }
            );




            */
    });
  }, [searchParams]);

  const deleteCallback = useCallback(() => {
    const id = searchParams.get("id");
    axios.delete(`http://51.250.66.112/api/cutoffs/${id}`).then((res) => {
      router.push("/references_list");
    });
  }, [searchParams]);

  const referenceTypeList = [
    { text: "Категориальный тип", id: 1 },
    { text: "Числовой тип", id: 2 },
    { text: "Даты", id: 3 },
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

  const handleAdd = () => {
    let newKey = 0;

    if (dataSource.length > 0) {
      newKey = dataSource[dataSource.length - 1].key + 1;
    }

    const newData: any = {
      name: "",
      key: newKey,
    };
    setDataSource([...dataSource, newData]);
  };

  const handleDelete = (key: number) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const onFinishUpdated = (values) => {
    console.log(values);

    /*
        const {referenceName}=values;
        const {referenceType}=values;

        let referenceArrayData;

        if(selectedReferenceType==1) {
            referenceArrayData=values.tableCategoryItem;
        }if(selectedReferenceType==2){

            const numberRangesArray=[];
            values.tableNumberItem.endValues.forEach((el)=>{
                numberRangesArray.push({to:el});
            });
            values.tableNumberItem.startValues.forEach((el, index)=>{
                numberRangesArray[index]={...numberRangesArray[index], from:el};
            });

            referenceArrayData=numberRangesArray;

        }else if(selectedReferenceType==3){

            referenceArrayData=values.tableItem.map((el)=>{
                return {
                    from:dayjs(el['0']).toJSON(),
                    to:dayjs(el['1']).toJSON()
                }
            });

         }
        console.log(referenceArrayData);

        referenceArrayData=referenceArrayData.map((el, index)=>{
            return {
                number:index+1,
                value:JSON.stringify(el),
            }
        })

        console.log(referenceArrayData);

        axios.post('http://51.250.66.112/api/cutoffs', {
                name: referenceName,
                type: referenceType,
                cutOffValues:referenceArrayData
            }
        );
        */
  };

  return (
    <Page>
      <Form form={form} onFinish={onFinishUpdated} layout="vertical">
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
        <ConditionalRender condition={selectedReferenceType == 1}>
          <Spacer space={10} />
          <Table<categoryDataType>
            style={{ width: "80%" }}
            size="small"
            dataSource={dataSource}
            columns={categoryColumns(handleDelete, dataSource, setDataSource)}
            pagination={false}
            scroll={{ y: 320 }}
          />
        </ConditionalRender>
        <ConditionalRender condition={selectedReferenceType == 2}>
          <Spacer space={10} />
          <Table<numberDataType>
            style={{ width: "80%" }}
            size="small"
            dataSource={dataSource}
            columns={numberColumns(handleDelete, dataSource, setDataSource)}
            pagination={false}
            scroll={{ y: 320 }}
          />
        </ConditionalRender>
        <ConditionalRender condition={selectedReferenceType == 3}>
          <Spacer space={10} />
          <Table<dateDataType>
            style={{ width: "80%" }}
            size="small"
            dataSource={dataSource}
            columns={dateColumns(handleDelete, dataSource, setDataSource)}
            pagination={false}
            scroll={{ y: 320 }}
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
          <Button title="Удалить справочник" onClick={deleteCallback} />
        </Flex>
        <Spacer space={10} />
      </Form>
    </Page>
  );
}
