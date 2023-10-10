import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import jsonData from './data.json';
import './TempGraph.css';

const UVIndexGraph = ({ timeframe }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getRecentUVIndexData = (timeFrame) => {
      const now = new Date();
      const filtered = jsonData.filter((entry) => {
        const entryDate = new Date(entry.date);
        if (timeFrame === 'day') {
          return entryDate.getDate() === now.getDate();
        } else if (timeFrame === 'month') {
          return entryDate.getMonth() === now.getMonth();
        } else if (timeFrame === 'year') {
          return entryDate.getFullYear() === now.getFullYear();
        }
        return false;
      });
      return filtered;
    };

    const filtered = getRecentUVIndexData(timeframe);
    setFilteredData(filtered);
  }, [timeframe]);

  const formatBottomAxisLabel = (value) => {
    if (timeframe === 'day') {
      return value.split('T')[1].substring(0, 5);
    } else if (timeframe === 'month') {
      return value.split('T')[0].split('-')[2];
    } else if (timeframe === 'year') {
      return value.split('T')[0].split('-')[1];
    }
    return value;
  };

  return (
    <div className="uv-index-graph-container">
      <ResponsiveContainer width="150%" height={150}>
        <LineChart data={filteredData}>
          <XAxis dataKey="date" tickFormatter={formatBottomAxisLabel} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uvIndex" name="UV Index" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UVIndexGraph;
