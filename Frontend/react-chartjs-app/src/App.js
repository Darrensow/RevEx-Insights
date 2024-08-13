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
import { jwtDecode } from 'jwt-decode';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  const [user, setUser] = useState({});
  const [dates, setDates] = useState(null);
  const [viewMode, setViewMode] = useState('yearly');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);

  const maxDate = new Date(2020, 11, 31);
  const minDate = new Date(2012, 1, 1);
  const initialViewDate = new Date(2020, 11, 1);

  function handleCallbackResponse(response) {
    console.log("encoded JWT ID token" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  function handleYearChange(event) {
    const year = event.value.getFullYear();
    setSelectedYear(year);
    console.log(`Year selected: ${year}`);
  }

  function handleViewModeChange(mode) {
    setViewMode(mode);
    if (mode === 'yearly') {
      setSelectedYear(null); // Reset the selected year if switching to yearly view
    }
    console.log(`View mode changed to: ${mode}`);
  }

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

    // Fetch departments only if the user is logged in
    if (Object.keys(user).length !== 0) {
      fetchDepartments();
    }
  }, [user]); // Re-fetch departments if the user logs in or out

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "563714540171-a3gqflpcqqci17dkb4g046r87of37vpo.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>

      {Object.keys(user).length === 0 ? (
        <div id="signInDiv"></div>
      ) : (
        <div>
          {/* <button onClick={(e) => handleSignOut(e)}>Sign Out</button> */}
          {/* <div>
            <img src={user.picture} alt="User"></img>
            <h3>Logged in User : {user.name}</h3>
          </div> */}
        </div>
      )}

      {Object.keys(user).length !== 0 && (
        <>
          <header className="header">
            <div className="dashboard-name">RevEx Insights, Hi {user.name}</div>
            <div className="filters">
              <p className="filter">Choose Year :</p>
              <Calendar
                value={dates}
                onChange={(e) => {
                  setDates(e.value);
                  handleYearChange(e); // Call the function to update the selected year
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
              <p className="DeptFilter">Select Department :</p>
              <select
                className="department-filter"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            </div>
          </header>

          <div className="chart-container">
            <div className="pie">
              <div className="chart pie-chart">
                <PieChart
                  viewMode={viewMode}
                  selectedDepartment={selectedDepartment}
                  selectedYear={selectedYear}
                />
              </div>
              <div className="chart donut-chart">
                <p className="RevenueText">Revenues vs Expenses</p>
                <hr />
                <DonutChart
                  viewMode={viewMode}
                  selectedYear={selectedYear}
                  selectedDepartment={selectedDepartment}
                />
              </div>
            </div>
            <div className="chart line-chart">
              <LineChart
                viewMode={viewMode}
                selectedYear={selectedYear}
                selectedDepartment={selectedDepartment}
              />
            </div>
            <div className="chart bar-chart">
              <BarChart
                viewMode={viewMode}
                selectedYear={selectedYear}
                selectedDepartment={selectedDepartment}
              />
            </div>
            <div className="table-container" style={{ marginTop: '20px' }}>
              {!selectedDepartment ? (
                <DataTableComponent
                  viewMode={viewMode}
                  selectedYear={selectedYear}
                />
              ) : (
                <DepartmentTableComponent
                  selectedDepartment={selectedDepartment}
                  viewMode={viewMode}
                  selectedYear={selectedYear}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
