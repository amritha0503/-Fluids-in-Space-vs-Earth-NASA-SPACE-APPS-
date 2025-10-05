/**
 * Focused NASA Physical Sciences Data Fetcher
 * 
 * This service fetches ONLY the data relevant to fluid mechanics,
 * microgravity, and physical sciences experiments from NASA.
 * 
 * Filters applied:
 * - Physical sciences experiments only
 * - Fluid dynamics related studies
 * - Microgravity conditions
 * - Relevant to educational demonstration
 */

import axios from 'axios';

const BASE_URL = 'https://visualization.osdr.nasa.gov/biodata/api/v2';

// Specific keywords for YOUR project
const FLUID_KEYWORDS = [
  'fluid',
  'capillary',
  'surface tension',
  'marangoni',
  'colloid',
  'microgravity',
  'droplet',
  'wetting',
  'convection',
  'interface',
  'bubble',
  'foam',
  'liquid',
  'viscosity'
];

// Physical Science dataset prefixes
const PHYSICAL_SCIENCE_PREFIXES = ['PSI', 'FLU', 'PHY', 'MAT'];

class FocusedNASADataService {
  constructor() {
    this.baseURL = BASE_URL;
    this.cache = {
      datasets: null,
      timestamp: null,
      ttl: 1000 * 60 * 60 // 1 hour cache
    };
  }

  /**
   * Check if keyword matches fluid mechanics topics
   */
  isRelevantToFluidStudy(text) {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return FLUID_KEYWORDS.some(keyword => lowerText.includes(keyword));
  }

  /**
   * Check if dataset is Physical Sciences
   */
  isPhysicalScience(accession) {
    if (!accession) return false;
    return PHYSICAL_SCIENCE_PREFIXES.some(prefix => 
      accession.toUpperCase().startsWith(prefix)
    );
  }

  /**
   * Get only fluid mechanics relevant datasets
   * This is optimized to fetch ONLY what your project needs
   */
  async getRelevantFluidDatasets() {
    try {
      // Check cache first
      if (this.cache.datasets && 
          this.cache.timestamp && 
          Date.now() - this.cache.timestamp < this.cache.ttl) {
        console.log('Returning cached fluid datasets');
        return this.cache.datasets;
      }

      console.log('Fetching fluid-relevant datasets from NASA...');

      // Attempt to fetch with specific filters
      const response = await axios.get(`${this.baseURL}/datasets/`, {
        params: {
          format: 'json'
        },
        timeout: 10000
      });

      let datasets = [];

      if (response.data && Array.isArray(response.data)) {
        // Filter for ONLY relevant datasets
        datasets = response.data.filter(dataset => {
          const accession = dataset?.accession || '';
          const title = dataset?.title || '';
          const description = dataset?.description || '';
          
          // Must be physical science OR contain fluid keywords
          const isPhysical = this.isPhysicalScience(accession);
          const hasFluidKeywords = this.isRelevantToFluidStudy(title) || 
                                   this.isRelevantToFluidStudy(description);
          
          return isPhysical || hasFluidKeywords;
        });

        // Sort by relevance (PSI first, then others)
        datasets.sort((a, b) => {
          const aIsPSI = (a.accession || '').startsWith('PSI');
          const bIsPSI = (b.accession || '').startsWith('PSI');
          if (aIsPSI && !bIsPSI) return -1;
          if (!aIsPSI && bIsPSI) return 1;
          return 0;
        });

        console.log(`Found ${datasets.length} relevant fluid datasets`);
      }

      // Cache the results
      this.cache.datasets = datasets;
      this.cache.timestamp = Date.now();

      return datasets;

    } catch (error) {
      console.error('Error fetching NASA data:', error);
      
      // Return curated list of known relevant datasets
      return this.getFallbackRelevantDatasets();
    }
  }

  /**
   * Fallback: Known relevant datasets for fluid mechanics
   */
  getFallbackRelevantDatasets() {
    return [
      {
        accession: 'PSI-INFO',
        title: '🔬 Physical Sciences Informatics Database',
        description: 'NASA\'s PSI database contains extensive data on fluid behavior, Marangoni convection, capillary flow, and colloid experiments conducted in microgravity. Access the full database at psi.nasa.gov.',
        category: 'Physical Sciences',
        relevance: 'high'
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
        title: '💾 Available Data Types',
        description: 'NASA provides: CSV data files (numerical measurements), images/videos (experimental observations), protocol documents (methodology), and analysis results. Download what matches your project needs.',
        category: 'Data Info',
        relevance: 'medium'
      }
    ];
  }

  /**
   * Get specific dataset metadata (if user clicks on one)
   */
  async getDatasetDetails(accessionNumber) {
    try {
      const response = await axios.get(
        `${this.baseURL}/dataset/${accessionNumber}/`,
        {
          params: { format: 'json' },
          timeout: 10000
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching dataset ${accessionNumber}:`, error);
      return null;
    }
  }

  /**
   * Get files for a specific dataset
   */
  async getDatasetFiles(accessionNumber) {
    try {
      const response = await axios.get(
        `${this.baseURL}/dataset/${accessionNumber}/files/`,
        {
          params: { format: 'json' },
          timeout: 10000
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching files for ${accessionNumber}:`, error);
      return [];
    }
  }

  /**
   * Search with user's custom query
   */
  async searchFluidData(searchTerm) {
    try {
      const allData = await this.getRelevantFluidDatasets();
      
      if (!searchTerm || !searchTerm.trim()) {
        return allData;
      }

      const term = searchTerm.toLowerCase();
      return allData.filter(dataset => {
        const title = (dataset.title || '').toLowerCase();
        const description = (dataset.description || '').toLowerCase();
        const accession = (dataset.accession || '').toLowerCase();
        
        return title.includes(term) || 
               description.includes(term) || 
               accession.includes(term);
      });
    } catch (error) {
      console.error('Error searching:', error);
      return this.getFallbackRelevantDatasets();
    }
  }

  /**
   * Clear cache (useful for refresh)
   */
  clearCache() {
    this.cache.datasets = null;
    this.cache.timestamp = null;
  }
}

// Export singleton instance
const focusedNASADataService = new FocusedNASADataService();
export default focusedNASADataService;
