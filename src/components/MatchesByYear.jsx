import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const MatchesByYear = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-gray-500">Loading data...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-cricket-700 mb-4">Matches per Season</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="season" angle={-45} textAnchor="end" height={80} fontSize={12} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="matches" fill="#0284c7" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
