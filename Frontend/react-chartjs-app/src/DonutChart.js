import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
    const data = {
        labels: ['Revenue', 'Expense'],
        datasets: [
            {
                label: 'Amount Spent (USD)',
                data: [4000000, 6000000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 3,
            },
        ],
    };

    const options = {
        cutout: '70%', // This makes it a donut chart by cutting out the middle
    };

    return <Doughnut data={data} options={options} />;
};

export default DonutChart;
