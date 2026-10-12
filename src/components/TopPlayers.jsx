import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const TopPlayers = ({ batsmen, bowlers }) => {
  const [activeTab, setActiveTab] = useState('batsmen');

  const data = activeTab === 'batsmen' ? (batsmen || []) : (bowlers || []);
  const chartKey = activeTab === 'batsmen' ? 'runs' : 'wickets';
  const title = activeTab === 'batsmen' ? 'Top Batsmen' : 'Top Bowlers';

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('batsmen')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'batsmen'
                ? 'bg-cricket-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            Batsmen
          </button>
          <button
            onClick={() => setActiveTab('bowlers')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'bowlers'
                ? 'bg-cricket-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            Bowlers
          </button>
        </div>
      </div>

      {data && data.length > 0 ? (
        <div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 100 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey={activeTab === 'batsmen' ? 'batter' : 'bowler'}
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
                dataKey={chartKey}
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Detailed Stats</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">
                      {activeTab === 'batsmen' ? 'Batsman' : 'Bowler'}
                    </th>
                    {activeTab === 'batsmen' ? (
                      <>
                        <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Runs</th>
                        <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Balls</th>
                        <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Strike Rate</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Wickets</th>
                        <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Runs</th>
                        <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Economy</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((player, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-medium text-slate-900">
                        {activeTab === 'batsmen' ? player.batter : player.bowler}
                      </td>
                      {activeTab === 'batsmen' ? (
                        <>
                          <td className="p-3 text-slate-600">{player.runs}</td>
                          <td className="p-3 text-slate-600">{player.balls}</td>
                          <td className="p-3 font-semibold text-cricket-600">{player.strikeRate}</td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 font-semibold text-slate-900">{player.wickets}</td>
                          <td className="p-3 text-slate-600">{player.runs}</td>
                          <td className="p-3 font-semibold text-orange-600">{player.economy}</td>
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
        <div className="text-center text-slate-500 py-12">No data available</div>
      )}
    </div>
  );
};
