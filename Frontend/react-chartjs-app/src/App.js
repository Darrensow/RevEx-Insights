import React, { useState } from 'react';
import './App.css';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DonutChart from './DonutChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="App">
      <header className="header">
        <div className="dashboard-name">
          RexEx
        </div>
        <div className="filters">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="From: dd/mm/yy"
            className="date-picker"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="To: dd/mm/yy"
            className="date-picker"
          />
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
        <div className='pie' >
          <div className="chart pie-chart">
            <PieChart />
          </div>
          <div className="chart donut-chart">
            <DonutChart />
          </div>
        </div>
        <div className="chart line-chart">
          <LineChart />
        </div>
        <div className="chart bar-chart">
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default App;
