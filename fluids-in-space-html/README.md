# Fluids in Space - HTML Version 🚀💧

A simplified HTML/CSS/JavaScript version of the Fluids in Space educational tool, converted from React for easier deployment and compatibility.

## 📋 Overview

This project helps students and educators understand how fluids behave differently in microgravity compared to Earth. It includes:

- 🏠 **Home Page**: Introduction and key concepts
- 🧪 **Interactive Simulation**: Real-time fluid physics with adjustable parameters
- 📊 **Data Visualization**: Side-by-side Earth vs Space comparisons
- 📚 **Learn More**: Educational resources and NASA datasets


### What's Preserved:

✅ Full fluid simulation with physics  
✅ All interactive controls  
✅ NASA data browser  
✅ Educational content  
✅ Responsive design  
✅ Dark space theme  
✅ All visualizations  


## 🚀 How to Use

### Option 1: Open Directly in Browser

1. Navigate to the project folder
2. Double-click `index.html`
3. Your default browser will open the site

### Option 2: Use a Local Server (Recommended)

**Using Python:**
```powershell
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Using Node.js (if installed):**
```powershell
npx http-server -p 8000

# Then visit: http://localhost:8000
```

**Using PHP:**
```powershell
php -S localhost:8000

# Then visit: http://localhost:8000
```

### Option 3: Use VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🎮 Features

### 1. Interactive Simulation

**Parameters you can adjust:**
- Fluid Type (Water, Oil, Colloid)
- Gravity (0 to 10 m/s²)
- Temperature (0 to 100°C)
- Viscosity (Low to High)
- Surface Tension (0 to 100 mN/m)
- Container Size

**Quick Presets:**
- 🌍 Earth (9.8 m/s² gravity)
- 🚀 Space (0 m/s² - true microgravity)
- 🛰️ ISS (0.1 m/s² - microgravity with slight effects)

**Real-time Observations:**
The simulation updates text to explain what you're seeing based on current parameters.

### 2. Data Visualization

**Three comparison modes:**
- Surface Tension comparison across fluids
- Viscosity effects analysis
- Temperature impact on surface tension

**Side-by-side Canvas:**
- Earth environment (particles fall)
- Space environment (particles cluster)

**Data Table:**
Comparative data showing key differences between Earth and space fluid behavior.

### 3. NASA Data Browser

**Features:**
- 8 curated NASA Physical Sciences datasets
- Search functionality
- Relevance badges
- Category tags
- Direct links to NASA OSDR portal

**Dataset Categories:**
- Capillary Action
- Marangoni Effect
- Colloid Science
- Surface Tension
- Interface Science
- Wetting Phenomena

## 🎨 Customization

### Changing Colors

Edit `styles/main.css`:

```css
:root {
    --primary-color: #4a9eff;     /* Main blue */
    --secondary-color: #7c3aed;   /* Purple accent */
    --accent-color: #06b6d4;      /* Cyan accent */
    --dark-bg: #0a0e27;           /* Dark background */
    --card-bg: #1a1f3a;           /* Card background */
}
```

### Adjusting Physics

Edit `js/simulation.js`:

```javascript
// Line ~200: Gravity strength
particle.vy += params.gravity * 0.01;  // Change multiplier

// Line ~210: Surface tension force
const force = params.surfaceTension * 0.001;  // Adjust force
```

### Adding Datasets

Edit `js/nasa-data.js`:

```javascript
const curatedDatasets = [
    {
        accession: 'OSD-XXX',
        title: 'Your Dataset Title',
        description: 'Description here',
        relevance: 'High',  // or 'Medium'
        category: 'Your Category'
    },
    // Add more...
];
```

## 📱 Responsive Design

The site is fully responsive and works on:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

Mobile features:
- Hamburger menu
- Touch-friendly controls
- Optimized layout
- Readable text sizes

## 🌐 Deployment Options

### GitHub Pages

1. Push to GitHub repository
2. Go to Settings > Pages
3. Select branch and folder
4. Your site will be live at `https://username.github.io/repo-name`

### Netlify

1. Drag and drop the folder to netlify.com
2. Instant deployment
3. Custom domain support

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project folder
3. Follow prompts

### Traditional Web Hosting

Upload all files via FTP to your web server. No special configuration needed!

## 🔧 Browser Compatibility

**Fully supported:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Features used:**
- HTML5 Canvas
- CSS3 Grid & Flexbox
- ES6 JavaScript
- CSS Custom Properties

## 📚 Educational Use

**Target Audience:**
- High school students (ages 14+)
- Undergraduate students
- Educators and teachers
- Space enthusiasts

**Learning Objectives:**
1. Understand microgravity effects on fluids
2. Compare Earth vs Space environments
3. Learn about surface tension and capillary action
4. Explore real NASA experimental data
5. Visualize abstract physics concepts

**Suggested Activities:**
- Adjust gravity slider and observe changes
- Compare water vs oil behavior
- Test ISS preset and discuss results
- Research NASA datasets
- Create lab reports based on simulations

## 🐛 Known Limitations

1. **No Chart Library**: Custom canvas charts are simpler than Recharts
2. **Page Refreshes**: Navigation causes full page reloads (no SPA)
3. **Basic Animations**: Vanilla JS animations lack Framer Motion smoothness
4. **No Live API**: NASA data is curated, not live from API
5. **Physics Simplified**: Simulation is educational, not research-grade

## 🔄 Migrating Back to React

If you need React features later:

1. Keep the React version in the original folder
2. Use this HTML version for simple deployment
3. Both can coexist
4. Copy content updates between versions

## 📝 Credits

**Original React Version:**
- React 18.2.0
- Framer Motion
- Recharts
- React Router

**HTML Version:**
- Pure HTML5/CSS3/JavaScript
- Canvas API for graphics
- No external dependencies

**Data Source:**
NASA Physical Sciences Informatics (PSI)  
NASA Open Science Data Repository (OSDR)

## 📄 License

Educational use. NASA data is public domain.

## 🆘 Troubleshooting

**Problem:** Simulation is slow  
**Solution:** Reduce container size or number of particles in simulation.js

**Problem:** Canvas not displaying  
**Solution:** Check browser console for errors. Ensure JavaScript is enabled.

**Problem:** NASA data not loading  
**Solution:** This is expected - it shows curated fallback data. For live API, deploy React version with backend.

**Problem:** Mobile menu not working  
**Solution:** Ensure navigation.js is loaded. Check browser console for errors.

## 📧 Support

For questions about:
- NASA data: Visit https://osdr.nasa.gov
- Fluid physics: See educational resources in Learn More page
- Technical issues: Check browser console for errors

---

**Built for NASA Space Apps Challenge 2025** 🚀  
Converting complex React apps to accessible HTML since 2025! 💪
