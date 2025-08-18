import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarGraph = ({ data }) => {
    const flattened = data.flatMap(obj => Object.entries(obj));

    const labels = flattened.map(([key]) => key);
    const values = flattened.map(([, value]) => value);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Count',
                data: values,
                backgroundColor: '#1fd71fdc',
                hoverBackgroundColor: '#2acb35db',
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `Count: ${context.parsed.y}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarGraph;
