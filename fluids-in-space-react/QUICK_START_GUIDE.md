# NASA Document & Dataset Integration Guide

## 🎯 Your Document: PSI-119 Marangoni Swimmer

You have a NASA PSI document about Marangoni swimmers pushing particle rafts. Here's how to integrate it:

## 📁 Step 1: Copy Your PDF Document

**Current Location:**
```
c:\Users\Amritha\Downloads\download\PSI-119_Science Documents_Pre-pub_Marangoni swimmer pushing particle raft...pdf
```

**Target Location:**
```
c:\Users\Amritha\Desktop\NASA\fluids-in-space-react\public\resources\PSI-119_Marangoni_swimmer.pdf
```

**PowerShell Command to Copy:**
```powershell
Copy-Item "c:\Users\Amritha\Downloads\download\PSI-119_Science Documents_Pre-pub_Marangoni swimmer pushing particle raft...pdf" "c:\Users\Amritha\Desktop\NASA\fluids-in-space-react\public\resources\PSI-119_Marangoni_swimmer.pdf"
```

## 📊 Step 2: If You Have Data Files

### For CSV/Excel Data:

**Place here:**
```
fluids-in-space-react/preprocessing/raw_data/marangoni_data.csv
```

**Expected format:**
```csv
time,temperature,surface_tension,flow_velocity,particle_displacement
0.0,20.0,72.8,0.0,0.0
0.1,20.5,72.7,0.5,0.05
0.2,21.0,72.6,1.0,0.12
```

**Process with:**
```bash
cd preprocessing
python preprocess_nasa_data.py --input raw_data/marangoni_data.csv --output ../src/data/marangoni_processed.json --type marangoni
```

## 🔧 Step 3: The App Will Automatically Show It!

Once copied, your document will appear in:
- **Learn More** page under "NASA Resources & Databases"
- Downloadable link for students
- Integrated with Marangoni convection visualizations

## 📂 Complete Directory Structure

```
fluids-in-space-react/
│
├── public/
│   └── resources/              ← PUT PDFs HERE
│       └── PSI-119_Marangoni_swimmer.pdf
│
├── preprocessing/
│   └── raw_data/              ← PUT CSV FILES HERE
│       ├── marangoni_data.csv
│       ├── colloid_data.csv
│       └── capillary_data.csv
│
└── src/
    └── data/                  ← PROCESSED JSON (auto-generated)
        └── marangoni_processed.json
```

## 🚀 Quick Start Commands

```powershell
# 1. Copy your PDF
Copy-Item "c:\Users\Amritha\Downloads\download\PSI-119_*.pdf" "c:\Users\Amritha\Desktop\NASA\fluids-in-space-react\public\resources\PSI-119_Marangoni_swimmer.pdf"

# 2. Navigate to project
cd c:\Users\Amritha\Desktop\NASA\fluids-in-space-react

# 3. Start the app
npm start
```

## 📖 What This Document Adds to Your App

Based on PSI-119 Marangoni swimmer research:

✅ **Educational Content:** Explains Marangoni effect with real NASA examples
✅ **Visualizations:** Shows particle raft movement driven by surface tension
✅ **Resource Link:** Students can download and read the actual research
✅ **Interactive Demo:** Simulates the Marangoni swimmer phenomenon

## 🎓 For More NASA Resources

1. Visit: https://psi.nasa.gov/
2. Search: "Marangoni", "Colloid", "Capillary"
3. Download PDFs → Copy to `public/resources/`
4. Download CSVs → Copy to `preprocessing/raw_data/`
5. Run preprocessing script
6. Refresh app!

---

**Ready to integrate? Just run the copy command above!** 🚀
