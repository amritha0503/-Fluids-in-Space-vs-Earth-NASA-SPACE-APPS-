import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Database, BookOpen, Video, FileText } from 'lucide-react';
import './LearnMore.css';
import DatasetViewer from '../components/DatasetViewer';
import NASADataBrowser from '../components/NASADataBrowser';

const LearnMore = () => {
  const [selectedDataset, setSelectedDataset] = useState(null);

  const nasaResources = [
    {
      title: 'Physical Sciences Informatics (PSI)',
      description: 'NASA\'s comprehensive database of physical sciences research conducted in space',
      url: 'https://psi.nasa.gov/',
      icon: <Database size={24} />,
      category: 'Database',
    },
    {
      title: 'Colloid Research on ISS',
      description: 'Studies on colloidal self-assembly and phase transitions in microgravity',
      url: 'https://www.nasa.gov/mission_pages/station/research/experiments/explorer/',
      icon: <FileText size={24} />,
      category: 'Research',
    },
    {
      title: 'PSI-119: Marangoni Swimmer & Particle Raft',
      description: 'Research on Marangoni swimmers pushing particle rafts in microgravity - Real NASA PSI experiment data',
      url: '/resources/PSI-119_Marangoni_swimmer.pdf',
      icon: <FileText size={24} />,
      category: 'Research Paper',
      isLocal: true,
    },
    {
      title: 'Marangoni Convection Experiments',
      description: 'Surface tension-driven convection studies from space experiments',
      url: 'https://www.nasa.gov/mission_pages/station/research/',
      icon: <FileText size={24} />,
      category: 'Research',
    },
    {
      title: 'Fluids in Space - Educational Videos',
      description: 'NASA astronauts demonstrating fluid behavior on the ISS',
      url: 'https://www.nasa.gov/audience/foreducators/',
      icon: <Video size={24} />,
      category: 'Educational',
    },
    {
      title: 'Microgravity Science Primer',
      description: 'Introduction to fundamental physics in space environments',
      url: 'https://www.nasa.gov/centers/glenn/about/fs21grc.html',
      icon: <BookOpen size={24} />,
      category: 'Educational',
    },
  ];

  const datasets = [
    {
      id: 'colloid',
      name: 'Colloid Self-Assembly Dataset',
      description: 'Particle tracking data from colloidal suspension experiments in microgravity',
      parameters: ['Particle Position', 'Time', 'Temperature', 'Particle Size'],
      experiments: 12,
      dataPoints: 50000,
    },
    {
      id: 'marangoni',
      name: 'Marangoni Convection Data',
      description: 'Temperature gradients and flow velocity measurements',
      parameters: ['Temperature', 'Flow Velocity', 'Surface Tension', 'Time'],
      experiments: 8,
      dataPoints: 30000,
    },
    {
      id: 'capillary',
      name: 'Capillary Flow Experiments',
      description: 'Fluid behavior in narrow tubes under various gravity levels',
      parameters: ['Fluid Height', 'Contact Angle', 'Gravity Level', 'Time'],
      experiments: 15,
      dataPoints: 40000,
    },
  ];

  const keyTopics = [
    {
      title: 'Surface Tension',
      description: 'The cohesive force between liquid molecules at the surface',
      examples: [
        'Water droplets forming spheres',
        'Insects walking on water',
        'Capillary action in plants',
      ],
    },
    {
      title: 'Microgravity',
      description: 'Environment where gravitational force is greatly reduced',
      examples: [
        'International Space Station orbit',
        'Parabolic flight experiments',
        'Drop tower facilities',
      ],
    },
    {
      title: 'Marangoni Effect',
      description: 'Mass transfer along an interface due to surface tension gradients',
      examples: [
        'Wine tears on glass',
        'Crystal growth in space',
        'Welding defects prevention',
      ],
    },
    {
      title: 'Colloidal Systems',
      description: 'Mixtures where particles (1-1000nm) are dispersed in a medium',
      examples: [
        'Milk and fog',
        'Paints and inks',
        'Blood and gelatin',
      ],
    },
  ];

  return (
    <div className="learn-more">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1 className="section-title">Learn More</h1>
          <p className="section-subtitle">
            Explore NASA datasets, research papers, and educational resources
          </p>
        </motion.div>

        {/* NASA Resources */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="resources-section"
        >
          <h2>NASA Resources & Databases</h2>
          <div className="resources-grid">
            {nasaResources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target={resource.isLocal ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="resource-card card"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="resource-icon">{resource.icon}</div>
                <div className="resource-content">
                  <div className="resource-header">
                    <h3>{resource.title}</h3>
                    <ExternalLink size={18} />
                  </div>
                  <p>{resource.description}</p>
                  <span className="resource-category">{resource.category}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Available Datasets */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="datasets-section"
        >
          <h2>Available NASA PSI Datasets</h2>
          <p className="section-description">
            These datasets contain real experimental data from space missions. 
            Click on any dataset to explore sample visualizations.
          </p>
          
          <div className="datasets-grid">
            {datasets.map((dataset) => (
              <motion.div
                key={dataset.id}
                className={`dataset-card card ${
                  selectedDataset === dataset.id ? 'selected' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  setSelectedDataset(selectedDataset === dataset.id ? null : dataset.id)
                }
              >
                <h3>{dataset.name}</h3>
                <p>{dataset.description}</p>
                
                <div className="dataset-stats">
                  <div className="stat">
                    <span className="stat-value">{dataset.experiments}</span>
                    <span className="stat-label">Experiments</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">
                      {(dataset.dataPoints / 1000).toFixed(0)}K
                    </span>
                    <span className="stat-label">Data Points</span>
                  </div>
                </div>

                <div className="dataset-parameters">
                  <strong>Parameters:</strong>
                  <div className="parameter-tags">
                    {dataset.parameters.map((param, idx) => (
                      <span key={idx} className="parameter-tag">
                        {param}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="view-btn">
                  {selectedDataset === dataset.id ? 'Hide Data' : 'View Sample Data'}
                </button>
              </motion.div>
            ))}
          </div>

          {selectedDataset && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="dataset-viewer-container"
            >
              <DatasetViewer datasetId={selectedDataset} />
            </motion.div>
          )}
        </motion.section>

        {/* Key Topics */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="topics-section"
        >
          <h2>Key Scientific Topics</h2>
          <div className="topics-grid">
            {keyTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="topic-card card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <h3>{topic.title}</h3>
                <p className="topic-description">{topic.description}</p>
                <div className="topic-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {topic.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How to Use This Tool */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="usage-section card"
        >
          <h2>How to Use This Educational Tool</h2>
          <div className="usage-steps">
            <div className="usage-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Start with the Basics</h3>
                <p>
                  Visit the Home page to understand fundamental concepts of fluid behavior 
                  in different gravitational environments.
                </p>
              </div>
            </div>

            <div className="usage-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Experiment with Parameters</h3>
                <p>
                  Use the Simulation page to adjust gravity, temperature, and other parameters. 
                  Try the quick presets to jump between Earth, Moon, Mars, and ISS conditions.
                </p>
              </div>
            </div>

            <div className="usage-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Compare Behaviors</h3>
                <p>
                  Explore the Visualization page to see side-by-side comparisons of different 
                  scenarios, from water droplets to colloid self-assembly.
                </p>
              </div>
            </div>

            <div className="usage-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Dive Deeper</h3>
                <p>
                  Access NASA's real datasets and research papers to explore actual experimental 
                  data and learn more about space science research.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* NASA OSDR Data Browser */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="data-browser-section"
        >
          <div className="section-header">
            <Database size={32} />
            <h2>Browse NASA's Open Science Data Repository</h2>
          </div>
          <p className="section-subtitle">
            Explore real experimental data from NASA space missions. Search for fluid behavior, 
            microgravity, and physical science experiments conducted aboard the International Space Station.
          </p>
          <NASADataBrowser />
        </motion.section>

        {/* Additional Resources */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="additional-resources card"
        >
          <h2>For Educators & Students</h2>
          <div className="educator-content">
            <div className="educator-column">
              <h3>📚 Suggested Activities</h3>
              <ul>
                <li>Compare Earth vs space conditions for different fluids</li>
                <li>Predict outcomes before running simulations</li>
                <li>Research real ISS experiments and match with simulations</li>
                <li>Create presentations on Marangoni convection applications</li>
                <li>Design hypothetical space experiments</li>
              </ul>
            </div>

            <div className="educator-column">
              <h3>🎯 Learning Objectives</h3>
              <ul>
                <li>Understand gravitational effects on fluids</li>
                <li>Explain surface tension and capillary action</li>
                <li>Describe Marangoni convection phenomena</li>
                <li>Analyze real space science data</li>
                <li>Apply physics concepts to space exploration</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default LearnMore;

