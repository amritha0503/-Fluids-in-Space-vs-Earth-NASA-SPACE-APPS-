import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './DatasetViewer.css';
import { generateSampleData } from '../utils/dataGenerator';

const DatasetViewer = ({ datasetId }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    // Generate sample data based on dataset type
    const sampleData = generateSampleData(datasetId);
    setData(sampleData);
  }, [datasetId]);

  const getChartTitle = () => {
    switch (datasetId) {
      case 'colloid':
        return 'Colloid Particle Position Over Time';
      case 'marangoni':
        return 'Temperature vs Surface Tension';
      case 'capillary':
        return 'Fluid Height vs Time';
      default:
        return 'Data Visualization';
    }
  };

  const getXAxisLabel = () => {
    switch (datasetId) {
      case 'colloid':
        return 'Time (seconds)';
      case 'marangoni':
        return 'Temperature (°C)';
      case 'capillary':
        return 'Time (seconds)';
      default:
        return 'X Axis';
    }
  };

  const getYAxisLabel = () => {
    switch (datasetId) {
      case 'colloid':
        return 'Position (μm)';
      case 'marangoni':
        return 'Surface Tension (mN/m)';
      case 'capillary':
        return 'Height (mm)';
      default:
        return 'Y Axis';
    }
  };

  return (
    <div className="dataset-viewer card">
      <div className="viewer-header">
        <h3>{getChartTitle()}</h3>
        <div className="chart-controls">
          <button
            className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
            onClick={() => setChartType('line')}
          >
            Line Chart
          </button>
          <button
            className={`chart-type-btn ${chartType === 'scatter' ? 'active' : ''}`}
            onClick={() => setChartType('scatter')}
          >
            Scatter Plot
          </button>
        </div>
      </div>

      <div className="chart-container">
        {chartType === 'line' ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="x"
                label={{ value: getXAxisLabel(), position: 'insideBottom', offset: -5 }}
                stroke="rgba(255,255,255,0.6)"
              />
              <YAxis
                label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }}
                stroke="rgba(255,255,255,0.6)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 14, 39, 0.95)',
                  border: '1px solid rgba(0, 191, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="y1"
                stroke="#00bfff"
                strokeWidth={2}
                dot={false}
                name={datasetId === 'colloid' ? 'Particle 1' : 'Earth'}
              />
              {datasetId === 'colloid' && (
                <Line
                  type="monotone"
                  dataKey="y2"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false}
                  name="Particle 2"
                />
              )}
              {datasetId === 'marangoni' && (
                <Line
                  type="monotone"
                  dataKey="y2"
                  stroke="#fc3d21"
                  strokeWidth={2}
                  dot={false}
                  name="Space"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="x"
                label={{ value: getXAxisLabel(), position: 'insideBottom', offset: -5 }}
                stroke="rgba(255,255,255,0.6)"
              />
              <YAxis
                label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }}
                stroke="rgba(255,255,255,0.6)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 14, 39, 0.95)',
                  border: '1px solid rgba(0, 191, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Legend />
              <Scatter
                name={datasetId === 'colloid' ? 'Particle 1' : 'Earth'}
                data={data}
                fill="#00bfff"
              />
              {datasetId === 'colloid' && (
                <Scatter
                  name="Particle 2"
                  data={data.map((d) => ({ x: d.x, y: d.y2 }))}
                  fill="#8b5cf6"
                />
              )}
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="data-info">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Data Points:</span>
            <span className="info-value">{data.length}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Source:</span>
            <span className="info-value">NASA PSI Database</span>
          </div>
          <div className="info-item">
            <span className="info-label">Type:</span>
            <span className="info-value">Sample Data</span>
          </div>
        </div>
        <p className="data-note">
          <strong>Note:</strong> This is simulated data for educational purposes. 
          Real NASA datasets are available through the Physical Sciences Informatics (PSI) portal.
        </p>
      </div>
    </div>
  );
};

export default DatasetViewer;
