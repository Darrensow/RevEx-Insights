import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ viewMode, selectedYear }) => {
    const dataSets = {
        yearly: {
            labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            data: {
                revenue: [12, 15, 18, 20, 22, 25, 28, 30, 32],
                expense: [10, 14, 16, 18, 21, 23, 26, 28, 31],
            },
        },
        quarterly: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            data: {
                revenue: [15, 18, 25, 28],
                expense: [12, 16, 21, 24],
            },
        },
        monthly: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            data: {
                revenue: [1, 3, 4, 2, 5, 6, 8, 10, 12, 14, 16, 18],
                expense: [2, 2, 3, 5, 4, 7, 9, 10, 14, 12, 18, 20],
            },
        },
    };

    const data = {
        labels: dataSets[viewMode].labels,
        datasets: [
            {
                label: selectedYear ? `Revenue for ${selectedYear}` : 'Revenue',
                data: dataSets[viewMode].data.revenue,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: selectedYear ? `Expense for ${selectedYear}` : 'Expense',
                data: dataSets[viewMode].data.expense,
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            }
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
