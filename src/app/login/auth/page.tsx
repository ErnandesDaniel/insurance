"use client"
import Page from "@/components/Page/Page";
import Spacer from "@/components/Universal/Spacer/Spacer";
import "./auth.css";
import Button from "@/components/Universal/Button/Button";
import Text from "@/components/Universal/Text/Text";
import Flex  from "antd/es/flex";
import Input  from "antd/es/input";
import Form  from "antd/es/form";
const { Password }=Input;

export default function Auth() {

    return(
        <Page>
            <Spacer  space={150}/>
            <Form onFinish={(value)=>{console.log(value)}}>
                <Flex vertical align='center' gap={20} className='auth_flex_container'>
                <Text fontSize={20}>Вход в личный кабинет</Text>
                <Input placeholder='Введите логин'/>
                <Password placeholder='Введите пароль'/>
                <Button title='Продолжить'/>
                </Flex>
            </Form>
        </Page>)}