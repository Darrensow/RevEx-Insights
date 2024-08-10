import React from 'react';
import './App.css';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

function App() {
  return (
    <div className="App">
      <h1>Chart.js with React</h1>
      <div className="chart-container">
        <div className="chart pie-chart">
          <PieChart />
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
