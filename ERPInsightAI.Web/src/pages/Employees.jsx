import { useEffect, useMemo, useState } from "react";

import {
    Typography,
    Row,
    Col,
    Card,
    Statistic,
    Input,
    Select,
    Button,
    message
} from "antd";

import {
    UserAddOutlined,
    TeamOutlined,
    ApartmentOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
import StatCard from "../components/shared/StatCard";

import { getEmployees } from "../api/employeeApi";
import cardStyle from "../styles/cardStyle";
import EmployeesTable from "../components/EmployeesTable";
import CreateEmployeeModal from "../components/CreateEmployeeModal";
const { Title } = Typography;

function Employees() {

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const [department, setDepartment] = useState("All");

    useEffect(() => {

        loadEmployees();

    }, []);

    async function loadEmployees() {

        try {

            const data =
                await getEmployees();

            setEmployees(data);

        }

        catch {

            message.error("Çalışanlar yüklenemedi.");

        }

    }

    const filteredEmployees = useMemo(() => {

        return employees.filter(x => {

            const searchMatch =

                x.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const departmentMatch =

                department === "All"

                    ? true

                    : x.departmentName === department;

            return searchMatch && departmentMatch;

        });

    }, [employees, search, department]);
    const departmentOptions = [
        {
            value: "All",
            label: "Tümü"
         },

        ...[...new Set(employees.map(x => x.departmentName))]
            .map(x => ({
                value: x,
                label: x
            }))
    ];

    return (

        <div>

            <Title level={2} style={{ marginBottom: 30, fontWeight: 700 }}>

                Çalışan Yönetimi

            </Title>

            <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>

                <Col xs={24} sm={12} lg={8}>
                    <StatCard
                        title="Toplam Çalışan"
                        value={employees.length}
                        icon={<TeamOutlined />}
                        color="#1677ff"
                    />
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <StatCard
                        title="Departman"
                        value={
                            [...new Set(
                                employees.map(x => x.departmentName)
                            )].length
                        }
                        icon={<ApartmentOutlined />}
                        color="#722ed1"
                    />
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <StatCard
                        title="Aktif Personel"
                        value={
                            employees.filter(x => x.isActive).length
                        }
                        icon={<CheckCircleOutlined />}
                        color="#52c41a"
                    />
                </Col>

            </Row>

            <Row gutter={16} style={{ marginBottom: 20 }}>

                <Col span={8}>

                    <Input

                        placeholder="Çalışan Ara..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                    />

                </Col>

                <Col span={6}>
                        

                    <Select

                        style={{
                            width: "100%"
                        }}

                        value={department}

                        onChange={setDepartment}
                        options={departmentOptions}

                 

                    />

                </Col>

                <Col span={6}>

                    <Button

                        icon={<UserAddOutlined />}

                        type="primary"
                        onClick={() => setOpenModal(true)}

                    >

                        Yeni Çalışan

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

                <EmployeesTable
                    employees={filteredEmployees}
                    refresh={loadEmployees}
                />

            </Card>
        <CreateEmployeeModal

            open={openModal}

            onClose={() =>
                setOpenModal(false)
            }

            refresh={loadEmployees}

        />

        </div>

    );

}

export default Employees;