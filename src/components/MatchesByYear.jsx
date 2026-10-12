import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MatchesByYear = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-neon-400">Loading...</div>;

  return (
    <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
      <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Season Overview</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 80 }}>
          <defs>
            <linearGradient id="seasonGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0dd9ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6b68ff" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 217, 255, 0.1)" />
          <XAxis
            dataKey="season"
            angle={-45}
            textAnchor="end"
            height={100}
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
          <Bar
            dataKey="matches"
            fill="url(#seasonGrad)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
