import React, { useState } from 'react';
import './App.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Calendar from 'react-calendar';

function HurricaneShutterControl({ onScheduleClose }) {
  const [closeDateTime, setCloseDateTime] = useState(null);
  const [openDateTime, setOpenDateTime] = useState(null);
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    if (step === 1 && closeDateTime !== null) {
      setStep(2);
    } else if (step === 2 && openDateTime !== null) {
      setStep(3);
      onScheduleClose(openDateTime);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const formatDate = (dateTime) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return dateTime.toLocaleString(undefined, options);
  };

  return (
    <div className='window-box'>
    <div className={`hurricane-shutter-control${step === 3 ? '-column' : ''}`}>
      {step === 1 && (
        <>
          <h2>Schedule Hurricane Shutter Close</h2>
          <div className="date-time-picker">
            <div className="calendar-container">
              <Calendar
                onChange={(date) => setCloseDateTime(date)}
                value={closeDateTime}
              />
            </div>
            <input
              type="time"
              value={closeDateTime ? closeDateTime.toISOString().slice(11, 16) : ''}
              onChange={(e) => {
                const time = e.target.value;
                setCloseDateTime((prev) => {
                  const newDate = prev || new Date();
                  newDate.setHours(time.split(':')[0]);
                  newDate.setMinutes(time.split(':')[1]);
                  return newDate;
                });
              }}
            />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Schedule Hurricane Shutter Open</h2>
          <div className="date-time-picker">
            <div className="calendar-container">
              <Calendar
                onChange={(date) => setOpenDateTime(date)}
                value={openDateTime}
              />
            </div>
            <input
              type="time"
              value={openDateTime ? openDateTime.toISOString().slice(11, 16) : ''}
              onChange={(e) => {
                const time = e.target.value;
                setOpenDateTime((prev) => {
                  const newDate = prev || new Date();
                  newDate.setHours(time.split(':')[0]);
                  newDate.setMinutes(time.split(':')[1]);
                  return newDate;
                });
              }}
            />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p>Hurricane shutter closure is scheduled for:</p>
          <p>Closed: {formatDate(closeDateTime)}</p>
          <p>Open: {formatDate(openDateTime)}</p>
        </>
      )}

      {step !== 3 && (
        <div className="arrow-buttons">
          {step !== 1 && (
            <button className="back-button" onClick={handleBack}>
              <FaArrowLeft />
            </button>
          )}
          <button onClick={handleContinue}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default HurricaneShutterControl;
