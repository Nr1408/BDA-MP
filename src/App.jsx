import React, { useState, useEffect } from 'react';
import { MatchesByYear } from './components/MatchesByYear';
import { TeamStats } from './components/TeamStats';
import { TopPlayers } from './components/TopPlayers';
import { VenueStats } from './components/VenueStats';
import { RunsPerOver } from './components/RunsPerOver';
import { TossAnalysis } from './components/TossAnalysis';
import {
  getMatchesByYear,
  getTeamWinStats,
  getTopBatsmen,
  getTopBowlers,
  getWinByVenue,
  getRunsPerOver,
  getTossDecisionImpact,
  getMatchResultTypes,
  parseCSV
} from './utils/dataProcessor';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({
    matchesByYear: [],
    teamStats: [],
    topBatsmen: [],
    topBowlers: [],
    venueStats: [],
    runsPerOver: [],
    tossAnalysis: [],
    resultTypes: []
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch CSV files from public directory
        const matchesResponse = await fetch('/matches.csv');
        const deliveriesResponse = await fetch('/deliveries.csv');

        if (!matchesResponse.ok || !deliveriesResponse.ok) {
          throw new Error('Failed to load CSV files');
        }

        const matchesText = await matchesResponse.text();
        const deliveriesText = await deliveriesResponse.text();

        // Parse CSVs
        const matchesData = await parseCSV(new File([matchesText], 'matches.csv'));
        const deliveriesData = await parseCSV(new File([deliveriesText], 'deliveries.csv'));

        // Process analytics
        const newAnalytics = {
          matchesByYear: getMatchesByYear(matchesData),
          teamStats: getTeamWinStats(matchesData),
          topBatsmen: getTopBatsmen(deliveriesData),
          topBowlers: getTopBowlers(deliveriesData),
          venueStats: getWinByVenue(matchesData),
          runsPerOver: getRunsPerOver(deliveriesData),
          tossAnalysis: getTossDecisionImpact(matchesData),
          resultTypes: getMatchResultTypes(matchesData)
        };

        setAnalytics(newAnalytics);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cricket-900 to-cricket-700">
        <div className="text-center">
          <div className="spinner mb-4 mx-auto"></div>
          <p className="text-white text-lg font-semibold">Loading IPL Analytics Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-red-700">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <p className="text-red-600 text-lg font-semibold mb-2">Error Loading Dashboard</p>
          <p className="text-gray-700">{error}</p>
          <p className="text-gray-600 text-sm mt-4">Please ensure both CSV files are in the public directory</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'teams', label: 'Team Stats' },
    { id: 'players', label: 'Player Stats' },
    { id: 'venues', label: 'Venue Analysis' },
    { id: 'analysis', label: 'Match Analysis' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cricket-50 to-cricket-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-cricket-800 to-cricket-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold">🏏 IPL Analytics Dashboard</h1>
              <p className="text-cricket-100 mt-1">Indian Premier League Match Analytics & Insights</p>
            </div>
            <div className="text-right text-sm">
              <p>Total Matches: <span className="font-bold text-xl">{analytics.matchesByYear.reduce((sum, d) => sum + d.matches, 0)}</span></p>
              <p>Total Teams: <span className="font-bold text-lg">{analytics.teamStats.length}</span></p>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-white text-cricket-700'
                    : 'bg-cricket-700 text-white hover:bg-cricket-500'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <MatchesByYear data={analytics.matchesByYear} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 text-sm">Total Matches</p>
                <p className="text-3xl font-bold text-cricket-600">{analytics.matchesByYear.reduce((sum, d) => sum + d.matches, 0)}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 text-sm">Total Teams</p>
                <p className="text-3xl font-bold text-cricket-600">{analytics.teamStats.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 text-sm">Top Venue</p>
                <p className="text-2xl font-bold text-cricket-600">{analytics.venueStats[0]?.venue?.split(',')[0] || 'N/A'}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 text-sm">Most Wins</p>
                <p className="text-2xl font-bold text-cricket-600">{analytics.teamStats[0]?.team.split(' ')[0]}</p>
              </div>
            </div>
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="space-y-8">
            <TeamStats data={analytics.teamStats} />
          </div>
        )}

        {/* Players Tab */}
        {activeTab === 'players' && (
          <div className="space-y-8">
            <TopPlayers batsmen={analytics.topBatsmen} bowlers={analytics.topBowlers} />
            <RunsPerOver data={analytics.runsPerOver} />
          </div>
        )}

        {/* Venues Tab */}
        {activeTab === 'venues' && (
          <div className="space-y-8">
            <VenueStats data={analytics.venueStats} />
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="space-y-8">
            <TossAnalysis data={analytics.tossAnalysis} resultTypes={analytics.resultTypes} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-cricket-900 text-cricket-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">📊 IPL Match Analytics Dashboard | Data-Driven Cricket Insights</p>
        </div>
      </footer>
    </div>
  );
}
