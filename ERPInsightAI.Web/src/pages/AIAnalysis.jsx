import { useEffect, useState } from "react";

import {
    Row,
    Col,
    Card,
    Typography,
    Alert,
    List,
    Space,
    Divider,
    Button,
    Progress,
    Tag
} from "antd";

import {
    RobotOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    ThunderboltOutlined,
    ReloadOutlined,
    BarChartOutlined,
    BulbOutlined
} from "@ant-design/icons";

import StatCard from "../components/shared/StatCard";
import { getAIAnalysis } from "../api/aiApi";
import cardStyle from "../styles/cardStyle";

const { Title, Text } = Typography;

function AIAnalysis() {

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    // =====================================================
    // AI ANALİZİNİ YÜKLE
    // =====================================================

    useEffect(() => {

        loadAnalysis();

    }, []);


    async function loadAnalysis() {

        try {

            setLoading(true);

            setError(null);

            const data = await getAIAnalysis();

            console.log("AI ANALİZ SONUCU:", data);

            setAnalysis(data);

        }
        catch (error) {

            console.error("AI ANALİZ HATASI:", error);

            setError(
                "AI analizi alınamadı. Backend veya Ollama bağlantısını kontrol edin."
            );

        }
        finally {

            setLoading(false);

        }

    }


    // =====================================================
    // YÜKLENİYOR
    // =====================================================

    if (loading) {

        return (

            <div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 30
                    }}
                >

                    <Title
                        level={2}
                        style={{
                            margin: 0,
                            fontWeight: 700
                        }}
                    >
                        Yapay Zeka Analizi
                    </Title>

                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        loading={loading}
                        onClick={loadAnalysis}
                    >
                        Yeniden Analiz Et
                    </Button>

                </div>

                <Card style={cardStyle}>

                    <Space
                        orientation="vertical"
                        size={15}
                    >

                        <RobotOutlined
                            style={{
                                fontSize: 42,
                                color: "#1677ff"
                            }}
                        />

                        <Text>
                            Yapay zeka analizi hazırlanıyor...
                        </Text>

                        <Text type="secondary">
                            ERP verileri AI tarafından analiz ediliyor.
                        </Text>

                    </Space>

                </Card>

            </div>

        );

    }


    // =====================================================
    // HATA
    // =====================================================

    if (error) {

        return (

            <div>

                <Title
                    level={2}
                    style={{
                        marginBottom: 30,
                        fontWeight: 700
                    }}
                >
                    Yapay Zeka Analizi
                </Title>

                <Alert
                    type="error"
                    showIcon
                    message="AI Analizi Yüklenemedi"
                    description={error}
                    action={

                        <Button
                            icon={<ReloadOutlined />}
                            onClick={loadAnalysis}
                        >
                            Tekrar Dene
                        </Button>

                    }
                />

            </div>

        );

    }


    // =====================================================
    // VERİ YOK
    // =====================================================

    if (!analysis) {

        return (

            <Alert
                type="warning"
                showIcon
                message="AI analiz verisi bulunamadı."
            />

        );

    }


    // =====================================================
    // VERİLER
    // =====================================================

    const performanceScore =
        analysis.performanceScore ?? 0;

    const riskScore =
        analysis.riskScore ?? 0;

    const delayProbability =
        analysis.delayProbability ?? 0;

    const recommendations =
        analysis.recommendations ?? [];

    const insights =
        analysis.insights ?? [];


    // Risk rengi

    const riskColor =
        analysis.riskLevel === "High"
            ? "#ff4d4f"
            : analysis.riskLevel === "Medium"
                ? "#faad14"
                : "#52c41a";


    // Sistem durumu

    const statusType =
        analysis.systemStatus === "Normal"
            ? "success"
            : analysis.systemStatus === "Dikkat"
                ? "warning"
                : "error";


    return (

        <div>

            {/* ================================================= */}
            {/* BAŞLIK */}
            {/* ================================================= */}

            <Title
                level={2}
                style={{
                    marginBottom: 30,
                    fontWeight: 700
                }}
            >
                Yapay Zeka Analizi
            </Title>


            {/* ================================================= */}
            {/* ÜST 4 KART */}
            {/* ================================================= */}

            <Row
                gutter={[24, 24]}
                style={{
                    marginBottom: 25
                }}
            >

                {/* RİSK */}

                <Col
                    xs={24}
                    sm={12}
                    xl={6}
                >

                    <StatCard
                        icon={
                            <WarningOutlined
                                style={{
                                    color: riskColor
                                }}
                            />
                        }
                        title="Risk Seviyesi"
                        value={analysis.riskLevel}
                        color={riskColor}
                    />

                </Col>


                {/* PERFORMANS */}

                <Col
                    xs={24}
                    sm={12}
                    xl={6}
                >

                    <StatCard
                        icon={
                            <RobotOutlined
                                style={{
                                    color: "#1677ff"
                                }}
                            />
                        }
                        title="Üretim Performansı"
                        value={`${performanceScore}/100`}
                        color="#1677ff"
                    />

                </Col>


                {/* GECİKME */}

                <Col
                    xs={24}
                    sm={12}
                    xl={6}
                >

                    <StatCard
                        icon={
                            <ThunderboltOutlined
                                style={{
                                    color: "#faad14"
                                }}
                            />
                        }
                        title="Gecikme Tahmini"
                        value={`%${delayProbability}`}
                        color="#faad14"
                    />

                </Col>


                {/* AI DURUMU */}

                <Col
                    xs={24}
                    sm={12}
                    xl={6}
                >

                    <StatCard
                        icon={
                            <RobotOutlined
                                style={{
                                    color: "#722ed1"
                                }}
                            />
                        }
                        title="AI Durumu"
                        value="Hazır"
                        color="#722ed1"
                    />

                </Col>

            </Row>


            {/* ================================================= */}
            {/* PERFORMANS / RİSK GÖSTERGELERİ */}
            {/* ================================================= */}

            <Row
                gutter={24}
                style={{
                    marginBottom: 25
                }}
            >

                <Col
                    xs={24}
                    md={12}
                >

                    <Card
                        style={cardStyle}
                        title={
                            <Space>
                                <BarChartOutlined />
                                Performans Skoru
                            </Space>
                        }
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 25
                            }}
                        >

                            <Progress
                                type="circle"
                                percent={performanceScore}
                                size={100}
                            />

                            <div>

                                <Title
                                    level={3}
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    {performanceScore}/100
                                </Title>

                                <Text type="secondary">
                                    Üretim performansı
                                </Text>

                            </div>

                        </div>

                    </Card>

                </Col>


                <Col
                    xs={24}
                    md={12}
                >

                    <Card
                        style={cardStyle}
                        title={
                            <Space>
                                <WarningOutlined
                                    style={{
                                        color: riskColor
                                    }}
                                />
                                Risk Skoru
                            </Space>
                        }
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 25
                            }}
                        >

                            <Progress
                                type="circle"
                                percent={riskScore}
                                size={100}
                                strokeColor={riskColor}
                            />

                            <div>

                                <Title
                                    level={3}
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    {riskScore}/100
                                </Title>

                                <Text type="secondary">
                                    Sistem risk seviyesi:{" "}
                                </Text>

                                <Tag
                                    color={
                                        analysis.riskLevel === "High"
                                            ? "red"
                                            : analysis.riskLevel === "Medium"
                                                ? "orange"
                                                : "green"
                                    }
                                >
                                    {analysis.riskLevel}
                                </Tag>

                            </div>

                        </div>

                    </Card>

                </Col>

            </Row>


            {/* ================================================= */}
            {/* YÖNETİCİ DEĞERLENDİRMESİ */}
            {/* ================================================= */}

            <Card
                style={{
                    ...cardStyle,
                    marginBottom: 25
                }}
                title={
                    <Space>
                        <RobotOutlined
                            style={{
                                color: "#1677ff"
                            }}
                        />

                        <span>
                            ERP Insight AI Analizi
                        </span>
                    </Space>
                }
            >

                <Alert
                    type={statusType}
                    showIcon
                    message="Yönetici Değerlendirmesi"
                    description={analysis.overallComment}
                    style={{
                        borderRadius: 10
                    }}
                />

            </Card>


            {/* ================================================= */}
            {/* ERP VERİLERİ + AI ÖNERİLERİ */}
            {/* ================================================= */}

            <Row
                gutter={24}
                style={{
                    marginBottom: 25
                }}
            >

                {/* ERP VERİLERİ */}

                <Col
                    xs={24}
                    xl={12}
                >

                    <Card
                        style={cardStyle}
                        title={
                            <Space>
                                <BarChartOutlined />
                                ERP Verileri
                            </Space>
                        }
                    >

                        <List
                            dataSource={insights}
                            renderItem={(item) => (

                                <List.Item>

                                    <Space>

                                        <CheckCircleOutlined
                                            style={{
                                                color: "#52c41a"
                                            }}
                                        />

                                        <Text>
                                            {item}
                                        </Text>

                                    </Space>

                                </List.Item>

                            )}
                        />

                    </Card>

                </Col>


                {/* AI ÖNERİLERİ */}

                <Col
                    xs={24}
                    xl={12}
                >

                    <Card
                        style={cardStyle}
                        title={
                            <Space>
                                <BulbOutlined
                                    style={{
                                        color: "#faad14"
                                    }}
                                />

                                AI Önerileri
                            </Space>
                        }
                    >

                        <List
                            dataSource={recommendations}
                            locale={{
                                emptyText: "Şu anda öneri bulunmuyor."
                            }}
                            renderItem={(item) => (

                                <List.Item>

                                    <Space>

                                        <RobotOutlined
                                            style={{
                                                color: "#1677ff"
                                            }}
                                        />

                                        <Text>
                                            {item}
                                        </Text>

                                    </Space>

                                </List.Item>

                            )}
                        />

                    </Card>

                </Col>

            </Row>


            {/* ================================================= */}
            {/* SİSTEM DURUMU */}
            {/* ================================================= */}

            <Card
                style={{
                    ...cardStyle,
                    marginBottom: 25
                }}
                title={
                    <Space>
                        <WarningOutlined />
                        Sistem Durumu
                    </Space>
                }
            >

                <Row gutter={24}>

                    <Col
                        xs={24}
                        md={12}
                    >

                        <Alert
                            type={statusType}
                            showIcon
                            message={`Sistem durumu: ${analysis.systemStatus}`}
                            description={`Risk puanı: ${riskScore}/100`}
                        />

                    </Col>


                    <Col
                        xs={24}
                        md={12}
                    >

                        <Alert
                            type="warning"
                            showIcon
                            message={`Tahmini gecikme olasılığı: %${delayProbability}`}
                        />

                    </Col>

                </Row>

            </Card>


            {/* ================================================= */}
            {/* ALT BİLGİ */}
            {/* ================================================= */}

            <div
                style={{
                    textAlign: "right",
                    marginTop: 10,
                    marginBottom: 30
                }}
            >

                <Text type="secondary">

                    Son AI Analizi:{" "}

                    {new Date(
                        analysis.analysisDate
                    ).toLocaleString("tr-TR")}

                </Text>

            </div>


        </div>

    );

}

export default AIAnalysis;