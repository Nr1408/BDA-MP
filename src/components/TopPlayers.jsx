import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const TopPlayers = ({ batsmen, bowlers }) => {
  const [activeTab, setActiveTab] = useState('batsmen');

  const data = activeTab === 'batsmen' ? (batsmen || []) : (bowlers || []);
  const chartKey = activeTab === 'batsmen' ? 'runs' : 'wickets';
  const title = activeTab === 'batsmen' ? 'Top Batsmen' : 'Top Bowlers';

  return (
    <div className="card p-5 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('batsmen')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${activeTab === 'batsmen'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
          >
            Batsmen
          </button>
          <button
            onClick={() => setActiveTab('bowlers')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${activeTab === 'bowlers'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
          >
            Bowlers
          </button>
        </div>
      </div>

      {data && data.length > 0 ? (
        <div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 80 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey={activeTab === 'batsmen' ? 'batter' : 'bowler'}
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
              <Bar dataKey={chartKey} fill="url(#barGrad)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6">
            <h3 className="text-slate-700 font-semibold mb-3 text-sm">Top 10</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-2 sm:p-3 font-semibold text-slate-500">
                      {activeTab === 'batsmen' ? 'Batsman' : 'Bowler'}
                    </th>
                    {activeTab === 'batsmen' ? (
                      <>
                        <th className="text-left p-2 sm:p-3 font-semibold text-slate-500">Runs</th>
                        <th className="hidden sm:table-cell text-left p-2 sm:p-3 font-semibold text-slate-500">SR</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left p-2 sm:p-3 font-semibold text-slate-500">Wkts</th>
                        <th className="hidden sm:table-cell text-left p-2 sm:p-3 font-semibold text-slate-500">Eco</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((player, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-2 sm:p-3 font-medium text-slate-900 truncate">
                        {activeTab === 'batsmen' ? player.batter : player.bowler}
                      </td>
                      {activeTab === 'batsmen' ? (
                        <>
                          <td className="p-2 sm:p-3 text-slate-700 font-semibold">{player.runs}</td>
                          <td className="hidden sm:table-cell p-2 sm:p-3 text-slate-500 font-semibold">{player.strikeRate}</td>
                        </>
                      ) : (
                        <>
                          <td className="p-2 sm:p-3 text-slate-700 font-semibold">{player.wickets}</td>
                          <td className="hidden sm:table-cell p-2 sm:p-3 text-slate-500 font-semibold">{player.economy}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-400 py-12 text-sm">No data available</div>
      )}
    </div>
  );
};
