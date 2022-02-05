import React, { useEffect, useState } from 'react';
import './NewsWidget.css';

// Interface for the news articles
interface Article {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

// Functional component
function NewsWidget() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [resultLimit, setResultLimit] = useState(5);

  useEffect(() => {
    let isMounted = true;

    const fetchNewsData = async () => {
      const response = await fetch(
        // get the data from the api
        `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );

      const json = await response.json(); // convert the data to json
      // console.log(json.articles);

      if (isMounted) setArticles(json.articles); // set state with the result
    };

    fetchNewsData().catch(console.error);

    return () => {
      isMounted = false;
    };
  }, []);

  const showMore = () => {
    setResultLimit(resultLimit + 5);
  };

  return (
    <div className='news-container'>
      <div className='flex-container'>
        <h1 className='news-title' style={{}}>
          News
        </h1>
        <div style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}>
          <select name='source' className='news-dropdown' id='source'>
            <option value='volvo'>Filter By Source</option>
            <option value='saab'>Saab</option>
            <option value='mercedes'>Mercedes</option>
            <option value='audi'>Audi</option>
          </select>
        </div>
      </div>
      <div className='article-container' data-testid='articles'>
        {articles.slice(0, resultLimit).map((article, i) => {
          // if (i < resultLimit) {
          return (
            <div className='article' key={i}>
              <a href={article.url}>
                <h3 className='article-title'>{article.title}</h3>
              </a>
              <div className='flex-container'>
                <span className='article-date' data-testid='article-date'>
                  {new Date(article.publishedAt).toLocaleDateString('en-gb', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className='article-source'>{article.source.name}</span>
              </div>
            </div>
          );
          // }
        })}
      </div>
      <button id='show-more-button' className='news-button' onClick={showMore}>
        Show More
      </button>
    </div>
  );
}

export default NewsWidget;
