import React from "react";
import { useState } from "react";
import styles from "./ContextMenu.module.css";

export function ContextMenu({ id, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const editAction = (e) => {
    onEdit(id);
    setShowMenu(!showMenu);
  };

  const deleteAction = (e) => {
    onDelete(id);
    setShowMenu(!showMenu);
  };

  const closeAction = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <button onClick={handleMenuToggle} className={styles.contextButton}>
        &#8942;
      </button>

      {showMenu && (
        <div className={styles.contextMenu}>
          <button onClick={closeAction} className={styles.crossButton}>
            &times;
          </button>
          <button onClick={editAction} className={styles.contextMenuItem} data-testid="edit">
            Edit
          </button>
          <button onClick={deleteAction} className={styles.contextMenuItem} data-testid="delete">
            Delete
          </button>
        </div>
      )}
    </>
  );
}
