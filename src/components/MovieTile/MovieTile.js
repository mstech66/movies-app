import React from "react";
import PropTypes from "prop-types";
import styles from "./MovieTile.module.css";
import { joinItems } from "../../helpers/Helpers";
import { ContextMenu } from "../ContextMenu/ContextMenu";

export default function MovieTile(props) {
  const { poster_path, title, release_date, genres, id, onEdit, onDelete, handleClick } = props;

  if (!title && !genres && !release_date && !poster_path && !id) {
    return null;
  }

  const handleCardClick = async () => {
    await handleClick(id);
  };

  const handleEdit = async (id) => {
    console.log(`Editing movie with id: ${id}`);
    await onEdit(id);
  };

  const handleDelete = async (id) => {
    console.log(`Deleting movie with id: ${id}`);
    await onDelete(id);
  };

  return (
    <div className={styles.card} key={id} data-testid={id}>
      <img src={poster_path} data-testid={`${id}-img`} alt={title} onClick={handleCardClick} />
      <div className={styles.contextMenu}>
        <ContextMenu onEdit={handleEdit} onDelete={handleDelete} id={id} />
      </div>
      <div className={styles.descBlock}>
        <div className={styles.detailsBlock}>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.year}>{new Date(release_date).getFullYear()}</h3>
        </div>
        <p className={styles.genre}>{joinItems(genres)}</p>
      </div>
    </div>
  );
}

MovieTile.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  poster_path: PropTypes.string,
  genres: PropTypes.array,
  release_date: PropTypes.string,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
