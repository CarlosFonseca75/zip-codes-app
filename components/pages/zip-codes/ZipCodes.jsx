// Dependencies.
import React, { useState, useEffect } from "react";

// Helpers.
import makeRequest from "@helpers/makeRequest";

// Icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

// Components.
import Button from "@components/common/Button";
import Loader from "@components/common/Loader";
import ZipCode from "./ZipCode";
import CreateZipCode from "./CreateZipCode";
import UpdateZipCode from "./UpdateZipCode";
import DeleteZipCode from "./DeleteZipCode";

// Styles.
import styles from "@styles/components/pages/zip-codes/ZipCodes.module.scss";

// Icons.
const openBoxIcon = <FontAwesomeIcon icon={faBoxOpen} />;

// Default data.
const defaultZipCode = {
  _id: "",
  zipCode: "",
  city: "",
  state: "",
};

const defaultModalFlags = {
  createZipCode: false,
  updateZipCode: false,
  deleteZipCode: false,
};

export default function ZipCodes() {
  // State.
  const [zipCodes, setZipCodes] = useState([]);
  const [currentZipCode, setCurrentZipCode] = useState(defaultZipCode);
  const [isLoading, setIsLoading] = useState(false);

  // Modals flags to handle them.
  const [showModals, setShowModals] = useState(defaultModalFlags);

  /**
   * @async
   * @function
   * @name getZipCodes
   * @description Gets all available zip codes.
   * @returns {void}
   */
  async function getZipCodes() {
    try {
      setIsLoading(true);

      // Request options.
      const options = {
        url: "/zip-codes",
      };

      // Request.
      const response = await makeRequest(options);

      // Check for errors.
      if (response.httpStatus != 200) {
        console.log(`Error: ${response.message}`);
        return;
      }

      // Fill zip codes.
      setZipCodes(response.data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * @function
   * @name getZipCodessOnMount
   * @description Get zip codes on component mount.
   * @return {void}
   */
  useEffect(() => {
    getZipCodes();
  }, []);

  /**
   * @function
   * @name renderZipCodes
   * @description Renders a list of zip codes depending on the state.
   * @return {JSX.Element} - The appropriate element to render based on the state.
   */
  function renderZipCodes() {
    try {
      // When loading.
      if (isLoading) {
        return (
          <div className={styles.container__loader}>
            <Loader />
          </div>
        );
      }

      // When there are zip codes available.
      if (zipCodes.length > 0) {
        return zipCodes.map((zipCode) => (
          <ZipCode
            key={zipCode._id}
            _id={zipCode._id}
            zipCode={zipCode.zipCode}
            city={zipCode.city}
            state={zipCode.state}
            setShowModals={setShowModals}
            setCurrentZipCode={setCurrentZipCode}
          />
        ));
      }

      // When there are not zip codes available.
      return (
        <div className={styles.container__message}>
          {openBoxIcon}
          <p>
            <strong>No zip codes available.</strong>
          </p>
        </div>
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return "";
    }
  }

  return (
    <>
      {/* Title. */}
      <h1 className={styles.title}>Manage your zip codes</h1>

      <section className={styles.container}>
        {/* Create. */}
        <Button
          text="Create zip code"
          type="button"
          ariaLabel="Create zip code"
          onClick={() =>
            setShowModals((flags) => ({ ...flags, createZipCode: true }))
          }
        />

        {/* List. */}
        {renderZipCodes()}
      </section>

      {/* Modals. */}
      <CreateZipCode
        showModals={showModals}
        setShowModals={setShowModals}
        getZipCodes={getZipCodes}
      />

      <UpdateZipCode
        showModals={showModals}
        setShowModals={setShowModals}
        currentZipCode={currentZipCode}
        getZipCodes={getZipCodes}
      />

      <DeleteZipCode
        showModals={showModals}
        setShowModals={setShowModals}
        currentZipCode={currentZipCode}
        getZipCodes={getZipCodes}
      />
    </>
  );
}
