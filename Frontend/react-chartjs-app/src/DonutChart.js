import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = ({ viewMode, selectedDepartment }) => {
    const dataSets = {
        yearly: {
            default: [70, 30],
            CityCouncil: [65, 35],
            Marketing: [60, 40],
            Engineering: [75, 25],
            HR: [80, 20],
        },
        quarterly: {
            default: [68, 32],
            CityCouncil: [63, 37],
            Marketing: [58, 42],
            Engineering: [73, 27],
            HR: [78, 22],
        },
        monthly: {
            default: [67, 33],
            CityCouncil: [62, 38],
            Marketing: [57, 43],
            Engineering: [72, 28],
            HR: [77, 23],
        },
    };

    const selectedData = dataSets[viewMode][selectedDepartment] || dataSets[viewMode].default;

    const data = {
        labels: ['Revenue', 'Expense'],
        datasets: [
            {
                label: `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Revenue vs Expense`,
                data: selectedData,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart._metasets[0].total;
                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                    return percentage;
                },
                color: '#333',
                font: {
                    weight: 'bolder',
                    size: 20,
                },
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};

export default DonutChart;
