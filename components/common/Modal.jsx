// Dependencies.
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";

// Icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Styles.
import styles from "@styles/components/common/Modal.module.scss";

// Icons.
const closeIcon = <FontAwesomeIcon icon={faTimes} />;

export default function Modal({ showModal, setShowModal, header, children }) {
  // Flag.
  const [isBrowser, setIsBrowser] = useState(false);

  // UseEffect.
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Content.
  const modal = showModal && (
    <div className={styles.container}>
      <div className={styles.modal}>
        {/* Header. */}
        <div className={styles.modal__header}>
          <h3>{header}</h3>

          {/* Close. */}
          <span
            className={styles.modal__header__button}
            role="button"
            tabIndex={0}
            onClick={() => setShowModal(false)}
            aria-label={"Close QR modal"}
          >
            {closeIcon}
          </span>
        </div>

        {/* Content. */}
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );

  // Portal.
  return isBrowser
    ? ReactDom.createPortal(modal, document.getElementById("modal-root"))
    : null;
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
};
