# Fluids in Space - Interactive Educational Tool

An interactive web application built with React to help students understand how fluids behave differently in space versus on Earth. This educational platform uses NASA's Physical Sciences Informatics (PSI) datasets to demonstrate real-world microgravity physics.

## 🚀 Features

### 1. **Home Screen**
- Educational introduction to fluid behavior in space
- Side-by-side comparisons of Earth vs Space physics
- Key scientific concepts explained with visuals

### 2. **Interactive Simulation**
- Real-time parameter adjustment with sliders:
  - **Gravity** (0g to 1g): Compare microgravity to Earth
  - **Temperature** (-50°C to 100°C): See temperature effects on fluids
  - **Container Size**: Observe scale effects
  - **Fluid Type**: Water, oil, or colloid suspensions
  - **Viscosity**: Adjust fluid thickness
- Quick presets for Earth, Moon, Mars, and ISS conditions
- Live particle animation showing fluid behavior

### 3. **Advanced Visualizations**
- Side-by-side Earth vs Space comparisons
- Four interactive scenarios:
  - Water droplet formation
  - Marangoni convection
  - Colloid self-assembly
  - Fluid mixing behavior
- Play/pause and reset controls

### 4. **Learn More & NASA OSDR Integration** ⭐ NEW!
- **Live NASA Data Browser**: Browse 100+ real space experiments
- **Direct API Integration**: Real-time access to NASA's Open Science Data Repository
- **Search & Filter**: Find fluid mechanics and microgravity experiments
- **Download Data**: Get CSV, Excel, images, and analysis files directly
- Sample dataset visualizations with interactive charts
- Educational resources for students and teachers
- Real-world applications in space technology

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **NASA OSDR API**: Live integration with NASA's Open Science Data Repository

## 📦 Installation

1. **Clone the repository**:
```bash
cd fluids-in-space-react
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
fluids-in-space-react/
├── public/
│   ├── index.html
│   └── resources/                 # NASA PDFs and documents
├── src/
│   ├── components/
│   │   ├── Navigation.js          # Main navigation bar
│   │   ├── FluidCanvas.js         # Interactive fluid simulation
│   │   ├── ParameterSlider.js     # Slider controls
│   │   ├── ComparisonVisualization.js  # Side-by-side visualizations
│   │   ├── DatasetViewer.js       # NASA dataset charts
│   │   └── NASADataBrowser.js     # ⭐ NEW: Live NASA data browser
│   ├── pages/
│   │   ├── Home.js                # Landing page
│   │   ├── Simulation.js          # Interactive simulation
│   │   ├── Visualization.js       # Advanced visualizations
│   │   └── LearnMore.js           # Educational resources + NASA OSDR
│   ├── services/
│   │   └── nasaOSDRService.js     # ⭐ NEW: NASA API integration
│   ├── utils/
│   │   └── dataGenerator.js       # Sample data generation
│   ├── data/                      # NASA datasets (JSON/CSV)
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── App.js
│   └── index.js
├── preprocessing/                 # Python scripts for data processing
├── NASA_API_INTEGRATION.md        # ⭐ NEW: Full API documentation
├── QUICK_NASA_API_GUIDE.md        # ⭐ NEW: Quick start guide
├── package.json
└── README.md
```

## 🌟 NASA OSDR API Integration

### ✨ What's New - Live NASA Data!

The app now features **real-time integration with NASA's Open Science Data Repository (OSDR) API**!

**Quick Access**:
1. Run: `npm start`
2. Navigate to **"Learn More"** page
3. Scroll to **"Browse NASA's Open Science Data Repository"**
4. Explore 100+ real space experiments!

**Features**:
- 🔍 Search NASA's experimental database
- 📊 View complete experiment metadata
- 📥 Download real data files (CSV, Excel, images)
- 🚀 Filter by microgravity, fluids, colloids, and more
- 🎓 Perfect for students and educators

**Documentation**:
- Full guide: See `NASA_API_INTEGRATION.md`
- Quick start: See `QUICK_NASA_API_GUIDE.md`

### Technical Details

**API Service**: `src/services/nasaOSDRService.js`
- Fetch all datasets
- Query with filters
- Download files
- Search by keywords

**Browser Component**: `src/components/NASADataBrowser.js`
- Interactive UI
- Real-time search
- Dataset details panel
- Direct file downloads

No API key required - it's free and public! 🎉

## 📊 Local NASA Dataset Integration

### Adding Your Own CSV/Excel Data

1. **Download NASA PSI Datasets**:
   - Visit [NASA PSI Portal](https://psi.nasa.gov/)
   - Download colloid and Marangoni convection datasets
   - Export as CSV or Excel

2. **Place Files in Preprocessing Folder**:
```python
python preprocess_nasa_data.py --input raw_data.csv --output src/data/processed.json
```

3. **Load in App**:
```javascript
import nasaData from './data/processed.json';
```

## 🎓 Educational Use Cases

### For Students
- **Grade 6-8**: Basic concepts of gravity and fluids
- **Grade 9-12**: Advanced physics of surface tension and convection
- **College**: Real experimental data analysis and space science

### For Teachers
- Use as a demonstration tool in physics classes
- Assign simulation experiments as homework
- Compare predictions with actual simulations
- Integrate with space science curriculum

### Learning Objectives
- Understand gravitational effects on fluids
- Explain surface tension and capillary action
- Describe Marangoni convection phenomena
- Analyze real space science data
- Apply physics concepts to space exploration

## 🔬 Scientific Concepts Covered

### 1. **Surface Tension**
- Molecular cohesion in liquids
- Minimization of surface area
- Sphere formation in microgravity

### 2. **Marangoni Convection**
- Surface tension-driven flows
- Temperature gradient effects
- Heat transfer in space

### 3. **Colloidal Self-Assembly**
- Particle suspension without gravity
- Crystal structure formation
- Applications in materials science

### 4. **Capillary Action**
- Adhesion and cohesion forces
- Fluid management in space
- Life support system implications

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Real-time NASA API integration
- [ ] User accounts to save experiments
- [ ] Export simulation results as PDF
- [ ] Multi-language support
- [ ] VR/AR mode for immersive experience
- [ ] Classroom mode with shared experiments
- [ ] Mobile app version (React Native)

## 📚 Resources

- [NASA Physical Sciences Informatics](https://psi.nasa.gov/)
- [ISS Research & Technology](https://www.nasa.gov/mission_pages/station/research/)
- [Fluid Physics in Microgravity](https://www.nasa.gov/centers/glenn/about/fs21grc.html)
- [Colloid Research](https://www.nasa.gov/mission_pages/station/research/experiments/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NASA for providing access to PSI datasets
- International Space Station research teams
- Physics educators and students who inspired this project

## 📧 Contact

For questions, suggestions, or collaboration opportunities:
- Project Repository: [GitHub Link]
- Email: your.email@example.com

---

**Made with ❤️ for space science education**
