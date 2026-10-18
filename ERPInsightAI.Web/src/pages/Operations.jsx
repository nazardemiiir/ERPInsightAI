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
    Divider,
    message
} from "antd";

import {
    PlusOutlined,
    DeploymentUnitOutlined,
    ClockCircleOutlined,
    ToolOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
import StatCard from "../components/shared/StatCard";
import { getOperations } from "../api/operationApi";

import OperationsTable from "../components/OperationsTable";
import cardStyle from "../styles/cardStyle";
const { Title } = Typography;

function Operations() {

    const [operations, setOperations] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

        loadOperations();

    }, []);

    async function loadOperations() {

        try {

            const data = await getOperations();

            setOperations(data);

        }
        catch {

            message.error("Operasyonlar yüklenemedi.");

        }

    }

    const filteredOperations = useMemo(() => {

        return operations.filter(x => {

            const searchMatch =

                x.operationCode
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                x.operationName
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const statusMatch =

                statusFilter === "All"

                    ? true

                    : x.status === statusFilter;

            return searchMatch && statusMatch;

        });

    }, [operations, search, statusFilter]);

    const statistics = {

        total:

            operations.length,

        waiting:

            operations.filter(x => x.status === "Waiting").length,

        inProgress:

            operations.filter(x => x.status === "InProgress").length,

        completed:

            operations.filter(x => x.status === "Completed").length

    };

    return (

        <div>

            <Title level={2} style={{ marginBottom: 30, fontWeight: 700 }}>

                 Operasyon Yönetimi

            </Title>

            <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Toplam Operasyon"
                        value={statistics.total}
                        icon={<DeploymentUnitOutlined />}
                        color="#1677ff"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Bekleyen"
                        value={statistics.waiting}
                        icon={<ClockCircleOutlined />}
                        color="#722ed1"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Devam Eden"
                        value={statistics.inProgress}
                        icon={<ToolOutlined />}
                        color="#faad14"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Tamamlanan"
                        value={statistics.completed}
                        icon={<CheckCircleOutlined />}
                        color="#52c41a"
                    />
                </Col>

            </Row>

            <Divider />

            <Row
                gutter={16}
                style={{ marginBottom: 20 }}
            >

                <Col span={8}>

                    <Input

                        placeholder="Operasyon Ara..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </Col>

                <Col span={6}>

                    <Select

                        value={statusFilter}

                        onChange={setStatusFilter}

                        style={{ width: "100%" }}

                        options={[

                            {
                                value: "All",
                                label: "Tümü"
                            },

                            {
                                value: "Waiting",
                                label: "Bekliyor"
                            },

                            {
                                value: "InProgress",
                                label: "Devam Ediyor"
                            },

                            {
                                value: "Completed",
                                label: "Tamamlandı"
                            }

                        ]}

                    />

                </Col>

                <Col span={6}>

                    <Button

                        type="primary"

                        icon={<PlusOutlined />}

                    >

                        Yeni Operasyon

                    </Button>

                </Col>

            </Row>

            <Card
                style={{
                    borderRadius: 18,
                    border: "none",
                    boxShadow: "0 8px 20px rgba(0,0,0,.08)"
                }}
            >

                <OperationsTable

                    operations={filteredOperations}

                    refresh={loadOperations}

                />

            </Card>

        </div>

    );

}

export default Operations;