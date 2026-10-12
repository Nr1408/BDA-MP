# 🚀 START HERE - IPL Dashboard

## ⏱️ 30-Second Setup

### 1. Open PowerShell in Project Folder
```powershell
cd "c:\BDA MP"
```

### 2. Start Dashboard
```powershell
npm run dev
```

### 3. Wait for "Local: http://localhost:3000/"
Dashboard opens automatically. If not, visit `http://localhost:3000`

**Done! 🎉**

---

## 📊 What You Get

✅ Interactive dashboard with 5 tabs
✅ Cricket data analyzed from 2 CSV files
✅ Real-time charts and statistics
✅ Team, player, and venue analytics
✅ Professional UI with Tailwind CSS
✅ Fully responsive design

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `README.md` | Complete documentation |
| `QUICKSTART.md` | Quick start guide |
| `FIRST_RUN.md` | What to expect on first run |
| `COMMANDS.md` | All available commands |
| `src/App.jsx` | Main application |
| `src/components/` | 6 dashboard components |
| `src/utils/dataProcessor.js` | Data analysis functions |

---

## 🎯 Dashboard Features

1. **Overview Tab** - Matches per season
2. **Team Stats Tab** - Team rankings and breakdown
3. **Player Stats Tab** - Top batsmen and bowlers
4. **Venue Analysis** - Stadium statistics
5. **Match Analysis** - Toss impact and results

---

## 🔧 Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Install dependencies
npm install

# Check for errors
npm run build
```

---

## 💡 Tips

- ✅ Both CSV files must be in project root
- ✅ Node.js 16+ required
- ✅ First load takes 2-3 seconds
- ✅ All data processing happens in browser
- ✅ No internet needed after initial setup

---

## ❓ Troubleshooting

### CSV Files Not Found
```bash
# Verify files exist
Test-Path "matches.csv"
Test-Path "deliveries.csv"
```

### Port 3000 In Use
```bash
npm run dev -- --port 3001
```

### Need Fresh Install
```bash
npm install
npm run dev
```

---

## 📞 Next Steps

1. Run `npm run dev`
2. Explore all 5 tabs
3. Read `README.md` for details
4. Check `src/components/` to understand code
5. Run `npm run build` for production

---

## 🎓 Technology Stack

- React 18.2
- Vite 5.0
- Recharts 2.10
- Tailwind CSS 3.4
- Node.js 16+

---

**Status: ✅ Ready to Use**

**Next Command:**
```bash
npm run dev
```

Happy analyzing! 🏏
