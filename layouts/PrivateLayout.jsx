// Dependencies.
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

// Components.
import PrivateNavbar from "@components/layouts/PrivateNavbar";
import Footer from "@components/layouts/Footer";

// Helpers.
import makeRequest from "@helpers/makeRequest";

// Styles.
import styles from "@styles/layouts/PrivateLayout.module.scss";

export default function PrivateLayout({ children }) {
  // Router.
  const router = useRouter();

  /**
   * @function
   * @name useValidateSessionOnMount
   * @description Run the validate session function on component mount.
   * @return {void}
   */
  useEffect(() => {
    try {
      async function validateSession() {
        // Request options.
        const options = {
          url: "/auth",
        };

        // Request.
        const response = await makeRequest(options);

        // If session is not valid redirect to index.
        if (response.error) router.push("/");
      }

      validateSession();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }, []);

  return (
    <>
      <PrivateNavbar />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
