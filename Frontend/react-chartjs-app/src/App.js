import React, { useState } from 'react';
import './App.css';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DonutChart from './DonutChart';
import { Calendar } from 'primereact/calendar';
import DataTableComponent from './DataTableComponent';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  const [dates, setDates] = useState(null);
  const [viewMode, setViewMode] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState(null);

  const maxDate = new Date(2020, 11, 31);
  const minDate = new Date(2012, 1, 1);

  const initialViewDate = new Date(2020, 11, 1);

  const selectLast60Days = () => {
    const endDate = maxDate;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 60);
    setDates([startDate, endDate]);
  };

  const selectLast90Days = () => {
    const endDate = maxDate;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 90);
    setDates([startDate, endDate]);
  };

  // Handle year selection
  const handleYearChange = (e) => {
    const year = e.value ? e.value.getFullYear() : null;
    setSelectedYear(year);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="dashboard-name">
          RexEx Insights
        </div>
        <div className="filters">
          <p className='filter'>Date Range</p>
          <Calendar
            value={dates}
            onChange={(e) => {
              setDates(e.value);
              handleYearChange(e);  // Call the function to update the selected year
            }}
            minDate={minDate}
            maxDate={maxDate}
            viewDate={initialViewDate}
            view="year"
            dateFormat="yy"
            readOnlyInput
            hideOnRangeSelection
            showIcon
            placeholder="Select Year"
          />
          <div className="chart-view-buttons">
            {!dates && (
              <Button
                label="Yearly"
                onClick={() => setViewMode('yearly')}
                className="p-button-outlined p-mr-2"
              />
            )}
            <Button
              label="Quarterly"
              onClick={() => setViewMode('quarterly')}
              className="p-button-outlined p-mr-2"
            />
            <Button
              label="Monthly"
              onClick={() => setViewMode('monthly')}
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
          <LineChart viewMode={viewMode} selectedYear={selectedYear} />
        </div>
        <div className="chart bar-chart">
          <p className='BarText'>Profit vs Loss</p>
          <hr></hr>
          <BarChart viewMode={viewMode} selectedYear={selectedYear} />
        </div>
        <div className="table-container" style={{ marginTop: '20px' }}>
          <p className='TableText'>Department Financial Table</p>
          <hr></hr>
          <DataTableComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
