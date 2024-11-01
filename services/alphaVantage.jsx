import axios from 'axios'

const API_KEY = '46B6MEWZ7DJ71HXY';
const BASE_URL = 'https://www.alphavantage.co/query'


export const getStockData = async (symbol) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol: symbol,
                interval: '5min',
                apikey: API_KEY
            }
        });

        // Check for rate limit message in response
        if (response.data['Information']) {
            console.error('API Response Message:', response.data['Information']);
            if (response.data['Information'].includes('rate limit')) {
                throw new Error('Rate limit exceeded');
            }
        }

        const rateLimit = response.headers['x-ratelimit-limit'];
        const rateLimitRemaining = response.headers['x-ratelimit-remaining'];
        const rateLimitReset = response.headers['x-ratelimit-reset'];

        console.log(`Rate Limit: ${rateLimit}`);
        console.log(`Rate Limit Remaining: ${rateLimitRemaining}`);
        console.log(`Rate Limit Reset Time: ${rateLimitReset}`);

        if (rateLimitRemaining === '0') {
            console.error('Rate limit exceeded');
            throw new Error('Rate limit exceeded');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw error;
    }
}


