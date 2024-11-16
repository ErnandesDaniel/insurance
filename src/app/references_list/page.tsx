"use client"
import Flex from 'antd/es/flex'
import Page from "@/components/Page/Page";
import Button from "@/components/Universal/Button/Button";
import Spacer from "@/components/Universal/Spacer/Spacer";
import {useCallback, useState} from "react";
import  './references_list.css'
import {useRouter} from "next/navigation";
import Text from "@/components/Universal/Text/Text";

export default function referencesListPage() {


    const router = useRouter();
    const createReference = useCallback((values) => {
        router.push('/references_list/create_reference');
    },[router]);

    interface reference{
        id:number;
        name:string;
    }

    const [referencesList, setReferencesList]=useState<reference[]>([
        {name:'Валюта', id:1},
        {name:'Стоимость', id:2}
    ]);

    return(<Page>
       <Spacer space={50} />
        <Flex  justify='space-between'>
        <Flex className='references_list' vertical gap={15}>
            <Text className='title'> Список справочников</Text>
            {

                referencesList.map(({name, id})=>(<div className='reference_item'> {name}</div>))

            }
        </Flex>
        <Button title='Создать новый справочник' width={250} onClick={createReference} />
       </Flex>

</Page>)
}