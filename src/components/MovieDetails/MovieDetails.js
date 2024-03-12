import React from "react";
import PropTypes from "prop-types";
import styles from "./MovieTile.module.css";
import { joinItems } from "../../helpers/Helpers";

export default function MovieDetails(props) {
  const { imgUrl, name, releaseYear, genreList, rating, description, duration } = props;

  return (
    <div className={styles.card}>
      <img src={imgUrl} alt={name} />
      <div className={styles.descBlock}>
        <div className={styles.detailsBlock}>
          <h3 className={styles.title}>{name}</h3>
          <h3 className={styles.year}>{releaseYear}</h3>
        </div>
        <p className={styles.genre}>{joinItems(genreList)}</p>
      </div>
    </div>
  );
}
