import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const VenueStats = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-gray-500">Loading data...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-cricket-700 mb-4">Matches by Venue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="venue" angle={-45} textAnchor="end" height={80} fontSize={10} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="matches" fill="#0284c7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-cricket-700 mb-4">Win Type by Venue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="venue" angle={-45} textAnchor="end" height={80} fontSize={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="runsWins" fill="#16a34a" name="Runs Wins" radius={[8, 8, 0, 0]} />
            <Bar dataKey="wicketsWins" fill="#dc2626" name="Wickets Wins" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg lg:col-span-2">
        <h2 className="text-2xl font-bold text-cricket-700 mb-4">Venue Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cricket-50">
              <tr>
                <th className="text-left p-2 font-semibold text-cricket-700">Venue</th>
                <th className="text-left p-2 font-semibold text-cricket-700">Matches</th>
                <th className="text-left p-2 font-semibold text-cricket-700">Runs Wins</th>
                <th className="text-left p-2 font-semibold text-cricket-700">Wickets Wins</th>
                <th className="text-left p-2 font-semibold text-cricket-700">Runs %</th>
                <th className="text-left p-2 font-semibold text-cricket-700">Wickets %</th>
              </tr>
            </thead>
            <tbody>
              {data.map((venue, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-2 font-medium">{venue.venue}</td>
                  <td className="p-2">{venue.matches}</td>
                  <td className="p-2 text-green-600 font-semibold">{venue.runsWins}</td>
                  <td className="p-2 text-red-600 font-semibold">{venue.wicketsWins}</td>
                  <td className="p-2">{venue.runsPercentage}%</td>
                  <td className="p-2">{venue.wicketsPercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
