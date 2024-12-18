import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { useMediaQuery } from 'react-responsive';

const TransactionDiagram = () => {
  const [chartData, setChartData] = useState([]);

  // Media queries for responsive design
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await api.get('/transactions/history/');
        const transactions = response.data;
        processTransactionData(transactions);
      } catch (error) {
        console.error('Failed to fetch transaction data', error);
      }
    };

    fetchTransactionData();
  }, []);

  const processTransactionData = (transactions) => {
    const withdrawalTotal = transactions
      .filter(item => item.transaction_type === 'withdrawal')
      .reduce((acc, item) => acc + parseFloat(item.amount), 0);

    const depositTotal = transactions
      .filter(item => item.transaction_type === 'deposit')
      .reduce((acc, item) => acc + parseFloat(item.amount), 0);

    setChartData([
      { name: 'Withdrawals', value: withdrawalTotal },
      { name: 'Deposits', value: depositTotal },
    ]);
  };

  const colors = ['#FFD700', '#4169E1']; // primaryGold for Withdrawals, Royal Blue for Deposits

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow-md">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-primaryBlue">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Determine the height based on the device size
  const chartHeight = isDesktop ? 400 : isTablet ? 300 : 250;

  return (
    <div className='bg-gradient-to-br from-secondaryBlue to-primaryBlue shadow-lg p-6 rounded-lg text-white'>
      <h3 className='text-2xl font-bold mb-6 text-primaryGold text-center'>Transaction Breakdown</h3>
      <div className='bg-white bg-opacity-10 p-4 rounded-lg' style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionDiagram;
