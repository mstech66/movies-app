import React from "react";
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  state = {
    inputValue: "",
  };

  render() {
    return (
      <>
        <input
          defaultValue={this.props.initValue}
          onFocus={this.props.onSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.props.onSearch(e.target.value);
            }
          }}
          onChange={(e) => {
            this.setState({ inputValue: e.target.value });
          }}
          data-testid="searchInput"
        />
        <button
          onClick={(e) => this.props.onSearch(this.state.inputValue)}
          data-testid="searchBtn"
        >
          Search
        </button>
      </>
    );
  }
}

SearchForm.propTypes = {
  initValue: PropTypes.string,
  onSearch: PropTypes.func
}

export default SearchForm;
