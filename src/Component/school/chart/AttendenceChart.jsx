import React from "react";
import { Chart } from "react-google-charts";

export default function AttendenceChart({ chartData }) {
    const data = [
        ["", "Present", "Absent", "Excuse"], ...chartData];

    const options = {
        legend: { position: "none" },
        series: [
            { color: "#C6164F" },
            { color: "#9E4EE0" },
            { color: "#EA8858" },
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
