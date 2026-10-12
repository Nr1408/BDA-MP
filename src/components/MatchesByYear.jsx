import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MatchesByYear = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-slate-400">Loading...</div>;

  return (
    <div className="card p-5 sm:p-8">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Matches per Season</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 80 }}>
          <defs>
            <linearGradient id="seasonGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="season"
            angle={-45}
            textAnchor="end"
            height={90}
            fontSize={11}
            tick={{ fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
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
          <Bar dataKey="matches" fill="url(#seasonGrad)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
