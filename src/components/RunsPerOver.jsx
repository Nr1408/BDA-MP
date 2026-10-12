import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RunsPerOver = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-neon-400">Loading data...</div>;

  const avgHighest = Math.max(...data.map(d => parseFloat(d.avgRuns))).toFixed(2);
  const avgLowest = Math.min(...data.map(d => parseFloat(d.avgRuns))).toFixed(2);
  const avgOverall = (data.reduce((sum, d) => sum + parseFloat(d.avgRuns), 0) / data.length).toFixed(2);

  return (
    <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
      <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Scoring Trend</h2>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0dd9ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0dd9ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 217, 255, 0.1)" />
          <XAxis
            dataKey="over"
            label={{ value: 'Over', position: 'insideBottomRight', offset: -10 }}
            tick={{ fill: '#0dd9ff', opacity: 0.7 }}
          />
          <YAxis
            label={{ value: 'Avg Runs', angle: -90, position: 'insideLeft' }}
            tick={{ fill: '#0dd9ff', opacity: 0.7 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(26, 26, 46, 0.9)',
              border: '1px solid rgba(13, 217, 255, 0.3)',
              borderRadius: '12px',
              color: '#0dd9ff'
            }}
          />
          <Area
            type="monotone"
            dataKey="avgRuns"
            stroke="#0dd9ff"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#scoreGrad)"
            name="Average Runs"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
        <div className="bg-neon-500/10 p-3 sm:p-4 rounded-lg border border-neon-500/20 text-center">
          <p className="text-neon-400 text-xs font-medium uppercase tracking-wider mb-1 sm:mb-2">High</p>
          <p className="text-xl sm:text-3xl font-bold text-neon-300">{avgHighest}</p>
        </div>
        <div className="bg-neon-500/10 p-3 sm:p-4 rounded-lg border border-neon-500/20 text-center">
          <p className="text-neon-400 text-xs font-medium uppercase tracking-wider mb-1 sm:mb-2">Avg</p>
          <p className="text-xl sm:text-3xl font-bold text-neon-100">{avgOverall}</p>
        </div>
        <div className="bg-neon-500/10 p-3 sm:p-4 rounded-lg border border-neon-500/20 text-center">
          <p className="text-neon-400 text-xs font-medium uppercase tracking-wider mb-1 sm:mb-2">Low</p>
          <p className="text-xl sm:text-3xl font-bold text-neon-300">{avgLowest}</p>
        </div>
      </div>
    </div>
  );
};
