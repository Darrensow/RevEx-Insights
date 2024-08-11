import React, { useState, useEffect } from 'react';
import './App.css';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import DonutChart from './DonutChart';
import { Calendar } from 'primereact/calendar';
import DataTableComponent from './DataTableComponent';
import DepartmentTableComponent from './DepartmentTableComponent'; // Import the new component
import { Button } from 'primereact/button';
import axios from 'axios';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  const [dates, setDates] = useState(null);
  const [viewMode, setViewMode] = useState('yearly');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  const maxDate = new Date(2020, 11, 31);
  const minDate = new Date(2012, 1, 1);

  const initialViewDate = new Date(2020, 11, 1);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/analytics/initiate-analytics-dashboard');
        const departmentData = response.data;

        // Transform the department data into an array of objects with label and value properties
        const departmentOptions = departmentData.map(department => {
          const label = Object.keys(department)[0];
          const value = department[label];
          return { label, value };
        });

        setDepartments(departmentOptions);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Handle year selection
  const handleYearChange = (e) => {
    const year = e.value ? e.value.getFullYear() : null;

    if (selectedDepartment && viewMode === 'yearly') {
      alert('Year selection is disabled when a department is chosen in "Yearly" mode. Please select a different View Mode or clear the department.');
      return; // Prevent the year from being set
    }

    setSelectedYear(year);
  };

  // Handle setting view mode to yearly and reset selectedYear and dates if viewMode is 'yearly'
  const handleViewModeChange = (mode) => {
    if (mode === 'yearly') {
      setSelectedYear(null);  // Reset the selectedYear to null
      setDates(null);  // Reset the calendar input to null
    }
    setViewMode(mode);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="dashboard-name">
          RevEx Insights
        </div>
        <div className="filters">
          <p className='filter'>Choose Year :</p>
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
            <Button
              label="Yearly"
              onClick={() => handleViewModeChange('yearly')}
              className="p-button-outlined p-mr-2"
            />
            <Button
              label="Quarterly"
              onClick={() => handleViewModeChange('quarterly')}
              className="p-button-outlined p-mr-2"
            />
            <Button
              label="Monthly"
              onClick={() => handleViewModeChange('monthly')}
              className="p-button-outlined"
            />
          </div>
          <p className='DeptFilter'>Select Department :</p>
          <select
            className="department-filter"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>{dept.label}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="chart-container">
        <div className='pie'>
          <div className="chart pie-chart">
            <PieChart viewMode={viewMode} selectedDepartment={selectedDepartment} selectedYear={selectedYear} />
          </div>
          <div className="chart donut-chart">
            <p className='RevenueText'>Revenues vs Expenses</p>
            <hr></hr>
            <DonutChart viewMode={viewMode} selectedYear={selectedYear} selectedDepartment={selectedDepartment} />
          </div>
        </div>
        <div className="chart line-chart">
          <LineChart viewMode={viewMode} selectedYear={selectedYear} selectedDepartment={selectedDepartment} />
        </div>
        <div className="chart bar-chart">
          <BarChart viewMode={viewMode} selectedYear={selectedYear} selectedDepartment={selectedDepartment} />
        </div>
        <div className="table-container" style={{ marginTop: '20px' }}>
          {!selectedDepartment ? (
            <DataTableComponent viewMode={viewMode} selectedYear={selectedYear} />
          ) : (
            <DepartmentTableComponent selectedDepartment={selectedDepartment} viewMode={viewMode} selectedYear={selectedYear} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
