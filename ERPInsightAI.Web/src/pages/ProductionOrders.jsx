import { useEffect, useMemo, useState } from "react";

import {
    Typography,
    Card,
    Input,
    Select,
    Row,
    Col,
    Button,
    Statistic,
    Divider
} from "antd";


import { DatabaseOutlined,
        FileDoneOutlined,
        ToolOutlined,
        CheckCircleOutlined,
        PlusOutlined
    } from "@ant-design/icons";

import {
    getProductionOrders
} from "../api/productionOrderApi";

import ProductionOrdersTable from "../components/ProductionOrdersTable";
import CreateProductionOrderModal from "../components/CreateProductionOrderModal";
import EditProductionOrderModal from "../components/EditProductionOrderModal";
import StatCard from "../components/shared/StatCard";
function ProductionOrders() {

    const [orders, setOrders] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [modalOpen, setModalOpen] = useState(false);

    const [editModalOpen, setEditModalOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {

        loadOrders();

    }, []);

    async function loadOrders() {

        try {

            const data = await getProductionOrders();

            setOrders(data);

        }
        catch (error) {

            console.error(error);

        }

    }

    const filteredOrders = useMemo(() => {

        return orders.filter(order => {

            const searchMatch =
                order.productionOrderNumber
                    .toLowerCase()
                    .includes(searchText.toLowerCase());

            const statusMatch =
                statusFilter === "All"
                    ? true
                    : order.status === statusFilter;

            return searchMatch && statusMatch;

        });

    }, [orders, searchText, statusFilter]);

    const statistics = {

        total: orders.length,

        created:
            orders.filter(x => x.status === "Created").length,

        inProduction:
            orders.filter(x => x.status === "InProduction").length,

        completed:
            orders.filter(x => x.status === "Completed").length

    };

    return (

        <div>

            <Typography.Title 
                            level={2}
                            style={{
                                    marginBottom: 30,
                                    fontWeight: 700
                                }}>

                Üretim Emirleri

            </Typography.Title>

            <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Toplam Emir"
                        value={statistics.total}
                        icon={<DatabaseOutlined />}
                        color="#1677ff"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Oluşturuldu"
                        value={statistics.created}
                        icon={<FileDoneOutlined />}
                        color="#722ed1"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Üretimde"
                        value={statistics.inProduction}
                        icon={<ToolOutlined />}
                        color="#faad14"
                    />
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        title="Tamamlandı"
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

                        placeholder="Üretim Emri Ara..."

                        value={searchText}

                        onChange={(e) =>
                            setSearchText(e.target.value)
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
                                value: "Created",
                                label: "Created"
                            },

                            {
                                value: "Planned",
                                label: "Planned"
                            },

                            {
                                value: "InProduction",
                                label: "In Production"
                            },

                            {
                                value: "Completed",
                                label: "Completed"
                            },

                            {
                                value: "Cancelled",
                                label: "Cancelled"
                            }

                        ]}

                    />

                </Col>

                <Col span={6}>

                    <Button

                        type="primary"

                        icon={<PlusOutlined />}

                        onClick={() =>
                            setModalOpen(true)
                        }

                    >

                        Yeni Üretim Emri

                    </Button>

                </Col>

            </Row>

            <Card>

                <ProductionOrdersTable

                    orders={filteredOrders}

                    refresh={loadOrders}

                    onEdit={(order) => {

                        setSelectedOrder(order);

                        setEditModalOpen(true);

                    }}

                />

            </Card>

            <CreateProductionOrderModal

                open={modalOpen}

                onClose={() =>
                    setModalOpen(false)
                }

                refresh={loadOrders}

            />

            <EditProductionOrderModal

                open={editModalOpen}

                onClose={() =>
                    setEditModalOpen(false)
                }

                productionOrder={selectedOrder}

                refresh={loadOrders}

            />

        </div>

    );

}

export default ProductionOrders;