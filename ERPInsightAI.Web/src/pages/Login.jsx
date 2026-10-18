import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    message
} from "antd";

import {
    UserOutlined,
    LockOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const onFinish = (values) => {

        const success = login(
            values.username,
            values.password
        );

        if (success) {

            message.success("Giriş başarılı.");

            navigate("/");

        }
        else {

            message.error("Kullanıcı adı veya şifre yanlış.");

        }

    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f7fb"
            }}
        >

            <Card
                style={{
                    width: 420,
                    borderRadius: 16,
                    boxShadow: "0 10px 30px rgba(0,0,0,.08)"
                }}
            >

                <Title level={2}>
                    ERP INSIGHT
                </Title>

                <Text type="secondary">
                    Üretim Yönetim Sistemi
                </Text>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    style={{
                        marginTop: 30
                    }}
                >

                    <Form.Item
                        name="username"
                        label="Kullanıcı Adı"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >

                        <Input
                            prefix={<UserOutlined />}
                        />

                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Şifre"
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >

                        <Input.Password
                            prefix={<LockOutlined />}
                        />

                    </Form.Item>

                    <Button
                        htmlType="submit"
                        type="primary"
                        block
                        size="large"
                    >
                        Giriş Yap
                    </Button>

                </Form>

            </Card>

        </div>

    );

}

export default Login;