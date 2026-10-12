import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const TopPlayers = ({ batsmen, bowlers }) => {
  const [activeTab, setActiveTab] = useState('batsmen');

  const data = activeTab === 'batsmen' ? (batsmen || []) : (bowlers || []);
  const chartKey = activeTab === 'batsmen' ? 'runs' : 'wickets';
  const title = activeTab === 'batsmen' ? 'Top Batsmen' : 'Top Bowlers';

  return (
    <div className="glass-effect p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-neon-500/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neon-100">{title}</h2>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('batsmen')}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${activeTab === 'batsmen'
                ? 'bg-gradient-to-r from-neon-500 to-neon-400 text-dark-950 shadow-neon'
                : 'text-neon-300 border border-neon-500/30 hover:border-neon-500/60'
              }`}
          >
            Batsmen
          </button>
          <button
            onClick={() => setActiveTab('bowlers')}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${activeTab === 'bowlers'
                ? 'bg-gradient-to-r from-neon-500 to-neon-400 text-dark-950 shadow-neon'
                : 'text-neon-300 border border-neon-500/30 hover:border-neon-500/60'
              }`}
          >
            Bowlers
          </button>
        </div>
      </div>

      {data && data.length > 0 ? (
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 80 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0dd9ff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#6b68ff" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 217, 255, 0.1)" />
              <XAxis
                dataKey={activeTab === 'batsmen' ? 'batter' : 'bowler'}
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
              <Bar dataKey={chartKey} fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 sm:mt-8">
            <h3 className="text-neon-100 font-bold mb-4 text-sm sm:text-base">Top 10</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-neon-500/30">
                    <th className="text-left p-2 sm:p-3 font-semibold text-neon-400">
                      {activeTab === 'batsmen' ? 'Batsman' : 'Bowler'}
                    </th>
                    {activeTab === 'batsmen' ? (
                      <>
                        <th className="text-left p-2 sm:p-3 font-semibold text-neon-400">Runs</th>
                        <th className="hidden sm:table-cell text-left p-2 sm:p-3 font-semibold text-neon-400">SR</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left p-2 sm:p-3 font-semibold text-neon-400">Wkts</th>
                        <th className="hidden sm:table-cell text-left p-2 sm:p-3 font-semibold text-neon-400">Eco</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((player, idx) => (
                    <tr key={idx} className="border-b border-neon-500/10 hover:bg-neon-500/5 transition-colors">
                      <td className="p-2 sm:p-3 font-medium text-neon-100 truncate">
                        {activeTab === 'batsmen' ? player.batter : player.bowler}
                      </td>
                      {activeTab === 'batsmen' ? (
                        <>
                          <td className="p-2 sm:p-3 text-neon-300">{player.runs}</td>
                          <td className="hidden sm:table-cell p-2 sm:p-3 text-neon-400 font-semibold">{player.strikeRate}</td>
                        </>
                      ) : (
                        <>
                          <td className="p-2 sm:p-3 text-neon-300 font-semibold">{player.wickets}</td>
                          <td className="hidden sm:table-cell p-2 sm:p-3 text-neon-400 font-semibold">{player.economy}</td>
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
        <div className="text-center text-neon-500 py-12">No data available</div>
      )}
    </div>
  );
};
