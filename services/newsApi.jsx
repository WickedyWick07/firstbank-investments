import axios from "axios"


const API_KEY = 'a15eec9c4cad43efb7c4b52176baef5e'
const BASE_URL = 'https://newsapi.org/v2/everything';

export const getNewsArticles = async (query) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: query,
                apiKey: API_KEY
            }
        });
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news articles:', error);
        throw error;
    }
};