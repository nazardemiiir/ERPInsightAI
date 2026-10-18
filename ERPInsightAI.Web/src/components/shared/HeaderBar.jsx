import {
    Space,
    Badge,
    Avatar,
    Dropdown
} from "antd";

import {
    BellOutlined,
    UserOutlined,
    DownOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function HeaderBar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const items = [
        {
            key: "1",
            label: "Profil"
        },
        {
            key: "2",
            label: "Ayarlar"
        },
        {
            type: "divider"
        },
        {
            key: "3",
            label: "Çıkış Yap",
            danger: true
        }
    ];

    const handleMenuClick = ({ key }) => {

        if (key === "3") {

            logout();

            navigate("/login");

        }

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}
        >

            <div>

                <div
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#0f172a",
                        letterSpacing: 1
                    }}
                >
                    
                </div>

                <div
                    style={{
                        fontSize: 13,
                        color: "#64748b"
                    }}
                >
                
                </div>

            </div>

            <Space size={25}>

                <Badge count={3}>

                    <BellOutlined
                        style={{
                            fontSize: 22,
                            cursor: "pointer"
                        }}
                    />

                </Badge>

                <Dropdown
                    menu={{
                        items,
                        onClick: handleMenuClick
                    }}
                    trigger={["click"]}
                >

                    <Space
                        style={{
                            cursor: "pointer",
                            fontWeight: 500
                        }}
                    >

                        <Avatar
                            style={{
                                backgroundColor: "#1677ff"
                            }}
                            icon={<UserOutlined />}
                        />

                        Yönetici

                        <DownOutlined />

                    </Space>

                </Dropdown>

            </Space>

        </div>

    );

}

export default HeaderBar;