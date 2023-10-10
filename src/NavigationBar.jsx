
import React from 'react';
import './NavigationBar.css'
const NavigationBar = ({ activePage, onPageChange }) => {
  const pages = ['Temperature', 'UV Index', 'Precipitation', 'Window Efficiency'];

  return (
    <div className="navigation-bar">
      {pages.map((page, index) => (
        <button
          key={index}
          className={activePage === index ? 'active' : ''}
          onClick={() => onPageChange(index)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default NavigationBar;
