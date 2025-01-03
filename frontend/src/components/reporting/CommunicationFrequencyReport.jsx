import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CommunicationFrequencyReport({ data }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Communication Frequency',
        data: Object.values(data),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Communication Frequency Report</h3>
      <div className="flex justify-center">
        <div style={{ width: '900px', height: '500px' }}>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
}

