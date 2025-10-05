# 📊 NASA Dataset Integration Guide

## Where to Put Your NASA Data Files

### 🎯 Quick Answer:

**Raw Data (CSV/Excel)** → `preprocessing/raw_data/`
**Processed Data (JSON)** → `src/data/`

---

## 📁 Directory Structure for Data Files

```
fluids-in-space-react/
│
├── preprocessing/
│   ├── raw_data/                    ← PUT YOUR NASA CSV/EXCEL FILES HERE
│   │   ├── marangoni_experiment_1.csv
│   │   ├── colloid_tracking_data.csv
│   │   ├── capillary_flow_data.xlsx
│   │   └── temperature_measurements.csv
│   │
│   └── preprocess_nasa_data.py      ← SCRIPT TO PROCESS YOUR DATA
│
└── src/
    └── data/                        ← PROCESSED JSON FILES GO HERE
        ├── marangoni_processed.json
        ├── colloid_processed.json
        └── capillary_processed.json
```

---

## 🚀 Step-by-Step: Adding Your Dataset

### Step 1: Get Your NASA Data File

From PSI-119 or any NASA experiment, you might have:
- CSV files with measurements
- Excel spreadsheets
- Tab-delimited text files

**Example filename**: `PSI-119_Marangoni_Swimmer_Data.csv`

### Step 2: Copy to `preprocessing/raw_data/`

**PowerShell Command:**
```powershell
Copy-Item "C:\Users\Amritha\Downloads\your-nasa-data.csv" "C:\Users\Amritha\Desktop\NASA\fluids-in-space-react\preprocessing\raw_data\your-nasa-data.csv"
```

**Or manually:**
1. Open File Explorer
2. Navigate to: `fluids-in-space-react\preprocessing\raw_data\`
3. Drag and drop your CSV file there

---

## 📊 Expected Data Formats

### For Marangoni Experiments (like PSI-119):

**CSV Format:**
```csv
time,temperature,surface_tension,flow_velocity,particle_x,particle_y
0.0,20.0,72.8,0.0,10.5,20.3
0.1,20.5,72.7,0.5,10.7,20.5
0.2,21.0,72.6,1.0,11.0,20.8
0.3,21.5,72.5,1.2,11.4,21.2
```

**Required columns:**
- `time` - Time in seconds
- `temperature` - Temperature in °C
- `surface_tension` - Surface tension in mN/m
- `flow_velocity` - Flow velocity (optional)
- `particle_x`, `particle_y` - Particle positions (optional)

### For Colloid Experiments:

**CSV Format:**
```csv
time,particle_id,x_position,y_position,z_position,temperature
0.0,1,10.5,20.3,15.2,25.0
0.0,2,11.2,21.1,14.8,25.0
0.1,1,10.6,20.4,15.3,25.0
0.1,2,11.3,21.2,14.9,25.0
```

**Required columns:**
- `time` - Time in seconds
- `particle_id` - Unique particle identifier
- `x_position`, `y_position`, `z_position` - Particle coordinates
- `temperature` - Temperature in °C

### For Capillary Flow:

**CSV Format:**
```csv
time,height,contact_angle,gravity_level,fluid_type
0.0,0.0,45.0,1.0,water
0.1,2.5,45.0,1.0,water
0.2,4.8,45.0,1.0,water
0.3,6.9,45.0,1.0,water
```

**Required columns:**
- `time` - Time in seconds
- `height` - Fluid height in mm
- `contact_angle` - Contact angle in degrees
- `gravity_level` - Gravity level (1.0 = Earth, 0.0 = microgravity)

---

## 🔧 Processing Your Data

### Option 1: Use the Preprocessing Script (Recommended)

```bash
cd preprocessing

# For Marangoni data
python preprocess_nasa_data.py --input raw_data/your-marangoni-data.csv --output ../src/data/marangoni_real.json --type marangoni

# For Colloid data
python preprocess_nasa_data.py --input raw_data/your-colloid-data.csv --output ../src/data/colloid_real.json --type colloid

# For Capillary data
python preprocess_nasa_data.py --input raw_data/your-capillary-data.csv --output ../src/data/capillary_real.json --type capillary
```

**What the script does:**
- ✅ Cleans your data
- ✅ Handles missing values
- ✅ Normalizes coordinates
- ✅ Samples large datasets
- ✅ Converts to JSON format
- ✅ Ready for React visualization

### Option 2: Generate Sample Data (for testing)

```bash
cd preprocessing
python preprocess_nasa_data.py --generate-samples --output-dir ../src/data
```

This creates sample datasets to test the app before you have real data.

---

## 📈 Using Your Data in the App

### Automatic Integration

Once processed, the app automatically picks up your data!

**For Dataset Viewer:**
The DatasetViewer component in `src/components/DatasetViewer.js` will automatically load your processed JSON files.

### Manual Integration

**Edit** `src/components/DatasetViewer.js`:

```javascript
import React, { useState, useEffect } from 'react';
import realNasaData from '../data/marangoni_real.json'; // ← YOUR DATA

const DatasetViewer = ({ datasetId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load your real NASA data
    if (datasetId === 'marangoni') {
      setData(realNasaData.data);
    } else {
      // Load sample data for other types
      setData(generateSampleData(datasetId));
    }
  }, [datasetId]);
  
  // ... rest of component
};
```

---

## 🎨 Custom Data Processing

### If your data has different columns:

Create a custom processor:

**File**: `preprocessing/custom_processor.py`

```python
import pandas as pd
import json

# Read your NASA data
df = pd.read_csv('raw_data/your_custom_data.csv')

# Process based on your columns
processed = []
for _, row in df.iterrows():
    processed.append({
        'x': float(row['your_time_column']),
        'y1': float(row['your_measurement_1']),
        'y2': float(row['your_measurement_2']),
        # Add more fields as needed
    })

# Save as JSON
with open('../src/data/your_custom_data.json', 'w') as f:
    json.dump({
        'dataset_type': 'custom',
        'total_points': len(processed),
        'data': processed
    }, f, indent=2)

print(f"✓ Processed {len(processed)} data points!")
```

**Run it:**
```bash
python preprocessing/custom_processor.py
```

---

## 📊 Real Example: PSI-119 Marangoni Data

### If you have PSI-119 experimental data:

**Step 1:** Place your file
```
preprocessing/raw_data/PSI-119_Marangoni_Data.csv
```

**Step 2:** Check the columns
```bash
head preprocessing/raw_data/PSI-119_Marangoni_Data.csv
```

**Step 3:** Process it
```bash
python preprocess_nasa_data.py \
  --input raw_data/PSI-119_Marangoni_Data.csv \
  --output ../src/data/psi119_processed.json \
  --type marangoni
```

**Step 4:** Update the app to show it

Edit `src/pages/LearnMore.js`:

```javascript
const datasets = [
  {
    id: 'psi119',
    name: 'PSI-119 Marangoni Swimmer Real Data',
    description: 'Actual experimental data from NASA PSI-119 experiment',
    parameters: ['Time', 'Temperature', 'Surface Tension', 'Flow Velocity'],
    experiments: 1,
    dataPoints: 5000, // Your actual number
  },
  // ... other datasets
];
```

**Step 5:** Update DatasetViewer

Edit `src/utils/dataGenerator.js`:

```javascript
export const generateSampleData = (datasetId) => {
  if (datasetId === 'psi119') {
    // Load real data
    const realData = require('../data/psi119_processed.json');
    return realData.data;
  }
  
  // ... existing sample data generation
};
```

---

## 🔍 Data Validation

### Check if your data is properly formatted:

```python
import pandas as pd

# Read your CSV
df = pd.read_csv('raw_data/your-data.csv')

# Check columns
print("Columns:", df.columns.tolist())

# Check first few rows
print("\nFirst 5 rows:")
print(df.head())

# Check for missing values
print("\nMissing values:")
print(df.isnull().sum())

# Check data types
print("\nData types:")
print(df.dtypes)
```

---

## 📦 Complete Workflow

```
┌─────────────────────────────────────────┐
│  1. Download NASA Data from PSI         │
│     (CSV, Excel, or text file)          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2. Copy to:                            │
│     preprocessing/raw_data/             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  3. Run preprocessing script:           │
│     python preprocess_nasa_data.py      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  4. JSON file created in:               │
│     src/data/                           │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  5. App automatically loads it!         │
│     View in "Learn More" page           │
└─────────────────────────────────────────┘
```

---

## 🆘 Troubleshooting

### "Column not found" error?
- Check your CSV headers match expected column names
- Edit the preprocessing script to use your column names

### Data too large?
- Use the `--sample-rate` parameter:
  ```bash
  python preprocess_nasa_data.py --input data.csv --output output.json --type marangoni --sample-rate 10
  ```
  This keeps every 10th data point.

### Special characters in data?
- Save your CSV as UTF-8
- Remove special characters from column names

### Excel files?
```python
# Convert Excel to CSV first
import pandas as pd
df = pd.read_excel('your_data.xlsx')
df.to_csv('your_data.csv', index=False)
```

---

## ✅ Checklist

- [ ] I have my NASA dataset file (CSV/Excel)
- [ ] I copied it to `preprocessing/raw_data/`
- [ ] I know what type it is (colloid/marangoni/capillary)
- [ ] I ran the preprocessing script
- [ ] JSON file was created in `src/data/`
- [ ] I tested the visualization in the app
- [ ] Data displays correctly in charts

---

## 📞 Quick Commands Reference

```powershell
# Copy your data file
Copy-Item "C:\path\to\your-data.csv" "preprocessing\raw_data\your-data.csv"

# Process it
cd preprocessing
python preprocess_nasa_data.py --input raw_data/your-data.csv --output ../src/data/processed.json --type marangoni

# Start the app
cd ..
npm start

# Open browser to see your data
# http://localhost:3000 → Learn More → Click on dataset
```

---

**Ready to add your dataset? Just copy your CSV file to `preprocessing/raw_data/` and run the preprocessing script!** 📊🚀
