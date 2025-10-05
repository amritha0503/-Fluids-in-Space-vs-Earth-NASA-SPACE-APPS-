import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Simulation.css';
import FluidCanvas from '../components/FluidCanvas';
import ParameterSlider from '../components/ParameterSlider';

const Simulation = () => {
  const [parameters, setParameters] = useState({
    gravity: 9.8, // m/s²
    temperature: 20, // °C
    containerSize: 50, // arbitrary units
    fluidType: 'water',
    viscosity: 1.0,
  });

  const handleParameterChange = (param, value) => {
    setParameters((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const fluidTypes = [
    { value: 'water', label: 'Water', color: '#00bfff' },
    { value: 'oil', label: 'Oil', color: '#ffa500' },
    { value: 'colloid', label: 'Colloid Suspension', color: '#8b5cf6' },
  ];

  const presets = [
    { name: 'Earth', gravity: 9.8, temperature: 20 },
    { name: 'Moon', gravity: 1.62, temperature: 20 },
    { name: 'Mars', gravity: 3.71, temperature: 20 },
    { name: 'ISS (Microgravity)', gravity: 0.001, temperature: 22 },
  ];

  const applyPreset = (preset) => {
    setParameters((prev) => ({
      ...prev,
      gravity: preset.gravity,
      temperature: preset.temperature,
    }));
  };

  return (
    <div className="simulation">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="simulation-header"
        >
          <h1 className="section-title">Interactive Fluid Simulation</h1>
          <p className="section-subtitle">
            Adjust parameters to see how fluids behave under different conditions
          </p>
        </motion.div>

        <div className="simulation-content">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="controls-panel card"
          >
            <h2>Control Parameters</h2>

            {/* Environment Presets */}
            <div className="preset-section">
              <h3>Quick Presets</h3>
              <div className="preset-buttons">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    className="preset-btn"
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Fluid Type Selection */}
            <div className="parameter-group">
              <h3>Fluid Type</h3>
              <div className="fluid-type-selector">
                {fluidTypes.map((type) => (
                  <button
                    key={type.value}
                    className={`fluid-type-btn ${
                      parameters.fluidType === type.value ? 'active' : ''
                    }`}
                    onClick={() => handleParameterChange('fluidType', type.value)}
                    style={{
                      borderColor: parameters.fluidType === type.value ? type.color : 'transparent',
                    }}
                  >
                    <span
                      className="fluid-color-indicator"
                      style={{ backgroundColor: type.color }}
                    ></span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gravity Slider */}
            <ParameterSlider
              label="Gravity"
              value={parameters.gravity}
              min={0}
              max={10}
              step={0.1}
              unit="m/s²"
              onChange={(value) => handleParameterChange('gravity', value)}
              description="0 = microgravity, 9.8 = Earth gravity"
            />

            {/* Temperature Slider */}
            <ParameterSlider
              label="Temperature"
              value={parameters.temperature}
              min={-50}
              max={100}
              step={1}
              unit="°C"
              onChange={(value) => handleParameterChange('temperature', value)}
              description="Affects convection and surface tension"
            />

            {/* Container Size Slider */}
            <ParameterSlider
              label="Container Size"
              value={parameters.containerSize}
              min={20}
              max={100}
              step={5}
              unit="units"
              onChange={(value) => handleParameterChange('containerSize', value)}
              description="Size of the fluid container"
            />

            {/* Viscosity Slider */}
            <ParameterSlider
              label="Viscosity"
              value={parameters.viscosity}
              min={0.1}
              max={5}
              step={0.1}
              unit="×"
              onChange={(value) => handleParameterChange('viscosity', value)}
              description="1 = water, higher = more viscous"
            />

            {/* Info Panel */}
            <div className="info-panel">
              <h3>Current Conditions</h3>
              <div className="info-item">
                <span className="info-label">Environment:</span>
                <span className="info-value">
                  {parameters.gravity < 0.1
                    ? 'Microgravity'
                    : parameters.gravity < 2
                    ? 'Low Gravity'
                    : parameters.gravity < 5
                    ? 'Moderate Gravity'
                    : 'High Gravity'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Dominant Force:</span>
                <span className="info-value">
                  {parameters.gravity < 1 ? 'Surface Tension' : 'Gravitational'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Convection Type:</span>
                <span className="info-value">
                  {parameters.gravity < 1 ? 'Marangoni' : 'Buoyancy-driven'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Visualization Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="visualization-panel card"
          >
            <h2>Live Simulation</h2>
            <FluidCanvas parameters={parameters} />
            
            <div className="visualization-info">
              <p>
                {parameters.gravity < 0.5 ? (
                  <>
                    <strong>Microgravity Behavior:</strong> Surface tension dominates. 
                    The fluid forms spherical droplets to minimize surface area. 
                    Convection is driven by surface tension gradients (Marangoni effect).
                  </>
                ) : parameters.gravity < 5 ? (
                  <>
                    <strong>Low Gravity Behavior:</strong> Both gravity and surface 
                    tension play significant roles. Fluids still tend to form rounded shapes 
                    but begin to settle.
                  </>
                ) : (
                  <>
                    <strong>Earth-like Behavior:</strong> Gravity dominates. Fluids 
                    settle at the bottom of containers. Convection occurs through 
                    buoyancy-driven flows.
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Educational Notes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="education-notes card"
        >
          <h2>What You're Seeing</h2>
          <div className="notes-grid">
            <div className="note-item">
              <h3>🌊 Surface Tension Effects</h3>
              <p>
                In microgravity (gravity &lt; 0.1 m/s²), surface tension becomes the dominant 
                force, causing liquids to minimize their surface area and form perfect spheres.
              </p>
            </div>
            <div className="note-item">
              <h3>🔥 Temperature Impact</h3>
              <p>
                Higher temperatures reduce surface tension and increase molecular motion. 
                In microgravity, temperature gradients drive Marangoni convection patterns.
              </p>
            </div>
            <div className="note-item">
              <h3>📦 Container Interactions</h3>
              <p>
                Without gravity, fluids don't "know" where the bottom is. They interact 
                with container walls through adhesion and capillary forces.
              </p>
            </div>
            <div className="note-item">
              <h3>⚡ Viscosity Role</h3>
              <p>
                Higher viscosity dampens fluid motion and affects how quickly the fluid 
                responds to forces. Important for controlling fluids in space.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Simulation;
