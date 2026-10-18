import { Tag } from "antd";

function StatusTag({ status }) {

    let color = "default";

    switch (status) {

        case "Completed":
            color = "green";
            break;

        case "InProduction":
            color = "blue";
            break;

        case "Planned":
            color = "gold";
            break;

        case "Cancelled":
            color = "red";
            break;

        case "Created":
            color = "purple";
            break;

        default:
            color = "default";
            break;
    }

    return (
        <Tag color={color}>
            {status}
        </Tag>
    );

}

export default StatusTag;