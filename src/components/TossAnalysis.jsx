import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const TossAnalysis = ({ data, resultTypes }) => {
  const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Toss Decision Impact</h2>
        {data && data.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="decision" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
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
                <Bar dataKey="wins" fill="#10b981" name="Won" radius={[5, 5, 0, 0]} />
                <Bar dataKey="total" fill="#3b82f6" name="Total" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-5 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 space-y-2">
              {data.map((item, idx) => (
                <p key={idx} className="text-xs sm:text-sm">
                  <span className="text-slate-500 font-medium">{item.decision}:</span>
                  <span className="text-blue-600 font-bold ml-2">{item.winPercentage}% win rate</span>
                </p>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-slate-400 py-12 text-sm">No data</div>
        )}
      </div>

      <div className="card p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">Result Types</h2>
        {resultTypes && resultTypes.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={resultTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={75}
                  innerRadius={35}
                  dataKey="count"
                >
                  {resultTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    color: '#1e293b'
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {resultTypes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{item.type}</p>
                    <p className="text-xs text-slate-500">{item.count} ({item.percentage}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-slate-400 py-12 text-sm">No data</div>
        )}
      </div>
    </div>
  );
};
