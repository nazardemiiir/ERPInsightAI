import { useEffect, useMemo, useState } from "react";

import {
    Typography,
    Card,
    Row,
    Col,
    Statistic,
    Input,
    Select,
    Button,
    Table,
    Tag,
    Space,
    message
} from "antd";

import {
    PlusOutlined,
    ApartmentOutlined,
    ToolOutlined,
    BuildOutlined,
    WarningOutlined
} from "@ant-design/icons";
import StatCard from "../components/shared/StatCard";
import axios from "axios";
import cardStyle from "../styles/cardStyle";

const { Title } = Typography;

function Machines() {

    const [machines, setMachines] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

        loadMachines();

    }, []);

    async function loadMachines() {

        try {

            const response = await axios.get(
                "https://localhost:7040/api/Machines"
            );

            setMachines(response.data);

        }
        catch {

            message.error("Makineler yüklenemedi.");

        }

    }

    const filteredMachines = useMemo(() => {

        return machines.filter(machine => {

            const searchMatch =
                machine.machineCode
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                machine.machineName
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const statusMatch =

                statusFilter === "All"

                    ? true

                    : machine.status === statusFilter;

            return searchMatch && statusMatch;

        });

    }, [machines, search, statusFilter]);

    const statistics = {

        total: machines.length,

        active:
            machines.filter(x => x.status === "Active").length,

        maintenance:
            machines.filter(x => x.status === "Maintenance").length,

        breakdown:
            machines.filter(x => x.status === "Breakdown").length

    };

    const columns = [

        {
            title: "Makine Kodu",
            dataIndex: "machineCode"
        },

        {
            title: "Makine Adı",
            dataIndex: "machineName"
        },

        {
            title: "Durum",

            dataIndex: "status",

            render: (status) => {

                switch (status) {

                    case "Active":

                        return <Tag color="green">Aktif</Tag>;

                    case "Maintenance":

                        return <Tag color="orange">Bakımda</Tag>;

                    case "Breakdown":

                        return <Tag color="red">Arızalı</Tag>;

                    default:

                        return <Tag>Boşta</Tag>;

                }

            }

        },

        {

            title: "İşlemler",

            render: () => (

                <Space>

                    <Button type="primary">

                        Detay

                    </Button>

                    <Button>

                        Düzenle

                    </Button>

                </Space>

            )

        }

    ];

    return (

        <div>

            <Title level={2} style={{ marginBottom: 30, fontWeight: 700 }}>

                 Makine Yönetimi

            </Title>

           <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Toplam Makine"
                        value={statistics.total}
                        icon={<ApartmentOutlined />}
                        color="#1677ff"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Aktif"
                        value={statistics.active}
                        icon={<ToolOutlined />}
                        color="#52c41a"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Bakımda"
                        value={statistics.maintenance}
                        icon={<BuildOutlined />}
                        color="#faad14"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Arızalı"
                        value={statistics.breakdown}
                        icon={<WarningOutlined />}
                        color="#ff4d4f"
                    />
                </Col>

            </Row>

            <Row gutter={16} style={{ marginBottom: 20 }}>

                <Col span={8}>

                    <Input

                        placeholder="Makine Ara..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </Col>

                <Col span={6}>

                    <Select

                        style={{ width: "100%" }}

                        value={statusFilter}

                        onChange={setStatusFilter}

                        options={[

                            {
                                value: "All",
                                label: "Tümü"
                            },

                            {
                                value: "Active",
                                label: "Aktif"
                            },

                            {
                                value: "Maintenance",
                                label: "Bakımda"
                            },

                            {
                                value: "Breakdown",
                                label: "Arızalı"
                            }

                        ]}

                    />

                </Col>

                <Col span={6}>

                    <Button

                        type="primary"

                        icon={<PlusOutlined />}

                    >

                        Yeni Makine

                    </Button>

                </Col>

            </Row>

            <Card
                    style={{
                        borderRadius: 18,
                        border: "none",
                        boxShadow: "0 10px 25px rgba(0,0,0,.08)"
                    }}
            >

                <Table

                    rowKey="id"

                    columns={columns}

                    dataSource={filteredMachines}

                    pagination={{
                        pageSize: 10
                    }}

                />

            </Card>

        </div>

    );

}

export default Machines;