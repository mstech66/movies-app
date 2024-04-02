import React from "react";
import PropTypes from 'prop-types';
import styles from './GenreSelect.module.css';

class GenreSelect extends React.Component {
  render() {
    return (
      <ul className={styles.genreSelectUl}>
        {this.props.genreList.map((genre) => (
          <li key={genre} value={genre} className={styles.genreSelectItem}>
            <button value={genre} onClick={(event)=> {
              this.props.onSelect(event.target.value);
            }} style={{borderBottom: this.props.activeGenre === genre ? '2px solid #F65261' : 'none'}}>{genre}</button>
          </li>
        ))}
      </ul>
    );
  }
}

GenreSelect.propTypes = {
  genreList: PropTypes.array,
  selectedGenre: PropTypes.string,
  onSelect: PropTypes.func
}

export default GenreSelect;
