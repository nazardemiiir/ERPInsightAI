import { Card, Typography } from "antd";

const { Text } = Typography;

function SectionCard({
    title,
    subtitle,
    children,
    extra
}) {

    return (

        <Card

            className="erp-card"

            title={

                <div>

                    <div
                        style={{
                            fontSize:18,
                            fontWeight:600
                        }}
                    >
                        {title}
                    </div>

                    {

                        subtitle &&

                        <Text
                            type="secondary"
                        >
                            {subtitle}
                        </Text>

                    }

                </div>

            }

            extra={extra}

        >

            {children}

        </Card>

    );

}

export default SectionCard;