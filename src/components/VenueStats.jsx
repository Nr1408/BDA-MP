import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const VenueStats = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-neon-400">Loading data...</div>;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
          <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Matches by Venue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 80 }}>
              <defs>
                <linearGradient id="venueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0dd9ff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6b68ff" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 217, 255, 0.1)" />
              <XAxis
                dataKey="venue"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={10}
                tick={{ fill: '#0dd9ff', opacity: 0.7 }}
              />
              <YAxis tick={{ fill: '#0dd9ff', opacity: 0.7 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 46, 0.9)',
                  border: '1px solid rgba(13, 217, 255, 0.3)',
                  borderRadius: '12px',
                  color: '#0dd9ff'
                }}
              />
              <Bar dataKey="matches" fill="url(#venueGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
          <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Win Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 80 }}>
              <defs>
                <linearGradient id="runsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="wicketsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 217, 255, 0.1)" />
              <XAxis
                dataKey="venue"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={10}
                tick={{ fill: '#0dd9ff', opacity: 0.7 }}
              />
              <YAxis tick={{ fill: '#0dd9ff', opacity: 0.7 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 46, 0.9)',
                  border: '1px solid rgba(13, 217, 255, 0.3)',
                  borderRadius: '12px',
                  color: '#0dd9ff'
                }}
              />
              <Legend />
              <Bar dataKey="runsWins" fill="url(#runsGrad)" name="Runs" radius={[8, 8, 0, 0]} />
              <Bar dataKey="wicketsWins" fill="url(#wicketsGrad)" name="Wickets" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
        <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Venue Analytics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-neon-500/30">
                <th className="text-left p-2 sm:p-3 font-semibold text-neon-400">Venue</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-neon-400 hidden sm:table-cell">Match</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-neon-400">Runs</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-neon-400 hidden sm:table-cell">Wkts</th>
              </tr>
            </thead>
            <tbody>
              {data.map((venue, idx) => (
                <tr key={idx} className="border-b border-neon-500/10 hover:bg-neon-500/5 transition-colors">
                  <td className="p-2 sm:p-3 font-medium text-neon-100 truncate text-xs sm:text-sm">{venue.venue}</td>
                  <td className="p-2 sm:p-3 text-neon-300 hidden sm:table-cell">{venue.matches}</td>
                  <td className="p-2 sm:p-3 text-green-400 font-semibold">{venue.runsPercentage}%</td>
                  <td className="p-2 sm:p-3 text-red-400 font-semibold hidden sm:table-cell">{venue.wicketsPercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
