# NASA OSDR API Integration Guide

## Overview

This application now integrates with **NASA's Open Science Data Repository (OSDR) API**, providing real-time access to experimental data from space missions, including microgravity fluid behavior studies.

## What is NASA OSDR?

The NASA Open Science Data Repository is NASA's comprehensive database of biological and physical science research conducted in space, particularly on the International Space Station (ISS).

**API Documentation**: https://visualization.osdr.nasa.gov/biodata/api/

## Features Integrated

### 1. **Real NASA Dataset Browsing**
- Browse hundreds of real NASA space experiments
- Search by keywords, accession numbers, or descriptions
- Filter datasets relevant to fluid mechanics, microgravity, and physical sciences

### 2. **Dataset Details**
- View comprehensive metadata for each experiment
- Access mission information, study descriptions, and characteristics
- See associated data files with direct download links

### 3. **File Downloads**
- Download raw data files directly from NASA servers
- Access various data types: CSV, Excel, images, videos, analysis reports
- Get MultiQC reports, normalized counts, and differential expression data

### 4. **Smart Search**
- Automatically filter for fluid-related experiments
- Search keywords: fluid, capillary, surface tension, microgravity, colloid, marangoni, convection, droplet

## How to Use the NASA Data Browser

### In the Application

1. **Navigate to Learn More Page**
   - Open the app at http://localhost:3000
   - Click "Learn More" in the navigation

2. **Scroll to "Browse NASA's Open Science Data Repository"**
   - You'll see the interactive data browser

3. **Search and Explore**
   - Use the search bar to find specific experiments
   - Click on any dataset card to view details
   - Browse associated files and download data

4. **Download Data**
   - Click the download icon next to any file
   - Files are downloaded directly from NASA servers

### Dataset Examples

The API provides access to datasets like:
- **OSD-48**: Mouse liver studies in microgravity
- **OSD-239**: RNA sequencing data from space experiments
- **PSI datasets**: Physical Science Informatics experiments
- Fluid dynamics experiments
- Colloid and material science studies

## Technical Implementation

### Service Layer: `nasaOSDRService.js`

Located at: `src/services/nasaOSDRService.js`

**Key Methods:**

```javascript
// Get all datasets
await nasaOSDRService.getAllDatasets();

// Get specific dataset metadata
await nasaOSDRService.getDatasetMetadata('OSD-48');

// Get dataset files
await nasaOSDRService.getDatasetFiles('OSD-48');

// Query with filters
await nasaOSDRService.queryMetadata({
  'id.accession': 'OSD-48',
  'study.factor value.spaceflight': null
});

// Search by keywords
await nasaOSDRService.searchByKeywords(['fluid', 'microgravity']);

// Get fluid behavior datasets
await nasaOSDRService.getFluidBehaviorDatasets();

// Download files
await nasaOSDRService.downloadFile(fileUrl, fileName);
```

### Component: `NASADataBrowser.js`

Located at: `src/components/NASADataBrowser.js`

**Features:**
- Real-time data fetching from NASA API
- Interactive search with instant filtering
- Two-panel layout: dataset list + details view
- File browsing with direct downloads
- Responsive design for mobile and desktop
- Loading states and error handling

## API Endpoints Used

### REST Interface

```
GET /v2/datasets/
    → List all available datasets

GET /v2/dataset/{accession}/
    → Get metadata for specific dataset

GET /v2/dataset/{accession}/files/
    → Get files associated with dataset

GET /v2/dataset/{accession}/assays/
    → Get assays for dataset
```

### Query Interface

```
GET /v2/query/metadata/
    → Query and filter sample-level metadata

GET /v2/query/data/
    → Query and download actual data

GET /v2/query/assays/
    → Query assay-grouped metadata
```

### Query Parameters

**Filter by field:**
```
?study.characteristics.organism=Saccharomyces
```

**Include field (any value):**
```
?study.factor value.spaceflight
```

**Require non-null:**
```
?=study.parameter value.growth temperature
```

**Not equal to:**
```
?study.characteristics.strain!=S288C
```

**Multiple values (OR):**
```
?id.accession=OSD-48|OSD-49
```

**Regular expression:**
```
?study.characteristics.organism=/Saccharomyces/
```

**Output formats:**
```
?format=json    (default for REST)
?format=csv     (default for query)
?format=browser (interactive HTML)
?format=raw     (original file)
```

## Data Types Available

### Metadata
- Investigation details
- Study descriptions and characteristics
- Mission information
- Sample annotations
- Experimental parameters

### Data Files
- **Tabular**: CSV, TSV, Excel spreadsheets
- **Analysis**: Normalized counts, differential expression, PCA
- **Quality**: MultiQC reports
- **Raw**: Original experimental data
- **Images**: Microscopy, photographs
- **Documents**: Protocols, reports

## Integration with Your App

### Current Integration Points

1. **Learn More Page** (`src/pages/LearnMore.js`)
   - Embedded NASADataBrowser component
   - Positioned after datasets section
   - Provides direct access to NASA data

2. **Service Layer** (`src/services/nasaOSDRService.js`)
   - Centralized API communication
   - Axios-based HTTP client
   - Error handling and data formatting

3. **Styling** (`src/components/NASADataBrowser.css`)
   - NASA-themed design
   - Responsive layout
   - Interactive elements

### Future Enhancement Ideas

1. **Data Visualization**
   - Parse CSV data from NASA
   - Display charts using Recharts
   - Compare multiple datasets

2. **Advanced Filters**
   - Filter by mission (ISS, Space Shuttle, etc.)
   - Filter by experiment type
   - Date range filtering

3. **Data Integration**
   - Load NASA data into your simulations
   - Use real experimental parameters
   - Compare simulation vs actual data

4. **Saved Datasets**
   - Bookmark favorite experiments
   - Export dataset information
   - Create collections

## Example API Calls

### Get Fluid-Related Experiments

```javascript
const datasets = await nasaOSDRService.queryMetadata({
  'study.factor value.spaceflight': '',
  format: 'json'
});

// Filter for fluid keywords
const fluidExperiments = datasets.filter(d => {
  const text = (d.investigation?.title + d.study?.description).toLowerCase();
  return text.includes('fluid') || text.includes('capillary');
});
```

### Download RNA-Seq Data

```javascript
const data = await nasaOSDRService.queryData({
  'id.accession': 'OSD-48',
  'file.data type': 'unnormalized counts',
  format: 'csv'
});
```

### Get Mission Information

```javascript
const missions = await nasaOSDRService.getAllMissionMetadata();
```

## API Rate Limits

- **No authentication required** - Public API
- **No rate limits** documented
- **Best practices**:
  - Cache responses when possible
  - Implement debouncing for search
  - Handle errors gracefully

## Troubleshooting

### Dataset Not Loading

**Issue**: Datasets don't appear in browser

**Solutions**:
- Check internet connection
- Verify API endpoint is accessible
- Check browser console for errors
- Try refreshing the page

### Download Fails

**Issue**: File download doesn't start

**Solutions**:
- Check file URL is valid
- Verify file still exists on NASA servers
- Check browser download settings
- Try opening link directly in browser

### Search Not Working

**Issue**: Search doesn't filter results

**Solutions**:
- Clear search bar and try again
- Check for typos in search terms
- Try broader keywords
- Refresh dataset list

## Resources

- **NASA OSDR Portal**: https://osdr.nasa.gov/
- **API Documentation**: https://visualization.osdr.nasa.gov/biodata/api/
- **Physical Sciences**: https://psi.nasa.gov/
- **GeneLab**: https://genelab.nasa.gov/

## Support

For API-related issues:
- **NASA OSDR Help**: https://www.nasa.gov/osdr-help-contact-us/
- **Email**: genelab-outreach@lists.nasa.gov

For app-related issues:
- Check browser console for errors
- Review `src/services/nasaOSDRService.js`
- Check network tab for failed requests

## What's Next?

1. **Run the app**: `npm start`
2. **Navigate to Learn More page**
3. **Explore NASA's real space experiments**
4. **Download actual experimental data**
5. **Use the data in your research or projects**

Enjoy exploring NASA's incredible collection of space science data! 🚀
