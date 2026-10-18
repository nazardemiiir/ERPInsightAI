import { useState } from "react";

import {
    Modal,
    Form,
    Input,
    DatePicker,
    message
} from "antd";

import dayjs from "dayjs";

import { createProductionOrder } from "../api/productionOrderApi";

function CreateProductionOrderModal({
    open,
    onClose,
    refresh
}) {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const handleOk = async () => {

        try {

            const values = await form.validateFields();

            setLoading(true);

            await createProductionOrder({

                productionOrderNumber:
                    values.productionOrderNumber,

                salesOrderId: null,

                plannedStartDate:
                    values.dateRange[0].toISOString(),

                plannedEndDate:
                    values.dateRange[1].toISOString()

            });

            message.success(
                "Üretim emri oluşturuldu."
            );

            form.resetFields();

            refresh();

            onClose();

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <Modal

            title="Yeni Üretim Emri"

            open={open}

            confirmLoading={loading}

            okText="Kaydet"

            cancelText="İptal"

            onCancel={onClose}

            onOk={handleOk}

        >

            <Form

                layout="vertical"

                form={form}

            >

                <Form.Item

                    label="Üretim Emri Numarası"

                    name="productionOrderNumber"

                    rules={[
                        {
                            required: true
                        }
                    ]}

                >

                    <Input
                        placeholder="Örn: U002"
                    />

                </Form.Item>

                <Form.Item

                    label="Planlanan Tarih"

                    name="dateRange"

                    rules={[
                        {
                            required: true
                        }
                    ]}

                >

                    <DatePicker.RangePicker

                        showTime

                        style={{
                            width: "100%"
                        }}

                        defaultValue={[
                            dayjs(),
                            dayjs().add(1, "day")
                        ]}

                    />

                </Form.Item>

            </Form>

        </Modal>

    );

}

export default CreateProductionOrderModal;