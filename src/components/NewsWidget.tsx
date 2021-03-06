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
  const [sources, setSources] = useState<Set<string>>(new Set());
  const [currentSource, setCurrentSource] = useState('');
  const [resultLimit, setResultLimit] = useState(5);

  useEffect(() => {
    let isMounted = true;

    const fetchNewsData = async () => {
      const response = await fetch(
        // get the data from the api
        `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );

      const json = await response.json(); // Convert the data to json

      if (isMounted) {
        setArticles(json.articles); // Set state with the result
      }
    };

    fetchNewsData().catch(console.error);

    return () => {
      isMounted = false;
    };
  }, []); // Only run on mount

  useEffect(() => {
    const newSources = new Set<string>();
    articles.forEach(article => {
      newSources.add(article.title.split(' - ').slice(-1)[0]);
    });
    setSources(newSources);
  }, [articles]); // Run when articles are changed

  const showMore = () => {
    setResultLimit(resultLimit + 5);
  };

  const setSource = (event: React.FormEvent<HTMLSelectElement>) => {
    const element = event.target as HTMLSelectElement;
    setCurrentSource(element.value);
  };

  var articleCount = 0;

  return (
    <div className='news-container' data-testid='news-container'>
      <div className='flex-container'>
        <h1 className='news-title'>News</h1>
        <div className='dropdown-wrapper'>
          <div className='dropdown-select-arrow-div'>
            <select
              name='source'
              id='source'
              className='news-dropdown'
              data-testid='article-dropdown'
              onChange={setSource}
            >
              <option value=''>Filter By Source</option>
              {Array.from(sources).map((source, i) => {
                return (
                  <option value={source} key={i} data-testid='dropdown-option'>
                    {source}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className='article-container' data-testid='articles'>
        {articles.map((article, i) => {
          // Article source is taken from the title (all titles appear to have the actual title and
          // source separated by a '-'). The source field provided by the API didn't match the design
          // document as well as this source does. For example, 'Sky News' was 'Sky.com'
          const titleSplit = article.title.split(' - '); //
          const articleName = titleSplit.slice(0, -1);
          const source = titleSplit.slice(-1)[0];

          if (
            articleCount < resultLimit &&
            (currentSource === '' || source === currentSource)
          ) {
            articleCount++;

            return (
              <div className='article' key={i}>
                <a href={article.url}>
                  <h3 className='article-title'>{articleName}</h3>
                </a>
                <div className='flex-container'>
                  <span className='article-date' data-testid='article-date'>
                    {new Date(article.publishedAt).toLocaleDateString('en-gb', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className='article-source' data-testid='article-source'>
                    {source}
                  </span>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <button id='show-more-button' className='news-button' onClick={showMore}>
        Show More
      </button>
    </div>
  );
}

export default NewsWidget;
