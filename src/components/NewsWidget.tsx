import React, { useEffect, useState } from 'react';
import './NewsWidget.css';

// interface Article {
//   id: string;
//   type: string;
//   marketValue: number;
//   portfolioId: number;
//   maturityDate?: string;
// }

function NewsWidget() {
  //   const [assets, setAssets] = useState<Asset[]>([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // getPortfolio().then(async (portfolio) => {
    //   fetchData(portfolio.id).then((res) => {
    //   });
    // });
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
      <div className='article-container'>
        <div className='article'>
          <h3 className='article-title'>Article title</h3>
          <div className='flex-container'>
            <span className='article-date'>4/2/2020</span>
            <span className='article-source'>source</span>
          </div>
        </div>
      </div>
      <button id='show-more-button' className='news-button'>
        Show More
      </button>
    </div>
  );
}

export default NewsWidget;
