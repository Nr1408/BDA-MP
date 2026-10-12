# 🔧 Command Reference

Quick reference for all npm commands and common operations.

## 📝 NPM Commands

### Development

```bash
# Start development server (with hot reload)
npm run dev

# Open specific port
npm run dev -- --port 3001

# Open in browser directly
npm run dev -- --open
```

**Result**: Dashboard runs at `http://localhost:3000` or specified port

---

### Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview

# Build and preview combined
npm run build && npm run preview
```

**Result**: `dist/` folder contains deployment-ready files

---

### Maintenance

```bash
# List outdated packages
npm outdated

# Update all packages (safe)
npm update

# Update specific package
npm install package-name@latest

# Remove unused packages
npm prune

# Audit for vulnerabilities
npm audit

# Fix vulnerabilities (safe)
npm audit fix

# Reinstall dependencies
rm -r node_modules && npm install
# OR on Windows
rmdir /s /q node_modules
npm install
```

---

## 💻 PowerShell Commands (Windows)

### Navigation & File Operations

```powershell
# Navigate to project
cd "c:\BDA MP"

# List files
Get-ChildItem

# List with details
Get-ChildItem -Recurse | Select-Object Name

# Create folder
New-Item -ItemType Directory -Path ".\new-folder"

# Delete folder
Remove-Item -Recurse -Force ".\folder-name"

# View file content
Get-Content "filename.txt"
```

---

### Common Workflows

#### Fresh Start
```bash
cd "c:\BDA MP"
npm install
npm run dev
```

#### Deploy Production Build
```bash
cd "c:\BDA MP"
npm run build
# Files ready in dist/ folder
```

#### Debug Build Issues
```bash
cd "c:\BDA MP"
rm -r node_modules dist
npm install
npm run build
```

#### View Dependencies
```bash
npm list --depth=0
```

#### Add New Package
```bash
npm install new-package-name

# Save as dev dependency
npm install --save-dev dev-package-name
```

---

## 🔍 Useful Code Editors

### Open in VS Code
```bash
code .
```

### Open in File Explorer
```bash
explorer .
```

---

## 🌐 Browser DevTools

### Open Developer Tools
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I`
- **Firefox**: Press `F12` or `Ctrl+Shift+I`

### Useful Tabs
- **Console**: Check for errors and logs
- **Network**: Monitor API calls and file loading
- **Performance**: Check rendering performance
- **React DevTools**: Extension for React debugging

---

## 📊 Data Files

### Update CSV Files
```bash
# Copy new files to project root
copy "C:\path\to\new-matches.csv" ".\matches.csv"
copy "C:\path\to\new-deliveries.csv" ".\deliveries.csv"

# Restart dev server
npm run dev
```

---

## 🔌 Port Management

### Check if Port 3000 is Available
```powershell
# PowerShell
netstat -ano | findstr :3000

# If in use, find process ID and kill it
taskkill /PID <process_id> /F
```

### Use Different Port
```bash
npm run dev -- --port 3001
npm run dev -- --port 8080
```

---

## 📦 Build Optimization

### Analyze Bundle Size
```bash
# Install analyzer (one-time)
npm install --save-dev rollup-plugin-visualizer

# Analyze
npm run build
```

### Check Bundle
```bash
# See dist/ folder size
ls -lh dist/

# PowerShell
Get-ChildItem -Path .\dist -Recurse | Measure-Object -Property Length -Sum
```

---

## 🐛 Debugging

### Enable Debug Logs
```bash
# On Windows PowerShell
$env:DEBUG="*"
npm run dev
```

### Clear Browser Cache
- **Chrome**: Ctrl+Shift+Delete
- **Firefox**: Ctrl+Shift+Delete
- **Edge**: Ctrl+Shift+Delete

---

## 📈 Performance Checks

### Lighthouse Audit (Chrome)
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"

### React Profiler
1. Install React DevTools extension
2. Open DevTools (F12)
3. Go to "Profiler" tab
4. Record and analyze

---

## 🚀 Deployment Commands

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Build first
npm run build

# Push dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

---

## 🧹 Clean Up

### Remove Node Modules (free up space)
```powershell
# PowerShell
Remove-Item -Recurse -Force node_modules

# Bash (if available)
rm -rf node_modules
```

### Clear dist folder
```powershell
# PowerShell
Remove-Item -Recurse -Force dist

# Bash
rm -rf dist
```

### Reinstall Everything
```bash
npm ci  # Clean install using package-lock.json
npm run build
```

---

## 🆘 Troubleshooting Commands

### Check Node Version
```bash
node -v
npm -v
```

### Verify Files
```bash
# Check if files exist
Test-Path "matches.csv"
Test-Path "deliveries.csv"
Test-Path "package.json"
```

### Test Build
```bash
npm run build
# Check for errors
```

### View package.json Scripts
```bash
npm run
```

---

## 📝 Essential Files

| File | Purpose | Edit? |
|------|---------|-------|
| `package.json` | Dependencies & scripts | Yes (carefully) |
| `vite.config.js` | Build configuration | Sometimes |
| `tailwind.config.js` | Styling | Yes (theme) |
| `src/App.jsx` | Main component | Yes |
| `.gitignore` | Git settings | As needed |

---

## 🔐 Security Commands

### Check for Vulnerabilities
```bash
npm audit
```

### Fix Vulnerabilities
```bash
npm audit fix
npm audit fix --force  # With breaking changes
```

### Check Outdated Packages
```bash
npm outdated
```

---

## 💾 Backup Commands

### Create Backup
```bash
# Exclude node_modules and dist
tar -czf ipl-dashboard-backup.tar.gz \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.git \
  .
```

### Restore Backup
```bash
tar -xzf ipl-dashboard-backup.tar.gz
npm install
```

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Start coding | `npm run dev` |
| Build for web | `npm run build` |
| Preview build | `npm run preview` |
| Check errors | `npm run build` |
| Update packages | `npm update` |
| Add package | `npm install pkg-name` |
| Fix issues | `npm audit fix` |
| Clean install | `npm ci` |

---

**Tip**: Save this file in your IDE for quick reference!
