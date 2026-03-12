# 🌡️ Smart AC Dashboard - Premium Edition

A **visually stunning**, **feature-rich** Smart AC Management Dashboard built with vanilla HTML, CSS, and JavaScript. Perfect for GitHub Pages hosting!

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-2.0-orange)

---

## ✨ **Premium Features**

### 🎯 Core Dashboard
- **Real-time AC Control** - Toggle ON/OFF with instant status updates
- **Smart Temperature Control** - Set temperature from 16°C to 30°C with precision slider
- **4 AC Modes** - Cool, Dry, Fan, Heat modes
- **Live Status Indicators** - Animated status dots and power indicators
- **Real-time Power Monitoring** - Live kWh consumption tracking

### 📊 Advanced Analytics
- **24-Hour Power Chart** - Line chart showing hourly consumption patterns
- **Daily Energy Usage** - Bar chart breakdown by time of day
- **Weekly Comparison** - Compare current week with previous week trends
- **Monthly Energy Trend** - ApexCharts visualization of monthly patterns
- **Peak Hour Detection** - Automatically identifies peak usage times
- **Usage Statistics** - Average daily usage, monthly totals, and more

### 💰 Budget Management
- **Monthly Budget Setup** - Set custom monthly electricity budget
- **Budget Tracking** - Visual gauge showing budget utilization
- **Smart Alerts** - Get warned when budget threshold is reached
- **Daily Average Calculation** - Know your daily spending rate
- **Remaining Budget Display** - See how much money you have left
- **Expense Breakdown** - Peak hours vs Off-peak vs Night hours analysis

### 🔋 Energy Efficiency
- **Efficiency Rating** - A+, A, B, C grades based on performance
- **Efficiency Score** - 0-100% score with real-time calculation
- **Performance Factors** - Temperature consistency, power optimization, usage patterns
- **Smart Recommendations** - AI-generated efficiency tips
- **Energy Saving Tips** - Pre-calculated savings for temperature adjustments

### 🎤 Voice Control Simulation
- **Voice Recognition UI** - Beautiful voice input interface
- **Animated Visualizer** - Pulsing wave animation during "listening"
- **Command Processing** - Simulates processing voice commands
- **Auto-confirmation** - Visual feedback for completed commands

### 📋 Professional Reports
- **Multiple Report Periods** - Weekly, Monthly, Yearly reports
- **Summary Statistics** - Total usage, costs, averages, efficiency
- **Daily Breakdown Table** - Detailed day-by-day data with temps
- **Smart Insights** - Auto-generated recommendations based on patterns
- **PDF Export** - Download reports as PDF (simulation)
- **Email Sharing** - Share reports via email (simulation)

### 🚀 Smart Automation
- **Quick Actions** - One-click Sleep Mode, Quick Cool, Eco Mode
- **Pre-set Modes** - Save and apply favorite configurations
- **Scheduled Actions** - Sleep mode gradually increases temperature
- **Eco Hours** - Optimize usage during peak hours
- **Temperature Presets** - Quick access to common temperatures

### 🎨 UI/UX Excellence
- **Modern Glassmorphism** - Frosted glass card design
- **Dark/Light Mode** - Full theme support with smooth transitions
- **Smooth Animations** - Page transitions, hover effects, micro-interactions
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Floating Action Buttons** - Easy access to voice control
- **Toast Notifications** - Non-intrusive feedback messages
- **Professional Color Scheme** - Cyan, Purple, and warm accent colors

### 📱 Multi-Tab Navigation
- **Dashboard Tab** - Main control center
- **Analytics Tab** - In-depth charts and statistics
- **Efficiency Tab** - Performance metrics and recommendations
- **Budget Tab** - Financial tracking and management
- **Reports Tab** - Generate and view detailed reports

---

## 🛠️ **Installation & Setup**

### **Option 1: Local Installation**

1. **Create a folder** for the project:
```bash
mkdir smart-ac-dashboard
cd smart-ac-dashboard
```

2. **Create three files** with the following names:
   - `advanced-index.html`
   - `advanced-style.css`
   - `advanced-script.js`

3. **Copy the code** from each file into the corresponding files above

4. **Open in browser**:
   - Double-click `advanced-index.html` OR
   - Use Live Server extension in VS Code

### **Option 2: GitHub Pages Deployment**

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Smart AC Dashboard"
   ```

2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select `main` branch
   - Save

3. **Access your dashboard**:
   ```
   https://yourusername.github.io/smart-ac-dashboard/
   ```

### **Option 3: Using Docker** (Optional)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
EXPOSE 8000
CMD ["npx", "http-server"]
```

---

## 🎮 **How to Use**

### **Main Dashboard**
1. Click the AC toggle button to turn AC ON/OFF
2. Use the temperature slider to set desired temperature (16-30°C)
3. Quick + and - buttons for rapid temperature adjustment
4. Select AC Mode: Cool, Dry, Fan, or Heat
5. Use quick action cards for pre-set scenarios

### **Voice Control**
1. Click the 🎤 **Voice Control** button in sidebar
2. Wait for voice command processing (simulated)
3. See visual feedback with animated waves
4. Commands execute automatically

### **Budget Management**
1. Click **💳 Budget** button in top header
2. Set your monthly budget (default: ₹2,000)
3. Set alert threshold (default: 80%)
4. Save changes
5. Monitor usage in Budget tab
6. Get alerts when threshold is reached

### **Analytics**
1. Switch to **Analytics** tab
2. View real-time 24-hour power chart
3. Check daily energy breakdown
4. Compare weekly trends
5. Analyze monthly patterns

### **Reports**
1. Go to **Reports** tab
2. Choose report period: Weekly, Monthly, or Yearly
3. Review summary statistics
4. Check daily breakdown table
5. Read smart recommendations
6. Download as PDF or share via email

---

## 📊 **Data Visualization**

### **Chart.js Charts**
- Line charts for power consumption trends
- Bar charts for usage by time period
- Multiple datasets for comparisons

### **ApexCharts**
- Area charts for monthly trends
- Interactive tooltips
- Smooth animations
- Theme-aware rendering

### **Custom Visualizations**
- Circular gauges for efficiency and budget
- Progress bars for usage tracking
- Animated status indicators

---

## 💾 **Local Storage Features**

The dashboard automatically saves:
- AC status and temperature
- Daily usage and cost
- Budget settings
- Dark mode preference
- All user preferences

Data persists across browser sessions!

---

## 🎨 **Customization**

### **Change Electricity Rate**
Edit `advanced-script.js`, line 21:
```javascript
const ELECTRICITY_RATE = 8; // Change this value
```

### **Change Daily Limit**
Edit `advanced-script.js`, line 22:
```javascript
const DAILY_USAGE_LIMIT = 15; // Change this value
```

### **Change Color Scheme**
Edit `advanced-style.css`, lines 5-14:
```css
--primary: #00d4ff; /* Change primary color */
--secondary: #7c3aed; /* Change secondary color */
--accent: #ff6b6b; /* Change accent color */
```

### **Add More Modes**
Edit HTML mode selector and update `setACMode()` function

---

## 📱 **Responsive Breakpoints**

- **Desktop**: 1024px+ (Full layout)
- **Tablet**: 768px - 1023px (Sidebar collapses, grid adjusts)
- **Mobile**: Below 768px (Single column, optimized touch)

---

## 🔧 **Browser Support**

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📦 **Dependencies**

- **Chart.js** (3.9.1) - Data visualization
- **ApexCharts** (3.45.1) - Advanced charts
- **CDN Hosted** - No npm installation needed!

---

## 🚀 **Performance Optimizations**

- Lazy chart initialization
- Efficient DOM updates
- CSS transitions instead of JS animations
- Local storage caching
- Debounced event handlers

---

## 🔐 **Data Privacy**

- All data stored locally (browser localStorage)
- No data sent to servers
- Perfect for offline use
- No tracking or analytics

---

## 📝 **File Structure**

```
smart-ac-dashboard/
├── advanced-index.html      # Main HTML file
├── advanced-style.css        # All styling
├── advanced-script.js        # All functionality
└── README.md                 # This file
```

---

## 🐛 **Troubleshooting**

### **Charts not displaying?**
- Clear browser cache
- Check browser console for errors
- Ensure CDN links are accessible

### **Dark mode not persisting?**
- Check if localStorage is enabled
- Clear localStorage: `localStorage.clear()`

### **Budget not saving?**
- Ensure localStorage quota not exceeded
- Try a smaller budget value

### **Voice control not working?**
- Check browser console
- Ensure JavaScript is enabled
- Try refreshing the page

---

## 🎯 **Future Enhancements**

- 🏠 Multi-room AC management
- 🌦️ Weather API integration
- 📲 Mobile app version
- ☁️ Cloud sync across devices
- 🤖 ML-based predictions
- 📊 More chart types
- 🔔 Desktop notifications
- 📱 PWA support

---

## 📄 **License**

MIT License - Feel free to use, modify, and distribute!

---

## 👨‍💻 **Contributing**

Found a bug? Have an idea? Feel free to submit issues and enhancement requests!

---

## 📞 **Support**

For issues or questions:
1. Check the Troubleshooting section
2. Clear browser cache and localStorage
3. Try a different browser
4. Check browser console (F12) for errors

---

## 🎉 **Version History**

### **v2.0** (Current) - Premium Edition
- ✨ Advanced analytics with ApexCharts
- 💰 Complete budget management system
- 🎤 Voice control simulation
- 📋 Professional report generation
- 🎨 Enhanced UI with glassmorphism
- 📱 Improved responsive design
- 🔋 Energy efficiency scoring

### **v1.0** - Basic Edition
- ✓ AC control
- ✓ Temperature management
- ✓ Basic power tracking
- ✓ Cost calculation
- ✓ Weekly charts

---

**Made with ❤️ for Smart Home Enthusiasts**

⭐ **If you like this project, please give it a star!**

---

## 🌐 **Live Demo**

Visit the live dashboard:
```
https://yourusername.github.io/smart-ac-dashboard/
```

(After GitHub Pages deployment)

---

**Happy cooling! 🧊❄️**
