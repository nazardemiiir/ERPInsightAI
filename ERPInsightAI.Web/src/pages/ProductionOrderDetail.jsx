import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    Card,
    Typography,
    Descriptions,
    Tag,
    Spin
} from "antd";

import {
    getProductionOrderById
} from "../api/productionOrderApi";

const { Title } = Typography;

function ProductionOrderDetail() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        loadOrder();

    }, []);

    async function loadOrder() {

        const data =
            await getProductionOrderById(id);

        setOrder(data);

    }

    if (!order)

        return <Spin size="large" />;

    return (

        <Card>

            <Title>

                📦 Üretim Emri Detayı

            </Title>

            <Descriptions
                bordered
                column={1}
            >

                <Descriptions.Item label="Üretim Emri">

                    {order.productionOrderNumber}

                </Descriptions.Item>

                <Descriptions.Item label="Durum">

                    <Tag color="blue">

                        {order.status}

                    </Tag>

                </Descriptions.Item>

                <Descriptions.Item label="Planlanan Başlangıç">

                    {new Date(order.plannedStartDate)
                        .toLocaleString("tr-TR")}

                </Descriptions.Item>

                <Descriptions.Item label="Planlanan Bitiş">

                    {new Date(order.plannedEndDate)
                        .toLocaleString("tr-TR")}

                </Descriptions.Item>

                <Descriptions.Item label="Gerçek Başlangıç">

                    {order.actualStartDate
                        ? new Date(order.actualStartDate)
                            .toLocaleString("tr-TR")
                        : "-"}

                </Descriptions.Item>

                <Descriptions.Item label="Gerçek Bitiş">

                    {order.actualEndDate
                        ? new Date(order.actualEndDate)
                            .toLocaleString("tr-TR")
                        : "-"}

                </Descriptions.Item>

            </Descriptions>

        </Card>

    );

}

export default ProductionOrderDetail;