import { Card, Typography } from "antd";

const { Text, Title } = Typography;

function StatCard({
    icon,
    title,
    value,
    color = "#1677ff",
    suffix = ""
}) {

    return (

        <Card
            hoverable
            style={{
                borderRadius: 18,
                border: "none",
                borderTop: `5px solid ${color}`,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "all .3s ease",
                cursor: "pointer",
                height: 170
            }}
            bodyStyle={{
                padding: 22
            }}
        >

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >

                    <div
                        style={{
                            fontSize: 32,
                            color
                        }}
                    >
                        {icon}
                    </div>

                </div>

                <div>

                    <Text
                        style={{
                            color: "#6b7280",
                            fontSize: 15,
                            fontWeight: 500
                        }}
                    >
                        {title}
                    </Text>

                    <Title
                        level={2}
                        style={{
                            margin: "8px 0 0 0",
                            fontWeight: 700,
                            color: "#1f2937",
                            fontSize: 36
                        }}
                    >
                        {value}
                        {suffix}
                    </Title>

                </div>

            </div>

        </Card>

    );

}

export default StatCard;