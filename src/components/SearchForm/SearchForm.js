import React from "react";
import PropTypes from "prop-types";
import styles from "./SearchForm.module.css";

class SearchForm extends React.Component {
  state = {
    inputValue: "",
  };

  render() {
    return (
      <div className={styles.inlineContainer}>
        <input
          className={styles.searchInput}
          defaultValue={this.props.initValue}
          placeholder="What do you want to watch?"
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
          className={styles.searchBtn}
          onClick={(e) => this.props.onSearch(this.state.inputValue)}
          data-testid="searchBtn"
        >
          Search
        </button>
      </div>
    );
  }
}

SearchForm.propTypes = {
  initValue: PropTypes.string,
  onSearch: PropTypes.func,
};

export default SearchForm;
