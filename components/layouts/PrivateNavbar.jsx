// Dependencies.
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Helpers.
import makeRequest from "@helpers/makeRequest";
import showAlert from "@helpers/showAlert";

// Icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

// Styles.
import styles from "@styles/components/layouts/PrivateNavbar.module.scss";

// Icons.
const signOutIcon = <FontAwesomeIcon icon={faSignOut} />;

export default function PrivateNavbar() {
  // State.
  const [activePage, setActivePage] = useState("");

  // Router.
  const router = useRouter();

  /**
   * @async
   * @function
   * @name logOut
   * @description Logs the user out and redirects to the home page.
   * @return {void}
   */
  async function logOut() {
    try {
      // Request options.
      const options = {
        url: "/google/logout",
      };

      // Request.
      await makeRequest(options);

      // Show success alert.
      showAlert({ title: "Logged out", message: "Logged out successfully" });

      // Redirect to index.
      router.push("/");
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * @function
   * @name onRouteChange
   * @description Sets active route when route is changed.
   */
  useEffect(() => {
    try {
      setActivePage(router.pathname);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }, [router]);

  return (
    <nav className={styles.container}>
      <ul className={styles.container__list}>
        {/* Plans. */}
        <Link href="/plans">
          <li className={activePage === "/plans" ? styles.active : ""}>
            <strong>Plans</strong>
          </li>
        </Link>

        {/* Zip codes. */}
        <Link href="/zip-codes">
          <li className={activePage === "/zip-codes" ? styles.active : ""}>
            <strong>Zip codes</strong>
          </li>
        </Link>

        {/* Prices. */}
        <Link href="/prices">
          <li className={activePage === "/prices" ? styles.active : ""}>
            <strong>Prices</strong>
          </li>
        </Link>

        {/* Actions. */}
        <li
          className={styles.container__list__item}
          role="button"
          onClick={logOut}
          tabIndex={0}
        >
          {signOutIcon}
          <p>
            <strong>Log out</strong>
          </p>
        </li>
      </ul>
    </nav>
  );
}
