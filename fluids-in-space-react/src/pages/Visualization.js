import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import './Visualization.css';
import ComparisonVisualization from '../components/ComparisonVisualization';

const Visualization = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState('droplet');

  const scenarios = [
    {
      id: 'droplet',
      name: 'Water Droplet Formation',
      description: 'See how water forms perfect spheres in microgravity',
    },
    {
      id: 'convection',
      name: 'Marangoni Convection',
      description: 'Surface tension-driven flows in space',
    },
    {
      id: 'colloid',
      name: 'Colloid Self-Assembly',
      description: 'Particle organization without gravity',
    },
    {
      id: 'mixing',
      name: 'Fluid Mixing',
      description: 'Compare mixing behavior in gravity vs microgravity',
    },
  ];

  return (
    <div className="visualization-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1 className="section-title">Advanced Visualizations</h1>
          <p className="section-subtitle">
            Compare fluid behavior side-by-side: Earth vs Space
          </p>
        </motion.div>

        {/* Scenario Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="scenario-selector card"
        >
          <h2>Select Scenario</h2>
          <div className="scenario-grid">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={`scenario-btn ${
                  selectedScenario === scenario.id ? 'active' : ''
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <h3>{scenario.name}</h3>
                <p>{scenario.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Visualization Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="viz-controls"
        >
          <button
            className="control-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            className="control-btn"
            onClick={() => {
              setIsPlaying(false);
              setTimeout(() => setIsPlaying(true), 100);
            }}
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </motion.div>

        {/* Main Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="main-visualization"
        >
          <ComparisonVisualization
            scenario={selectedScenario}
            isPlaying={isPlaying}
          />
        </motion.div>

        {/* Explanation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="explanation-section"
        >
          {selectedScenario === 'droplet' && (
            <div className="explanation-card card">
              <h2>🌊 Water Droplet Formation</h2>
              <div className="explanation-content">
                <div className="explanation-column">
                  <h3>On Earth 🌍</h3>
                  <ul>
                    <li>Gravity pulls water downward</li>
                    <li>Water takes the shape of its container</li>
                    <li>Flat surfaces form at the top</li>
                    <li>Droplets are tear-shaped when falling</li>
                  </ul>
                </div>
                <div className="explanation-column">
                  <h3>In Space 🚀</h3>
                  <ul>
                    <li>Surface tension dominates behavior</li>
                    <li>Water forms perfect spheres</li>
                    <li>No "up" or "down" orientation</li>
                    <li>Spheres float freely without falling</li>
                  </ul>
                </div>
              </div>
              <div className="science-explanation">
                <strong>The Physics:</strong> Surface tension is the result of cohesive forces 
                between liquid molecules. On Earth, gravity overcomes this force. In microgravity, 
                surface tension pulls the liquid into the shape with minimum surface area—a sphere. 
                This is why astronauts' water forms floating balls!
              </div>
            </div>
          )}

          {selectedScenario === 'convection' && (
            <div className="explanation-card card">
              <h2>🌡️ Marangoni Convection</h2>
              <div className="explanation-content">
                <div className="explanation-column">
                  <h3>On Earth 🌍</h3>
                  <ul>
                    <li>Hot fluid rises, cold fluid sinks</li>
                    <li>Buoyancy-driven convection</li>
                    <li>Predictable circulation patterns</li>
                    <li>Gravity dominates the flow</li>
                  </ul>
                </div>
                <div className="explanation-column">
                  <h3>In Space 🚀</h3>
                  <ul>
                    <li>Surface tension gradients drive flow</li>
                    <li>Temperature affects surface tension</li>
                    <li>Complex, unexpected patterns</li>
                    <li>Flow from hot to cold regions on surface</li>
                  </ul>
                </div>
              </div>
              <div className="science-explanation">
                <strong>The Physics:</strong> Marangoni convection occurs when surface tension 
                varies across a liquid's surface (due to temperature or concentration differences). 
                In microgravity, this becomes the primary heat transfer mechanism. This effect is 
                crucial for materials processing in space and affects everything from crystal growth 
                to welding operations.
              </div>
            </div>
          )}

          {selectedScenario === 'colloid' && (
            <div className="explanation-card card">
              <h2>⚛️ Colloid Self-Assembly</h2>
              <div className="explanation-content">
                <div className="explanation-column">
                  <h3>On Earth 🌍</h3>
                  <ul>
                    <li>Particles settle due to gravity</li>
                    <li>Sedimentation prevents organization</li>
                    <li>Density differences cause separation</li>
                    <li>Limited crystal formation</li>
                  </ul>
                </div>
                <div className="explanation-column">
                  <h3>In Space 🚀</h3>
                  <ul>
                    <li>Particles remain suspended indefinitely</li>
                    <li>Self-organize into crystal structures</li>
                    <li>Long-range order develops</li>
                    <li>Unique materials can form</li>
                  </ul>
                </div>
              </div>
              <div className="science-explanation">
                <strong>The Physics:</strong> Colloids are mixtures with particles sized between 
                1-1000 nanometers. On Earth, gravity causes these particles to settle. In microgravity, 
                colloidal particles can spontaneously organize into ordered structures called "colloidal 
                crystals." These structures have potential applications in photonics, sensors, and 
                advanced materials. NASA's Physical Sciences Informatics (PSI) database contains 
                extensive research on colloidal behavior in space.
              </div>
            </div>
          )}

          {selectedScenario === 'mixing' && (
            <div className="explanation-card card">
              <h2>🌀 Fluid Mixing</h2>
              <div className="explanation-content">
                <div className="explanation-column">
                  <h3>On Earth 🌍</h3>
                  <ul>
                    <li>Density differences drive mixing</li>
                    <li>Stirring creates turbulent flow</li>
                    <li>Heavier fluids sink naturally</li>
                    <li>Convection assists mixing</li>
                  </ul>
                </div>
                <div className="explanation-column">
                  <h3>In Space 🚀</h3>
                  <ul>
                    <li>No natural density-driven mixing</li>
                    <li>Requires active stirring/agitation</li>
                    <li>Fluids can remain separate</li>
                    <li>Different mixing strategies needed</li>
                  </ul>
                </div>
              </div>
              <div className="science-explanation">
                <strong>The Physics:</strong> Without gravity, fluids of different densities don't 
                automatically separate or mix. This presents unique challenges for space operations 
                like fuel management, life support systems, and food preparation. Astronauts must use 
                special techniques to mix drinks and manage water supplies. Understanding microgravity 
                mixing is essential for long-duration space missions.
              </div>
            </div>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="additional-info card"
        >
          <h2>Real-World Applications</h2>
          <div className="applications-grid">
            <div className="application-item">
              <h3>🛰️ Spacecraft Design</h3>
              <p>
                Understanding fluid behavior helps design better fuel tanks, water systems, 
                and thermal management for spacecraft.
              </p>
            </div>
            <div className="application-item">
              <h3>🔬 Materials Science</h3>
              <p>
                Microgravity enables creation of unique materials and crystals impossible 
                to produce on Earth.
              </p>
            </div>
            <div className="application-item">
              <h3>🧪 Pharmaceutical Research</h3>
              <p>
                Protein crystallization in space produces higher-quality samples for 
                drug development.
              </p>
            </div>
            <div className="application-item">
              <h3>🌱 Life Support Systems</h3>
              <p>
                Managing water, air, and nutrients for long-term space habitation requires 
                understanding microgravity fluids.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Visualization;
