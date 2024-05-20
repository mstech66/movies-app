import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchForm.module.css";
import { useSearch } from "../../contexts/SearchContext";


export default function SearchForm(props){
  const { searchQuery, handleSearch } = useSearch(); 
  const [inputValue, setInputValue] = useState(searchQuery);

  return (
    <form className={styles.inlineContainer} id="searchForm" >
      <input
        className={styles.searchInput}
        defaultValue={searchQuery}
        placeholder="What do you want to watch?"
        name="query"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.target.value);
          }
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        data-testid="searchInput"
      />
      <button
        className={styles.searchBtn}
        onClick={(e) => {
          e.preventDefault()
          handleSearch(inputValue)
        }}
        data-testid="searchBtn"
      >
        Search
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  initValue: PropTypes.string,
  onSearch: PropTypes.func,
};
