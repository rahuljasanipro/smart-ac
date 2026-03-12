# 🚀 SETUP INSTRUCTIONS - Smart AC Dashboard

## ✅ Files You Should Have

```
📁 your-folder/
├── 📄 index.html
├── 🎨 style.css
├── ⚙️ script.js
├── 📖 README.md
└── 📋 SETUP.md (this file)
```

## 🔧 How to Run

### **Method 1: Direct Browser (Easiest)**
1. Download all 3 files: `index.html`, `style.css`, `script.js`
2. Place them in the **same folder**
3. Double-click `index.html` to open in your browser
4. **Done!** Dashboard loads immediately ✅

### **Method 2: Live Server (VS Code)**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically at `http://localhost:5500`
4. Changes auto-reload ✅

### **Method 3: GitHub Pages**
1. Create GitHub repo: `smart-ac-dashboard`
2. Upload all 3 files to repo
3. Go to Settings → Pages
4. Select "main" branch and save
5. Visit `https://yourusername.github.io/smart-ac-dashboard/` ✅

### **Method 4: Local Web Server**
```bash
# Using Python 3
python -m http.server 8000

# Using Node
npx http-server

# Using PHP
php -S localhost:8000
```
Then visit `http://localhost:8000` ✅

---

## 🐛 TROUBLESHOOTING

### **Problem: "File not found" or blank page**
**Solution:**
- Make sure all 3 files (`index.html`, `style.css`, `script.js`) are in the **same folder**
- Check file names are exactly: `index.html`, `style.css`, `script.js`
- No extra prefixes like `advanced-` or `pro-`

### **Problem: No styling (looks broken)**
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Press Ctrl+F5 (hard refresh)
- Check that `style.css` is in same folder as `index.html`
- Check browser console (F12) for errors

### **Problem: Features don't work**
**Solution:**
- Press F12 to open Developer Tools
- Check Console tab for red errors
- Make sure JavaScript is enabled
- Try a different browser

### **Problem: Charts not showing**
**Solution:**
- Check internet connection (needs CDN)
- Wait 3-5 seconds for page to fully load
- Reload page (F5)
- Check Console for any errors

### **Problem: Dark mode not working**
**Solution:**
- Clear localStorage: Open Console (F12) and run:
  ```javascript
  localStorage.clear()
  ```
- Reload page
- Try again

### **Problem: Budget modal won't open**
**Solution:**
- Make sure JavaScript is enabled
- Check Console for errors
- Try opening in a different browser

### **Problem: Voice control button does nothing**
**Solution:**
- Click the button and wait 2 seconds
- Modal should appear with voice visualizer
- If nothing happens, check Console for errors

---

## 📋 FILE CHECKLIST

Before running, verify:

- ✅ `index.html` exists (30KB)
- ✅ `style.css` exists (30KB)  
- ✅ `script.js` exists (24KB)
- ✅ All 3 files in **same folder**
- ✅ File names are **exactly correct**
- ✅ Open `index.html` in browser

---

## 🌐 IMPORTANT: Internet Connection

This dashboard requires internet for:
- Chart.js library (charts)
- ApexCharts library (graphs)
- These are loaded from CDN

**Everything else works offline!**

If CDN is down:
- Download libraries locally
- Update script URLs in HTML

---

## 🎨 Quick Customization

### Change App Name
In `index.html`, find line 55:
```html
<h1 class="logo-text">CoolVault</h1>
```
Change "CoolVault" to your name

### Change Colors
In `style.css`, find lines 5-14:
```css
--primary: #00d4ff;        /* Cyan */
--secondary: #7c3aed;      /* Purple */
--accent: #ff6b6b;         /* Red */
```
Change to your colors (use hex codes)

### Change Electricity Rate
In `script.js`, find line 21:
```javascript
const ELECTRICITY_RATE = 8; // ₹ per kWh
```
Change 8 to your rate

---

## ✨ Features Quick Reference

| Feature | How to Access |
|---------|---------------|
| Toggle AC | Click circle button in Dashboard tab |
| Change Temperature | Use slider (16-30°C) |
| Voice Control | Click 🎤 button in sidebar |
| Budget Setup | Click 💳 Budget button in header |
| View Analytics | Click Analytics tab |
| Check Efficiency | Click Efficiency tab |
| View Reports | Click Reports tab |
| Dark Mode | Click 🌙 button in sidebar |
| Quick Actions | Use cards: Sleep Mode, Quick Cool, Eco Mode |

---

## 📱 Device Support

- ✅ Desktop (1024px+) - Full experience
- ✅ Tablet (768px) - Optimized layout
- ✅ Mobile (< 768px) - Responsive design

---

## 🔍 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers

**Tested on:**
- Windows 10/11
- macOS
- iOS Safari
- Android Chrome

---

## 💾 Data Storage

All data saved to browser's localStorage:
- AC settings
- Temperature settings
- Budget configuration
- Usage history
- Preferences

**Data is LOCAL - never sent to servers!**

---

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Blank page | Check file names & folder |
| No colors | Hard refresh (Ctrl+F5) |
| Charts missing | Wait for CDN load |
| Buttons don't work | Check Console (F12) |
| Layout broken | Clear cache & reload |
| Dark mode glitch | Clear localStorage |
| Voice modal stuck | Reload page |
| Budget won't save | Check localStorage enabled |

---

## 🎓 Advanced: Running Tests

Open browser Console (F12) and run:

```javascript
// Check state
console.log(state);

// Clear all data
localStorage.clear();

// Check localStorage size
JSON.stringify(localStorage).length;

// Simulate AC turn on
state.acStatus = true;
updateDisplay();
```

---

## 📞 Quick Support

**If something breaks:**

1. **Check file names** - Must be: `index.html`, `style.css`, `script.js`
2. **Clear cache** - Ctrl+Shift+Delete
3. **Hard refresh** - Ctrl+F5
4. **Check console** - Press F12 → Console tab
5. **Try different browser** - Chrome, Firefox, Safari
6. **Restart browser** - Close & reopen

---

## 🎉 You're All Set!

Just open `index.html` in your browser and enjoy! 

**No installation, no servers, no setup!**

---

**Happy cooling! ❄️**

Questions? Check the README.md file for more details.
