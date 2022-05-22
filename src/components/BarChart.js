import React from 'react';
import { useVolcano } from '../api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function BarChart(id) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels = [
        '5km',
        '10km',
        '30km',
        '100km'
    ];

    const { volcano } = useVolcano(id);

    const data = {
        labels,
        datasets: [
            {
                label: 'Population Within Distance',
                data: [
                    volcano.population_5km,
                    volcano.population_10km,
                    volcano.population_30km,
                    volcano.population_100km
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <div style={{ width: "600px", margin: "auto auto" }}>
            <Bar options={options} data={data} />
        </div>
    );
}