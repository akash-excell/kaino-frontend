import React from "react";
import { Chart } from "react-google-charts";

export function FinanceHomeChart({ chartData }) {
    const data = [
        ["", "Kaino Plus", "Kaino Basic", "Kaino Social"],...chartData ];

    const options = {
        legend: { position: "none" },
        series: [
            { color: "#C6164F" },
            { color: "#6759D1" },
            { color: "#4EAF96" },
        ]
    };

    return (
        <Chart
            chartType="Bar"
            width="100%"
            data={data}
            options={options}
        />
    );
}
