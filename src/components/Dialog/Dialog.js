import FocusTrap from "focus-trap-react";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./Dialog.module.css";
import PropTypes from "prop-types";

export default function Dialog({ title, children, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles.modalContainer}>
        <button style={{position: "absolute", opacity: 0}} tabIndex={-1}></button>
        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle} data-testid="modalTitle">{title.toUpperCase()}</h1>
          <button className={styles.closeBtn} onClick={handleClose} data-testid='closeBtn'>
            &times;
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>,
    document.getElementById("modal-root")
  );
}

Dialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
  onClose: PropTypes.func
}
