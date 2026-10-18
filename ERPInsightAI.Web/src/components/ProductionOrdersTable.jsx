import {
    Table,
    Button,
    Space,
    Popconfirm,
    Tag,
    message
} from "antd";

import {
    startProductionOrder,
    completeProductionOrder,
    deleteProductionOrder
} from "../api/productionOrderApi";
import { useNavigate } from "react-router-dom";

function ProductionOrdersTable({
    orders,
    refresh,
    onEdit
}) {
    const navigate = useNavigate();

    const handleStart = async (id) => {

        try {

            await startProductionOrder(id);

            message.success("Üretim emri başlatıldı.");

            refresh();

        }
        catch {

            message.error("Üretim emri başlatılamadı.");

        }

    };

    const handleComplete = async (id) => {

        try {

            await completeProductionOrder(id);

            message.success("Üretim emri tamamlandı.");

            refresh();

        }
        catch {

            message.error("Üretim emri tamamlanamadı.");

        }

    };
    const handleDelete = async (id) => {

        try {

            await deleteProductionOrder(id);

            message.success("Üretim emri silindi.");

            refresh();

        }
        catch {

            message.error("Silme işlemi başarısız.");

        }

    };


    const renderStatus = (status) => {

        switch (status) {

            case "Created":
                return <Tag color="default">Created</Tag>;

            case "Planned":
                return <Tag color="blue">Planned</Tag>;

            case "InProduction":
                return <Tag color="processing">In Production</Tag>;

            case "Completed":
                return <Tag color="green">Completed</Tag>;

            case "Cancelled":
                return <Tag color="red">Cancelled</Tag>;

            default:
                return <Tag>{status}</Tag>;
        }

    };

    const columns = [

        {
            title: "Üretim Emri",
            dataIndex: "productionOrderNumber",
            key: "productionOrderNumber"
        },

        {
            title: "Durum",
            dataIndex: "status",
            key: "status",
            render: renderStatus
        },

        {
            title: "Planlanan Başlangıç",
            dataIndex: "plannedStartDate",
            render: (value) =>
                new Date(value).toLocaleString("tr-TR")
        },

        {
            title: "Planlanan Bitiş",
            dataIndex: "plannedEndDate",
            render: (value) =>
                new Date(value).toLocaleString("tr-TR")
        },

        {
            title: "Gerçek Başlangıç",
            dataIndex: "actualStartDate",
            render: (value) =>
                value
                    ? new Date(value).toLocaleString("tr-TR")
                    : "-"
        },

        {
            title: "Gerçek Bitiş",
            dataIndex: "actualEndDate",
            render: (value) =>
                value
                    ? new Date(value).toLocaleString("tr-TR")
                    : "-"
        },

        {
            title: "İşlemler",
            key: "actions",
            render: (_, record) => (

                <Space>

                    <Button
                        type="primary"
                        disabled={record.status !== "Created"}
                        onClick={() => handleStart(record.id)}
                    >
                        Başlat
                    </Button>

                    <Popconfirm
                        title="Üretim emri tamamlansın mı?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => handleComplete(record.id)}
                    >
                        <Button
                            disabled={record.status !== "InProduction"}
                            type="default"
                        >
                            Tamamla
                        </Button>
                    </Popconfirm>

                    <Button
                        onClick={() =>
                            navigate(`/production-orders/${record.id}`)
                        }
                    >
                        Detay
                    </Button>

                    <Button
                        onClick={() => onEdit(record)}
                    >
                        Düzenle
                    </Button>
                    <Popconfirm
                        title="Üretim emri silinsin mi?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger>
                            Sil
                        </Button>
                    </Popconfirm>

                </Space>

            )

        }

    ];

    return (

        <Table

            rowKey="id"

            columns={columns}

            dataSource={orders}

            pagination={{
                pageSize: 10,
                showSizeChanger: false
            }}

        />

    );

}

export default ProductionOrdersTable;