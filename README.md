# 🏏 IPL Cricket Analytics Dashboard

A modern, interactive React + Vite dashboard for analyzing Indian Premier League (IPL) cricket match data. Built entirely from the provided datasets using data processing logic from the BDA Mini Project.

## 📊 Features

- **Match Analytics**: Visualize total matches per season with interactive charts
- **Team Performance**: Compare team wins/losses and win rates
- **Player Statistics**: Top batsmen and bowlers rankings with detailed stats
- **Venue Analysis**: Track match outcomes across different venues
- **Runs per Over**: Analyze scoring patterns throughout innings
- **Toss Impact**: Understand how toss decisions affect match outcomes
- **Interactive Tabs**: Navigate between different analysis sections seamlessly

## 🛠 Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Charting**: Recharts 2.10
- **Styling**: Tailwind CSS 3.4
- **Data Parsing**: PapaParse 5.4
- **Node Version**: 16+ recommended

## 📁 Project Structure

```
ipl-dashboard/
├── src/
│   ├── components/          # React components for each dashboard section
│   │   ├── MatchesByYear.jsx
│   │   ├── TeamStats.jsx
│   │   ├── TopPlayers.jsx
│   │   ├── VenueStats.jsx
│   │   ├── RunsPerOver.jsx
│   │   └── TossAnalysis.jsx
│   ├── utils/
│   │   └── dataProcessor.js # Data processing & analysis functions
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html               # HTML entry point
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── matches.csv              # IPL matches dataset
├── deliveries.csv           # IPL deliveries dataset
└── README.md                # This file
```

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm 7+
- Both CSV files (`matches.csv` and `deliveries.csv`)

### Setup Steps

1. **Navigate to project directory**:
   ```bash
   cd "c:\BDA MP"
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Ensure CSV files are in root**:
   - `matches.csv` - IPL match results data
   - `deliveries.csv` - Ball-by-ball delivery data

## 🚀 Running the Dashboard

### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```
The dashboard will open in your browser at `http://localhost:3000`

### Production Build
Create an optimized production build:
```bash
npm run build
```
The built files will be in the `dist/` directory.

### Preview Production Build
Test the production build locally:
```bash
npm run preview
```

## 📊 Dashboard Sections

### 1. **Overview Tab**
- Matches per season bar chart
- Summary statistics (total matches, teams, top venue, most wins)

### 2. **Team Stats Tab**
- Top 10 teams by win count
- Individual team performance selector with win/loss pie chart
- Detailed team statistics including win rates

### 3. **Player Stats Tab**
- Top 15 batsmen by runs scored
- Top 15 bowlers by wickets taken
- Detailed player statistics (strike rate, economy, averages)
- Runs per over trend analysis

### 4. **Venue Analysis Tab**
- Matches played at each venue
- Win type distribution (runs vs wickets) by venue
- Comprehensive venue statistics table

### 5. **Match Analysis Tab**
- Toss decision impact on match outcomes
- Match result type distribution (runs vs wickets vs others)
- Win percentage by toss decision

## 🔄 Data Processing Pipeline

The `dataProcessor.js` utility includes:

- **CSV Parsing**: PapaParse-based CSV loading
- **Team Analytics**: Win/loss tracking and statistics
- **Player Rankings**: Batsman and bowler statistics
- **Venue Analysis**: Matches and result patterns
- **Toss Impact**: Win correlation with toss decisions
- **Over Analysis**: Scoring patterns throughout innings

## 🎨 Styling

- **Color Scheme**: Cricket-themed blue gradient palette
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Reusable card and chart wrappers

## 📈 Key Metrics Analyzed

- **Matches per Season**: Track IPL growth over years
- **Team Win Rates**: Identify most successful teams
- **Player Performance**: Top run scorers and wicket takers
- **Venue Bias**: Which venues favor batting vs bowling
- **Toss Success Rate**: Impact of toss decisions on outcomes
- **Over-wise Runs**: Identify high-scoring and defensive overs

## 🔧 Customization

### Adding New Analysis
1. Create a new component in `src/components/`
2. Add data processing function in `src/utils/dataProcessor.js`
3. Import and add tab in `src/App.jsx`

### Modifying Styles
- Edit `src/index.css` for global styles
- Update `tailwind.config.js` for theme colors
- Modify component className attributes

### Changing Visualizations
- Replace Recharts component in any component file
- Update data mapping in props
- Adjust colors and dimensions as needed

## 📋 CSV Data Format

### matches.csv
Columns: id, season, city, date, match_type, player_of_match, venue, team1, team2, toss_winner, toss_decision, winner, result, result_margin, target_runs, target_overs, super_over, method, umpire1, umpire2

### deliveries.csv
Columns: match_id, inning, batting_team, bowling_team, over, ball, batter, bowler, non_striker, batsman_runs, extra_runs, total_runs, extras_type, is_wicket, player_dismissed, dismissal_kind, fielder

## 🐛 Troubleshooting

### "Failed to load CSV files"
- Ensure `matches.csv` and `deliveries.csv` are in the project root
- Check file permissions
- Verify file names match exactly

### Performance Issues
- Reduce data processing in `dataProcessor.js`
- Limit chart data points (e.g., top 10 instead of top 15)
- Use React.memo for expensive components

### Build Errors
- Clear `node_modules` and reinstall: `rm -r node_modules && npm install`
- Update npm: `npm install -g npm@latest`
- Check Node version: `node -v`

## 📝 License

This project is based on the BDA Mini Project and uses IPL cricket data for educational purposes.

## 🎯 Future Enhancements

- [ ] Player comparison tools
- [ ] Custom date range filtering
- [ ] Export analytics to PDF/CSV
- [ ] Real-time match updates
- [ ] Player head-to-head statistics
- [ ] Stadium weather correlation
- [ ] Historical trend predictions

## 🙏 Acknowledgments

- Built using React, Vite, and Recharts
- Cricket analytics inspired by BDA Mini Project
- Data processing logic adapted from Spark SQL analysis

---

**Made with ❤️ for cricket analytics enthusiasts**
