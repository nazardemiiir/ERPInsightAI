import { Card } from "antd";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

function ProductionChart({ dashboard }) {

    if (!dashboard) {

        dashboard = {
            plannedOrders: 0,
            inProductionOrders: 0,
            completedOrders: 0,
            cancelledOrders: 0
        };

    }

    const data = [

        {
            name: "Planlanan",
            value: dashboard.plannedOrders
        },

        {
            name: "Üretimde",
            value: dashboard.inProductionOrders
        },

        {
            name: "Tamamlanan",
            value: dashboard.completedOrders
        },

        {
            name: "İptal",
            value: dashboard.cancelledOrders
        }

    ];

    return (

        <Card
            title="📊 Üretim Durumu"
            style={{ borderRadius: 14 }}
        >

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={data}>

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="value" fill="#1677ff" />

                </BarChart>

            </ResponsiveContainer>

        </Card>

    );

}

export default ProductionChart;