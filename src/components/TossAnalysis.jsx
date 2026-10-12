import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const TossAnalysis = ({ data, resultTypes }) => {
  const COLORS = ['#0284c7', '#dc2626', '#16a34a', '#ea580c'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-cricket-700 mb-4">Toss Decision Impact</h2>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="decision" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="wins" fill="#16a34a" name="Toss Winner Won Match" radius={[8, 8, 0, 0]} />
              <Bar dataKey="total" fill="#0284c7" name="Total Matches" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-500 py-8">No data available</div>
        )}

        {data && data.length > 0 && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg space-y-2">
            {data.map((item, idx) => (
              <p key={idx} className="text-sm">
                <span className="font-semibold">{item.decision} First:</span> {item.winPercentage}% win rate
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-cricket-700 mb-4">Match Result Types</h2>
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
          <div className="text-center text-gray-500 py-8">No data available</div>
        )}

        {resultTypes && resultTypes.length > 0 && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg space-y-2">
            {resultTypes.map((item, idx) => (
              <p key={idx} className="text-sm">
                <span className="font-semibold">{item.type}:</span> {item.count} matches ({item.percentage}%)
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
