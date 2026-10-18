import { useEffect } from "react";

import {
    Modal,
    Form,
    Input,
    DatePicker,
    Button,
    message
} from "antd";

import dayjs from "dayjs";

import {
    updateProductionOrder
} from "../api/productionOrderApi";

function EditProductionOrderModal({
    open,
    onClose,
    productionOrder,
    refresh
}) {

    const [form] = Form.useForm();

    useEffect(() => {

        if (!productionOrder)
            return;

        form.setFieldsValue({

            productionOrderNumber:
                productionOrder.productionOrderNumber,

            plannedStartDate:
                dayjs(productionOrder.plannedStartDate),

            plannedEndDate:
                dayjs(productionOrder.plannedEndDate)

        });

    }, [productionOrder, form]);

    const handleFinish = async (values) => {

        try {

            await updateProductionOrder(

                productionOrder.id,

                {

                    productionOrderNumber:
                        values.productionOrderNumber,

                    plannedStartDate:
                        values.plannedStartDate.toISOString(),

                    plannedEndDate:
                        values.plannedEndDate.toISOString()

                }

            );

            message.success(
                "Üretim emri güncellendi."
            );

            refresh();

            onClose();

        }
        catch {

            message.error(
                "Güncelleme başarısız."
            );

        }

    };

    return (

        <Modal

            title="Üretim Emrini Düzenle"

            open={open}

            onCancel={onClose}

            footer={null}

            destroyOnClose

        >

            <Form

                layout="vertical"

                form={form}

                onFinish={handleFinish}

            >

                <Form.Item

                    label="Üretim Emri"

                    name="productionOrderNumber"

                    rules={[
                        {
                            required: true,
                            message: "Üretim emri numarası zorunludur."
                        }
                    ]}

                >

                    <Input />

                </Form.Item>

                <Form.Item

                    label="Planlanan Başlangıç"

                    name="plannedStartDate"

                    rules={[
                        {
                            required: true
                        }
                    ]}

                >

                    <DatePicker

                        showTime

                        style={{
                            width: "100%"
                        }}

                    />

                </Form.Item>

                <Form.Item

                    label="Planlanan Bitiş"

                    name="plannedEndDate"

                    rules={[
                        {
                            required: true
                        }
                    ]}

                >

                    <DatePicker

                        showTime

                        style={{
                            width: "100%"
                        }}

                    />

                </Form.Item>

                <Button

                    type="primary"

                    htmlType="submit"

                    block

                >

                    Güncelle

                </Button>

            </Form>

        </Modal>

    );

}

export default EditProductionOrderModal;