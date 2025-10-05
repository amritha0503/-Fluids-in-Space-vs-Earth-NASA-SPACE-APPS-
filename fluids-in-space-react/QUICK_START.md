# Quick Start Guide - Fluids in Space

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

```powershell
cd "c:\Users\Amritha\Desktop\NASA\fluids-in-space-react"
npm install
```

### Step 2: Run the App

```powershell
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Step 3 (Optional): Add NASA Data

See [DATA_INTEGRATION_GUIDE.md](DATA_INTEGRATION_GUIDE.md) for detailed instructions.

**Quick test with sample data:**

```powershell
cd preprocessing
python preprocess_nasa_data.py --generate-samples --output-dir ../src/data
```

## 📁 Where to Put Your NASA Files

```
fluids-in-space-react/
├── preprocessing/
│   └── raw_data/          ← PUT NASA CSV FILES HERE
│
└── src/
    └── data/              ← PROCESSED JSON FILES GO HERE
```

## 🎯 What You Can Do

1. **Home Page** - Learn about fluids in space
2. **Simulation** - Interactive sliders (gravity, temperature, etc.)
3. **Visualization** - Side-by-side Earth vs Space comparisons
4. **Learn More** - NASA resources and dataset integration

## 📊 Dataset Workflow

```
Download NASA CSV → Place in raw_data/ → Run Python script → JSON appears in src/data/ → View in app
```

## 🛠️ Build for Production

```powershell
npm run build
```

Output will be in the `build/` folder.

## 📚 Documentation

- [README.md](README.md) - Full project documentation
- [DATA_INTEGRATION_GUIDE.md](DATA_INTEGRATION_GUIDE.md) - NASA dataset integration
- [preprocessing/README.md](preprocessing/README.md) - Python preprocessing details

## 🐛 Troubleshooting

**Port already in use?**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**React not starting?**
```powershell
rm -rf node_modules package-lock.json
npm install
```

**Python script errors?**
```powershell
pip install pandas numpy
```

## 🎨 Customization

Edit these files to customize:
- `src/styles/index.css` - Global styles and colors
- `src/pages/` - Page content
- `src/components/` - Reusable components

## 📞 Need Help?

1. Check the console for error messages
2. Review the documentation files
3. Try with sample data first
4. Verify all dependencies are installed

---

**Happy exploring! 🌌**
