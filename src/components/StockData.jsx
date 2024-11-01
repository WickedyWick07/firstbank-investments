import React from 'react';
import { Line } from 'react-chartjs-2';
import useStockData from '../../hooks/useStockData'; // Adjust the path as necessary

const StockData = ({ symbols }) => {
  // Use the custom hook to fetch and cache stock data
  const stockData = useStockData(symbols);

  // Check if stockData is available and contains data
  if (!stockData || stockData.length === 0) {
    return (
      <div className="w-full p-6 bg-gray-100 rounded-lg shadow-md">
        <p className="text-center text-gray-600 text-xl">Data is not available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {stockData.map(({ symbol, chartData, options }) => (
        <div key={symbol} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Stock Chart for {symbol}</h2>
          <div className="h-[400px] w-full">
            <Line 
              data={chartData} 
              options={{
                ...options,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  ...options.plugins,
                  legend: {
                    position: 'top',
                    labels: {
                      boxWidth: 20,
                      padding: 10,
                      usePointStyle: true,
                    },
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                hover: {
                  mode: 'nearest',
                  intersect: true,
                },
              }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockData;