import {
    Layout,
    Menu,
    Typography,
    Avatar
} from "antd";
import {
    DashboardOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    ToolOutlined,
    TeamOutlined,
    BarChartOutlined,
    RobotOutlined
} from "@ant-design/icons";
import HeaderBar from "../components/shared/HeaderBar";

import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function MainLayout() {

    const location = useLocation();

    const menuItems = [
        {
            key: "/",
            icon: <DashboardOutlined />,
            label: <Link to="/">Dashboard</Link>
        },
        {
            key: "/production-orders",
            icon: <ShoppingCartOutlined />,
            label: <Link to="/production-orders">Üretim Emirleri</Link>
        },
        {
            key: "/operations",
            icon: <SettingOutlined />,
            label: <Link to="/operations">Operasyonlar</Link>
        },
        {
            key: "/machines",
            icon: <ToolOutlined />,
            label: <Link to="/machines">Makineler</Link>
        },
        {
            key: "/employees",
            icon: <TeamOutlined />,
            label: <Link to="/employees">Çalışanlar</Link>
        },
        {
            key: "/reports",
            icon: <BarChartOutlined />,
            label: <Link to="/reports">Raporlar</Link>
        },
        {
            key: "/ai-analysis",
            icon: <RobotOutlined />,
            label: <Link to="/ai-analysis">AI Analizi</Link>
        }
    ];

    return (

        <Layout style={{ minHeight: "100vh" }}>

            <Sider
                width={250}
                theme="light"
                style={{
                    background: "#0f172a",
                    borderRight: "1px solid #1e293b"
                }}
            >

               <div
                style={{
                    padding: 28,
                    color: "#fff",
                    borderBottom: "1px solid #1e293b"
                    }}
                >

                    <div
                        style={{
                            fontSize: 28,
                            fontWeight: 700,
                            letterSpacing: 1
                            }}
                    >
                        ERP INSIGHT
                    </div>

                    <div
                        style={{
                            color: "#94a3b8",
                            marginTop: 5,
                            fontSize: 14
                        }}
                    >
                        Üretim Yönetim Sistemi
                    </div>
                    <div
                        style={{
                            marginTop:10,
                            color:"#64748b",
                            fontSize:12
                        }}
                    >
                        v1.0 Enterprise
                    </div>

                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    style={{
                        background: "#0f172a",
                        border: "none",
                        marginTop: 12
                    }}
                />

            
            <div
                style={{
                    margin: 20,
                    padding: 18,
                    borderRadius: 14,
                    background: "#172036",
                    color: "#fff"
                }}
            >

                <div
                    style={{
                        fontWeight: 600,
                        marginBottom: 15
                    }}
                >
                    SİSTEM DURUMU
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                    }}
                >

                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#22c55e"
                        }}
                    />

                        Tüm Sistemler Çevrimiçi

                </div>

                <div
                        style={{
                            marginTop: 15,
                            color: "#94a3b8",
                            fontSize: 13
                        }}
                >

                    Son Güncelleme

                    <br />

                    {new Date().toLocaleString("tr-TR")}

                </div>

            </div>
            <div
                style={{
                    margin: 20,
                    paddingTop: 20,
                    borderTop: "1px solid #1e293b",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                }}
            >

                <Avatar
                    size={42}
                >
                    Y
                </Avatar>

                <div>

                    <div
                        style={{
                            fontWeight: 600
                        }}
                    >
                        Yönetici
                    </div>

                    <div
                        style={{
                            color: "#94a3b8",
                            fontSize: 13
                        }}
                    >
                        Admin
                    </div>

                </div>

            </div>
            </Sider>
            <Layout>

                <Header
                    style={{
                        background:"#fff",
                        height:72,
                        padding:"0 30px",

                        display:"flex",
                        alignItems:"center",

                        borderBottom:"1px solid #e5e7eb",

                        boxShadow:"0 2px 8px rgba(0,0,0,.05)",

                        zIndex:10
                    }}
                >

                    <HeaderBar />

                </Header>
                   
                        
                
                

                    


                
                <Content
                    style={{
                        padding:32,

                        background:"#f8fafc",

                        minHeight:"100vh"
                    }}
                >

                    <Outlet />

                </Content>

            </Layout>

        </Layout>

    );

}

export default MainLayout;