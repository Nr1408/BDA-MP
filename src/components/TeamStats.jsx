import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0dd9ff', '#6b68ff', '#00b4d8', '#ec4899', '#f472b6', '#43e4ff', '#0096c7', '#be123c'];

export const TeamStats = ({ data }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  if (!data || data.length === 0) return <div className="p-4 text-neon-400">Loading...</div>;

  const chartData = data.slice(0, 10);
  const selectedTeamData = selectedTeam ? data.find(t => t.team === selectedTeam) : null;
  const pieData = selectedTeamData ? [
    { name: 'Wins', value: selectedTeamData.wins },
    { name: 'Losses', value: selectedTeamData.losses }
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
        <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Top Teams</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 80 }}>
            <defs>
              <linearGradient id="winsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="lossesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dc2626" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 217, 255, 0.1)" />
            <XAxis
              dataKey="team"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={11}
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
            <Bar dataKey="wins" fill="url(#winsGrad)" name="Wins" radius={[8, 8, 0, 0]} />
            <Bar dataKey="losses" fill="url(#lossesGrad)" name="Losses" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
        <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Performance</h2>
        <select
          value={selectedTeam || ''}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full p-2 sm:p-3 mb-4 sm:mb-6 bg-dark-800 border border-neon-500/30 rounded-lg focus:border-neon-500 text-neon-100 text-xs sm:text-sm transition-colors"
        >
          <option value="">Select a team...</option>
          {data.map(team => (
            <option key={team.team} value={team.team}>
              {team.team}
            </option>
          ))}
        </select>

        {selectedTeamData ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="h-48 sm:h-56 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#16a34a" />
                    <Cell fill="#dc2626" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-neon-500/10 p-3 sm:p-4 rounded-lg space-y-2 border border-neon-500/20">
              <p className="text-xs sm:text-sm"><span className="font-semibold text-neon-300">Team:</span> <span className="text-neon-100">{selectedTeamData.team}</span></p>
              <p className="text-xs sm:text-sm"><span className="font-semibold text-neon-300">Wins:</span> <span className="text-green-400 font-bold">{selectedTeamData.wins}</span></p>
              <p className="text-xs sm:text-sm"><span className="font-semibold text-neon-300">Losses:</span> <span className="text-red-400 font-bold">{selectedTeamData.losses}</span></p>
              <p className="text-xs sm:text-sm"><span className="font-semibold text-neon-300">Win Rate:</span> <span className="text-neon-300 font-bold">{((selectedTeamData.wins / selectedTeamData.total) * 100).toFixed(1)}%</span></p>
            </div>
          </div>
        ) : (
          <div className="text-center text-neon-500/50 py-12">Select a team</div>
        )}
      </div>
    </div>
  );
};
