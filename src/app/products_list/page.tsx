"use client"
import Flex from 'antd/es/flex'
import Page from "@/components/Page/Page";
import Button from "@/components/Universal/Button/Button";
import Spacer from "@/components/Universal/Spacer/Spacer";
import {useCallback, useEffect, useState} from "react";
import  './products_list.css'
import {useRouter} from "next/navigation";
import Text from "@/components/Universal/Text/Text";
import axios from "axios";

export default function referencesListPage() {
    const router = useRouter();
    const createProduct = useCallback((values) => {
        router.push('/products_list/create_product');
    },[router]);

    interface product{
        id:number;
        name:string;
    }

    const [productsList, setProductsList]=useState<product[]>([]);

    useEffect(() => {
        axios.get("https://vk-atom-dev.ru/api/products").then((res) => {
            setProductsList(res.data);
        });
    }, [setProductsList]);

    return(<Page>

        <Spacer space={50} />
        <Flex  justify='space-between'>
            <Flex className='products_list' vertical gap={15}>
                <Text className='title'> Список продуктов</Text>
                {

                    productsList.map(({name, id})=>(<div className='product_item' key={name}> {name}</div>))

                }
            </Flex>
            <Button title='Создать новый продукт' onClick={createProduct} />
        </Flex>

    </Page>)
}