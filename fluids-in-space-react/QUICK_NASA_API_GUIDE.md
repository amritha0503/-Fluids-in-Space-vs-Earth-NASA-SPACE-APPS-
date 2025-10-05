# Quick Start: NASA OSDR API

## What Was Added

✅ **NASA OSDR API Service** - Full integration with NASA's Open Science Data Repository
✅ **Data Browser Component** - Interactive UI to browse NASA experiments
✅ **Real-time Data Fetching** - Live access to hundreds of space experiments
✅ **File Downloads** - Direct download of NASA experimental data

## Where to Find It

### In the App
1. Start the app: `npm start`
2. Click **"Learn More"** in the navigation
3. Scroll to **"Browse NASA's Open Science Data Repository"**
4. Start exploring real NASA experiments!

### In the Code
- **API Service**: `src/services/nasaOSDRService.js`
- **Browser Component**: `src/components/NASADataBrowser.js`
- **Styling**: `src/components/NASADataBrowser.css`
- **Integration**: `src/pages/LearnMore.js` (imported and rendered)

## How to Use

### Search for Experiments
```
Type keywords in search bar:
- "fluid"
- "microgravity"
- "colloid"
- "marangoni"
- "capillary"
```

### View Dataset Details
1. Click on any dataset card
2. View complete metadata
3. See associated files
4. Click download icon to get data

### Download Data
- Click 📥 icon next to any file
- File downloads directly from NASA servers
- Supports CSV, Excel, images, reports, and more

## Example Use Cases

### For Students
1. **Search** for "fluid behavior" experiments
2. **View** real ISS experimental data
3. **Download** CSV files for analysis
4. **Compare** with simulation results

### For Educators
1. **Browse** space experiments by topic
2. **Download** datasets for classroom projects
3. **Show** real NASA mission data to students
4. **Integrate** with lesson plans

### For Researchers
1. **Search** specific experiment types
2. **Access** raw and processed data
3. **Download** analysis results
4. **Reference** NASA studies

## API Features

### What You Can Access
- ✅ 100+ space experiment datasets
- ✅ Complete metadata for each experiment
- ✅ Mission information
- ✅ File listings with direct downloads
- ✅ Sample descriptions and characteristics
- ✅ Study protocols and methods

### Search Capabilities
- Search by keyword
- Filter by accession number
- Query specific fields
- Regular expression matching
- Multiple value filtering (OR logic)

### Data Types Available
- **Tabular**: CSV, TSV, Excel
- **Images**: Microscopy, photographs
- **Analysis**: Normalized data, statistics
- **Quality**: MultiQC reports
- **Documents**: Protocols, papers

## Code Example

### Fetch Fluid Experiments
```javascript
import nasaOSDRService from './services/nasaOSDRService';

// Search for fluid-related experiments
const datasets = await nasaOSDRService.getFluidBehaviorDatasets();

// Get specific dataset
const dataset = await nasaOSDRService.getDatasetMetadata('OSD-48');

// Get files
const files = await nasaOSDRService.getDatasetFiles('OSD-48');

// Search by keywords
const results = await nasaOSDRService.searchByKeywords(['capillary', 'surface tension']);
```

### Query with Filters
```javascript
// Find spaceflight experiments
const data = await nasaOSDRService.queryMetadata({
  'study.factor value.spaceflight': '',
  'id.accession': 'OSD-48'
});

// Download specific data type
const csvData = await nasaOSDRService.queryData({
  'id.accession': 'OSD-48',
  'file.data type': 'unnormalized counts',
  format: 'csv'
});
```

## No Configuration Needed!

- ✅ **No API keys required** - Public NASA API
- ✅ **No authentication** - Open access
- ✅ **No rate limits** - Free to use
- ✅ **Already integrated** - Just start using!

## Troubleshooting

### Datasets Not Loading?
1. Check internet connection
2. Open browser console (F12)
3. Look for error messages
4. Try refreshing the page

### Download Not Working?
1. Verify the file URL in console
2. Try opening the file link directly
3. Check browser download permissions
4. Clear browser cache

### Search Not Finding Results?
1. Try broader keywords
2. Check spelling
3. Use the "Retry" button
4. Refresh the browser

## Resources

- **NASA OSDR**: https://osdr.nasa.gov/
- **API Docs**: https://visualization.osdr.nasa.gov/biodata/api/
- **Full Guide**: See `NASA_API_INTEGRATION.md`

## Next Steps

1. ✅ API is integrated and working
2. ✅ Data browser is live on Learn More page
3. ✅ Start exploring NASA experiments!
4. 📊 Download data for your projects
5. 🎓 Use in classroom or research

## Summary

**You now have live access to NASA's space experiment database directly in your app!** 🚀

No setup required - just navigate to the Learn More page and start exploring real NASA data!
