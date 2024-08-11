import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ viewMode, selectedDepartment, selectedYear }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const [fullLabels, setFullLabels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {};

                if (selectedDepartment) params.departmentNameKey = selectedDepartment;
                if (selectedYear) params.year = selectedYear;

                const response = await axios.get('http://localhost:8080/analytics/get-expenses-breakdown', { params });

                const expenseData = response.data;

                // Sort the data to get the top 5 expenses
                const sortedData = expenseData.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]).slice(0, 5);

                const labels = sortedData.map(item => {
                    const label = Object.keys(item)[0];
                    return label.split(' ').map(word => word.charAt(0)).join('');
                });

                const fullLabels = sortedData.map(item => Object.keys(item)[0]);
                const data = sortedData.map(item => Object.values(item)[0]);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Expense Breakdown`,
                            data,
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
                });

                setFullLabels(fullLabels); // Save full labels for tooltips
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [viewMode, selectedDepartment, selectedYear]);

    const options = {
        plugins: {
            legend: {
                labels: {
                    generateLabels: function (chart) {
                        return chart.data.labels.map((label, index) => {
                            return {
                                text: label,
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                hidden: !chart.data.datasets[0].data[index],
                                lineCap: 'butt',
                                lineDash: [],
                                lineDashOffset: 0,
                                lineJoin: 'miter',
                                strokeStyle: chart.data.datasets[0].borderColor[index],
                                pointStyle: 'rect',
                                rotation: 0
                            };
                        });
                    }
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const labelIndex = tooltipItem.dataIndex;
                        return `${fullLabels[labelIndex]}: ${tooltipItem.raw}`;
                    }
                }
            },
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

    const chartTitle = selectedYear ? `Breakdown of Expenses` : 'Breakdown of Expenses';

    return (
        <div>
            <p className='LineText'>{chartTitle}</p>
            <hr />
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
