import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const TopPlayers = ({ batsmen, bowlers }) => {
  const [activeTab, setActiveTab] = useState('batsmen');

  const data = activeTab === 'batsmen' ? (batsmen || []) : (bowlers || []);
  const chartKey = activeTab === 'batsmen' ? 'runs' : 'wickets';
  const title = activeTab === 'batsmen' ? 'Top 15 Batsmen (by Runs)' : 'Top 15 Bowlers (by Wickets)';

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-cricket-700 mb-4">{title}</h2>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('batsmen')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'batsmen'
              ? 'bg-cricket-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Batsmen
        </button>
        <button
          onClick={() => setActiveTab('bowlers')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'bowlers'
              ? 'bg-cricket-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Bowlers
        </button>
      </div>

      {data && data.length > 0 ? (
        <div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={activeTab === 'batsmen' ? 'batter' : 'bowler'}
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={11}
              />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey={chartKey}
                fill={activeTab === 'batsmen' ? '#0284c7' : '#f59e0b'}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Detailed Stats</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cricket-50">
                  <tr>
                    <th className="text-left p-2 font-semibold text-cricket-700">
                      {activeTab === 'batsmen' ? 'Batsman' : 'Bowler'}
                    </th>
                    {activeTab === 'batsmen' ? (
                      <>
                        <th className="text-left p-2 font-semibold text-cricket-700">Runs</th>
                        <th className="text-left p-2 font-semibold text-cricket-700">Balls</th>
                        <th className="text-left p-2 font-semibold text-cricket-700">SR</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left p-2 font-semibold text-cricket-700">Wickets</th>
                        <th className="text-left p-2 font-semibold text-cricket-700">Runs</th>
                        <th className="text-left p-2 font-semibold text-cricket-700">Economy</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((player, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-2 font-medium">
                        {activeTab === 'batsmen' ? player.batter : player.bowler}
                      </td>
                      {activeTab === 'batsmen' ? (
                        <>
                          <td className="p-2">{player.runs}</td>
                          <td className="p-2">{player.balls}</td>
                          <td className="p-2 text-cricket-600 font-semibold">{player.strikeRate}</td>
                        </>
                      ) : (
                        <>
                          <td className="p-2 font-semibold text-orange-600">{player.wickets}</td>
                          <td className="p-2">{player.runs}</td>
                          <td className="p-2 text-orange-600 font-semibold">{player.economy}</td>
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
        <div className="text-center text-gray-500 py-8">No data available</div>
      )}
    </div>
  );
};
