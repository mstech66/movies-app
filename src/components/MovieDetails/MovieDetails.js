import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./MovieDetails.module.css";
import { convertTimeToReadableString, fetchMovie, joinItems } from "../../helpers/Helpers";
import { useParams } from "react-router-dom";
import { act } from "react-dom/test-utils";

export default function MovieDetails() {
  const [data, setData] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchDetails() {
      const fetchedMovie = await fetchMovie(movieId);
  
      act(() => setTimeout(() => setData(fetchedMovie), 0));
    }
    fetchDetails();
  }, [movieId]);

  if(!data){
    return <div>Loading...</div>
  }

  const {
    id,
    title,
    release_date,
    genres,
    vote_average,
    overview,
    runtime,
    poster_path
  } = data;

  const handleError = (event) => {
    event.target.onerror = null;
    event.target.src = 'https://ih1.redbubble.net/image.533910704.5853/fposter,small,wall_texture,product,750x1000.u3.jpg';
  }

  return (
    <div className={styles.flexContainer} key={id} data-testid={id}>
      <div className={styles.card}>
        <img src={poster_path} alt={title} onError={handleError} id="poster"/>
      </div>
      <div className={styles.detailsBlock}>
        <div className={styles.inlineBlock}>
          <h1 id="title">{title}</h1>
          <div className={styles.circle} id="vote_average">{vote_average}</div>
        </div>
        <h5 className={styles.genres} id="genres">{joinItems(genres)}</h5>
        <div className={styles.inlineBlock}>
          <h2 id="release_date">{new Date(release_date).getFullYear()}</h2>
          <h2 id="runtime">{convertTimeToReadableString(runtime)}</h2>
        </div>
        <p className={styles.descr} id="overview">{overview}</p>
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
