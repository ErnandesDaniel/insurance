"use client"
import "./Header.css";
import {useRouter} from "next/navigation";
import React, {useCallback} from "react";
import Text from "@/components/Universal/Text/Text";
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import  Flex  from 'antd/es/flex';
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const exit = useCallback(() => {
        router.push('/login/auth');
    },[router]);

    if(pathname=='/login/auth'){
        return null;
    }

    return (
   <div className='header'>
       <div className='content'>
           <Flex className='linkBlock' gap={20}>
               <Text className={clsx('link', {active: pathname=='/products'})}><Link href="/products">Продукты</Link></Text>
               <Text className={clsx('link', {active: pathname=='/references'})}><Link href="/references">Справочники</Link></Text>
               <Text className={clsx('link', {active: pathname=='/create_new_product'})}><Link href="/create_new_product">Создать новый продукт</Link></Text>
           </Flex>
           <Text className='outLink'><span onClick={exit}>Выйти</span></Text>
       </div>
   </div>
    )
}

