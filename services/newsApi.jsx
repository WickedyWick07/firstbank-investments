import axios from "axios"


const API_KEY = 'pub_57997d5009e132b39b9b8d12565f429e6713a'
const BASE_URL = 'https://newsdata.io/api/1/news';

export const getNewsArticles = async (query) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                category: "business",
                apiKey: API_KEY,
                q: "finance,stocks,market",
                language: 'en'
            }
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching news articles:', error);
        throw error;
    }
};