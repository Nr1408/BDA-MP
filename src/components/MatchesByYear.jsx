import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MatchesByYear = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-slate-500">Loading...</div>;

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Matches per Season</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
          <defs>
            <linearGradient id="seasonGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#0284c7" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="season"
            angle={-45}
            textAnchor="end"
            height={100}
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
          <Bar
            dataKey="matches"
            fill="url(#seasonGradient)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
