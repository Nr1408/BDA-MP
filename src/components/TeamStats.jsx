import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0284c7', '#dc2626', '#16a34a', '#ea580c', '#7c3aed', '#06b6d4', '#f59e0b', '#8b5cf6'];

export const TeamStats = ({ data }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  if (!data || data.length === 0) return <div className="p-4 text-gray-500">Loading data...</div>;

  const chartData = data.slice(0, 10);
  const selectedTeamData = selectedTeam ? data.find(t => t.team === selectedTeam) : null;
  const pieData = selectedTeamData ? [
    { name: 'Wins', value: selectedTeamData.wins },
    { name: 'Losses', value: selectedTeamData.losses }
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-cricket-700 mb-4">Top 10 Teams by Wins</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="team" angle={-45} textAnchor="end" height={80} fontSize={11} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="wins" fill="#16a34a" name="Wins" />
            <Bar dataKey="losses" fill="#dc2626" name="Losses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-cricket-700 mb-4">Team Performance</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            value={selectedTeam || ''}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cricket-500"
          >
            <option value="">Select a team...</option>
            {data.map(team => (
              <option key={team.team} value={team.team}>
                {team.team}
              </option>
            ))}
          </select>
        </div>
        {selectedTeamData ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={200}>
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
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm"><span className="font-semibold">Team:</span> {selectedTeamData.team}</p>
              <p className="text-sm"><span className="font-semibold">Wins:</span> {selectedTeamData.wins}</p>
              <p className="text-sm"><span className="font-semibold">Losses:</span> {selectedTeamData.losses}</p>
              <p className="text-sm"><span className="font-semibold">Total Matches:</span> {selectedTeamData.total}</p>
              <p className="text-sm"><span className="font-semibold">Win Rate:</span> {((selectedTeamData.wins / selectedTeamData.total) * 100).toFixed(1)}%</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">Select a team to view details</div>
        )}
      </div>
    </div>
  );
};
