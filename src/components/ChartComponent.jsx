import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import api from '../../services/api';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const ChartComponent = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await api.get('/transactions/history/');
      setTransactionData(response.data);
    } catch (error) {
      console.error('Failed to fetch transaction data', error);
    }
  };

  const transformDataForChart = (data) => {
    return {
      labels: data.map(transaction => new Date(transaction.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Transaction Amount',
          data: data.map(transaction => transaction.amount),
          borderColor: '#FFD700', // primaryGold
          backgroundColor: 'rgba(255, 215, 0, 0.2)', // primaryGold with opacity
          fill: true,
        },
      ],
    };
  };

  const chartData = transformDataForChart(transactionData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF', // White text for better visibility
        },
      },
      title: {
        display: true,
        text: 'Transaction History',
        color: '#FFFFFF', // White text for better visibility
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lighter grid lines
        },
        ticks: {
          color: '#FFFFFF', // White text for better visibility
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Lighter grid lines
        },
        ticks: {
          color: '#FFFFFF', // White text for better visibility
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-primaryBlue to-secondBlue hover:from-blue-600 shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out">
    <h3 className="text-xl font-bold mb-4 text-primaryGold">Transaction History</h3>
    <div className="bg-black p-4 rounded-lg">
      <Line data={chartData} options={options} />
    </div>
  </div>
  
  );
};

export default ChartComponent;