"use client"
import Page from "@/components/Page/Page";
import Spacer from "@/components/Universal/Spacer/Spacer";
import "./auth.css";
import Button from "@/components/Universal/Button/Button";
import Text from "@/components/Universal/Text/Text";
import Flex  from "antd/es/flex";
import Input  from "antd/es/input";
import Form  from "antd/es/form";
import {useRouter} from "next/navigation";
import {useCallback} from "react";
import TextField from "@/components/Universal/TextField/TextField";
const { Password }=Input;

export default function Auth() {

    const router = useRouter();
    const enter = useCallback((values) => {
        router.push('/products_list');
    },[router]);

    return(
        <Page>
            <Spacer space={150}/>
            <Form onFinish={enter} layout="vertical">
                <Flex vertical align='center' gap={20} className='auth_flex_container'>
                <Text fontSize={20}>Вход в личный кабинет</Text>
                <TextField errorText= 'Введите логин'  label='Логин'/>
                <TextField errorText= 'Введите пароль' isPassword={true} label='Пароль'/>
                <Button title='Продолжить' htmlType='submit'/>
                </Flex>
            </Form>
        </Page>)}