import { useState, useEffect } from 'react';
import { getStockData } from '../services/alphaVantage'; // Adjust the path as necessary

const useStockData = (symbols, cacheDuration = 30 * 60 * 1000) => { // Default cache duration is 30 minutes
  const [chartData, setChartData] = useState([]);
  const [lastFetch, setLastFetch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await Promise.all(
          symbols.map(async (symbol) => {
            const data = await getStockData(symbol);
            const timeSeries = data['Time Series (5min)'];

            if (!timeSeries) {
              console.error(`No time series data available for ${symbol}`);
              return null;
            }

            const labels = Object.keys(timeSeries).reverse();
            const openPrices = labels.map(label => parseFloat(timeSeries[label]['1. open']));
            const highPrices = labels.map(label => parseFloat(timeSeries[label]['2. high']));
            const lowPrices = labels.map(label => parseFloat(timeSeries[label]['3. low']));
            const closePrices = labels.map(label => parseFloat(timeSeries[label]['4. close']));

            // Calculate the min and max values for the y-axis
            const allPrices = [...openPrices, ...highPrices, ...lowPrices, ...closePrices];
            const minPrice = Math.min(...allPrices);
            const maxPrice = Math.max(...allPrices);
            const priceRange = maxPrice - minPrice;

            return {
              symbol,
              chartData: {
                labels,
                datasets: [
                  {
                    label: `Open Price of ${symbol}`,
                    data: openPrices,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    pointRadius: 0,
                    borderWidth: 2,
                  },
                  {
                    label: `High Price of ${symbol}`,
                    data: highPrices,
                    borderColor: 'rgba(255,99,132,1)',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    pointRadius: 0,
                    borderWidth: 2,
                  },
                  {
                    label: `Low Price of ${symbol}`,
                    data: lowPrices,
                    borderColor: 'rgba(54,162,235,1)',
                    backgroundColor: 'rgba(54,162,235,0.2)',
                    pointRadius: 0,
                    borderWidth: 2,
                  },
                  {
                    label: `Close Price of ${symbol}`,
                    data: closePrices,
                    borderColor: 'rgba(255,206,86,1)',
                    backgroundColor: 'rgba(255,206,86,0.2)',
                    pointRadius: 0,
                    borderWidth: 2,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: `Stock Prices for ${symbol}`,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      maxTicksLimit: 10, // Limit the number of x-axis labels
                    },
                  },
                  y: {
                    beginAtZero: false,
                    suggestedMin: minPrice - (priceRange * 0.1), // Add 10% padding below the lowest price
                    suggestedMax: maxPrice + (priceRange * 0.1), // Add 10% padding above the highest price
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toFixed(2);
                      },
                    },
                  },
                },
              },
            };
          })
        );

        const validData = allData.filter(data => data !== null);
        setChartData(validData);
        setLastFetch(Date.now());
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    const now = Date.now();
    if (!lastFetch || (now - lastFetch) >= cacheDuration) {
      fetchData();
    }
  }, [symbols, lastFetch, cacheDuration]);

  return chartData;
};

export default useStockData;