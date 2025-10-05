/**
 * NASA OSDR (Open Science Data Repository) API Service
 * 
 * This service provides access to NASA's biological and physical science data
 * from space experiments, including microgravity fluid behavior studies.
 * 
 * API Documentation: https://visualization.osdr.nasa.gov/biodata/api/
 */

import axios from 'axios';

const BASE_URL = 'https://visualization.osdr.nasa.gov/biodata/api/v2';

/**
 * NASA OSDR API Service
 */
class NASAOSDRService {
  constructor() {
    this.baseURL = BASE_URL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get all available datasets
   * @param {string} format - Output format (json, csv, browser)
   * @returns {Promise} List of all datasets
   */
  async getAllDatasets(format = 'json') {
    try {
      const response = await this.axiosInstance.get('/datasets/', {
        params: { format },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching datasets:', error);
      throw error;
    }
  }

  /**
   * Get metadata for a specific dataset
   * @param {string} accessionNumber - Dataset accession number (e.g., "OSD-48")
   * @param {string} format - Output format
   * @returns {Promise} Dataset metadata
   */
  async getDatasetMetadata(accessionNumber, format = 'json') {
    try {
      const response = await this.axiosInstance.get(`/dataset/${accessionNumber}/`, {
        params: { format },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching dataset ${accessionNumber}:`, error);
      throw error;
    }
  }

  /**
   * Get assays for a specific dataset
   * @param {string} accessionNumber - Dataset accession number
   * @param {string} format - Output format
   * @returns {Promise} List of assays
   */
  async getDatasetAssays(accessionNumber, format = 'json') {
    try {
      const response = await this.axiosInstance.get(`/dataset/${accessionNumber}/assays/`, {
        params: { format },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching assays for ${accessionNumber}:`, error);
      throw error;
    }
  }

  /**
   * Get files associated with a dataset
   * @param {string} accessionNumber - Dataset accession number
   * @param {string} format - Output format
   * @returns {Promise} List of files with download URLs
   */
  async getDatasetFiles(accessionNumber, format = 'json') {
    try {
      const response = await this.axiosInstance.get(`/dataset/${accessionNumber}/files/`, {
        params: { format },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching files for ${accessionNumber}:`, error);
      throw error;
    }
  }

  /**
   * Query metadata with filters
   * @param {Object} filters - Query filters
   * @param {string} format - Output format
   * @returns {Promise} Filtered metadata
   * 
   * Example filters:
   * {
   *   'id.accession': 'OSD-48',
   *   'study.characteristics.organism': 'Saccharomyces',
   *   'study.factor value.spaceflight': null, // Will match any value
   * }
   */
  async queryMetadata(filters = {}, format = 'json') {
    try {
      const params = { ...filters, format };
      const response = await this.axiosInstance.get('/query/metadata/', { params });
      return response.data;
    } catch (error) {
      console.error('Error querying metadata:', error);
      throw error;
    }
  }

  /**
   * Query data with filters
   * @param {Object} filters - Query filters including file.data type
   * @param {string} format - Output format
   * @returns {Promise} Data matching the query
   */
  async queryData(filters = {}, format = 'json') {
    try {
      const params = { ...filters, format };
      const response = await this.axiosInstance.get('/query/data/', { params });
      return response.data;
    } catch (error) {
      console.error('Error querying data:', error);
      throw error;
    }
  }

  /**
   * Search for microgravity fluid behavior experiments
   * @returns {Promise} Relevant datasets for fluid studies
   */
  async getFluidBehaviorDatasets() {
    try {
      // Query for datasets related to fluid dynamics, capillary action, and microgravity
      const response = await this.queryMetadata({
        'study.factor value.spaceflight': '',
        format: 'json',
      });
      
      // Filter for relevant experiments
      if (response && Array.isArray(response)) {
        return response.filter(dataset => {
          const title = dataset?.investigation?.title?.toLowerCase() || '';
          const description = dataset?.study?.description?.toLowerCase() || '';
          const keywords = ['fluid', 'capillary', 'surface tension', 'microgravity', 
                          'colloid', 'marangoni', 'convection', 'droplet'];
          
          return keywords.some(keyword => 
            title.includes(keyword) || description.includes(keyword)
          );
        });
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching fluid behavior datasets:', error);
      return [];
    }
  }

  /**
   * Get Physical Science Informatics (PSI) datasets
   * Physical sciences are more relevant for fluid mechanics than biological sciences
   * @returns {Promise} PSI-related datasets
   */
  async getPhysicalScienceDatasets() {
    try {
      const allDatasets = await this.getAllDatasets();
      
      // Filter for physical science experiments
      if (allDatasets && Array.isArray(allDatasets)) {
        return allDatasets.filter(dataset => {
          const accession = dataset?.accession || '';
          const title = dataset?.title?.toLowerCase() || '';
          
          // Look for PSI datasets or physical science keywords
          return accession.startsWith('PSI') || 
                 title.includes('physical') ||
                 title.includes('fluid') ||
                 title.includes('material');
        });
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching physical science datasets:', error);
      return [];
    }
  }

  /**
   * Get mission metadata for all datasets
   * @returns {Promise} Mission information
   */
  async getAllMissionMetadata() {
    try {
      const response = await this.axiosInstance.get('/dataset/*/metadata/mission/', {
        params: { format: 'json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching mission metadata:', error);
      throw error;
    }
  }

  /**
   * Download a specific data file
   * @param {string} fileUrl - Direct URL to the file
   * @returns {Promise} File data
   */
  async downloadFile(fileUrl) {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }

  /**
   * Get data schema for a query
   * @param {Object} filters - Query filters
   * @returns {Promise} Schema information
   */
  async getDataSchema(filters) {
    try {
      const params = { ...filters, schema: true, format: 'json' };
      const response = await this.axiosInstance.get('/query/data/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching data schema:', error);
      throw error;
    }
  }

  /**
   * Search for specific experiments by keywords
   * @param {Array<string>} keywords - Search keywords
   * @returns {Promise} Matching datasets
   */
  async searchByKeywords(keywords = []) {
    try {
      const allDatasets = await this.getAllDatasets();
      
      if (!allDatasets || !Array.isArray(allDatasets)) {
        return [];
      }

      return allDatasets.filter(dataset => {
        const title = (dataset?.title || '').toLowerCase();
        const description = (dataset?.description || '').toLowerCase();
        const searchText = `${title} ${description}`;

        return keywords.some(keyword => 
          searchText.includes(keyword.toLowerCase())
        );
      });
    } catch (error) {
      console.error('Error searching by keywords:', error);
      return [];
    }
  }

  /**
   * Get sample data for a specific dataset
   * @param {string} accessionNumber - Dataset accession number
   * @param {string} assayName - Assay name (use '*' for all)
   * @param {string} sampleName - Sample name (use '*' for all)
   * @returns {Promise} Sample metadata
   */
  async getSampleMetadata(accessionNumber, assayName = '*', sampleName = '*') {
    try {
      const encodedAssay = encodeURIComponent(assayName);
      const encodedSample = encodeURIComponent(sampleName);
      
      const response = await this.axiosInstance.get(
        `/dataset/${accessionNumber}/assay/${encodedAssay}/sample/${encodedSample}/`,
        { params: { format: 'json' } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching sample metadata:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const nasaOSDRService = new NASAOSDRService();

export default nasaOSDRService;
