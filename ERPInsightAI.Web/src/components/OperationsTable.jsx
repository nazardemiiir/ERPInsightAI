import {
    Table,
    Tag,
    Button,
    Space,
    Popconfirm,
    message
} from "antd";

import {
    startOperation,
    completeOperation
} from "../api/operationApi";

function OperationsTable({
    operations,
    refresh
}) {

    const handleStart = async (id) => {

        try {

            await startOperation(id);

            message.success("Operasyon başlatıldı.");

            refresh();

        }
        catch {

            message.error("Operasyon başlatılamadı.");

        }

    };

    const handleComplete = async (id) => {

        try {

            await completeOperation(id);

            message.success("Operasyon tamamlandı.");

            refresh();

        }
        catch {

            message.error("Operasyon tamamlanamadı.");

        }

    };

    const renderStatus = (status) => {

        switch (status) {

            case "Waiting":
                return <Tag color="gold">Bekliyor</Tag>;

            case "InProgress":
                return <Tag color="processing">Devam Ediyor</Tag>;

            case "Completed":
                return <Tag color="green">Tamamlandı</Tag>;

            default:
                return <Tag>{status}</Tag>;

        }

    };

    const columns = [

        {
            title: "Kod",
            dataIndex: "operationCode"
        },

        {
            title: "Operasyon",
            dataIndex: "operationName"
        },

        {
            title: "Sıra",
            dataIndex: "sequence"
        },

        {
            title: "Durum",
            dataIndex: "status",
            render: renderStatus
        },

        {
            title: "İşlemler",

            render: (_, record) => (

                <Space>

                    <Button

                        type="primary"

                        disabled={
                            record.status !== "Waiting"
                        }

                        onClick={() =>
                            handleStart(record.id)
                        }

                    >

                        Başlat

                    </Button>

                    <Popconfirm

                        title="Operasyon tamamlansın mı?"

                        okText="Evet"

                        cancelText="Hayır"

                        onConfirm={() =>
                            handleComplete(record.id)
                        }

                    >

                        <Button

                            disabled={
                                record.status !== "InProgress"
                            }

                        >

                            Tamamla

                        </Button>

                    </Popconfirm>

                    <Button>

                        Detay

                    </Button>

                </Space>

            )

        }

    ];

    return (

        <Table

            rowKey="id"

            columns={columns}

            dataSource={operations}

            pagination={{
                pageSize: 10
            }}

        />

    );

}

export default OperationsTable;