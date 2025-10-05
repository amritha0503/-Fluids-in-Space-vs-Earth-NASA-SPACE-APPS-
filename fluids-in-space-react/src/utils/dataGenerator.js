// Utility to generate sample NASA-like dataset
export const generateSampleData = (datasetId) => {
  const numPoints = 100;
  const data = [];

  switch (datasetId) {
    case 'colloid':
      // Simulate particle tracking data
      // In space: organized motion, on Earth: random settling
      for (let i = 0; i < numPoints; i++) {
        const time = i * 0.5;
        // Particle 1: organized oscillation in microgravity
        const y1 = 50 + 20 * Math.sin(time * 0.2) + Math.random() * 2;
        // Particle 2: different phase
        const y2 = 50 + 20 * Math.cos(time * 0.2) + Math.random() * 2;
        
        data.push({
          x: time,
          y1: parseFloat(y1.toFixed(2)),
          y2: parseFloat(y2.toFixed(2)),
        });
      }
      break;

    case 'marangoni':
      // Temperature vs Surface Tension
      // Earth: standard relationship, Space: enhanced effects
      for (let i = 0; i < numPoints; i++) {
        const temp = 20 + i * 0.6;
        // Earth: linear decrease
        const earthTension = 72 - (temp - 20) * 0.15 + Math.random() * 0.5;
        // Space: more pronounced gradient effects
        const spaceTension = 72 - (temp - 20) * 0.25 - Math.sin(temp * 0.1) * 2 + Math.random() * 0.5;
        
        data.push({
          x: parseFloat(temp.toFixed(1)),
          y1: parseFloat(earthTension.toFixed(2)),
          y2: parseFloat(spaceTension.toFixed(2)),
        });
      }
      break;

    case 'capillary':
      // Fluid rise in capillary tube over time
      for (let i = 0; i < numPoints; i++) {
        const time = i * 0.1;
        // Earth: standard capillary rise
        const earthHeight = 15 * (1 - Math.exp(-time * 0.5)) + Math.random() * 0.2;
        // Space: different behavior without gravity
        const spaceHeight = 25 * (1 - Math.exp(-time * 0.3)) * Math.sin(time * 0.5) + Math.random() * 0.3;
        
        data.push({
          x: parseFloat(time.toFixed(2)),
          y1: parseFloat(earthHeight.toFixed(2)),
          y2: parseFloat(spaceHeight.toFixed(2)),
        });
      }
      break;

    default:
      // Generic data
      for (let i = 0; i < numPoints; i++) {
        data.push({
          x: i,
          y1: Math.sin(i * 0.1) * 50 + 50,
          y2: Math.cos(i * 0.1) * 50 + 50,
        });
      }
  }

  return data;
};

// Generate real-time simulation data
export const generateRealtimeData = (parameters) => {
  const { gravity, temperature } = parameters;
  
  // Simulation parameters based on inputs
  const surfaceTensionCoeff = 72 - (temperature - 20) * 0.15;
  
  return {
    surfaceTension: surfaceTensionCoeff,
    convectionType: gravity < 1 ? 'Marangoni' : 'Buoyancy-driven',
    dropletShape: gravity < 1 ? 'Spherical' : 'Flattened',
    mixingEfficiency: gravity > 5 ? 0.8 : 0.3,
    gravityEffect: gravity / 9.8,
  };
};

// Parse CSV data (for future NASA dataset integration)
export const parseCSVData = (csvString) => {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',');
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    
    headers.forEach((header, index) => {
      row[header.trim()] = isNaN(values[index]) 
        ? values[index].trim() 
        : parseFloat(values[index]);
    });
    
    data.push(row);
  }
  
  return data;
};

// Statistical analysis helpers
export const calculateStats = (data, key) => {
  const values = data.map(d => d[key]).filter(v => !isNaN(v));
  
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  
  return {
    mean: parseFloat(mean.toFixed(2)),
    median: parseFloat(median.toFixed(2)),
    min: parseFloat(min.toFixed(2)),
    max: parseFloat(max.toFixed(2)),
    stdDev: parseFloat(stdDev.toFixed(2)),
  };
};
