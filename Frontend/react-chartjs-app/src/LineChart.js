import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ChartDataLabels);

const LineChart = ({ viewMode, selectedYear, selectedDepartment }) => {
    const defaultDataSets = {
        yearly: {
            revenue: [12, 15, 18, 20, 22, 25, 28, 30, 32],
            expense: [10, 14, 16, 18, 21, 23, 26, 28, 31],
        },
        quarterly: {
            revenue: [15, 18, 25, 28],
            expense: [12, 16, 21, 24],
        },
        monthly: {
            revenue: [1, 3, 4, 2, 5, 6, 8, 10, 12, 14, 16, 18],
            expense: [2, 2, 3, 5, 4, 7, 9, 10, 14, 12, 18, 20],
        },
    };

    const departmentDataSets = {
        Sales: {
            yearly: {
                revenue: [20, 25, 28, 32, 35, 40, 42, 45, 50],
                expense: [18, 20, 23, 27, 30, 33, 35, 38, 42],
            },
            quarterly: {
                revenue: [25, 30, 35, 40],
                expense: [20, 25, 28, 32],
            },
            monthly: {
                revenue: [2, 4, 5, 3, 6, 8, 10, 12, 15, 18, 20, 22],
                expense: [1, 3, 4, 2, 5, 7, 9, 11, 13, 16, 18, 21],
            },
        },
        // Add data for other departments...
    };

    const dataSet = selectedDepartment ? departmentDataSets[selectedDepartment] : defaultDataSets;

    const data = {
        labels: {
            yearly: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            quarterly: ['Q1', 'Q2', 'Q3', 'Q4'],
            monthly: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }[viewMode],
        datasets: [
            {
                label: selectedYear ? `Revenue for ${selectedYear}` : 'Revenue',
                data: dataSet[viewMode].revenue,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: selectedYear ? `Expense for ${selectedYear}` : 'Expense',
                data: dataSet[viewMode].expense,
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            }
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                align: 'end', // Aligns the labels above the line
                anchor: 'end', // Ensures the label is positioned relative to the end of the point
                offset: -5, // Adjust the distance above the point
                formatter: (value) => value,
                color: '#000', // Color of the data labels
                font: {
                    weight: 'bolder',
                    size: 12,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const chartTitle = selectedDepartment ? `Timeline of ${selectedDepartment} Department` : 'Timeline';

    return (
        <div>
            <p className='LineText'>{chartTitle}</p>
            <hr />
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
