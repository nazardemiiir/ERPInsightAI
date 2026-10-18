import { useEffect, useState } from "react";

import {
    Row,
    Col,
    Typography,
    Card,
    Tag,
    Progress,
    Divider,
    Alert,
    Space
} from "antd";

import {
    InboxOutlined,
    BuildOutlined,
    StarOutlined,
    WarningOutlined
} from "@ant-design/icons";

import { getDashboardSummary } from "../api/dashboardApi";
import cardStyle from "../styles/cardStyle";
import DashboardCard from "../components/DashboardCard";
import AIInsightCard from "../components/AIInsightCard";
import ProductionChart from "../components/ProductionChart";
import MachineChart from "../components/MachineChart";
import RecentOrdersTable from "../components/RecentOrdersTable";
import NotificationCenter from "../components/NotificationCenter";
import StatCard from "../components/shared/StatCard";
function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    useEffect(() => {

        loadDashboard();

        const interval = setInterval(() => {

            loadDashboard();

        }, 10000);

        return () => clearInterval(interval);

    }, []);

    async function loadDashboard() {
        try {
            const data = await getDashboardSummary();
            setDashboard(data);
            setLastUpdate(new Date());
        }
        catch (error) {
            console.error(error);
        }
    }

    if (!dashboard)
        return <h2>Yükleniyor...</h2>;

    return (

        <div>

            <Typography.Title  
                    level={2}
                    style={{
                        marginBottom: 30,
                        fontWeight: 700
                    }}>

                ERP Insight AI Dashboard

            </Typography.Title>
            <Typography.Text type="secondary">

                Son Güncelleme :
                {lastUpdate.toLocaleTimeString("tr-TR")}

            </Typography.Text>

            <br />
            <br />

            <Row gutter={[24, 24]}>

                <Col xs={24} sm={12} xl={6}>

                    <StatCard
                        title="Toplam Üretim"
                        value={dashboard.totalProductionOrders}
                        icon={<InboxOutlined />}
                        color="#1677ff"
                    />

                </Col>

                <Col xs={24} sm={12} xl={6}>

                    <StatCard
                        title="Aktif Makine"
                        value={dashboard.activeMachines}
                        icon={<BuildOutlined />}
                        color="#52c41a"
                    />

                </Col>

                <Col xs={24} sm={12} xl={6}>

                    <StatCard
                    title="Performans"
                    value={dashboard.performanceScore}
                    suffix="/100"
                    icon={<StarOutlined />}
                    color="#faad14"
                />

                </Col>

                <Col xs={24} sm={12} xl={6}>

                    <Card style={cardStyle}>

                        <Typography.Text strong>

                            Risk Seviyesi

                        </Typography.Text>

                        <br />
                        <br />

                        <Tag

                            color={
                                dashboard.riskLevel === "High"
                                    ? "red"
                                    : dashboard.riskLevel === "Medium"
                                        ? "orange"
                                        : "green"
                            }

                            icon={<WarningOutlined />}

                        >

                            {dashboard.riskLevel}

                        </Tag>

                    </Card>

                </Col>

            </Row>

            <AIInsightCard

                insight={dashboard.aiInsight}

            />
            <Row
                gutter={[24, 24]}
                style={{
                    marginTop: 24,
                marginBottom: 24
                }}
            >

                <Col xs={24} md={12} xl={6}>
                    <Card style={cardStyle}>

                        <Typography.Text type="secondary">
                            Planlanan Emir
                        </Typography.Text>

                        <Typography.Title level={2}>
                            {dashboard.plannedOrders}
                        </Typography.Title>

                    </Card>
                </Col>

                <Col xs={24} md={12} xl={6}>
                    <Card style={cardStyle}>

                        <Typography.Text type="secondary">
                            Üretimde
                        </Typography.Text>

                        <Typography.Title
                            level={2}
                            style={{ color: "#1677ff" }}
                        >
                            {dashboard.inProductionOrders}
                        </Typography.Title>

                    </Card>
                </Col>

                <Col xs={24} md={12} xl={6}>
                    <Card style={cardStyle}>

                        <Typography.Text type="secondary">
                            Tamamlanan
                        </Typography.Text>

                        <Typography.Title
                            level={2}
                            style={{ color: "#52c41a" }}
                        >
                            {dashboard.completedOrders}
                        </Typography.Title>

                    </Card>
                </Col>

                <Col xs={24} md={12} xl={6}>
                    <Card style={cardStyle}>

                        <Typography.Text type="secondary">
                            Ortalama Süre
                        </Typography.Text>

                        <Typography.Title
                            level={2}
                            style={{ color: "#722ed1" }}
                        >
                            {dashboard.averageProductionTimeInHours} Saat
                        </Typography.Title>

                    </Card>
                </Col>

</Row>
            <Divider />

            <Row gutter={16}>

                <Col xs={24} lg={8}>

                    <Card style={cardStyle}>

                        <Typography.Text>

                            Zamanında Teslim

                        </Typography.Text>

                        <Progress

                            percent={dashboard.onTimeDeliveryRate}

                            strokeColor="#52c41a"

                        />

                    </Card>

                </Col>

                <Col xs={24} lg={8}>

                    <Card style={cardStyle}>

                        <Typography.Text>

                            Makine Kullanımı

                        </Typography.Text>

                        <Progress

                            percent={dashboard.machineUtilizationRate}

                            strokeColor="#1677ff"

                        />

                    </Card>

                </Col>

                <Col xs={24} lg={8}>

                    <Card style={cardStyle}>

                        <Typography.Text>

                            Gecikme Oranı

                        </Typography.Text>

                        <Progress

                            percent={dashboard.delayRate}

                            status={
                                dashboard.delayRate > 15
                                ? "exception"
                                : "active"
                            }

                         />

                    </Card>

                </Col>

            </Row>

            <Row
                gutter={16}
                style={{ marginTop: 25 }}
            >

                <Col xs={24} xl={12}>

                    <ProductionChart

                        dashboard={dashboard}

                    />

                </Col>

                <Col xs={24} xl={12}>

                    <MachineChart

                        dashboard={dashboard}

                    />

                </Col>

            </Row>
            
            <Row
                gutter={16}
                style={{ marginTop: 25 }}
            >

                <Col span={24}>

                    <Card
                        title="🔔 Son Bildirimler"
                        style={{
                            ...cardStyle,
                            borderRadius: 16
                        }}
                    >

                        <Space
                            direction="vertical"
                            style={{ width: "100%" }}
                        >

                            <Alert
                                message="Üretim Emri U001 başarıyla tamamlandı."
                                type="success"
                                showIcon
                            />

                            <Alert
                                message="Makine M-03 bakım zamanına yaklaşıyor."
                                type="warning"
                                showIcon
                            />

                             <Alert
                                message="Üretim Emri U014 planlanan sürenin üzerine çıktı."
                                type="error"
                                showIcon
                            />

                        </Space>

                    </Card>

                </Col>

            </Row>
            <RecentOrdersTable

                orders={dashboard.recentProductionOrders}

            />
            <Row
                style={{
                    marginTop:25
                 }}
            >

                <Col span={24}>

                    <NotificationCenter />

                </Col>

            </Row>
          

        </div>

    );

}

export default Dashboard;