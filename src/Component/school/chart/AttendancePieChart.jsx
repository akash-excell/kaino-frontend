import React from "react";
import { Chart } from "react-google-charts";

export default function AttendancePieChart({ chartData }) {
    const data = [
        ["Class", "Number"],
        ...chartData
    ];

    const options = {
        pieHole: 0.6,
        is3D: false,
        legend: "none",
        pieSliceText: "value",
        tooltip: {
            showColorCode: true,
            text: "value",
        },
        series: [
            { color: "#BB9138" },
            { color: "#4CBC9A" },
            { color: "#D35DDB" },
        ]
    };

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height='250px'
            data={data}
            options={options}
        />
    );
}
