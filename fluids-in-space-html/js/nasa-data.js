// NASA Data Browser
document.addEventListener('DOMContentLoaded', () => {
    const datasetsGrid = document.getElementById('datasetsGrid');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const searchInput = document.getElementById('searchInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const datasetCount = document.getElementById('datasetCount');
    
    if (!datasetsGrid) return;
    
    let allDatasets = [];
    let filteredDatasets = [];
    
    // Curated NASA datasets (fallback when API fails)
    const curatedDatasets = [
        {
            accession: 'OSD-119',
            title: 'Capillary Flow Experiment (CFE-2)',
            description: 'Investigation of capillary flows and critical wetting in containers. Studies how fluids behave in confined spaces under microgravity conditions.',
            relevance: 'High',
            category: 'Capillary Action'
        },
        {
            accession: 'OSD-37',
            title: 'Marangoni Convection Experiment',
            description: 'Study of surface tension-driven flows in microgravity. Examines how temperature gradients create fluid motion in space.',
            relevance: 'High',
            category: 'Marangoni Effect'
        },
        {
            accession: 'OSD-388',
            title: 'Colloidal Fluids Investigation',
            description: 'Research on self-assembly of colloidal particles in microgravity. Investigates how particles organize without gravity interference.',
            relevance: 'High',
            category: 'Colloid Science'
        },
        {
            accession: 'PSI-119',
            title: 'Marangoni Swimmer Pushing Particle Raft',
            description: 'Experimental study of Marangoni swimmers and particle dynamics. Demonstrates surface tension-driven propulsion mechanisms in microgravity.',
            relevance: 'High',
            category: 'Marangoni Effect'
        },
        {
            accession: 'OSD-205',
            title: 'Surface Tension Containment Experiment',
            description: 'Investigation of how surface tension can contain fluids in space. Studies fluid management techniques for spacecraft systems.',
            relevance: 'High',
            category: 'Surface Tension'
        },
        {
            accession: 'OSD-156',
            title: 'Fluid Interface Phenomena',
            description: 'Studies fluid-fluid and fluid-solid interfaces in microgravity. Critical for understanding material processing in space.',
            relevance: 'Medium',
            category: 'Interface Science'
        },
        {
            accession: 'OSD-298',
            title: 'Thermocapillary Flow Investigation',
            description: 'Examines flows driven by temperature-dependent surface tension. Important for crystal growth and material processing.',
            relevance: 'High',
            category: 'Marangoni Effect'
        },
        {
            accession: 'OSD-421',
            title: 'Wetting and Contact Angle Study',
            description: 'Measures how liquids spread on surfaces in microgravity. Essential for designing fluid handling systems in space.',
            relevance: 'Medium',
            category: 'Wetting Phenomena'
        }
    ];
    
    // Fetch NASA datasets
    async function fetchDatasets() {
        try {
            loadingState.style.display = 'block';
            errorState.style.display = 'none';
            datasetsGrid.innerHTML = '';
            
            // Simulate API call (replace with real API when available)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For now, use curated datasets
            // In production, this would fetch from NASA OSDR API
            throw new Error('Using curated data');
            
        } catch (error) {
            // Show curated datasets as fallback
            loadingState.style.display = 'none';
            errorState.style.display = 'block';
            errorState.querySelector('.error-message').textContent = 'Using curated NASA datasets (API not available in static HTML)';
            
            allDatasets = curatedDatasets;
            filteredDatasets = [...allDatasets];
            displayDatasets();
        }
    }
    
    // Display datasets
    function displayDatasets() {
        datasetsGrid.innerHTML = '';
        
        if (filteredDatasets.length === 0) {
            datasetsGrid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No datasets found matching your search.</p>';
            datasetCount.textContent = '0';
            return;
        }
        
        datasetCount.textContent = filteredDatasets.length;
        
        filteredDatasets.forEach(dataset => {
            const card = document.createElement('div');
            card.className = 'dataset-card';
            
            card.innerHTML = `
                <div class="dataset-header">${dataset.accession}</div>
                <h3 class="dataset-title">${dataset.title}</h3>
                <p class="dataset-description">${dataset.description}</p>
                <div class="dataset-badges">
                    <span class="relevance-badge">Relevance: ${dataset.relevance}</span>
                    <span class="category-badge">${dataset.category}</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                // Open NASA OSDR portal for this dataset
                window.open(`https://osdr.nasa.gov/bio/repo/search?q=${dataset.accession}`, '_blank');
            });
            
            datasetsGrid.appendChild(card);
        });
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            filteredDatasets = allDatasets.filter(dataset => {
                return dataset.title.toLowerCase().includes(searchTerm) ||
                       dataset.description.toLowerCase().includes(searchTerm) ||
                       dataset.accession.toLowerCase().includes(searchTerm) ||
                       dataset.category.toLowerCase().includes(searchTerm);
            });
            
            displayDatasets();
        });
    }
    
    // Refresh button
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            searchInput.value = '';
            fetchDatasets();
        });
    }
    
    // Initial load
    fetchDatasets();
});
