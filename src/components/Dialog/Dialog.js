import FocusTrap from "focus-trap-react";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./Dialog.module.css";

export default function Dialog({ title, children, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles.modalContainer}>
        <button style={{position: "absolute", opacity: 0}} tabIndex={-1}></button>
        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle}>{title.toUpperCase()}</h1>
          <button className={styles.closeBtn} onClick={handleClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>,
    document.getElementById("modal-root")
  );
}
