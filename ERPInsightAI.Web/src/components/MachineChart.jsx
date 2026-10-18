import { Card } from "antd";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function MachineChart({ dashboard }) {

    if (!dashboard) {

        dashboard = {
            activeMachines: 0,
            idleMachines: 0,
            maintenanceMachines: 0,
            breakdownMachines: 0
        };

    }

    const data = [

        {
            name: "Aktif",
            value: dashboard.activeMachines
        },

        {
            name: "Boşta",
            value: dashboard.idleMachines
        },

        {
            name: "Bakım",
            value: dashboard.maintenanceMachines
        },

        {
            name: "Arıza",
            value: dashboard.breakdownMachines
        }

    ];

    const COLORS = [
        "#52c41a",
        "#1677ff",
        "#faad14",
        "#ff4d4f"
    ];

    return (

        <Card
            title="🏭 Makine Durumu"
            style={{ borderRadius: 14 }}
        >

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

        </Card>

    );

}

export default MachineChart;