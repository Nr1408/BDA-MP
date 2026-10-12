import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const VenueStats = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-slate-500">Loading data...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Matches by Venue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
            <defs>
              <linearGradient id="venueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284c7" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#0284c7" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="venue"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={11}
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
            <Bar dataKey="matches" fill="url(#venueGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Win Type by Venue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
            <defs>
              <linearGradient id="runsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="wicketsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dc2626" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="venue"
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={11}
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
            <Bar dataKey="runsWins" fill="url(#runsGradient)" name="Runs Wins" radius={[8, 8, 0, 0]} />
            <Bar dataKey="wicketsWins" fill="url(#wicketsGradient)" name="Wickets Wins" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Venue Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Venue</th>
                <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Matches</th>
                <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Runs Wins</th>
                <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Wickets Wins</th>
                <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Runs %</th>
                <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Wickets %</th>
              </tr>
            </thead>
            <tbody>
              {data.map((venue, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-medium text-slate-900">{venue.venue}</td>
                  <td className="p-3 text-slate-600">{venue.matches}</td>
                  <td className="p-3 font-semibold text-green-600">{venue.runsWins}</td>
                  <td className="p-3 font-semibold text-red-600">{venue.wicketsWins}</td>
                  <td className="p-3 text-slate-600">{venue.runsPercentage}%</td>
                  <td className="p-3 text-slate-600">{venue.wicketsPercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
