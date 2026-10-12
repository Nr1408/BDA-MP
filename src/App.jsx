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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="spinner mb-6 mx-auto"></div>
          <p className="text-slate-600 text-sm font-medium">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md border border-slate-200">
          <div className="text-red-500 text-3xl mb-4">⚠️</div>
          <p className="text-slate-900 font-semibold mb-2">Unable to Load Data</p>
          <p className="text-slate-600 text-sm">{error}</p>
          <p className="text-slate-500 text-xs mt-4">Ensure both CSV files are in the public directory</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'teams', label: 'Teams' },
    { id: 'players', label: 'Players' },
    { id: 'venues', label: 'Venues' },
    { id: 'analysis', label: 'Analysis' }
  ];

  const totalMatches = analytics.matchesByYear.reduce((sum, d) => sum + d.matches, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏏</div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Cricket Analytics</h1>
                <p className="text-sm text-slate-500 mt-0.5">IPL Performance Insights</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-slate-600 text-sm">
                <span className="font-semibold text-slate-900">{totalMatches}</span> Matches
              </p>
              <p className="text-slate-600 text-sm">
                <span className="font-semibold text-slate-900">{analytics.teamStats.length}</span> Teams
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-1 overflow-x-auto pb-2 -mb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                    ? 'bg-cricket-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <MatchesByYear data={analytics.matchesByYear} />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Total Matches</p>
                <p className="text-4xl font-bold text-slate-900">{totalMatches}</p>
                <p className="text-slate-400 text-xs mt-3">All seasons combined</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Total Teams</p>
                <p className="text-4xl font-bold text-slate-900">{analytics.teamStats.length}</p>
                <p className="text-slate-400 text-xs mt-3">Active franchises</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Top Venue</p>
                <p className="text-2xl font-bold text-slate-900 truncate">{analytics.venueStats[0]?.venue?.split(',')[0] || 'N/A'}</p>
                <p className="text-slate-400 text-xs mt-3">{analytics.venueStats[0]?.matches || 0} matches</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Most Wins</p>
                <p className="text-2xl font-bold text-slate-900 truncate">{analytics.teamStats[0]?.team || 'N/A'}</p>
                <p className="text-slate-400 text-xs mt-3">{analytics.teamStats[0]?.wins || 0} victories</p>
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
      <footer className="mt-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-slate-600 text-sm">IPL Cricket Analytics Dashboard</p>
          <p className="text-slate-400 text-xs mt-2">Built with React, Vite & Recharts</p>
        </div>
      </footer>
    </div>
  );
}
