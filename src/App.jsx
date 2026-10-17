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
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="spinner mb-5 mx-auto"></div>
          <p className="text-slate-500 text-sm font-medium tracking-wide">Loading Analytics…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="card p-8 max-w-md mx-4">
          <div className="text-2xl mb-3">⚠️</div>
          <p className="font-semibold text-slate-800 mb-1">Unable to Load Data</p>
          <p className="text-slate-500 text-sm">{error}</p>
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
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <img
                src="/ipl-logo.png"
                alt="IPL logo"
                className="h-10 w-14 sm:h-12 sm:w-16 object-contain"
              />
              <div>
                <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">IPL Analytics</h1>
                <p className="text-xs text-slate-500 leading-tight hidden sm:block">Cricket Performance Insights</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="font-bold text-slate-900 leading-tight">{totalMatches}</p>
                <p className="text-slate-500 text-xs">Matches</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-center">
                <p className="font-bold text-slate-900 leading-tight">{analytics.teamStats.length}</p>
                <p className="text-slate-500 text-xs">Teams</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex gap-1 overflow-x-auto pb-0 -mb-px" aria-label="Dashboard sections">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-5 py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <MatchesByYear data={analytics.matchesByYear} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card p-5 sm:p-6">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Total</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">{totalMatches}</p>
                <p className="text-slate-400 text-xs mt-1">Matches played</p>
              </div>
              <div className="card p-5 sm:p-6">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Teams</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">{analytics.teamStats.length}</p>
                <p className="text-slate-400 text-xs mt-1">Active franchises</p>
              </div>
              <div className="card p-5 sm:p-6">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Top Venue</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 truncate">{analytics.venueStats[0]?.venue?.split(',')[0] || 'N/A'}</p>
                <p className="text-slate-400 text-xs mt-1">{analytics.venueStats[0]?.matches || 0} matches</p>
              </div>
              <div className="card p-5 sm:p-6">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Leader</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 truncate">{analytics.teamStats[0]?.team?.split(' ')[0] || 'N/A'}</p>
                <p className="text-slate-400 text-xs mt-1">{analytics.teamStats[0]?.wins || 0} wins</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="space-y-6">
            <TeamStats data={analytics.teamStats} />
          </div>
        )}

        {activeTab === 'players' && (
          <div className="space-y-6">
            <TopPlayers batsmen={analytics.topBatsmen} bowlers={analytics.topBowlers} />
            <RunsPerOver data={analytics.runsPerOver} />
          </div>
        )}

        {activeTab === 'venues' && (
          <div className="space-y-6">
            <VenueStats data={analytics.venueStats} />
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <TossAnalysis data={analytics.tossAnalysis} resultTypes={analytics.resultTypes} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-slate-500 text-sm">IPL Cricket Analytics Dashboard</p>
          <p className="text-slate-400 text-xs mt-1">Data-driven insights · Professional · Minimal</p>
        </div>
      </footer>
    </div>
  );
}
