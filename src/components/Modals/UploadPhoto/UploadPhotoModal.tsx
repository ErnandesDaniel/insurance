import "./UploadPhotoModal.css";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Text from "@/components/Universal/Text/Text";
import Button from "@/components/Universal/Button/Button";
import { Modal, Form } from 'antd';
import { Select } from "antd";
const {Item} =Form;
import { Checkbox } from "antd";
import { Flex } from "antd";

export default function UploadPhotoModal({ModalFinish, isModalOpen, handleCancel, patients }) {

    return (


        <Modal title="Заполните данные о пациенте" open={isModalOpen} onCancel={handleCancel} footer={null} width={600} destroyOnClose={true}>
            <Form onFinish={ModalFinish}>
                <div className='modal_form'>

                    <Spacer space={10} />
                    <Item label='Аппарат' layout='vertical' >
                        <Select
                            defaultValue='Logic'
                            options={[
                                { value: 'Logic', label: 'Logic' },
                                { value: 'Logic 2', label: 'Logic 2' },
                                { value: 'Logic 3', label: 'Logic 3' },
                                { value: 'Logic 4', label: 'Logic 4' },
                            ]}
                        />
                    </Item>

                    <Spacer space={15} />

                    <Item label='Проекция' layout='vertical' >
                        <Select
                            defaultValue='Продольная'
                            options={[
                                { value: 'Продольная', label: 'Продольная' },
                                { value: 'Поперечная', label: 'Поперечная' },
                            ]}
                        />
                    </Item>

                    <Spacer space={15} />

                    <Text>Для сохранения результатов диагностики необходимо добавить карту пациента</Text>

                    <Spacer space={15} />

                    <Checkbox checked={true}>Сохранить результаты диагностики</Checkbox>

                    <Spacer space={15} />

                    <Item label='Пациент' layout='vertical' >
                        <Select
                            defaultValue={patients[0].value}
                            options={patients}

                            optionRender={(option) => (
                                <>
                                    <div>{option.data.label}</div>
                                    <div>{option.data.birthDate}</div>
                                </>
                            )}
                        />
                    </Item>





                </div>
                <Spacer space={15} />
                <Flex className='modal_buttons' gap={10} justify='end'>
                    <Button  onClick={handleCancel} width={20} title='Отменить' type='default' className='button' block={false}/>
                    <Button  width={20} title='Начать' htmlType="submit" type='primary' block={false}/>
                </Flex>
            </Form>
        </Modal>



    )
}

