import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ viewMode, selectedYear, selectedDepartment }) => {
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

                // Fetch data from the API
                const response = await axios.get('http://localhost:8080/analytics/get-timeline-data', { params });

                const { surplusDeficitTimeline } = response.data;

                if (surplusDeficitTimeline && surplusDeficitTimeline.length > 0) {
                    const labels = surplusDeficitTimeline.map(item => item.period);
                    const surplusDeficit = surplusDeficitTimeline.map(item => item.amount);

                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: selectedYear ? `Profit/Loss (USD) for ${selectedYear}` : 'Profit/Loss (USD)',
                                data: surplusDeficit,
                                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 3,
                            },
                        ],
                    });
                } else {
                    console.warn("No data returned for the selected department or parameters.");
                    setChartData({
                        labels: [],
                        datasets: [],
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [viewMode, selectedYear, selectedDepartment]);

    const options = {
        plugins: {
            datalabels: {
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

    const chartTitle = selectedDepartment ? `Profit vs Loss` : 'Profit vs Loss';

    return (
        <div>
            <p className='BarText'>{chartTitle}</p>
            <hr />
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
