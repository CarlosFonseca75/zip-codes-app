// Dependencies.
import React from "react";

// Icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

// Styles.
import styles from "@styles/components/layouts/PublicNavbar.module.scss";

// Icons.
const signInIcon = <FontAwesomeIcon icon={faSignIn} />;

export default function PublicNavbar() {
  return (
    <nav className={styles.container}>
      <ul className={styles.container__list}>
        <li className={styles.container__item}>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/google`}>
            {signInIcon}
            <strong>Log In</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
}
