import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function EngagementEffectivenessDashboard({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Engagement Effectiveness',
        data: Object.values(data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Engagement Effectiveness Dashboard</h3>
      <div className="flex justify-center">
        <div style={{ width: '500px', height: '500px' }}>
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
}

