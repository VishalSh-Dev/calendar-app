import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function OverdueCommunicationTrends({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Days Overdue',
        data: Object.values(data),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Overdue Communication Trends</h3>
      <div className="flex justify-center">
        <div style={{ width: '900px', height: '500px' }}>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
}

