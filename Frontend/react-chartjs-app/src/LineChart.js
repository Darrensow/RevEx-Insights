import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ChartDataLabels);

const LineChart = ({ viewMode, selectedYear, selectedDepartment }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Build the params object conditionally
                const params = {};
                if (viewMode) params.period = viewMode.charAt(0).toUpperCase() + viewMode.slice(1);
                if (selectedDepartment) params.departmentNameKey = selectedDepartment;
                if (selectedYear) params.year = selectedYear;

                const response = await axios.get('http://localhost:8080/analytics/get-timeline-data', { params });

                const { expensesTimeline, revenueTimeline } = response.data;

                const labels = revenueTimeline.map(item => item.period);
                const revenue = revenueTimeline.map(item => item.amount);
                const expenses = expensesTimeline.map(item => item.amount);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: selectedYear ? `Revenue (USD) for ${selectedYear}` : 'Revenue (USD)',
                            data: revenue,
                            fill: false,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: selectedYear ? `Expenses (USD) for ${selectedYear}` : 'Expenses (USD)',
                            data: expenses,
                            fill: false,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 2,
                        }
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [viewMode, selectedYear, selectedDepartment]);


    const options = {
        plugins: {
            datalabels: {
                align: 'end',
                anchor: 'end',
                offset: -5,
                formatter: (value) => value,
                color: '#000',
                font: {
                    weight: 'bolder',
                    size: 0,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const chartTitle = selectedDepartment ? `Timeline` : 'Timeline';

    return (
        <div>
            <p className='LineText'>{chartTitle}</p>
            <hr />
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
