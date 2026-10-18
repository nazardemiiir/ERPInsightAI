import { Card, Table, Tag } from "antd";

function RecentOrdersTable({ orders }) {

    const columns = [

        {
            title: "Üretim Emri",
            dataIndex: "productionOrderNumber"
        },

        {
            title: "Durum",
            dataIndex: "status",

            render: status => {

                let color = "blue";

                if (status === "Completed")
                    color = "green";

                if (status === "InProduction")
                    color = "orange";

                if (status === "Cancelled")
                    color = "red";

                return (
                    <Tag color={color}>
                        {status}
                    </Tag>
                );

            }

        },

        {

            title: "Planlanan Bitiş",

            dataIndex: "plannedEndDate",

            render: value =>
                new Date(value).toLocaleDateString("tr-TR")

        },

        {

            title: "Gerçek Bitiş",

            dataIndex: "actualEndDate",

            render: value =>

                value

                    ? new Date(value).toLocaleDateString("tr-TR")

                    : "-"

        }

    ];

    return (

        <Card
            title="📋 Son Üretim Emirleri"
            style={{
                marginTop: 25,
                borderRadius: 14
            }}
        >

            <Table

                columns={columns}

                dataSource={orders}

                rowKey="id"

                pagination={false}

            />

        </Card>

    );

}

export default RecentOrdersTable;