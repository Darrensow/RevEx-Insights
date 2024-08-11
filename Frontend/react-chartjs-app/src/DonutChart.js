import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = () => {
    const data = {
        labels: ['Revenue', 'Expense'],
        datasets: [
            {
                label: 'Revenue vs Expense',
                data: [70, 30],
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
                color: '#',
                font: {
                    weight: 'bolder',
                    size: '20px'
                },
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};

export default DonutChart;
