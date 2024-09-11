import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import candidateData from '../data/candidateData.json';

ChartJS.register(ArcElement, Tooltip, Legend);

const Results = () => {
  // Aggregate votes by party
  const partyVotes = candidateData.reduce((acc, candidate) => {
    const party = candidate.partyName;
    if (!acc[party]) {
      acc[party] = 0;
    }
    acc[party] += candidate.votes || 0;
    return acc;
  }, {});

  // Prepare data for Pie chart
  const pieData = {
    labels: Object.keys(partyVotes),
    datasets: [
      {
        data: Object.values(partyVotes),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Election Results</h1>
      
      {/* Pie Chart */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Party Wise Distribution</h2>
        <Pie data={pieData} />
      </div>

      {/* Results Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Results by Party</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-4 text-left">Party Name</th>
              <th className="p-4 text-left">Votes</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(partyVotes).map(([partyName, votes], index) => (
              <tr key={index} className="border-b">
                <td className="p-4">{partyName}</td>
                <td className="p-4">{votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;

