import {
    Modal,
    Form,
    Input,
    Button,
    message
} from "antd";

import {
    createEmployee
} from "../api/employeeApi";

function CreateEmployeeModal({
    open,
    onClose,
    refresh
}) {

    const [form] = Form.useForm();

    const handleFinish = async (values) => {

        try {

            await createEmployee(values);

            message.success("Çalışan oluşturuldu.");

            form.resetFields();

            refresh();

            onClose();

        }
        catch {

            message.error("Çalışan oluşturulamadı.");

        }

    };

    return (

        <Modal

            open={open}

            onCancel={onClose}

            footer={null}

            title="Yeni Çalışan"

        >

            <Form

                layout="vertical"

                form={form}

                onFinish={handleFinish}

            >

                <Form.Item

                    label="Personel Numarası"

                    name="employeeNumber"

                    rules={[
                        {
                            required: true,
                            message: "Personel numarası zorunludur."
                        }
                    ]}

                >

                    <Input />

                </Form.Item>

                <Form.Item

                    label="Ad"

                    name="firstName"

                    rules={[
                        {
                            required: true,
                            message: "Ad zorunludur."
                        }
                    ]}

                >

                    <Input />

                </Form.Item>

                <Form.Item

                    label="Soyad"

                    name="lastName"

                    rules={[
                        {
                            required: true,
                            message: "Soyad zorunludur."
                        }
                    ]}

                >

                    <Input />

                </Form.Item>

                <Form.Item

                    label="Pozisyon"

                    name="position"

                    rules={[
                        {
                            required: true,
                            message: "Pozisyon zorunludur."
                        }
                    ]}

                >

                    <Input />

                </Form.Item>

                <Form.Item

                    label="Departman Id"

                    name="departmentId"

                    rules={[
                        {
                            required: true,
                            message: "Departman zorunludur."
                        }
                    ]}

                >

                    <Input />

                </Form.Item>

                <Button

                    htmlType="submit"

                    type="primary"

                    block

                >

                    Kaydet

                </Button>

            </Form>

        </Modal>

    );

}

export default CreateEmployeeModal;