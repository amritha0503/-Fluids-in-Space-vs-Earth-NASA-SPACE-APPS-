# 📊 NASA Dataset Integration Guide

## Step-by-Step Instructions

### 1. Download NASA PSI Datasets

**Visit NASA's Physical Sciences Informatics Portal:**
- URL: https://psi.nasa.gov/

**Recommended Datasets:**

#### A. **Colloid Experiments**
- Search for: "colloid self-assembly" or "colloidal crystal"
- Look for experiments like:
  - ISS experiments on colloidal suspensions
  - Particle tracking data
  - Should include: time, particle positions (x, y, z), temperature

#### B. **Marangoni Convection**
- Search for: "Marangoni convection" or "thermocapillary flow"
- Look for experiments with:
  - Temperature measurements
  - Surface tension data
  - Flow velocity (if available)

#### C. **Capillary Flow**
- Search for: "capillary flow" or "wetting phenomena"
- Look for data with:
  - Fluid height measurements
  - Contact angles
  - Different gravity levels

### 2. Place Raw Dataset Files

**Save downloaded CSV files to:**
```
fluids-in-space-react/preprocessing/raw_data/
```

**Naming convention (recommended):**
```
raw_data/
├── colloid_raw.csv
├── marangoni_raw.csv
├── capillary_raw.csv
└── any_other_experiment_name.csv
```

### 3. Preprocess the Data

**Open PowerShell/Terminal and navigate to the project:**

```powershell
cd "c:\Users\Amritha\Desktop\NASA\fluids-in-space-react\preprocessing"
```

**Install Python dependencies (if not already installed):**
```powershell
pip install pandas numpy
```

**Run preprocessing for each dataset type:**

#### Colloid Data:
```powershell
python preprocess_nasa_data.py `
  --input raw_data/colloid_raw.csv `
  --output ../src/data/colloid_processed.json `
  --type colloid
```

#### Marangoni Data:
```powershell
python preprocess_nasa_data.py `
  --input raw_data/marangoni_raw.csv `
  --output ../src/data/marangoni_processed.json `
  --type marangoni
```

#### Capillary Data:
```powershell
python preprocess_nasa_data.py `
  --input raw_data/capillary_raw.csv `
  --output ../src/data/capillary_processed.json `
  --type capillary
```

### 4. Import Processed Data in React

**Option A: Static Import (for small datasets)**

Edit `src/components/DatasetViewer.js`:

```javascript
import colloidData from '../data/colloid_processed.json';
import marangoniData from '../data/marangoni_processed.json';
import capillaryData from '../data/capillary_processed.json';

// Use in component:
const data = datasetId === 'colloid' ? colloidData.data : 
             datasetId === 'marangoni' ? marangoniData.data : 
             capillaryData.data;
```

**Option B: Dynamic Import (for large datasets)**

Edit `src/components/DatasetViewer.js`:

```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      const response = await import(`../data/${datasetId}_processed.json`);
      setData(response.data);
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to generated sample data
      setData(generateSampleData(datasetId));
    }
  };
  
  loadData();
}, [datasetId]);
```

### 5. Expected CSV Format

#### Colloid Dataset Format:
```csv
time,particle_id,x,y,z,temperature
0.0,1,10.5,20.3,15.2,25.0
0.1,1,10.6,20.4,15.3,25.0
0.0,2,15.2,18.7,12.1,25.0
0.1,2,15.3,18.8,12.2,25.0
...
```

#### Marangoni Dataset Format:
```csv
time,temperature,surface_tension,flow_velocity
0.0,20.0,72.8,0.0
0.1,21.5,72.5,0.5
0.2,23.0,72.2,1.2
...
```

#### Capillary Dataset Format:
```csv
time,height,contact_angle,gravity_level
0.0,0.0,45.0,1.0
0.1,2.5,45.2,1.0
0.2,4.8,45.5,1.0
...
```

### 6. Troubleshooting

#### If CSV has different column names:

**Edit `preprocessing/preprocess_nasa_data.py`** and modify the column mapping:

```python
# Example: If NASA data uses 'temp' instead of 'temperature'
df.rename(columns={
    'temp': 'temperature',
    'pos_x': 'x',
    'pos_y': 'y'
}, inplace=True)
```

#### If dataset is too large:

Increase the sample rate in preprocessing:

```python
preprocess_colloid_data(input_file, output_file, sample_rate=50)
# Will keep every 50th data point instead of every 10th
```

### 7. Verify Integration

**Start the React app:**
```powershell
cd "c:\Users\Amritha\Desktop\NASA\fluids-in-space-react"
npm start
```

**Navigate to:**
- http://localhost:3000/learn-more
- Click on a dataset card to view visualizations
- Check browser console for any errors

### 8. Alternative: Using NASA API (Future Enhancement)

If NASA provides an API endpoint, you can fetch data dynamically:

```javascript
// src/utils/nasaAPI.js
export const fetchNASAData = async (experimentId) => {
  const response = await axios.get(
    `https://psi.nasa.gov/api/data/${experimentId}`
  );
  return response.data;
};
```

## 📋 Quick Reference

| File Type | Location | Purpose |
|-----------|----------|---------|
| Raw NASA CSV | `preprocessing/raw_data/` | Original downloaded data |
| Processed JSON | `src/data/` | Ready for React import |
| Python Script | `preprocessing/preprocess_nasa_data.py` | Data conversion |
| Sample Data | Generated by script | Testing without real data |

## 🔗 Useful NASA Resources

1. **PSI Portal**: https://psi.nasa.gov/
2. **ISS Research**: https://www.nasa.gov/mission_pages/station/research/
3. **Data Policy**: Check NASA's data usage guidelines
4. **Experiment Database**: https://www.nasa.gov/mission_pages/station/research/experiments/

## 💡 Tips

- Start with one small dataset to test the workflow
- Keep raw data in `raw_data/` folder (add to .gitignore)
- Processed JSON files can be committed to git if small (<1MB)
- Document data source and experiment details in comments
- Consider adding metadata to processed JSON files

## ✅ Checklist

- [ ] Downloaded NASA PSI datasets
- [ ] Placed CSV files in `preprocessing/raw_data/`
- [ ] Installed Python dependencies (pandas, numpy)
- [ ] Ran preprocessing script successfully
- [ ] Verified JSON output in `src/data/`
- [ ] Updated DatasetViewer component to use real data
- [ ] Tested in browser
- [ ] Documented data sources

---

**Need Help?** Check the preprocessing script's error messages or generate sample data first:

```powershell
python preprocess_nasa_data.py --generate-samples --output-dir ../src/data
```
