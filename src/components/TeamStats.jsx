import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0284c7', '#dc2626', '#16a34a', '#ea580c', '#7c3aed', '#06b6d4', '#f59e0b', '#8b5cf6'];

export const TeamStats = ({ data }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  if (!data || data.length === 0) return <div className="p-4 text-slate-500">Loading...</div>;

  const chartData = data.slice(0, 10);
  const selectedTeamData = selectedTeam ? data.find(t => t.team === selectedTeam) : null;
  const pieData = selectedTeamData ? [
    { name: 'Wins', value: selectedTeamData.wins },
    { name: 'Losses', value: selectedTeamData.losses }
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Teams</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
            <defs>
              <linearGradient id="winsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="lossesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dc2626" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="team"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
              tick={{ fill: '#64748b' }}
            />
            <YAxis tick={{ fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="wins" fill="url(#winsGradient)" name="Wins" radius={[8, 8, 0, 0]} />
            <Bar dataKey="losses" fill="url(#lossesGradient)" name="Losses" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Team Performance</h2>
        <select
          value={selectedTeam || ''}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cricket-600 mb-6 bg-white text-slate-900"
        >
          <option value="">Select a team...</option>
          {data.map(team => (
            <option key={team.team} value={team.team}>
              {team.team}
            </option>
          ))}
        </select>

        {selectedTeamData ? (
          <div className="space-y-6">
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
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
            <div className="bg-slate-50 p-4 rounded-lg space-y-2 border border-slate-200">
              <p className="text-sm"><span className="font-semibold text-slate-900">Team:</span> <span className="text-slate-600">{selectedTeamData.team}</span></p>
              <p className="text-sm"><span className="font-semibold text-slate-900">Wins:</span> <span className="text-green-600 font-semibold">{selectedTeamData.wins}</span></p>
              <p className="text-sm"><span className="font-semibold text-slate-900">Losses:</span> <span className="text-red-600 font-semibold">{selectedTeamData.losses}</span></p>
              <p className="text-sm"><span className="font-semibold text-slate-900">Total:</span> <span className="text-slate-600">{selectedTeamData.total}</span></p>
              <p className="text-sm"><span className="font-semibold text-slate-900">Win Rate:</span> <span className="text-cricket-600 font-semibold">{((selectedTeamData.wins / selectedTeamData.total) * 100).toFixed(1)}%</span></p>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-400 py-12">Select a team to view details</div>
        )}
      </div>
    </div>
  );
};
