import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const TeamStats = ({ data }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  if (!data || data.length === 0) return <div className="p-4 text-slate-400">Loading...</div>;

  const chartData = data.slice(0, 10);
  const selectedTeamData = selectedTeam ? data.find(t => t.team === selectedTeam) : null;
  const pieData = selectedTeamData ? [
    { name: 'Wins', value: selectedTeamData.wins },
    { name: 'Losses', value: selectedTeamData.losses }
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Top Teams by Wins</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="team"
              angle={-45}
              textAnchor="end"
              height={90}
              fontSize={10}
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                color: '#1e293b',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
              cursor={{ fill: 'rgba(59,130,246,0.06)' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
            <Bar dataKey="wins" fill="#10b981" name="Wins" radius={[5, 5, 0, 0]} />
            <Bar dataKey="losses" fill="#f43f5e" name="Losses" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Team Performance</h2>
        <select
          value={selectedTeam || ''}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full p-2.5 sm:p-3 mb-5 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="">Select a team…</option>
          {data.map(team => (
            <option key={team.team} value={team.team}>{team.team}</option>
          ))}
        </select>

        {selectedTeamData ? (
          <div className="space-y-4 sm:space-y-5">
            <div className="h-48 sm:h-52 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={70}
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#f43f5e" />
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 space-y-2">
              <p className="text-xs sm:text-sm"><span className="text-slate-500 font-medium">Team: </span><span className="text-slate-900 font-semibold">{selectedTeamData.team}</span></p>
              <p className="text-xs sm:text-sm"><span className="text-slate-500 font-medium">Wins: </span><span className="text-emerald-600 font-bold">{selectedTeamData.wins}</span></p>
              <p className="text-xs sm:text-sm"><span className="text-slate-500 font-medium">Losses: </span><span className="text-rose-600 font-bold">{selectedTeamData.losses}</span></p>
              <p className="text-xs sm:text-sm"><span className="text-slate-500 font-medium">Win Rate: </span><span className="text-blue-600 font-bold">{((selectedTeamData.wins / selectedTeamData.total) * 100).toFixed(1)}%</span></p>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-400 py-12 text-sm">Select a team to see details</div>
        )}
      </div>
    </div>
  );
};
