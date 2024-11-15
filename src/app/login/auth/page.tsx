"use client"
import {Flex, Form} from "antd";
import TextField from "@/components/Universal/TextField/TextField";
import Button from "@/components/Universal/Button/Button";
import Link from "next/link";
import {useCallback, useState} from "react";
import Spacer from "@/components/Universal/Spacer/Spacer";
import { useRouter } from 'next/navigation';

export default function Auth() {

    const router = useRouter();

    const onFinish=useCallback((values)=>{
        console.log(values);
        router.push('/upload_photo');

    },[router]);

    return(
<>

    <Flex className='page' wrap justify='space-around'>

        <div style={{
            fontSize:"40px",
            color:'rgb(79, 179, 234)',
            fontWeight:"bold",
            fontFamily:"Arial",
            marginBottom:"20px",
            maxWidth:800,
            paddingLeft:"20px", paddingRight:"20px"

        }}>
            Интеллектуальный ассистент слепой диагностики узловых образований щитовидной железы
        </div>

        <Form onFinish={onFinish} layout="vertical">

            <Flex vertical style={{width: 400}}>

                <div style={{
                    width: '100%', textAlign: "start", fontWeight: "bold", fontFamily: "Arial",
                    fontSize: "20px", color: "dimgray", marginBottom: 10

                }}>Войти
                </div>

                <TextField
                    errorText='Введите электронную почту пользователя!'
                    name="login"
                    required
                    label="Электронная почта"
                />

                <TextField
                    errorText='Введите пароль пользователя!'
                    name="password"
                    required
                    label="Пароль"
                    isPassword
                />

                <Spacer space={10} />
                <Button type="primary" htmlType="submit" title='Войти'/>
                <Spacer space={10} />
                <div style={{marginTop:10}}> У вас нет аккаунта? <Link href="/login/register">Зарегистрироваться</Link></div>


            </Flex>

        </Form>

    </Flex>
</>
    )
}