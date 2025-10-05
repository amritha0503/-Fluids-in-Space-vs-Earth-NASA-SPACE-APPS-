import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Visualization from './pages/Visualization';
import LearnMore from './pages/LearnMore';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/learn-more" element={<LearnMore />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
