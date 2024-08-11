// src/App.js

import React, { useState } from 'react';
import './App.css';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DonutChart from './DonutChart';
import { Calendar } from 'primereact/calendar';  // Import PrimeReact Calendar
import DataTableComponent from './DataTableComponent';  // Import the DataTableComponent
import { Button } from 'primereact/button';

import 'primereact/resources/themes/saga-blue/theme.css';  // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


function App() {
  const [dates, setDates] = useState(null);

  const maxDate = new Date(2020, 11, 31);

  // Set initial view date to December 2020
  const initialViewDate = new Date(2020, 11, 1);

  // Function to set the last 60 days from maxDate
  const selectLast60Days = () => {
    const endDate = maxDate;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 60);
    setDates([startDate, endDate]);
  };

  // Function to set the last 90 days from maxDate
  const selectLast90Days = () => {
    const endDate = maxDate;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 90);
    setDates([startDate, endDate]);
  };


  return (
    <div className="App">
      <header className="header">
        <div className="dashboard-name">
          RexEx Insights
        </div>
        <div className="filters">
          <p className='filter'>Date Range</p>
          <Calendar value={dates} onChange={(e) => setDates(e.value)} maxDate={maxDate} viewDate={initialViewDate} selectionMode="range" dateFormat="dd/mm/yy" readOnlyInput hideOnRangeSelection showIcon placeholder="Select Date Range" />
          <div className="quick-select-buttons">
            <Button
              label="Last 60 Days"
              onClick={selectLast60Days}
              className="p-button-outlined p-mr-2"
            />
            <Button
              label="Last 90 Days"
              onClick={selectLast90Days}
              className="p-button-outlined"
            />
          </div>
          <p className='DeptFilter'>Select Department</p>
          <select className="department-filter">
            <option value="">All Departments</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
          </select>
        </div>
      </header>
      <div className="chart-container">
        <div className='pie'>
          <div className="chart pie-chart">
            <p className='BreakdownText'>Breakdown of Expense</p>
            <hr></hr>
            <PieChart />
          </div>
          <div className="chart donut-chart">
            <p className='RevenueText'>Revenue vs Expense</p>
            <hr></hr>
            <DonutChart />
          </div>
        </div>
        <div className="chart line-chart">
          <p className='LineText'>Timeline</p>
          <hr></hr>
          <LineChart />
        </div>
        <div className="chart bar-chart">
          <p className='BarText'>Profit vs Loss</p>
          <hr></hr>
          <BarChart />
        </div>
        <div className="table-container" style={{ marginTop: '20px' }}>
          <p className='TableText'>Department Financial Table</p>
          <hr></hr>
          <DataTableComponent /> {/* Use the DataTableComponent */}
        </div>
      </div>

    </div>
  );
}

export default App;
