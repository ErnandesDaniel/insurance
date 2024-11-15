"use client"
import {Flex, Form} from "antd";
import TextField from "@/components/Universal/TextField/TextField";
import Button from "@/components/Universal/Button/Button";
import Link from "next/link";
import {useCallback, useEffect, useMemo, useState} from "react";
import Spacer from "@/components/Universal/Spacer/Spacer";
export default function Auth() {

    const onFinish=useCallback((values)=>{
        console.log(values);

    },[]);

    const [isRegisterError, setIsRegisterError]=useState<boolean>(false)

    const emailErrorText=useMemo(()=>{
        if(isRegisterError) {
            return 'Этот Email уже зарегистрирован';
        }else{
            return 'Введите Вашу электронную почту';
        }
    },[isRegisterError]);

    const [form] = Form.useForm<{ email: string;}>();
    //const email = Form.useWatch('email', form);
    //useEffect(()=>alert(email), [email]);

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

                <Form onFinish={onFinish} layout="vertical" form={form}>

                    <Flex vertical style={{width: 600}}>

                        <div style={{
                            width: '100%', textAlign: "start", fontWeight: "bold", fontFamily: "Arial",
                            fontSize: "20px", color: "dimgray", marginBottom: 10

                        }}>Зарегистрироваться
                        </div>

                        <div style={{marginTop: 10}}> Уже есть аккаунт? <Link
                            href="/login/auth">Войти</Link></div>

                        <Spacer space={10} />

                        <div  style={{display:'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gridGap:' 20px'}}>

                            <TextField
                                errorText='Введите вашу фамилию'
                                name="surname"
                                required
                                label="Фамилия"
                            />

                            <TextField
                                errorText='Введите Ваше имя'
                                name="name"
                                required
                                label="Имя"
                            />

                            <TextField
                                errorText='Введите Ваше отчество'
                                name="patronymic"
                                required
                                label="Отчество"
                            />

                            <TextField
                                errorText='Введите название медицинской организации, в которой Вы работаете'
                                name="organisation"
                                required
                                label="Мед. организация"
                            />

                            <TextField
                                errorText={emailErrorText}
                                name="email"
                                required
                                label="Электронная почта"
                                isError={isRegisterError}
                            />

                            <TextField
                                errorText='Ввведите пароль'
                                name="password"
                                required
                                label="Пароль"
                                isPassword
                                isError={isRegisterError}
                            />

                            <TextField
                                errorText='Повторите пароль'
                                name="repeatPassword"
                                required
                                label="Повторите пароль"
                                isPassword
                                isError={isRegisterError}
                            />

                            <div>
                                <Spacer space={30} />
                                <Button type="primary"
                                htmlType="submit" title='Создать аккаунт'/>
                            </div>

                        </div>

                    </Flex>

                </Form>

            </Flex>
        </>
    )
}