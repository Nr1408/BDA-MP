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
        const matchesResponse = await fetch('/matches.csv');
        const deliveriesResponse = await fetch('/deliveries.csv');

        if (!matchesResponse.ok || !deliveriesResponse.ok) {
          throw new Error('Failed to load CSV files');
        }

        const matchesText = await matchesResponse.text();
        const deliveriesText = await deliveriesResponse.text();

        const matchesData = await parseCSV(new File([matchesText], 'matches.csv'));
        const deliveriesData = await parseCSV(new File([deliveriesText], 'deliveries.csv'));

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark-900 to-dark-950">
        <div className="text-center">
          <div className="spinner mb-6 mx-auto"></div>
          <p className="text-neon-200 text-sm font-medium tracking-wider">Loading Analytics</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark-900 to-dark-950">
        <div className="glass-effect p-8 rounded-3xl max-w-md">
          <div className="text-neon-400 text-3xl mb-4">⚠️</div>
          <p className="text-neon-100 font-semibold mb-2">Unable to Load Data</p>
          <p className="text-neon-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: '◆ Overview' },
    { id: 'teams', label: '◈ Teams' },
    { id: 'players', label: '◇ Players' },
    { id: 'venues', label: '◉ Venues' },
    { id: 'analysis', label: '◆ Analysis' }
  ];

  const totalMatches = analytics.matchesByYear.reduce((sum, d) => sum + d.matches, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-neon-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl sm:text-3xl">🏏</div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">CRICKET ANALYTICS</h1>
                <p className="text-xs sm:text-sm text-neon-300 mt-0.5">IPL Performance Insights</p>
              </div>
            </div>
            <div className="text-right text-xs sm:text-sm hidden md:block">
              <p className="text-neon-300">
                <span className="font-bold text-neon-100">{totalMatches}</span> Matches
              </p>
              <p className="text-neon-300">
                <span className="font-bold text-neon-100">{analytics.teamStats.length}</span> Teams
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-2 overflow-x-auto pb-2 -mb-2 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-neon-500 to-neon-400 text-dark-950 shadow-neon'
                    : 'text-neon-300 hover:text-neon-100 hover:bg-neon-500/10 border border-neon-500/30'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            <MatchesByYear data={analytics.matchesByYear} />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
              <div className="glass-effect p-4 sm:p-6 rounded-2xl sm:rounded-3xl hover:shadow-neon transition-all group">
                <p className="text-neon-400 text-xs font-medium uppercase tracking-wider mb-2 sm:mb-3">Total</p>
                <p className="text-2xl sm:text-4xl font-bold text-neon-100 group-hover:text-neon-300 transition-colors">{totalMatches}</p>
                <p className="text-neon-500/70 text-xs mt-2">Matches</p>
              </div>

              <div className="glass-effect p-4 sm:p-6 rounded-2xl sm:rounded-3xl hover:shadow-neon transition-all group">
                <p className="text-neon-400 text-xs font-medium uppercase tracking-wider mb-2 sm:mb-3">Teams</p>
                <p className="text-2xl sm:text-4xl font-bold text-neon-100 group-hover:text-neon-300 transition-colors">{analytics.teamStats.length}</p>
                <p className="text-neon-500/70 text-xs mt-2">Active</p>
              </div>

              <div className="glass-effect p-4 sm:p-6 rounded-2xl sm:rounded-3xl hover:shadow-neon transition-all group">
                <p className="text-neon-400 text-xs font-medium uppercase tracking-wider mb-2 sm:mb-3">Venue</p>
                <p className="text-lg sm:text-2xl font-bold text-neon-100 truncate group-hover:text-neon-300 transition-colors">{analytics.venueStats[0]?.venue?.split(',')[0] || 'N/A'}</p>
                <p className="text-neon-500/70 text-xs mt-2">{analytics.venueStats[0]?.matches || 0} events</p>
              </div>

              <div className="glass-effect p-4 sm:p-6 rounded-2xl sm:rounded-3xl hover:shadow-neon transition-all group">
                <p className="text-neon-400 text-xs font-medium uppercase tracking-wider mb-2 sm:mb-3">Leader</p>
                <p className="text-lg sm:text-2xl font-bold text-neon-100 truncate group-hover:text-neon-300 transition-colors">{analytics.teamStats[0]?.team?.split(' ')[0] || 'N/A'}</p>
                <p className="text-neon-500/70 text-xs mt-2">{analytics.teamStats[0]?.wins || 0} wins</p>
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
      <footer className="border-t border-neon-500/20 backdrop-blur-md mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <p className="text-neon-300 text-sm">IPL Cricket Analytics Dashboard</p>
          <p className="text-neon-500/60 text-xs mt-2">Futuristic • Minimal • Adaptive</p>
        </div>
      </footer>
    </div>
  );
}
