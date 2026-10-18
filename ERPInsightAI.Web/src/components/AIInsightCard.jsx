import { Card, Typography } from "antd";

const { Paragraph } = Typography;

function AIInsightCard({ insight }) {

    return (

        <Card
            title="🤖 Yapay Zeka Analizi"
            style={{
                marginTop: 25,
                borderRadius: 14
            }}
        >

            <Paragraph
                style={{
                    whiteSpace: "pre-line",
                    fontSize: 16
                }}
            >
                {insight}
            </Paragraph>

        </Card>

    );

}

export default AIInsightCard;