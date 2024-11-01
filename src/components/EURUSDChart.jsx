import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EURUSDChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = 'SzUzxdPLsdc1Q1C3Ogm1oQTt4zEEbBzB';
  const startDate = '2024-01-01';
  const endDate = '2024-12-31';
  
  const url = `https://api.polygon.io/v2/aggs/ticker/C:EURUSD/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&limit=5000&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data.results);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) return <p style={{ color: '#fff' }}>Loading data for GOOGL...</p>;
  if (error) return <p style={{ color: '#fff' }}>{error}</p>;

  return (
    <div className='bg-black rounded p-4'>
      <h3 className='text-primaryGold text-xl font-semibold uppercase mb-3'>Euro versus United States Dollar</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#666" />
          <XAxis dataKey="t" tickFormatter={(time) => new Date(time).toLocaleDateString()} tick={{ fontSize: 12, fill: '#fff' }} />
          <YAxis tick={{ fontSize: 12, fill: '#fff' }} />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
          <Legend />
          <Line type="monotone" dataKey="c" stroke="#FFD700" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EURUSDChart;
