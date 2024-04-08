import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./MovieDetails.module.css";
import { convertTimeToReadableString, joinItems } from "../../helpers/Helpers";

export default function MovieDetails(props) {
  const [data, setData] = useState(props);

  useEffect(() => {
    setData(props);
  }, [props]);

  const {
    poster_path,
    title,
    release_date,
    genres,
    vote_average,
    overview,
    runtime,
    id,
  } = data;

  if (
    !title &&
    !genres &&
    !release_date &&
    !poster_path &&
    !id &&
    !vote_average &&
    !runtime &&
    !overview
  ) {
    return null;
  }

  return (
    <div className={styles.flexContainer} key={id}>
      <div className={styles.card}>
        <img src={poster_path} alt={title} />
      </div>
      <div className={styles.detailsBlock}>
        <div className={styles.inlineBlock}>
          <h1>{title}</h1>
          <div className={styles.circle}>{vote_average}</div>
        </div>
        <h5 className={styles.genres}>{joinItems(genres)}</h5>
        <div className={styles.inlineBlock}>
          <h2>{new Date(release_date).getFullYear()}</h2>
          <h2>{convertTimeToReadableString(runtime)}</h2>
        </div>
        <p className={styles.descr}>{overview}</p>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  poster_path: PropTypes.string,
  runtime: PropTypes.number,
  genres: PropTypes.array,
  overview: PropTypes.string,
  vote_average: PropTypes.number,
  release_date: PropTypes.string,
  handleChange: PropTypes.func,
};
