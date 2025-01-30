import React from "react";
import { Link } from "react-router-dom";
import Styles from "./css/NewsCard.module.css";
import image from "../assets/Jujutsu-Kaisen-Chapter-241-Spoil.webp";
const MAX_TITLE_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 150;
const NewsItems = (props) => {
  let { title, description, url, urlToImage, publishedAt } = props;

  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH - 3)}...`
      : title;

  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.substring(0, MAX_DESCRIPTION_LENGTH - 3)}...`
      : description;
  const handleImageError = (event) => {
    event.target.src = image;
  };
  return (
    <>
      <Link
        target="_blank"
        rel="noreferrer"
        to={url}
        style={{ textDecoration: "none", width: "auto", padding: "0px" }}
      >
        <div className={Styles.card}>
          <img
            src={urlToImage}
            className="card-img-top"
            alt=""
            onError={handleImageError}
          />

          <div className={Styles.cardBody}>
            <h5 className="card-title" style={{ fontSize: "1.2rem" }}>
              {truncatedTitle}
            </h5>
            <p
              className="card-text"
              style={{ fontSize: "0.90rem", marginTop: "10px" }}
            >
              {truncatedDescription}
            </p>
            <p
              className="card-date"
              style={{ fontSize: "0.87rem", marginTop: "1rem" }}
            >
              <small className="text">
                {/* By {author ? author : "Unknown"} on{" "} */}
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NewsItems;
