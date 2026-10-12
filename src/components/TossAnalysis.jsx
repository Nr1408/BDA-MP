import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const TossAnalysis = ({ data, resultTypes }) => {
  const COLORS = ['#0284c7', '#dc2626', '#16a34a', '#ea580c'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Toss Decision Impact</h2>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <defs>
                <linearGradient id="winsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="decision" tick={{ fill: '#64748b' }} />
              <YAxis tick={{ fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="wins" fill="url(#winsGrad)" name="Toss Winner Won" radius={[8, 8, 0, 0]} />
              <Bar dataKey="total" fill="url(#totalGrad)" name="Total Matches" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-slate-500 py-12">No data available</div>
        )}

        {data && data.length > 0 && (
          <div className="mt-6 bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-200">
            {data.map((item, idx) => (
              <p key={idx} className="text-sm">
                <span className="font-semibold text-slate-900">{item.decision} First:</span>
                <span className="text-slate-600 ml-2">{item.winPercentage}% win rate</span>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Match Result Types</h2>
        {resultTypes && resultTypes.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={resultTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percentage }) => `${type}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {resultTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-slate-500 py-12">No data available</div>
        )}

        {resultTypes && resultTypes.length > 0 && (
          <div className="mt-6 bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-200">
            {resultTypes.map((item, idx) => (
              <p key={idx} className="text-sm">
                <span className="font-semibold text-slate-900">{item.type}:</span>
                <span className="text-slate-600 ml-2">{item.count} matches ({item.percentage}%)</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
