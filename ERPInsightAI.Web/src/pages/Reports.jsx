import {
    Row,
    Col,
    Card,
    Typography,
    DatePicker,
    Button,
    Space,
    Statistic,
    Table,
    Tag,
    Progress
} from "antd";
import {
    InboxOutlined,
    CheckCircleOutlined,
    ToolOutlined,
    CalendarOutlined,
    CloseCircleOutlined,
    ApartmentOutlined
} from "@ant-design/icons";

import {
    FilePdfOutlined,
    FileExcelOutlined,
    BarChartOutlined
} from "@ant-design/icons";
import cardStyle from "../styles/cardStyle";
import ProductionChart from "../components/ProductionChart";
import MachineChart from "../components/MachineChart";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/dashboardApi";
import DashboardCard from "../components/DashboardCard";
const { Title } = Typography;
const { RangePicker } = DatePicker;

function Reports() {
    const [dashboard, setDashboard] = useState(null);

        useEffect(() => {
            loadReport();
        }, []);

        async function loadReport() {
            try {
                const data = await getDashboardSummary();
                setDashboard(data);
            }
            catch (err) {
                console.error(err);
            }
        }

        if (!dashboard)
            return <h2>Yükleniyor...</h2>;
        const columns = [
           {
                title: "Durum",
                dataIndex: "status",
                render: (status) => {

                    let color = "blue";
                    let text = status;

                    switch (status) {

                        case "Completed":
                            color = "green";
                            text = "Tamamlandı";
                            break;

                        case "InProduction":
                            color = "processing";
                            text = "Üretimde";
                            break;

                        case "Planned":
                            color = "gold";
                            text = "Planlandı";
                            break;

                        case "Cancelled":
                            color = "red";
                            text = "İptal";
                            break;

                        default:
                            color = "default";
                            break;
                    }

                    return <Tag color={color}>{text}</Tag>;
                }
},
            {
                title: "Planlanan Bitiş",
                dataIndex: "plannedEndDate",
                render: (date) => {

                        if (!date)
                            return "-";

                        return new Date(date).toLocaleDateString("tr-TR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        });

                    }
            }
        ];

    return (

        <div>

            <Title level={2} style={{ marginBottom: 30, fontWeight: 700 }}>

                Raporlar

            </Title>

            <Row
                gutter={16}
                style={{
                    marginBottom:20
                }}
            >

                <Col span={12}>

                    <RangePicker
                        style={{
                            width:"100%"
                        }}
                    />

                </Col>

                <Col span={12}>

                    <Space>

                        <Button
                            type="primary"
                            icon={<BarChartOutlined />}
                        >

                            Rapor Oluştur

                        </Button>

                        <Button
                            icon={<FilePdfOutlined />}
                        >

                            PDF

                        </Button>

                        <Button
                            icon={<FileExcelOutlined />}
                        >

                            Excel

                        </Button>

                    </Space>

                </Col>

            </Row>

            <Row gutter={16} style={{ marginBottom: 20 }}>

                <Col span={8}>
                    <Card style={cardStyle}>
                        <DashboardCard
                            title="Toplam Üretim"
                            value={dashboard.totalProductionOrders}
                            prefix={<InboxOutlined />}
                            color="#1677ff"
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card style={cardStyle}>
                        <DashboardCard
                            title="Tamamlanan"
                            value={dashboard.completedOrders}
                            prefix={<CheckCircleOutlined />}
                            color="#52c41a"
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card style={cardStyle}>
                        <DashboardCard
                            title="Üretimde"
                            value={dashboard.inProductionOrders}
                            prefix={<ToolOutlined />}
                            color="#faad14"
                        />
                    </Card>
                </Col>

            </Row>

<Row gutter={16} style={{ marginBottom: 20 }}>

    <Col span={8}>
        <Card style={cardStyle}>
            <DashboardCard
                title="Planlanan"
                value={dashboard.plannedOrders}
                prefix="📋"
                color="#722ed1"
            />
        </Card>
    </Col>

    <Col span={8}>
        <Card style={cardStyle}>
            <DashboardCard
                title="İptal"
                value={dashboard.cancelledOrders}
                prefix={<CloseCircleOutlined />}
                color="#ff4d4f"
            />
        </Card>
    </Col>

    <Col span={8}>
        <Card style={cardStyle}>
            <DashboardCard
                title="Aktif Makine"
                value={dashboard.activeMachines}
                prefix={<ApartmentOutlined />}
                color="#13c2c2"
            />
        </Card>
    </Col>

</Row>

            <Row
                gutter={16}
                style={{
                    marginTop:25
                }}
            >

                <Col span={12}>

                    <ProductionChart dashboard={dashboard} />

                </Col>

                <Col span={12}>

                    <MachineChart dashboard={dashboard} />

                </Col>

            </Row>
            <Row gutter={16} style={{ marginTop: 25 }}>

                <Col span={24}>

                    <Card title="📈 Performans Özeti" style={cardStyle}>

                        <Row gutter={24}>

                            <Col span={6}>

                                <Statistic
                                    title="Performans Skoru"
                                    value={dashboard.performanceScore}
                                    suffix="/100"
                                />

                                <Progress
                                    percent={dashboard.performanceScore}
                                    status="active"
                                />

                            </Col>

                            <Col span={6}>

                                <Statistic
                                    title="Makine Kullanımı"
                                    value={dashboard.machineUtilizationRate}
                                    suffix="%"
                                />

                                <Progress
                                    percent={dashboard.machineUtilizationRate}
                                />

                            </Col>

                            <Col span={6}>

                                <Statistic
                                    title="Zamanında Teslim"
                                    value={dashboard.onTimeDeliveryRate}
                                    suffix="%"
                                />

                                <Progress
                                    percent={dashboard.onTimeDeliveryRate}
                                />

                            </Col>

                            <Col span={6}>

                                <Statistic
                                    title="Risk Seviyesi"
                                    value={dashboard.riskLevel}
                                />

                                <Tag
                                    color={
                                        dashboard.riskLevel === "High"
                                            ? "red"
                                            : dashboard.riskLevel === "Medium"
                                                ? "orange"
                                                : "green"
                                    }
                                >
                                    {dashboard.riskLevel}
                                </Tag>

                            </Col>

                        </Row>
                        <Card
                            title="📋 Son Üretim Emirleri"
                            style={{ marginTop: 25 }}
                        >

                            <Table
                                rowKey="id"
                                columns={columns}
                                dataSource={dashboard.recentProductionOrders}
                                pagination={false}
                            />

                        </Card>

        </Card>

    </Col>

</Row>

        </div>

    );

}

export default Reports;