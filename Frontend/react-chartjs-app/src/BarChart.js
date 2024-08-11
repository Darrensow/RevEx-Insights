import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ viewMode, selectedYear, selectedDepartment }) => {
    const defaultDataSets = {
        yearly: {
            data: [-20, -15, -10, -5, 0, 5, 10, 15, 20],
        },
        quarterly: {
            data: [-5, 5, 10, 15],
        },
        monthly: {
            data: [-8, -2, -1, 1, 4, 5, 8, 6, 4, 2, 1, -2],
        },
    };

    const departmentDataSets = {
        Sales: {
            yearly: {
                data: [10, 12, 15, 18, 22, 25, 28, 32, 35],
            },
            quarterly: {
                data: [5, 10, 15, 20],
            },
            monthly: {
                data: [-2, 0, 2, 5, 8, 12, 15, 18, 22, 25, 28, 30],
            },
        },
        // Add data for other departments...
    };

    const dataSet = selectedDepartment ? departmentDataSets[selectedDepartment] : defaultDataSets;

    const data = {
        labels: {
            yearly: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            quarterly: ['Q1', 'Q2', 'Q3', 'Q4'],
            monthly: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        }[viewMode],
        datasets: [
            {
                label: selectedYear ? `Amount (USD) for ${selectedYear}` : 'Amount (USD)',
                data: dataSet[viewMode].data,
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

    const chartTitle = selectedDepartment ? `Profit vs Loss of ${selectedDepartment} Department` : 'Profit vs Loss';

    return (
        <div>
            <p className='BarText'>{chartTitle}</p>
            <hr />
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
