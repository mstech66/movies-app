import React from "react";
import styles from './DeleteMovie.module.css';

export default function DeleteMovie({id, onDelete}){

    const handleDelete = async(e) => {
        await onDelete(id);
    }

    return <>
        <p>Are you sure you want to delete this movie?</p>
        <div className={styles.btnGroup}>
        <button className={styles.primaryBtn} onClick={handleDelete}>
          Confirm
        </button>
      </div>
    </>
}
