import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RunsPerOver = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-slate-400">Loading data...</div>;

  const avgHighest = Math.max(...data.map(d => parseFloat(d.avgRuns))).toFixed(2);
  const avgLowest = Math.min(...data.map(d => parseFloat(d.avgRuns))).toFixed(2);
  const avgOverall = (data.reduce((sum, d) => sum + parseFloat(d.avgRuns), 0) / data.length).toFixed(2);

  return (
    <div className="card p-5 sm:p-8">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Scoring Trend by Over</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="over"
            label={{ value: 'Over', position: 'insideBottomRight', offset: -5, fill: '#94a3b8', fontSize: 11 }}
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            label={{ value: 'Avg Runs', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
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
            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="avgRuns"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#scoreGrad)"
            name="Average Runs"
            dot={false}
            activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100 text-center">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Peak</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{avgHighest}</p>
        </div>
        <div className="bg-blue-50 p-3 sm:p-4 rounded-xl border border-blue-100 text-center">
          <p className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-1">Average</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-700">{avgOverall}</p>
        </div>
        <div className="bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100 text-center">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Low</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900">{avgLowest}</p>
        </div>
      </div>
    </div>
  );
};
