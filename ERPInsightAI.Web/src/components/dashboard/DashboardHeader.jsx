import { Typography } from "antd";

const { Title, Text } = Typography;

function DashboardHeader() {

    const today =
        new Date().toLocaleDateString("tr-TR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    return (

        <div
            style={{
                marginBottom: 32
            }}
        >

            <Title
                level={2}
                style={{
                    marginBottom: 5
                }}
            >
                👋 Hoş Geldiniz
            </Title>

            <Text
                type="secondary"
                style={{
                    fontSize:16
                }}
            >
                {today}
            </Text>

        </div>

    );

}

export default DashboardHeader;