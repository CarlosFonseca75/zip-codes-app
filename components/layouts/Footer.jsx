// Dependencies.
import React from "react";

// Icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// Styles.
import styles from "@styles/components/layouts/Footer.module.scss";

// Icons.
const heartIcon = <FontAwesomeIcon icon={faHeart} />;

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p className={styles.container__title}>
        <strong>Made with</strong>
        <span className={styles.container__icon}>{heartIcon}</span>
        <strong>by me!</strong>
      </p>
    </footer>
  );
}
