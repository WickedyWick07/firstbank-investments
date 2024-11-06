import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import api from '../../services/api';
import { useMediaQuery } from 'react-responsive';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const ChartComponent = () => {
  const [transactionData, setTransactionData] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

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

  const transformDataForChart = (data) => ({
    labels: data.map(transaction => new Date(transaction.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Transaction Amount',
        data: data.map(transaction => transaction.amount),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        fill: true,
      },
    ],
  });

  const chartData = transformDataForChart(transactionData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Allow chart to resize freely
    aspectRatio: isMobile ? 1 : 2,  // Use a 1:1 ratio on mobile, 2:1 on larger screens
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF',
        },
      },
      title: {
        display: true,
        text: 'Transaction History',
        color: '#FFFFFF',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#FFFFFF',
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-r from-primaryBlue to-secondBlue shadow-lg p-6 rounded-lg transition-all duration-300 ease-in-out">
      <h3 className="text-xl font-bold mb-4 text-primaryGold">Transaction History</h3>
      <div className="bg-black p-4 rounded-lg" style={{ height: isMobile ? '250px' : '400px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
