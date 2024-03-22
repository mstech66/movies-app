import React from "react";
import PropTypes from "prop-types";
import styles from "./MovieTile.module.css";
import { joinItems } from "../../helpers/Helpers";
import { ContextMenu } from "../ContextMenu/ContextMenu";

export default function MovieTile(props) {
  const { imgUrl, title, releaseDate, genreList, id, onEdit, handleClick } = props;

  if (!title && !genreList && !releaseDate && !imgUrl && !id) {
    return null;
  }

  const handleCardClick = async () => {
    await handleClick(id);
  };

  const handleEdit = (id) => {
    console.log(`Editing movie with id: ${id}`);
    onEdit(id);
  };

  const handleDelete = (id) => {
    console.log(`Deleting movie with id: ${id}`);
  };

  return (
    <div className={styles.card} key={id} data-testid={id}>
      <img src={imgUrl} alt={title} onClick={handleCardClick} />
      <div className={styles.contextMenu}>
        <ContextMenu onEdit={handleEdit} onDelete={handleDelete} id={id} />
      </div>
      <div className={styles.descBlock}>
        <div className={styles.detailsBlock}>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.year}>{releaseDate}</h3>
        </div>
        <p className={styles.genre}>{joinItems(genreList)}</p>
      </div>
    </div>
  );
}

MovieTile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  genreList: PropTypes.array,
  releaseYear: PropTypes.number,
  handleClick: PropTypes.func,
};
