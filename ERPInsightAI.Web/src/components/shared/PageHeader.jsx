import { Typography } from "antd";

const { Title, Text } = Typography;

function PageHeader({
    icon,
    title,
    subtitle
}) {
    return (

        <div
            style={{
                marginBottom: 28
            }}
        >

            <Title
                level={2}
                style={{
                    marginBottom: 0
                }}
            >
                {icon} {title}
            </Title>

            <Text
                type="secondary"
            >
                {subtitle}
            </Text>

        </div>

    );
}

export default PageHeader;