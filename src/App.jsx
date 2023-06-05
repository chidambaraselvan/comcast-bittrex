import './App.scss';
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/searchBar/searchBar.jsx';
import HttpClient from './ApiHelper.jsx';
import MarketCard from "./components/marketCard/marketCard.jsx";
import Pagination from './components/pagination/pagination.jsx';

function App() {
  const [summaries, setSummaries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    Promise.all([getCurrencies(), getSummary()])
      .then(function (res) {
        setCurrencies(res[0]);
        setSummaries(res[1]);
      });
  }, []);

  const getSummary = async () => {
    const uri = 'https://api.bittrex.com/v3/markets/summaries';
    try {
      const { data } =  await HttpClient(uri, "/markets/summaries", '');
      return data;
    } catch (error) {
      // console.log(Object.keys(error), error.message);
    }
  }

  const getCurrencies = async () => {
    const uri = 'https://api.bittrex.com/v3/currencies';
    try {
      const { data } =  await HttpClient(uri,"/currencies", '');
      return data;
    } catch (error) {
      // console.log(Object.keys(error), error.message);
    }
  }

  const currentMarketData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return summaries.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, summaries]);

  const onSearch = async (symbol) => {
    if (symbol) {
      const uri = `https://api.bittrex.com/v3/markets/${symbol}/summary`;
      try {
        const { data } = await HttpClient(uri, `/markets/${symbol}/summary`, '');
        setSummaries([data]);
      } catch (error) {
        // console.log(Object.keys(error), error.message);
      }
    } else {
      getSummary().then((summary) => setSummaries(summary));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Market Summary</h1>
        {<SearchBar onSearch={onSearch} />}
      </header>
      <div className='App-body'>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={summaries.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
        {
          currentMarketData && currentMarketData.length > 0 && currentMarketData.map((summary, index) => (
            <React.Fragment key={index}>
              <MarketCard summary={summary} currencies={currencies} />
            </React.Fragment>
          ))
        }
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={summaries.length}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      <footer>
        <p>Created by Comcast. © 2023</p>
      </footer>
    </div>
  );
}

export default App;
