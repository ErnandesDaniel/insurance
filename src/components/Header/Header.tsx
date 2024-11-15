"use client"
import "./Header.css";
import {useRouter} from "next/navigation";
import {useCallback} from "react";
import Link from "next/link";
import Text from "@/components/Universal/Text/Text";

export default function Header() {

    const router = useRouter();

    const exit = useCallback(() => {
        router.push('/login/auth');
    },[router]);

    return (
   <div className='header'>
       <div className='content'>
           <Text className='siteTitle'>MedML</Text>
           <div className='linkBlock'>
               <Text className='link'><Link href="/upload_photo">Добавить снимок</Link></Text>
               <Text className='link'>Пациенты</Text>
               <Text className='link'>Почта</Text>
           </div>
           <Text className='outLink'><span onClick={exit}>Выйти</span></Text>
       </div>
   </div>
    )
}

