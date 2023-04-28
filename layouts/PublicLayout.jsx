// Dependencies.
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

// Helpers.
import makeRequest from "@helpers/makeRequest";

// Components.
import PublicNavbar from "@components/layouts/PublicNavbar";
import Footer from "@components/layouts/Footer";

// Styles.
import styles from "@styles/layouts/PublicLayout.module.scss";

export default function PublicLayout({ children }) {
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

        // If session is valid redirect to plans page.
        if (!response.error) router.push("/plans");
      }

      validateSession();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }, []);

  return (
    <>
      <PublicNavbar />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  );
}

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
