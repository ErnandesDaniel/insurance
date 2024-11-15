"use client"
import Text from "@/components/Universal/Text/Text";
import "./upload_photo.css";
import Spacer from "@/components/Universal/Spacer/Spacer";
import {useCallback, useMemo, useState} from "react";
import Button from "@/components/Universal/Button/Button";
import {useRouter} from "next/navigation";
import UploadPhotoModal from "@/components/Modals/UploadPhoto/UploadPhotoModal";
import { message, Upload } from 'antd';
const { Dragger } = Upload;
import { InboxOutlined } from '@ant-design/icons';

export default function UploadPhoto() {

    const router = useRouter();

    const [isModalOpen, setIsModalOpen]=useState<boolean>();

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    },[setIsModalOpen]);

    const handleOk = useCallback(() => {
        setIsModalOpen(false);
        router.push('/diagnostic_is_running');
    },[setIsModalOpen, router]);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
    },[setIsModalOpen]);

    const ModalFinish = useCallback(() => {
        handleOk();
    },[handleOk]);

    const patients=useMemo(()=>{

        return[

            {
                label:'Иванов Иван Иванович 1',
                value:1,
                birthDate:'12.09.1997'

            },
            {
                label:'Иванов Иван Иванович 2',
                value:2,
                birthDate:'15.01.1997'

            },
            {
                label:'Иванов Иван Иванович 3',
                value:3,
                birthDate:'22.04.1985'

            },
            {
                label:'Иванов Иван Иванович 4',
                value:4,
                birthDate:'18.05.2001'

            },

        ]


    },[])

    const props={
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return(
<>
    <div className='page'>
        <Spacer space={50} />
        <Text fontSize={50} className='title'>Загрузка снимка</Text>
        <Spacer space={30} />
        <Text className='description'>Для начала диагностики загрузите интересующий снимок ультразвуковой диагностики щитовидной железы</Text>
        <Spacer space={20} />
        <Dragger {...props} className='download_area'>
            <Spacer space={20} />
            <p className="ant-upload-drag-icon"><InboxOutlined className='download_area_img' /></p>
            <Spacer space={20} />
            <p className="ant-upload-text">Нажмите или перетащите файл в эту область для загрузки</p>
            <Spacer space={10} />
            <p className="ant-upload-hint">Выберите файл в формате .png или .tiff</p>
        </Dragger>
        <Spacer space={30} />
            <Button onClick={showModal} title='Начать диагностику' className='download_button' block={false} />
        <UploadPhotoModal
            ModalFinish={ModalFinish}
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            patients={patients}
        />
    </div>
</>
    )
}