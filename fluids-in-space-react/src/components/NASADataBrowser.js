import React, { useState, useEffect } from 'react';
import { Search, Download, Database, Loader, AlertCircle, ExternalLink, Filter } from 'lucide-react';
import focusedNASAService from '../services/focusedNASAService';
import './NASADataBrowser.css';

const NASADataBrowser = () => {
  const [datasets, setDatasets] = useState([]);
  const [filteredDatasets, setFilteredDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [datasetDetails, setDatasetDetails] = useState(null);
  const [datasetFiles, setDatasetFiles] = useState([]);
  const [filterInfo, setFilterInfo] = useState('');

  useEffect(() => {
    fetchFluidDatasets();
  }, []);

  useEffect(() => {
    filterDatasets();
  }, [searchTerm, datasets]);

  const fetchFluidDatasets = async () => {
    setLoading(true);
    setError(null);
    setFilterInfo('🔍 Filtering for fluid mechanics & microgravity experiments only...');
    
    try {
      // Fetch ONLY relevant fluid datasets
      const fluidData = await focusedNASAService.getRelevantFluidDatasets();
      
      if (fluidData && fluidData.length > 0) {
        setDatasets(fluidData);
        setFilterInfo(`✅ Showing ${fluidData.length} relevant fluid mechanics datasets`);
      } else {
        setFilterInfo('ℹ️ Showing curated NASA resources for fluid studies');
        setDatasets(fluidData); // Will show fallback datasets
      }
    } catch (err) {
      console.error('Error fetching datasets:', err);
      console.error('Error details:', err.message);
      
      // Check if it's a CORS error
      if (err.message && err.message.includes('Network Error')) {
        setError('⚠️ Browser CORS Restriction: Direct API access requires a backend server. Use the NASA portal links below to access real data.');
        setFilterInfo('ℹ️ Showing curated resources as fallback');
      } else {
        setError('ℹ️ Showing curated NASA resources for your fluid mechanics project.');
        setFilterInfo('');
      }
      
      // Get curated fallback datasets
      const fallbackData = focusedNASAService.getFallbackRelevantDatasets();
      setDatasets(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const filterDatasets = async () => {
    if (!searchTerm.trim()) {
      setFilteredDatasets(datasets);
      return;
    }

    // Use focused search
    try {
      const results = await focusedNASAService.searchFluidData(searchTerm);
      setFilteredDatasets(results);
      setFilterInfo(`🔍 Found ${results.length} results matching "${searchTerm}"`);
    } catch (err) {
      // Fallback to local filtering
      const term = searchTerm.toLowerCase();
      const filtered = datasets.filter(dataset => {
        const title = (dataset?.title || '').toLowerCase();
        const description = (dataset?.description || '').toLowerCase();
        const accession = (dataset?.accession || '').toLowerCase();
        
        return title.includes(term) || 
               description.includes(term) || 
               accession.includes(term);
      });
      
      setFilteredDatasets(filtered);
      setFilterInfo(`🔍 Found ${filtered.length} results`);
    }
  };

  const handleDatasetClick = async (dataset) => {
    setSelectedDataset(dataset);
    setDatasetDetails(null);
    setDatasetFiles([]);
    
    // Skip fetching for guide/info cards
    const skipAccessions = ['INFO', 'TIP-1', 'TIP-2', 'DATA-1', 'PSI-INFO', 'GUIDE-1', 'GUIDE-2'];
    if (!dataset.accession || skipAccessions.includes(dataset.accession)) {
      return;
    }

    try {
      // Fetch detailed metadata using focused service
      const details = await focusedNASAService.getDatasetDetails(dataset.accession);
      setDatasetDetails(details);

      // Fetch associated files
      const files = await focusedNASAService.getDatasetFiles(dataset.accession);
      setDatasetFiles(Array.isArray(files) ? files : []);
    } catch (err) {
      console.error('Error fetching dataset details:', err);
    }
  };

  const handleDownloadFile = async (fileUrl, fileName) => {
    try {
      // Try direct download via opening in new tab (avoids CORS for downloads)
      window.open(fileUrl, '_blank');
    } catch (err) {
      console.error('Error downloading file:', err);
      alert('Unable to download. Please right-click the link and select "Save As"');
    }
  };

  const handleRefresh = () => {
    focusedNASAService.clearCache();
    fetchFluidDatasets();
  };

  const renderDatasetCard = (dataset, index) => {
    const isSelected = selectedDataset?.accession === dataset.accession;
    
    return (
      <div
        key={dataset.accession || index}
        className={`dataset-card ${isSelected ? 'selected' : ''}`}
        onClick={() => handleDatasetClick(dataset)}
      >
        <div className="dataset-header">
          <Database size={20} />
          <span className="dataset-accession">{dataset.accession}</span>
        </div>
        
        <h3 className="dataset-title">{dataset.title || 'Untitled Dataset'}</h3>
        
        {dataset.description && (
          <p className="dataset-description">
            {dataset.description.length > 150
              ? `${dataset.description.substring(0, 150)}...`
              : dataset.description}
          </p>
        )}
        
        <div className="dataset-mission">
          {dataset.mission && (
            <span className="mission-badge">{dataset.mission}</span>
          )}
          {dataset.category && (
            <span className="category-badge">{dataset.category}</span>
          )}
          {dataset.relevance === 'high' && (
            <span className="relevance-badge">⭐ High Relevance</span>
          )}
        </div>
      </div>
    );
  };

  const renderDatasetDetails = () => {
    if (!selectedDataset) {
      return (
        <div className="details-placeholder">
          <Database size={64} />
          <p>Select a dataset to view details</p>
        </div>
      );
    }

    return (
      <div className="dataset-details">
        <div className="details-header">
          <h2>{selectedDataset.title}</h2>
          <span className="accession-badge">{selectedDataset.accession}</span>
        </div>

        {datasetDetails && (
          <div className="details-content">
            {datasetDetails.investigation && (
              <div className="details-section">
                <h3>Investigation</h3>
                <p><strong>Title:</strong> {datasetDetails.investigation.title}</p>
                {datasetDetails.investigation.description && (
                  <p><strong>Description:</strong> {datasetDetails.investigation.description}</p>
                )}
              </div>
            )}

            {datasetDetails.study && (
              <div className="details-section">
                <h3>Study Information</h3>
                {datasetDetails.study.description && (
                  <p>{datasetDetails.study.description}</p>
                )}
                
                {datasetDetails.study.characteristics && (
                  <div className="characteristics">
                    <strong>Characteristics:</strong>
                    <ul>
                      {Object.entries(datasetDetails.study.characteristics).map(([key, value]) => (
                        <li key={key}>
                          <span className="char-key">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {datasetFiles.length > 0 && (
          <div className="details-section">
            <h3>Available Files ({datasetFiles.length})</h3>
            <div className="files-list">
              {datasetFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <div className="file-info">
                    <span className="file-name">{file.name || file['file name']}</span>
                    {file['data type'] && (
                      <span className="file-type">{file['data type']}</span>
                    )}
                  </div>
                  
                  {file.url && (
                    <button
                      className="download-btn"
                      onClick={() => handleDownloadFile(file.url, file.name)}
                      title="Download file"
                    >
                      <Download size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="details-actions">
          {selectedDataset.accession && !['Example', 'INFO', 'TIP-1', 'TIP-2'].includes(selectedDataset.accession) ? (
            <a
              href={`https://osdr.nasa.gov/bio/repo/data/studies/${selectedDataset.accession}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-osdr-btn"
            >
              View in NASA OSDR <ExternalLink size={16} />
            </a>
          ) : (
            <>
              <a
                href="https://osdr.nasa.gov/bio/repo/"
                target="_blank"
                rel="noopener noreferrer"
                className="view-osdr-btn"
              >
                Browse NASA OSDR Portal <ExternalLink size={16} />
              </a>
              <a
                href="https://psi.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="view-osdr-btn"
                style={{ marginLeft: '1rem' }}
              >
                Visit PSI Database <ExternalLink size={16} />
              </a>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="nasa-data-browser">
      <div className="browser-header">
        <h2>NASA Open Science Data Repository</h2>
        <p>Browse real experimental data from NASA space missions</p>
      </div>

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search fluid mechanics experiments (e.g., capillary, Marangoni, colloid)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading && <Loader className="search-loader" size={20} />}
        <button onClick={handleRefresh} className="refresh-btn" title="Refresh data">
          ↻
        </button>
      </div>

      {filterInfo && !error && (
        <div className="filter-info">
          <Filter size={16} />
          <span>{filterInfo}</span>
        </div>
      )}

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="browser-content">
        <div className="datasets-list">
          {loading ? (
            <div className="loading-state">
              <Loader className="spinner" size={48} />
              <p>Loading NASA datasets...</p>
            </div>
          ) : filteredDatasets.length === 0 ? (
            <div className="empty-state">
              <Database size={48} />
              <p>No datasets found</p>
              <button onClick={fetchFluidDatasets} className="retry-btn">
                Retry
              </button>
            </div>
          ) : (
            filteredDatasets.map(renderDatasetCard)
          )}
        </div>

        <div className="dataset-details-panel">
          {renderDatasetDetails()}
        </div>
      </div>
    </div>
  );
};

export default NASADataBrowser;
