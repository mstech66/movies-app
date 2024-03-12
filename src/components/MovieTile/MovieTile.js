import React from "react";
import PropTypes from "prop-types";
import styles from "./MovieTile.module.css";
import { joinItems } from "../../helpers/Helpers";

export default function MovieTile(props) {
  const { imgUrl, name, releaseYear, genreList, handleClick } = props;
  
  const handleCardClick = (event) => {
    handleClick(name);
  }

  return (
    <div className={styles.card} onClick={handleCardClick}>
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
