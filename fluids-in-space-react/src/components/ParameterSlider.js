import React from 'react';
import './ParameterSlider.css';

const ParameterSlider = ({ label, value, min, max, step, unit, onChange, description }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="parameter-slider">
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        <span className="slider-value">
          {value} {unit}
        </span>
      </div>
      
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="slider"
          style={{
            background: `linear-gradient(to right, var(--accent-blue) 0%, var(--accent-blue) ${percentage}%, rgba(255,255,255,0.1) ${percentage}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
      </div>
      
      {description && <p className="slider-description">{description}</p>}
    </div>
  );
};

export default ParameterSlider;
