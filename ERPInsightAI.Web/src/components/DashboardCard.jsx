import { Card, Statistic } from "antd";

function DashboardCard({
    title,
    value,
    prefix,
    suffix,
    background = "#ffffff",
    color = "#1677ff"
}) {
    return (
        <Card
            hoverable
            style={{
                background,
                borderRadius: 18,
                border: "none",
                borderTop: `5px solid ${color}`,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                transition: "all .3s ease",
                minHeight: 170
            }}
        >
            <Statistic
                title={
                    <span
                        style={{
                            color: "#666",
                            fontSize: 17,
                            fontWeight: 500
                        }}
                    >
                        {prefix} {title}
                    </span>
                }
                value={value}
                suffix={suffix}
                valueStyle={{
                    color,
                    fontSize: 36,
                    fontWeight: 700,
                    marginTop: 15,
            
                }}
            />
        </Card>
    );
}

export default DashboardCard;