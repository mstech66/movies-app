import React from "react";
import PropTypes from "prop-types";
import styles from "./MovieTile.module.css";
import { joinItems } from "../../helpers/Helpers";
import { Link } from "react-router-dom";



export default function MovieTile(props) {
  const { imgUrl, name, releaseYear, genreList } = props;

  return (
    <Link to={"/movie"} state={{data: props}} className={styles.link}>
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
    </Link>
  );
}
