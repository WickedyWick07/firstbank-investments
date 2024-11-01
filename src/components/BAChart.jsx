import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BAChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = 'SzUzxdPLsdc1Q1C3Ogm1oQTt4zEEbBzB';
  const startDate = '2024-01-01';
  const endDate = '2024-12-31';
  
  const url = `https://api.polygon.io/v2/aggs/ticker/BA/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&limit=5000&apiKey=${apiKey}`;

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

  if (loading) return <p>Loading data for BA...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>BA</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" tickFormatter={(time) => new Date(time).toLocaleDateString()} />
          <YAxis />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
          <Legend />
          <Line type="monotone" dataKey="c" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BAChart;
