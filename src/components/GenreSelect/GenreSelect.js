import React from "react";
import PropTypes from 'prop-types';

class GenreSelect extends React.Component {
  render() {
    return (
      <select
        defaultValue={this.props.selectedGenre}
        onChange={(event) => {
          this.props.onSelect(event.target.value);
        }}
        data-testid="genreSelect"
      >
        {this.props.genreList.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    );
  }
}

GenreSelect.propTypes = {
  genreList: PropTypes.array,
  selectedGenre: PropTypes.string,
  onSelect: PropTypes.func
}

export default GenreSelect;
