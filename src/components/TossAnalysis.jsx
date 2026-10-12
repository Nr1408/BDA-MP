import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const TossAnalysis = ({ data, resultTypes }) => {
  const COLORS = ['#0dd9ff', '#6b68ff', '#00b4d8', '#ec4899'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
        <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Toss Impact</h2>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <defs>
                <linearGradient id="winsGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="totalGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0dd9ff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6b68ff" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 217, 255, 0.1)" />
              <XAxis dataKey="decision" tick={{ fill: '#0dd9ff', opacity: 0.7 }} />
              <YAxis tick={{ fill: '#0dd9ff', opacity: 0.7 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 46, 0.9)',
                  border: '1px solid rgba(13, 217, 255, 0.3)',
                  borderRadius: '12px',
                  color: '#0dd9ff'
                }}
              />
              <Legend />
              <Bar dataKey="wins" fill="url(#winsGrad2)" name="Won" radius={[8, 8, 0, 0]} />
              <Bar dataKey="total" fill="url(#totalGrad2)" name="Total" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-neon-500 py-12">No data</div>
        )}

        {data && data.length > 0 && (
          <div className="mt-4 sm:mt-6 bg-neon-500/10 p-3 sm:p-4 rounded-lg space-y-2 border border-neon-500/20">
            {data.map((item, idx) => (
              <p key={idx} className="text-xs sm:text-sm">
                <span className="font-semibold text-neon-300">{item.decision}:</span>
                <span className="text-neon-100 ml-2">{item.winPercentage}%</span>
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
        <h2 className="text-xl sm:text-2xl font-bold text-neon-100 mb-6">Result Types</h2>
        {resultTypes && resultTypes.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={resultTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percentage }) => `${percentage}%`}
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
          <div className="text-center text-neon-500 py-12">No data</div>
        )}

        {resultTypes && resultTypes.length > 0 && (
          <div className="mt-4 sm:mt-6 bg-neon-500/10 p-3 sm:p-4 rounded-lg space-y-2 border border-neon-500/20">
            {resultTypes.map((item, idx) => (
              <p key={idx} className="text-xs sm:text-sm">
                <span className="font-semibold text-neon-300">{item.type}:</span>
                <span className="text-neon-100 ml-2">{item.count} ({item.percentage}%)</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
