import React from "react";
import PropTypes from "prop-types";
import styles from "./MovieDetails.module.css";
import { joinItems } from "../../helpers/Helpers";
import { useLocation } from "react-router-dom";

export default function MovieDetails(props) {
  const {
    imgUrl,
    name,
    releaseYear,
    genreList,
    rating,
    description,
    duration,
  } = useLocation().state.data;

  return (
    <div className={styles.flexContainer}>
      <div className={styles.card}>
        <img src={imgUrl} alt={name} />
      </div>
      <div className={styles.detailsBlock}>
        <div className={styles.inlineBlock}>
          <h2>{name}</h2>
          <div className={styles.circle}>{rating}</div>
        </div>
        <h3>{joinItems(genreList)}</h3>
        <div className={styles.inlineBlock}>
          <h2>{releaseYear}</h2>
          <h2>{duration}</h2>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
