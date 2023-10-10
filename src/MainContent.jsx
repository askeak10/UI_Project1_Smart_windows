// src/components/MainContent.js
import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import TemperatureGraph from './TemperatureGraph'; 
import data from './data.json'; 
import "./NavigationBar.css"
import UVIndexGraph from './UVIndexGraph';
import PrecipitationGraph from './PrecipitationGraph';
import WindowEfficiencyGraph from './WindowEfficiencyGraph';

const MainContent = () => {
  const [activePage, setActivePage] = useState(0);
  const [timeframe, setTimeframe] = useState('day'); 

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const renderGraph = () => {
    switch (activePage) {
      case 0:
        return <TemperatureGraph data={data.temperature} timeframe={timeframe} />;
      case 1:
        return <UVIndexGraph data={data.uvIndex} timeframe={timeframe} />;
      case 2:
        return <PrecipitationGraph data={data.precitation} timeframe={timeframe} />;
      case 3:
      return <WindowEfficiencyGraph data={data.windowEfficiency} timeframe={timeframe} />;
      default:
        return null;
    }
  };

  return (
    <div className="main-content">
        <NavigationBar activePage={activePage} onPageChange={handlePageChange} />
        {renderGraph()}
        <div className="timeframe-controls">
            <button onClick={() => handleTimeframeChange('day')}>Day</button>
            <button onClick={() => handleTimeframeChange('month')}>Month</button>
            <button onClick={() => handleTimeframeChange('year')}>Year</button>
        </div>
      </div>
  );
};

export default MainContent;
