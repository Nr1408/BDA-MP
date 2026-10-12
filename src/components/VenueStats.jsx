import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const VenueStats = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-slate-400">Loading data...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Matches by Venue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 80 }}>
              <defs>
                <linearGradient id="venueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="venue"
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
              <Bar dataKey="matches" fill="url(#venueGrad)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Win Types by Venue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="venue"
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
              <Bar dataKey="runsWins" fill="#10b981" name="Runs" radius={[5, 5, 0, 0]} />
              <Bar dataKey="wicketsWins" fill="#f43f5e" name="Wickets" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Venue Analytics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-2 sm:p-3 font-semibold text-slate-500">Venue</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-slate-500 hidden sm:table-cell">Matches</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-slate-500">By Runs</th>
                <th className="text-left p-2 sm:p-3 font-semibold text-slate-500 hidden sm:table-cell">By Wkts</th>
              </tr>
            </thead>
            <tbody>
              {data.map((venue, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-2 sm:p-3 font-medium text-slate-900 truncate text-xs sm:text-sm">{venue.venue}</td>
                  <td className="p-2 sm:p-3 text-slate-600 hidden sm:table-cell">{venue.matches}</td>
                  <td className="p-2 sm:p-3 text-emerald-600 font-semibold">{venue.runsPercentage}%</td>
                  <td className="p-2 sm:p-3 text-rose-600 font-semibold hidden sm:table-cell">{venue.wicketsPercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
