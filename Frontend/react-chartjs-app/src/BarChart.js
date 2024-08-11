import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ viewMode, selectedYear }) => {
    const dataSets = {
        yearly: {
            labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            data: [-20, -15, -10, -5, 0, 5, 10, 15, 20],
        },
        quarterly: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            data: [-5, 5, 10, 15],
        },
        monthly: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            data: [-8, -2, -1, 1, 4, 5, 8, 6, 4, 2, 1, -2],
        },
    };

    const data = {
        labels: dataSets[viewMode].labels,
        datasets: [
            {
                label: selectedYear ? `Amount (USD) For ${selectedYear}` : 'Amount (USD)',
                // selectedYear ? `Revenue for ${selectedYear}` : 'Revenue'
                data: dataSets[viewMode].data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
