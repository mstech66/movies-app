import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./MovieDetails.module.css";
import { joinItems } from "../../helpers/Helpers";

export default function MovieDetails(props) {
  const [data, setData] = useState(props);

  useEffect(() => {
    setData(props);
  }, [props]);

  const {
    imgUrl,
    name,
    releaseYear,
    genreList,
    rating,
    description,
    duration,
    id,
  } = data;

  if(!name && !genreList && !releaseYear && !imgUrl && ! id && !rating && !duration && !description){
    return null;
  }

  return (
    <div className={styles.flexContainer} key={id}>
      <div className={styles.card}>
        <img src={imgUrl} alt={name} />
      </div>
      <div className={styles.detailsBlock}>
        <div className={styles.inlineBlock}>
          <h1>{name}</h1>
          <div className={styles.circle}>{rating}</div>
        </div>
        <h5 className={styles.genreList}>{joinItems(genreList)}</h5>
        <div className={styles.inlineBlock}>
          <h2>{releaseYear}</h2>
          <h2>{duration}</h2>
        </div>
        <p className={styles.descr}>{description}</p>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  duration: PropTypes.string,
  genreList: PropTypes.array,
  description: PropTypes.string,
  rating: PropTypes.number,
  releaseYear: PropTypes.number,
  handleChange: PropTypes.func
}
