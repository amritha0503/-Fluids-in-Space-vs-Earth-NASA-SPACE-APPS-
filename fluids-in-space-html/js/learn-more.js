// Learn More Page - Dataset Viewer Functionality

// Dataset viewer state
let currentDataset = null;
let currentChartType = 'line';
let currentData = [];

// NASA Data Browser state
let nasaDatasets = [];
let filteredDatasets = [];
let selectedNASADataset = null;

// Fallback NASA datasets (matching React version)
const fallbackDatasets = [
    {
        accession: 'PSI-119',
        title: '📄 PSI-119: Marangoni Swimmer Pushing Particle Raft',
        description: 'Experimental study of Marangoni swimmers and their ability to push particle rafts in microgravity environments. This research demonstrates surface tension-driven propulsion mechanisms conducted on the ISS.',
        category: 'Research Paper',
        mission: 'ISS',
        relevance: 'high',
        link: 'resources/PSI-119_Marangoni_swimmer.pdf'
    },
    {
        accession: 'PSI-INFO',
        title: '🔬 Physical Sciences Informatics Database',
        description: 'NASA\'s PSI database contains extensive data on fluid behavior, Marangoni convection, capillary flow, and colloid experiments conducted in microgravity. Access the full database at psi.nasa.gov.',
        category: 'Physical Sciences',
        relevance: 'high',
        link: 'https://psi.nasa.gov/'
    },
    {
        accession: 'GUIDE-1',
        title: '📊 Recommended Fluid Experiments',
        description: 'Search NASA OSDR for these specific experiments: "Capillary Flow Experiment (CFE)", "Constrained Vapor Bubble", "Marangoni Surface Tension Studies", "Colloid Phase Transitions". These directly relate to your simulation topics.',
        category: 'Search Guide',
        relevance: 'high'
    },
    {
        accession: 'GUIDE-2',
        title: '🌊 Fluid Physics Keywords',
        description: 'When searching NASA\'s portal, use these keywords: "microgravity fluids", "capillary action space", "Marangoni effect ISS", "surface tension microgravity", "colloid self-assembly". These will find the most relevant data.',
        category: 'Search Guide',
        relevance: 'high'
    },
    {
        accession: 'DATA-1',
        title: '� Available Data Types',
        description: 'NASA provides: CSV data files (numerical measurements), images/videos (experimental observations), protocol documents (methodology), and analysis results. Download what matches your project needs.',
        category: 'Data Info',
        relevance: 'medium',
        link: 'https://osdr.nasa.gov/bio/repo/'
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeNASADataBrowser();
    initializeDatasetCards();
    initializeChartControls();
    initializeSmoothScroll();
});

// ===== NASA DATA BROWSER FUNCTIONS =====

function initializeNASADataBrowser() {
    const searchInput = document.getElementById('datasetSearch');
    const refreshBtn = document.getElementById('refreshData');
    
    // Load datasets
    loadNASADatasets();
    
    // Search handler with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterNASADatasets(e.target.value);
        }, 300);
    });
    
    // Refresh handler
    refreshBtn.addEventListener('click', () => {
        searchInput.value = '';
        loadNASADatasets();
    });
}

function loadNASADatasets() {
    const listContainer = document.getElementById('datasetsList');
    const filterInfo = document.getElementById('filterInfo');
    const filterInfoText = document.getElementById('filterInfoText');
    
    // Show loading
    listContainer.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading NASA datasets...</p>
        </div>
    `;
    
    // Simulate API call (use fallback datasets)
    setTimeout(() => {
        nasaDatasets = fallbackDatasets;
        filteredDatasets = nasaDatasets;
        
        // Show filter info
        filterInfo.style.display = 'flex';
        filterInfoText.textContent = `✅ Showing ${nasaDatasets.length} relevant fluid mechanics datasets`;
        
        renderNASADatasets();
    }, 500);
}

function filterNASADatasets(searchTerm) {
    if (!searchTerm.trim()) {
        filteredDatasets = nasaDatasets;
    } else {
        const term = searchTerm.toLowerCase();
        filteredDatasets = nasaDatasets.filter(dataset => {
            const title = (dataset.title || '').toLowerCase();
            const description = (dataset.description || '').toLowerCase();
            const accession = (dataset.accession || '').toLowerCase();
            return title.includes(term) || description.includes(term) || accession.includes(term);
        });
    }
    
    const filterInfo = document.getElementById('filterInfo');
    const filterInfoText = document.getElementById('filterInfoText');
    
    if (searchTerm.trim()) {
        filterInfo.style.display = 'flex';
        filterInfoText.textContent = `🔍 Found ${filteredDatasets.length} results matching "${searchTerm}"`;
    } else {
        filterInfo.style.display = 'flex';
        filterInfoText.textContent = `✅ Showing ${nasaDatasets.length} relevant fluid mechanics datasets`;
    }
    
    renderNASADatasets();
}

function renderNASADatasets() {
    const listContainer = document.getElementById('datasetsList');
    
    if (filteredDatasets.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🗄️</div>
                <p>No datasets found</p>
            </div>
        `;
        return;
    }
    
    listContainer.innerHTML = filteredDatasets.map(dataset => `
        <div class="dataset-card ${selectedNASADataset?.accession === dataset.accession ? 'selected' : ''}" 
             onclick="selectNASADataset('${dataset.accession}')">
            <div class="dataset-header">
                <span>🗄️</span>
                <span class="dataset-accession">${dataset.accession}</span>
            </div>
            <h3 class="dataset-title">${dataset.title}</h3>
            ${dataset.description ? `<p class="dataset-description">${dataset.description}</p>` : ''}
            <div class="dataset-mission">
                ${dataset.category ? `<span class="category-badge">${dataset.category}</span>` : ''}
                ${dataset.mission ? `<span class="mission-badge">${dataset.mission}</span>` : ''}
                ${dataset.relevance === 'high' ? `<span class="relevance-badge">⭐ High Relevance</span>` : ''}
            </div>
        </div>
    `).join('');
}

function selectNASADataset(accession) {
    selectedNASADataset = nasaDatasets.find(d => d.accession === accession);
    renderNASADatasets();
    renderNASADatasetDetails();
}

function renderNASADatasetDetails() {
    const detailsPanel = document.getElementById('detailsPanel');
    
    if (!selectedNASADataset) {
        detailsPanel.innerHTML = `
            <div class="details-placeholder">
                <div class="placeholder-icon">🗄️</div>
                <p>Select a dataset to view details</p>
            </div>
        `;
        return;
    }
    
    const dataset = selectedNASADataset;
    
    // Badge colors based on type
    const categoryColors = {
        'Research Paper': 'linear-gradient(135deg, #0066cc 0%, #0099ff 100%)',
        'Physical Sciences': 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
        'Search Guide': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'Data Info': 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)'
    };
    
    const relevanceColors = {
        'high': '#ef4444',
        'medium': '#f59e0b',
        'low': '#6b7280'
    };
    
    detailsPanel.innerHTML = `
        <div class="dataset-details">
            <div class="details-header">
                <h2>${dataset.title}</h2>
                <span class="accession-badge">${dataset.accession}</span>
            </div>
            
            <div class="details-badges">
                <span class="badge-item" style="background: ${categoryColors[dataset.category] || 'var(--accent-blue)'}">
                    ${dataset.category}
                </span>
                ${dataset.relevance ? `
                    <span class="badge-item" style="background: ${relevanceColors[dataset.relevance] || '#6b7280'}">
                        ${dataset.relevance} relevance
                    </span>
                ` : ''}
                ${dataset.mission ? `
                    <span class="badge-item" style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)">
                        ${dataset.mission} Mission
                    </span>
                ` : ''}
            </div>
            
            <div class="details-section">
                <h3>📋 Description</h3>
                <p>${dataset.description}</p>
            </div>
            
            <div class="details-actions">
                ${dataset.link ? `
                    <a href="${dataset.link}" ${dataset.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="view-osdr-btn">
                        ${dataset.link.includes('.pdf') ? '📄 View PDF Document' : '🔗 View in NASA Portal'} ↗
                    </a>
                ` : `
                    <a href="https://osdr.nasa.gov/bio/repo/" target="_blank" rel="noopener noreferrer" class="view-osdr-btn">
                        🌐 Browse NASA OSDR Portal ↗
                    </a>
                    <a href="https://psi.nasa.gov/" target="_blank" rel="noopener noreferrer" class="view-osdr-btn">
                        🔬 Visit PSI Database ↗
                    </a>
                `}
            </div>
        </div>
    `;
}

// Initialize dataset card click handlers
function initializeDatasetCards() {
    const datasetCards = document.querySelectorAll('.dataset-card');
    const viewerContainer = document.getElementById('datasetViewerContainer');
    
    datasetCards.forEach(card => {
        const btn = card.querySelector('.view-btn');
        const datasetType = card.querySelector('h3').textContent;
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Toggle dataset viewer
            if (currentDataset === datasetType) {
                // Hide viewer
                hideDatasetViewer();
                btn.textContent = 'View Sample Data';
                card.classList.remove('selected');
            } else {
                // Show viewer for this dataset
                showDatasetViewer(datasetType);
                
                // Update all buttons
                datasetCards.forEach(c => {
                    c.querySelector('.view-btn').textContent = 'View Sample Data';
                    c.classList.remove('selected');
                });
                
                btn.textContent = 'Hide Data';
                card.classList.add('selected');
            }
        });
    });
}

// Show dataset viewer
function showDatasetViewer(datasetType) {
    currentDataset = datasetType;
    const viewerContainer = document.getElementById('datasetViewerContainer');
    const chartTitle = document.getElementById('chartTitle');
    
    // Update title
    if (datasetType.includes('Colloid')) {
        chartTitle.textContent = 'Colloid Particle Position Over Time';
    } else if (datasetType.includes('Marangoni')) {
        chartTitle.textContent = 'Temperature vs Surface Tension';
    } else if (datasetType.includes('Capillary')) {
        chartTitle.textContent = 'Fluid Height vs Time';
    }
    
    // Show container with animation
    viewerContainer.style.display = 'block';
    viewerContainer.style.opacity = '0';
    viewerContainer.style.height = '0';
    
    setTimeout(() => {
        viewerContainer.style.transition = 'opacity 0.3s ease, height 0.3s ease';
        viewerContainer.style.opacity = '1';
        viewerContainer.style.height = 'auto';
    }, 10);
    
    // Generate and draw data
    currentData = generateSampleData(datasetType);
    drawVisualization();
    
    // Scroll to viewer
    setTimeout(() => {
        viewerContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Hide dataset viewer
function hideDatasetViewer() {
    const viewerContainer = document.getElementById('datasetViewerContainer');
    viewerContainer.style.opacity = '0';
    
    setTimeout(() => {
        viewerContainer.style.display = 'none';
        currentDataset = null;
    }, 300);
}

// Initialize chart type controls
function initializeChartControls() {
    const chartButtons = document.querySelectorAll('.chart-type-btn');
    
    chartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            chartButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update chart type and redraw
            currentChartType = btn.dataset.type;
            drawVisualization();
        });
    });
}

// Draw visualization based on current type
function drawVisualization() {
    if (!currentDataset || !currentData.length) return;
    
    if (currentChartType === 'line') {
        drawDatasetVisualization(currentDataset);
    } else {
        drawScatterPlot(currentDataset);
    }
    
    // Update data points count
    document.getElementById('dataPointsCount').textContent = currentData.length;
}

// Get dataset information
function getDatasetInfo(datasetType) {
    const info = {
        'Colloid Self-Assembly Dataset': 'This dataset captures the self-organization of colloidal particles in microgravity conditions. Without gravitational settling, particles interact purely through surface forces, creating unique crystalline structures.',
        'Marangoni Convection Data': 'Temperature and concentration gradients create surface tension variations, driving fluid motion in microgravity. This dataset shows how these Marangoni flows transport heat and mass differently than on Earth.',
        'Capillary Flow Experiments': 'Surface tension dominates fluid behavior in microgravity, allowing liquids to climb walls and form stable bridges. This dataset demonstrates capillary-driven flows in various geometries.'
    };
    
    return info[datasetType] || 'Detailed information about this dataset.';
}

// Get dataset statistics
function getDatasetStats(datasetType) {
    const stats = {
        'Colloid Self-Assembly Dataset': {
            timePoints: '2,500+',
            variables: '12',
            resolution: '1024×1024'
        },
        'Marangoni Convection Data': {
            timePoints: '1,800+',
            variables: '8',
            resolution: '512×512'
        },
        'Capillary Flow Experiments': {
            timePoints: '3,200+',
            variables: '10',
            resolution: '800×600'
        }
    };
    
    return stats[datasetType] || { timePoints: 'N/A', variables: 'N/A', resolution: 'N/A' };
}

// Generate sample data based on dataset type
function generateSampleData(datasetType) {
    const numPoints = 100;
    const data = [];
    
    if (datasetType.includes('Colloid')) {
        // Simulate particle tracking data
        for (let i = 0; i < numPoints; i++) {
            const time = i * 0.5;
            const y1 = 50 + 20 * Math.sin(time * 0.2) + Math.random() * 2;
            const y2 = 50 + 20 * Math.cos(time * 0.2) + Math.random() * 2;
            data.push({ x: time, y1: y1, y2: y2 });
        }
    } else if (datasetType.includes('Marangoni')) {
        // Temperature vs Surface Tension
        for (let i = 0; i < numPoints; i++) {
            const temp = 20 + i * 0.6;
            const earthTension = 72 - (temp - 20) * 0.15 + Math.random() * 0.5;
            const spaceTension = 72 - (temp - 20) * 0.25 - Math.sin(temp * 0.1) * 2 + Math.random() * 0.5;
            data.push({ x: temp, y1: earthTension, y2: spaceTension });
        }
    } else if (datasetType.includes('Capillary')) {
        // Fluid rise in capillary tube over time
        for (let i = 0; i < numPoints; i++) {
            const time = i * 0.1;
            const earthHeight = 15 * (1 - Math.exp(-time * 0.5)) + Math.random() * 0.2;
            const spaceHeight = 25 * (1 - Math.exp(-time * 0.3)) * Math.sin(time * 0.5) + Math.random() * 0.3;
            data.push({ x: time, y1: earthHeight, y2: spaceHeight });
        }
    }
    
    return data;
}

// Draw dataset visualization
function drawDatasetVisualization(datasetType) {
    const canvas = document.getElementById('datasetCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Use current data
    const data = currentData;
    
    // Draw chart based on dataset type
    if (datasetType.includes('Colloid')) {
        drawLineChart(ctx, width, height, data, 'Time (seconds)', 'Position (μm)', ['Particle 1', 'Particle 2']);
    } else if (datasetType.includes('Marangoni')) {
        drawLineChart(ctx, width, height, data, 'Temperature (°C)', 'Surface Tension (mN/m)', ['Earth', 'Space']);
    } else if (datasetType.includes('Capillary')) {
        drawLineChart(ctx, width, height, data, 'Time (seconds)', 'Height (mm)', ['Earth', 'Space']);
    }
}

// Draw scatter plot
function drawScatterPlot(datasetType) {
    const canvas = document.getElementById('datasetCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Use current data
    const data = currentData;
    
    // Get labels
    let xLabel, yLabel, legends;
    if (datasetType.includes('Colloid')) {
        xLabel = 'Time (seconds)';
        yLabel = 'Position (μm)';
        legends = ['Particle 1', 'Particle 2'];
    } else if (datasetType.includes('Marangoni')) {
        xLabel = 'Temperature (°C)';
        yLabel = 'Surface Tension (mN/m)';
        legends = ['Earth', 'Space'];
    } else if (datasetType.includes('Capillary')) {
        xLabel = 'Time (seconds)';
        yLabel = 'Height (mm)';
        legends = ['Earth', 'Space'];
    }
    
    const padding = { top: 30, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Find data ranges
    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    const y1Min = Math.min(...data.map(d => d.y1));
    const y1Max = Math.max(...data.map(d => d.y1));
    const y2Min = Math.min(...data.map(d => d.y2));
    const y2Max = Math.max(...data.map(d => d.y2));
    const yMin = Math.min(y1Min, y2Min);
    const yMax = Math.max(y1Max, y2Max);
    
    const yRange = yMax - yMin;
    const yMinPadded = yMin - yRange * 0.1;
    const yMaxPadded = yMax + yRange * 0.1;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 10; i++) {
        const x = padding.left + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();
    }
    
    for (let i = 0; i <= 8; i++) {
        const y = padding.top + (chartHeight / 8) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();
    
    // Draw axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, padding.left + chartWidth / 2, height - 10);
    
    ctx.save();
    ctx.translate(15, padding.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
    
    // Draw tick labels
    ctx.font = '10px Arial';
    for (let i = 0; i <= 5; i++) {
        const x = padding.left + (chartWidth / 5) * i;
        const value = xMin + (xMax - xMin) * (i / 5);
        ctx.fillText(value.toFixed(1), x, padding.top + chartHeight + 20);
    }
    
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const y = padding.top + chartHeight - (chartHeight / 5) * i;
        const value = yMinPadded + (yMaxPadded - yMinPadded) * (i / 5);
        ctx.fillText(value.toFixed(1), padding.left - 10, y + 4);
    }
    
    // Scale functions
    function scaleX(x) {
        return padding.left + ((x - xMin) / (xMax - xMin)) * chartWidth;
    }
    
    function scaleY(y) {
        return padding.top + chartHeight - ((y - yMinPadded) / (yMaxPadded - yMinPadded)) * chartHeight;
    }
    
    // Draw scatter points for y1
    ctx.fillStyle = '#00bfff';
    data.forEach(point => {
        const x = scaleX(point.x);
        const y = scaleY(point.y1);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw scatter points for y2
    ctx.fillStyle = legends[1] === 'Space' ? '#fc3d21' : '#8b5cf6';
    data.forEach(point => {
        const x = scaleX(point.x);
        const y = scaleY(point.y2);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw legend
    const legendX = padding.left + chartWidth - 150;
    const legendY = padding.top + 10;
    
    ctx.fillStyle = '#00bfff';
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(legends[0], legendX + 20, legendY + 4);
    
    ctx.fillStyle = legends[1] === 'Space' ? '#fc3d21' : '#8b5cf6';
    ctx.beginPath();
    ctx.arc(legendX + 10, legendY + 20, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(legends[1], legendX + 20, legendY + 24);
}

// Draw line chart
function drawLineChart(ctx, width, height, data, xLabel, yLabel, legends) {
    const padding = { top: 30, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Find data ranges
    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    const y1Min = Math.min(...data.map(d => d.y1));
    const y1Max = Math.max(...data.map(d => d.y1));
    const y2Min = Math.min(...data.map(d => d.y2));
    const y2Max = Math.max(...data.map(d => d.y2));
    const yMin = Math.min(y1Min, y2Min);
    const yMax = Math.max(y1Max, y2Max);
    
    // Add some padding to y range
    const yRange = yMax - yMin;
    const yMinPadded = yMin - yRange * 0.1;
    const yMaxPadded = yMax + yRange * 0.1;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
        const x = padding.left + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 8; i++) {
        const y = padding.top + (chartHeight / 8) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();
    
    // Draw axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis label
    ctx.fillText(xLabel, padding.left + chartWidth / 2, height - 10);
    
    // Y-axis label
    ctx.save();
    ctx.translate(15, padding.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
    
    // Draw tick labels
    ctx.font = '10px Arial';
    
    // X-axis ticks
    for (let i = 0; i <= 5; i++) {
        const x = padding.left + (chartWidth / 5) * i;
        const value = xMin + (xMax - xMin) * (i / 5);
        ctx.fillText(value.toFixed(1), x, padding.top + chartHeight + 20);
    }
    
    // Y-axis ticks
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const y = padding.top + chartHeight - (chartHeight / 5) * i;
        const value = yMinPadded + (yMaxPadded - yMinPadded) * (i / 5);
        ctx.fillText(value.toFixed(1), padding.left - 10, y + 4);
    }
    
    // Scale data to chart coordinates
    function scaleX(x) {
        return padding.left + ((x - xMin) / (xMax - xMin)) * chartWidth;
    }
    
    function scaleY(y) {
        return padding.top + chartHeight - ((y - yMinPadded) / (yMaxPadded - yMinPadded)) * chartHeight;
    }
    
    // Draw line 1 (y1)
    ctx.strokeStyle = '#00bfff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, i) => {
        const x = scaleX(point.x);
        const y = scaleY(point.y1);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw line 2 (y2)
    ctx.strokeStyle = data.length > 0 && legends[1] === 'Space' ? '#fc3d21' : '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, i) => {
        const x = scaleX(point.x);
        const y = scaleY(point.y2);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw legend
    const legendX = padding.left + chartWidth - 150;
    const legendY = padding.top + 10;
    
    // Legend 1
    ctx.fillStyle = '#00bfff';
    ctx.fillRect(legendX, legendY, 20, 3);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(legends[0], legendX + 25, legendY + 3);
    
    // Legend 2
    ctx.fillStyle = legends[1] === 'Space' ? '#fc3d21' : '#8b5cf6';
    ctx.fillRect(legendX, legendY + 20, 20, 3);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(legends[1], legendX + 25, legendY + 23);
}

// Draw colloid self-assembly visualization
function drawColloidData(ctx, width, height) {
    // Draw particle grid showing crystalline structure
    const gridSize = 40;
    const particleRadius = 8;
    
    ctx.fillStyle = '#00bfff';
    ctx.strokeStyle = '#00bfff';
    
    for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            // Add slight randomness to show dynamic behavior
            const offsetX = Math.sin(x * 0.05 + y * 0.05) * 5;
            const offsetY = Math.cos(x * 0.05 + y * 0.05) * 5;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, particleRadius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw connections to nearby particles
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.moveTo(x + offsetX, y + offsetY);
            ctx.lineTo(x + gridSize + Math.sin((x + gridSize) * 0.05 + y * 0.05) * 5, y + Math.cos((x + gridSize) * 0.05 + y * 0.05) * 5);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
        }
    }
    
    // Add title
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.fillText('Colloid Particle Arrangement in Microgravity', 20, 30);
}

// Draw Marangoni convection visualization
function drawMarangoniData(ctx, width, height) {
    // Draw flow field with temperature gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#8b5cf6');
    gradient.addColorStop(0.5, '#00bfff');
    gradient.addColorStop(1, '#ff6b6b');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw flow vectors
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    for (let x = 50; x < width; x += 100) {
        for (let y = 50; y < height; y += 80) {
            const angle = Math.atan2(height/2 - y, width/2 - x) + Math.PI;
            const length = 30;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
            ctx.stroke();
            
            // Arrow head
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
            ctx.lineTo(
                x + Math.cos(angle) * length - Math.cos(angle - Math.PI/6) * 10,
                y + Math.sin(angle) * length - Math.sin(angle - Math.PI/6) * 10
            );
            ctx.stroke();
        }
    }
    
    // Add title and labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.fillText('Marangoni Flow Field', 20, 30);
    ctx.font = '14px monospace';
    ctx.fillText('Cold', 20, height - 20);
    ctx.fillText('Hot', width - 50, height - 20);
}

// Draw capillary flow visualization
function drawCapillaryData(ctx, width, height) {
    // Draw container walls
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 4;
    
    // Left wall
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(100, height - 50);
    ctx.stroke();
    
    // Right wall
    ctx.beginPath();
    ctx.moveTo(width - 100, 50);
    ctx.lineTo(width - 100, height - 50);
    ctx.stroke();
    
    // Draw liquid with meniscus
    const centerX = width / 2;
    const liquidTop = 150;
    
    ctx.fillStyle = '#00bfff';
    ctx.globalAlpha = 0.7;
    
    // Draw liquid body
    ctx.fillRect(100, liquidTop, width - 200, height - 50 - liquidTop);
    
    // Draw meniscus curves
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = '#00bfff';
    ctx.lineWidth = 3;
    
    // Left meniscus
    ctx.beginPath();
    ctx.moveTo(100, liquidTop + 30);
    ctx.quadraticCurveTo(150, liquidTop - 20, 200, liquidTop);
    ctx.stroke();
    
    // Right meniscus
    ctx.beginPath();
    ctx.moveTo(width - 100, liquidTop + 30);
    ctx.quadraticCurveTo(width - 150, liquidTop - 20, width - 200, liquidTop);
    ctx.stroke();
    
    // Add arrows showing capillary rise
    ctx.strokeStyle = '#8b5cf6';
    ctx.fillStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    
    // Left arrow
    ctx.beginPath();
    ctx.moveTo(120, height - 100);
    ctx.lineTo(120, liquidTop + 50);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(120, liquidTop + 50);
    ctx.lineTo(115, liquidTop + 60);
    ctx.lineTo(125, liquidTop + 60);
    ctx.closePath();
    ctx.fill();
    
    // Right arrow
    ctx.beginPath();
    ctx.moveTo(width - 120, height - 100);
    ctx.lineTo(width - 120, liquidTop + 50);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width - 120, liquidTop + 50);
    ctx.lineTo(width - 125, liquidTop + 60);
    ctx.lineTo(width - 115, liquidTop + 60);
    ctx.closePath();
    ctx.fill();
    
    // Add title and labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.fillText('Capillary Rise in Microgravity', 20, 30);
    ctx.font = '14px monospace';
    ctx.fillText('Meniscus', centerX - 40, liquidTop - 30);
}

// Initialize smooth scroll for navigation
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
.dataset-viewer-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 20px;
}

.viewer-content {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid rgba(0, 191, 255, 0.3);
    border-radius: 12px;
    max-width: 1000px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.viewer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.viewer-header h2 {
    font-size: 1.5rem;
    color: #00bfff;
    margin: 0;
}

.close-viewer {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 2rem;
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-viewer:hover {
    color: #00bfff;
}

.viewer-body {
    padding: 30px;
}

#datasetCanvas {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
    background: #0a0a0a;
}

.dataset-info h3 {
    color: #00bfff;
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.dataset-info p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin-bottom: 20px;
}

.data-points {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 20px;
}

.data-point {
    background: rgba(0, 191, 255, 0.1);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid rgba(0, 191, 255, 0.2);
}

.data-point .label {
    display: block;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.data-point .value {
    display: block;
    color: #00bfff;
    font-size: 1.2rem;
    font-weight: 600;
}

@media (max-width: 768px) {
    .data-points {
        grid-template-columns: 1fr;
    }
    
    .viewer-content {
        margin: 10px;
    }
    
    .viewer-header {
        padding: 15px 20px;
    }
    
    .viewer-body {
        padding: 20px;
    }
}
`;
document.head.appendChild(modalStyles);
