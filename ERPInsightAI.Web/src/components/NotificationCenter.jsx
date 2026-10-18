import {
    Card,
    List,
    Tag,
    Typography
} from "antd";

const notifications = [

    {
        id: 1,
        title: "Üretim Emri U001 tamamlandı",
        type: "success"
    },

    {
        id: 2,
        title: "Makine M-03 bakım zamanı geldi",
        type: "warning"
    },

    {
        id: 3,
        title: "Operasyon OP-15 gecikiyor",
        type: "error"
    },

    {
        id: 4,
        title: "Yeni çalışan sisteme eklendi",
        type: "processing"
    }

];

function NotificationCenter() {

    const getColor = (type) => {

        switch (type) {

            case "success":
                return "green";

            case "warning":
                return "orange";

            case "error":
                return "red";

            default:
                return "blue";

        }

    };

    return (

        <Card title="🔔 Bildirim Merkezi">

            <List

                dataSource={notifications}

                renderItem={(item) => (

                    <List.Item>

                        <Typography.Text>

                            {item.title}

                        </Typography.Text>

                        <Tag color={getColor(item.type)}>

                            {item.type.toUpperCase()}

                        </Tag>

                    </List.Item>

                )}

            />

        </Card>

    );

}

export default NotificationCenter;