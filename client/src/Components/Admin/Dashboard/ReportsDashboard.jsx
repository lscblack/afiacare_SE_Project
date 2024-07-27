import React from 'react';

const ReportsDashboard = () => {
  // Dummy report data
  const reports = [
    { id: 1, title: 'Monthly Usage Report', date: '2024-07-01' },
    { id: 2, title: 'User Activity Report', date: '2024-07-10' },
  ];

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Reports Dashboard</h2>
      <ul>
        {reports.map(report => (
          <li key={report.id} className="border-b py-2">
            <span className="font-semibold">{report.title}</span>
            <br />
            <span className="text-gray-600">Date: {report.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsDashboard;
