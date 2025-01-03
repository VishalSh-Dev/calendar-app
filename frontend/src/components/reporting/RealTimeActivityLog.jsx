import React from 'react';

export default function RealTimeActivityLog({ communications, companies }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
      <h3 className="text-xl font-bold mb-4">Real-Time Activity Log</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Communication Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {communications
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10)
            .map((comm, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(comm.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {companies.find((c) => c._id === comm.companyId)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {comm.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {comm.notes}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

