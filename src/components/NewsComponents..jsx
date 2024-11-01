import React,{useState, useEffect} from 'react'
import { getNewsArticles } from '../../services/newsApi'
import { Link, useNavigate } from 'react-router-dom'

const NewsComponents = ({ query }) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAll, setShowAll] = useState(false)
    const [visibleArticles, setVisibleArticles] = useState(5)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNewsArticles(query)
                console.log('Articles:', data)
                setArticles(data)
            } catch (error) {
                setError('Failed to fetch news articles...')
            } finally{
                setLoading(false)
            }
        }
        fetchNews()
    }, [query]);

    if (loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>

    const handleShowAll = () => {
        setShowAll(true)
    }
  return (
    <div className='p-4'>
        <h2 className='text-3xl text-primaryGold font-bold uppercase underline'>Latest News On {query}</h2>
        <ul className='my-4'>
            {articles.slice(0, showAll ? articles.length : visibleArticles).map((article ,index) => (
                <li className='my-4 p-4 hover:bg-slate-700 rounded' key={index}>
                     <div>
                        <img src={article.urlToImage} className='w-24' alt="" />
                    </div>
                    <a href={articles.url} target='_blank' rel='nooopener noreferrer'>
                       
                        <h3 className='text-2xl text-primaryGold font-semibold'>{article.title}</h3>
                        <p className='text-md text-primaryGold'>{article.description}</p>
                    </a>
                </li>
            ))}
        </ul>
        {articles.length > 5 && (
                <button
                    onClick={() => navigate('/news')}
                    className='mt-4 rounded text-blue-500 p-4 hover:bg-slate-700 font-semibold underline-offset-2'
                >
                    View More
                </button>
            )}
      
    </div>
  )
}

export default NewsComponents
