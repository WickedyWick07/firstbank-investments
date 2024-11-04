import React, { useEffect, useState } from 'react';
import { getNewsArticles } from '../../services/newsApi';
import Header from './Header';
import SideMenu from './SideMenu';
import { useMediaQuery } from 'react-responsive';

const NewsPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNewsArticles('stock'); // Adjust query as needed
                setArticles(data);
            } catch (error) {
                setError('Failed to fetch news articles.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center bg-primaryBlue min-h-screen items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primaryGold"></div>
            </div>
        );
    }
    if (error) return <p>{error}</p>;

    return (
        <div className='bg-gradient-to-r from-primaryBlue to-secondBlue min-h-screen'>
            <Header />

            <section className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
                <SideMenu />

                <div className={`p-4 flex-1 ${isMobile ? 'p-2' : 'p-4'}`}>
                    <h1 className={`text-center ${isMobile ? 'text-2xl' : 'text-3xl'} text-primaryGold font-bold mb-2`}>
                        All News Articles
                    </h1>
                    <ul className='m-4 p-4'>
                        {articles.map((article, index) => (
                            <li className={`my-4 p-4 hover:bg-slate-700 rounded ${isMobile ? 'text-sm' : 'text-base'}`} key={index}>
                                <a href={article.url} target='_blank' rel='noopener noreferrer'>
                                    <h3 className={`text-sm text-primaryGold font-semibold`}>{article.source_url}</h3>
                                    <h3 className={`text-sm text-primaryGold font-semibold`}>{new Date(article.pubDate).toLocaleDateString()}</h3>
                                    <h3 className={`text-xl ${isMobile ? 'text-lg' : 'text-2xl'} text-primaryGold font-semibold`}>{article.title}</h3>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default NewsPage;
