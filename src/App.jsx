
import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import HurricaneShutterControl from './HurricaneShutterControl'
import { FaArrowUp, FaArrowDown, FaLock, FaUnlock } from 'react-icons/fa';

function App() {
  const [windowState, setWindowState] = useState('closed');
  const [locked, setLocked] = useState(true);
  const [temperature, setTemperature] = useState(72); 
  const [weatherData, setWeatherData] = useState('Sunny');
  const [showHurricaneWarning, setShowHurricaneWarning] = useState(true);

  const handleOpenClick = () => {
    if (!locked) {
      setWindowState('open');
    }
  };

  const handleCloseClick = () => {
    if (!locked) {
      setWindowState('closed');
    }
  };

  const handleLockToggle = () => {
    setLocked(!locked);
  };

  const handleDismissHurricaneWarning = () => {
    setShowHurricaneWarning(false);
  };

  return (
    <div className="App">
      <h1>Smart Windows</h1>
      <img src="src\placementDiagram.png" alt="Placement Diagram" />
      <h2>C-Requirments</h2>
      <div className="window-box">
        <div className="window-controls">
          <div className="hurricane-warning-container">
            {showHurricaneWarning && (
              <div className="hurricane-warning">
                <p>⚠️ Hurricane Warning: Please take necessary precautions! ⚠️</p>
                <button onClick={handleDismissHurricaneWarning}>Dismiss</button>
              </div>
            )}
          </div>
          <button
            className={`arrow-button ${locked ? 'disabled' : ''}`}
            onClick={handleOpenClick}
          >
            <FaArrowUp />
          </button>
          <button
            className={`arrow-button ${locked ? 'disabled' : ''}`}
            onClick={handleCloseClick}
          >
            <FaArrowDown />
          </button>
          <button className="lock-button" onClick={handleLockToggle}>
            {locked ? <FaLock className="locked" /> : <FaUnlock className="unlocked" />}
          </button>
        </div>
        <div className="weather-info">
          <div className="temperature">{temperature}°F</div>
          <div className="weather-description">{weatherData}</div>
        </div>
      </div>
      <div className="App">
        <h2>B-Requirments</h2>
        <Dashboard />
      </div>
      <div className="App">
        <h2>A-Requirments</h2>
        <HurricaneShutterControl />
      </div>
    </div>
  );
}

export default App;
