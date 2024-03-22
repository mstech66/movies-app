import React from "react";
import styles from "./SortControl.module.css";
import PropTypes from 'prop-types';

export default function SortControl(props){
    return(
        <div className={styles.customSelect}>
            <label className={styles.sortLabel}>Sort By: </label>
            <select defaultValue={props.defaultValue} className={styles.sortSelect} onChange={(event)=> {
                props.handleChange(event.target.value);
            }} data-testid="sortSelect">
                <option value="releaseYear">RELEASE DATE</option>
                <option value="name">TITLE</option>
            </select>
        </div>
    );
}

SortControl.propTypes = {
    defaultValue: PropTypes.string,
    handleChange: PropTypes.func
}