import React from "react";
import styles from "./SortControl.module.css";
import PropTypes from "prop-types";

export default function SortControl(props) {

  return (
    <div className={styles.customSelect}>
      <label className={styles.sortLabel}>Sort By </label>
      <select
        value={props.defaultValue}
        className={styles.sortSelect}
        onChange={(event) => {
          props.handleChange(event.target.value);
        }}
        data-testid="sortSelect"
      >
        <option value="release_date">RELEASE DATE</option>
        <option value="title">TITLE</option>
      </select>
    </div>
  );
}

SortControl.propTypes = {
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func,
};
