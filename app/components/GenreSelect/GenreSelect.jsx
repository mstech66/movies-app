import React from "react";
import PropTypes from 'prop-types';
import styles from './GenreSelect.module.css';
import { Link, useLocation } from "@remix-run/react";

function GenreSelect({ genreList, activeGenre }) {
  const location = useLocation();
  
  return (
    <ul className={styles.genreSelectUl} id="genreSelectUl">
      {genreList.map((genre) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('genre', genre);
          
        return (
          <li key={genre} data-testid={`item-${genre}`} value={genre} className={styles.genreSelectItem} aria-current={genre === activeGenre}>
            <Link value={genre} data-testid={`btn-${genre}`} style={{borderBottom: activeGenre === genre ? '2px solid #F65261' : 'none'}} to={`${location.pathname}?${searchParams}`}>{genre}</Link>
          </li>
        )
      })}
    </ul>
  );
}

GenreSelect.propTypes = {
  genreList: PropTypes.array,
  activeGenre: PropTypes.string,
  onSelect: PropTypes.func
};

export default GenreSelect;
