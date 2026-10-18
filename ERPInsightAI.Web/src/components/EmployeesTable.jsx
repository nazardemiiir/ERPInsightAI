import {
    Table,
    Button,
    Space,
    Tag,
    Popconfirm,
    message
} from "antd";

import {
    deleteEmployee
} from "../api/employeeApi";

function EmployeesTable({
    employees,
    refresh
}) {

    const handleDelete = async (id) => {

        try {

            await deleteEmployee(id);

            message.success("Çalışan silindi.");

            refresh();

        }
        catch {

            message.error("Çalışan silinemedi.");

        }

    };

    const columns = [

        {
            title: "Ad Soyad",
            dataIndex: "fullName",
            key: "fullName"
        },

        {
            title: "Departman",
            dataIndex: "departmentName",
            key: "departmentName"
        },

        {
            title: "Pozisyon",
            dataIndex: "position",
            key: "position"
        },

        {
            title: "Durum",
            dataIndex: "isActive",
            key: "isActive",

            render: (value) =>

                value

                    ? <Tag color="green">Aktif</Tag>

                    : <Tag color="red">Pasif</Tag>

        },

        {
            title: "İşlemler",

            render: (_, record) => (

                <Space>

                    <Button type="primary">

                        Detay

                    </Button>

                    <Button>

                        Düzenle

                    </Button>

                    <Popconfirm

                        title="Çalışan silinsin mi?"

                        okText="Evet"

                        cancelText="Hayır"

                        onConfirm={() =>
                            handleDelete(record.id)
                        }

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

            dataSource={employees}

            pagination={{
                pageSize: 10
            }}

        />

    );

}

export default EmployeesTable;