import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Rocket, Beaker, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <Droplets size={40} />,
      title: 'Fluid Behavior',
      description: 'Explore how liquids form perfect spheres in microgravity',
    },
    {
      icon: <Beaker size={40} />,
      title: 'Colloids',
      description: 'Discover self-assembly patterns in colloidal suspensions',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Marangoni Convection',
      description: 'Understand surface tension-driven flows in space',
    },
    {
      icon: <Rocket size={40} />,
      title: 'Real NASA Data',
      description: 'Interactive visualizations from PSI experiments',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              Fluids in Space vs Earth
            </h1>
            <p className="hero-subtitle">
              An Interactive Educational Journey Through Microgravity
            </p>
            <p className="hero-description">
              Discover why water forms floating spheres in space and how astronauts handle fluids differently. 
              Compare Earth's gravity-driven behavior with the fascinating physics of microgravity environments.
            </p>
            <div className="hero-buttons">
              <Link to="/simulation" className="btn btn-primary">
                Start Simulation
              </Link>
              <Link to="/learn-more" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="floating-droplet"></div>
          </motion.div>
        </div>
      </section>

      {/* Why Different in Space Section */}
      <section className="why-different">
        <div className="container">
          <h2 className="section-title">Why Do Fluids Behave Differently in Space?</h2>
          
          <div className="comparison-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="comparison-card earth"
            >
              <h3>🌍 On Earth</h3>
              <ul>
                <li><strong>Gravity dominates:</strong> Fluids settle at the bottom of containers</li>
                <li><strong>Convection:</strong> Hot fluid rises, cold fluid sinks predictably</li>
                <li><strong>Surface tension:</strong> Secondary effect compared to gravity</li>
                <li><strong>Mixing:</strong> Density differences drive separation</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="comparison-card space"
            >
              <h3>🚀 In Space</h3>
              <ul>
                <li><strong>Surface tension dominates:</strong> Fluids form perfect spheres</li>
                <li><strong>Marangoni convection:</strong> Surface tension gradients drive flow</li>
                <li><strong>No "up" or "down":</strong> Fluids don't settle</li>
                <li><strong>Self-assembly:</strong> Colloids organize into unique patterns</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Explore Interactive Features</h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="features-grid"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="feature-card card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Concepts Section */}
      <section className="key-concepts">
        <div className="container">
          <h2 className="section-title">Key Scientific Concepts</h2>
          
          <div className="concepts-list">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="concept-item card"
            >
              <h3>🔵 Surface Tension</h3>
              <p>
                In microgravity, surface tension becomes the dominant force. This causes liquids to 
                minimize their surface area and form spherical droplets, creating the iconic "water 
                balls" seen on the International Space Station.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="concept-item card"
            >
              <h3>🌡️ Marangoni Convection</h3>
              <p>
                Named after Italian physicist Carlo Marangoni, this phenomenon occurs when surface 
                tension gradients (caused by temperature or concentration differences) drive fluid 
                flow. In space, this becomes the primary mechanism for heat and mass transfer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="concept-item card"
            >
              <h3>⚛️ Colloidal Self-Assembly</h3>
              <p>
                Colloids are mixtures where tiny particles (1-1000 nanometers) are suspended in a 
                fluid. In microgravity, without gravitational settling, these particles can 
                self-organize into crystal-like structures with applications in materials science.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Explore?</h2>
            <p>
              Use our interactive simulation to adjust gravity, temperature, and container 
              properties to see real-time changes in fluid behavior.
            </p>
            <Link to="/simulation" className="btn btn-primary btn-large">
              Launch Simulation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
