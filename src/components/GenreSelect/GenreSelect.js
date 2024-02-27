import React from "react";

class GenreSelect extends React.Component {
  render() {
    return (
        <select defaultValue={this.props.selectedGenre} onChange={this.props.onSelect}>
            {this.props.genreList.map(genre => <option key={genre} value={genre}>{genre}</option>)}
        </select>
    );
  }
}

export default GenreSelect;
