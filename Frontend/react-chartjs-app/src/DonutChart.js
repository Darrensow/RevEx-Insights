import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = ({ viewMode, selectedYear, selectedDepartment }) => {
    const [chartData, setChartData] = useState({
        labels: ['Revenue', 'Expense'],
        datasets: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {};

                if (selectedDepartment) params.departmentNameKey = selectedDepartment;
                if (selectedYear) params.year = selectedYear;

                // Fetch data from the API
                const response = await axios.get('http://localhost:8080/analytics/get-revenue-and-expenses-breakdown', { params });

                const data = response.data;
                let revenue = 0;
                let expense = 0;

                data.forEach(item => {
                    if (item.Revenues) {
                        revenue = item.Revenues;
                    } else if (item.Expenses) {
                        expense = item.Expenses;
                    }
                });

                setChartData({
                    labels: ['Revenue', 'Expense'],
                    datasets: [
                        {
                            label: `${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Revenue vs Expense`,
                            data: [revenue, expense],
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
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedYear, selectedDepartment, viewMode]);  // Add viewMode to dependency array

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
        animation: {
            duration: viewMode ? 1000 : 0,  // 0 duration when viewMode changes to disable animation
        },
    };

    return <Doughnut data={chartData} options={options} />;
};

export default DonutChart;
