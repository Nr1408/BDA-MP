import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const RunsPerOver = ({ data }) => {
  if (!data || data.length === 0) return <div className="p-4 text-gray-500">Loading data...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-cricket-700 mb-4">Average Runs per Over</h2>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="over"
            label={{ value: 'Over Number', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis label={{ value: 'Avg Runs', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="avgRuns"
            stroke="#0284c7"
            fillOpacity={1}
            fill="url(#colorRuns)"
            name="Average Runs"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">Highest Avg</p>
            <p className="text-xl font-bold text-cricket-600">
              {Math.max(...data.map(d => parseFloat(d.avgRuns))).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Lowest Avg</p>
            <p className="text-xl font-bold text-cricket-600">
              {Math.min(...data.map(d => parseFloat(d.avgRuns))).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Overall Avg</p>
            <p className="text-xl font-bold text-cricket-600">
              {(data.reduce((sum, d) => sum + parseFloat(d.avgRuns), 0) / data.length).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
