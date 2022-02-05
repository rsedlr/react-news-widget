import { listenerCount } from 'process';
import React, { useEffect, useState } from 'react';
import './NewsWidget.css';

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

function NewsWidget() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [resultLimit, setResultLimit] = useState(5);

  useEffect(() => {
    let isMounted = true;
    // declare the async data fetching function
    const fetchNewsData = async () => {
      // get the data from the api
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      // convert the data to json
      const json = await response.json();
      console.log(json.articles);
      // set state with the result
      if (isMounted) setArticles(json.articles);
    };

    fetchNewsData().catch(console.error);
    return () => {
      isMounted = false;
    };
  }, []);

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
        {articles.map((article, i) => {
          if (i < resultLimit) {
            return (
              <div className='article' key={i}>
                <a href={article.url}>
                  <h3 className='article-title'>{article.title}</h3>
                </a>
                <div className='flex-container'>
                  <span className='article-date'>{article.publishedAt}</span>
                  <span className='article-source'>{article.source.name}</span>
                </div>
              </div>
            );
          } else {
            return null; // ??
          }
        })}
      </div>
      <button id='show-more-button' className='news-button'>
        Show More
      </button>
    </div>
  );
}

export default NewsWidget;
