/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category.toLowerCase()}/${props.country.toLowerCase()}.json`;
    // const url = `https://newsapi.org/v2/everything?q=${props.query}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setHasMore(parsedData.articles.length < parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `TrendBeat  - ${capitalizeFirstLetter(
      props.category
    )} News`;
    updateNews();
    // eslint-disable-next-line
  }, [props.query, props.category]);

  const fetchMoreData = async () => {
    if (!hasMore) return; // Stop fetching if no more articles are available
    setLoading(true);
    
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category.toLowerCase()}/${props.country.toLowerCase()}.json`;
    // const url = `https://newsapi.org/v2/everything?q=${props.query}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      if (!parsedData.articles || parsedData.articles.length === 0) {
        setHasMore(false); // No more articles to fetch
        setLoading(false);
        return;
      }

      // **Remove duplicate articles**
      const newArticles = parsedData.articles.filter(
        (article) => !articles.some((existing) => existing.url === article.url)
      );

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage((prevPage) => prevPage + 1);

      // Stop fetching if we've reached the total results or NewsAPI limit (max 100 pages)
      if (articles.length + newArticles.length >= totalResults || page >= 100) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    }

    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "4rem" }}>
        TrendBeat  - {capitalizeFirstLetter(props.category)} News
      </h1>
      <div className="container">
        {loading && articles.length === 0 && <Spiner />} {/* Show only if no articles */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: "center", fontStyle: "italic", color: "#FFF" }}>
              🎉 You&apos;ve reached the end! No more articles... for now. Stay tuned! 📖
            </p>
          }
        >
    <div
      className="row container"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        gap: "5px",
        margin: "0px",
        padding: "0px",
      }}
    >
      {articles.map((element) => {
        if (element.urlToImage && element.title && element.description && element.url) {
          return (
            <NewsItems
              key={`${element.url}-${element.publishedAt}`}
              title={element.title}
              description={element.description}
              urlToImage={element.urlToImage}
              url={element.url}
              author={element.author}
              publishedAt={element.publishedAt}
              source={element.source.name}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  </InfiniteScroll>
  {loading && articles.length > 0 && <Spiner />} {/* Show spinner when fetching more */}
</div>
    </>
  );
};

News.defaultProps = {
  country: "us",
  category: "general",
  query: "",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  query: PropTypes.string.isRequired,
};

export default News;
