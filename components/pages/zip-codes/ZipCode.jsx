// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import Button from "@components/common/Button";

// Styles.
import styles from "@styles/components/pages/zip-codes/ZipCode.module.scss";

export default function ZipCode({
  _id,
  zipCode,
  city,
  state,
  setShowModals,
  setCurrentZipCode,
}) {
  /**
   * @function
   * @name openModalWithZipCode
   * @description Opens a modal depending on the modalName and sets the current zip code.
   * @param {string} modalName The name of the modal to be opened.
   * @returns {void}
   */
  function openModalWithZipCode(modalName) {
    try {
      // Set zip code.
      const zipCodeValues = { _id, zipCode, city, state };
      setCurrentZipCode(zipCodeValues);

      // Show modal.
      setShowModals((prev) => ({ ...prev, [modalName]: true }));
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  return (
    <div className={styles.card}>
      {/* Zip code. */}
      <p className={styles["card__zip-code"]}>
        <strong>{zipCode}</strong>
      </p>

      {/* City. */}
      <p className={styles.card__city}>
        <strong>City:</strong> {city}
      </p>

      {/* State. */}
      <p className={styles.card__state}>
        <strong>State:</strong> {state}
      </p>

      {/* Actions. */}
      <div className={styles.card__actions}>
        <Button
          text="Update zip code"
          color="primary"
          type="button"
          ariaLabel="Update zip code"
          onClick={() => openModalWithZipCode("updateZipCode")}
        />
        <Button
          text="Delete zip code"
          color="danger"
          type="button"
          ariaLabel="Delete zip code"
          onClick={() => openModalWithZipCode("deleteZipCode")}
        />
      </div>
    </div>
  );
}

ZipCode.propTypes = {
  _id: PropTypes.string.isRequired,
  zipCode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  setShowModals: PropTypes.func.isRequired,
  setCurrentZipCode: PropTypes.func.isRequired,
};
