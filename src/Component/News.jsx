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
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category.toLowerCase()}/${props.country.toLowerCase()}.json`;
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `News Monkey - ${capitalizeFirstLetter(
      props.category
    )} News`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.category.toLowerCase()}/${props.country.toLowerCase()}.json`;
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "4rem" }}>
        News Monkey - {capitalizeFirstLetter(props.category)} News
      </h1>
      <div className="container mb-3">
        {loading && <Spiner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spiner />}
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
              if (
                element.urlToImage &&
                element.title &&
                element.description &&
                element.url
              ) {
                return (
                  <NewsItems
                    key={element.url}
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
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
