import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ viewMode, selectedDepartment, selectedYear }) => {
    const dataSets = {
        yearly: {
            default: [30, 20, 15, 25, 10],
            Sales: [35, 25, 10, 20, 10],
            Marketing: [40, 15, 20, 15, 10],
            Engineering: [25, 30, 15, 20, 10],
            HR: [20, 25, 20, 25, 10],
        },
        quarterly: {
            default: [25, 22, 18, 20, 15],
            Sales: [30, 20, 15, 25, 10],
            Marketing: [35, 15, 20, 20, 10],
            Engineering: [20, 25, 20, 20, 15],
            HR: [15, 30, 20, 20, 15],
        },
        monthly: {
            default: [28, 18, 12, 30, 12],
            Sales: [32, 22, 14, 26, 16],
            Marketing: [37, 15, 15, 23, 10],
            Engineering: [23, 28, 17, 25, 7],
            HR: [18, 33, 20, 19, 10],
        },
    };

    const selectedData = dataSets[viewMode][selectedDepartment] || dataSets[viewMode].default;

    const data = {
        labels: ['General Fund', 'Debt', 'Project Fund', 'Grants', 'Hospital Fee'],
        datasets: [
            {
                label: `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Expense Breakdown`,
                data: selectedData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
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
                    size: 15,
                },
            },
        },
    };

    // return <Pie data={data} options={options} />;

    const chartTitle = selectedYear ? `Breakdown of Expense ${selectedYear}` : 'Breakdown of Expense';


    return (
        <div>
            <p className='LineText'>{chartTitle}</p>
            <hr />
            <Pie data={data} options={options} />;
        </div>
    );
};

export default PieChart;
