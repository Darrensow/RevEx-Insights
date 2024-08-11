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
                // Determine the year range based on selectedYear
                const years = selectedYear ? [selectedYear] : Array.from({ length: 2020 - 2012 + 1 }, (v, k) => 2012 + k);

                // Fetch data for each year and accumulate it
                const promises = years.map(year =>
                    axios.get('http://localhost:8080/analytics/get-timeline-data', {
                        params: {
                            year,
                            period: viewMode.charAt(0).toUpperCase() + viewMode.slice(1), // Capitalize the first letter
                            department: selectedDepartment || 'All',
                        },
                    })
                );

                const responses = await Promise.all(promises);

                // Merge the data from all the responses
                const mergedData = responses.reduce(
                    (acc, response) => {
                        const { expensesTimeline, revenueTimeline } = response.data;

                        acc.labels.push(...revenueTimeline.map(item => item.period));
                        acc.revenue.push(...revenueTimeline.map(item => item.amount));
                        acc.expenses.push(...expensesTimeline.map(item => item.amount));

                        return acc;
                    },
                    { labels: [], revenue: [], expenses: [] }
                );

                setChartData({
                    labels: mergedData.labels,
                    datasets: [
                        {
                            label: selectedYear ? `Revenue (USD) for ${selectedYear}` : 'Revenue (USD)',
                            data: mergedData.revenue,
                            fill: false,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: selectedYear ? `Expenses  (USD) for ${selectedYear} ` : 'Expenses (USD)',
                            data: mergedData.expenses,
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

    const chartTitle = selectedDepartment ? `Timeline of ${selectedDepartment} Department` : 'Timeline';

    return (
        <div>
            <p className='LineText'>{chartTitle}</p>
            <hr />
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
