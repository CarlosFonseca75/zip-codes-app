// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";

// Helpers.
import makeRequest from "@helpers/makeRequest";
import showAlert from "@helpers/showAlert";

// Styles.
import styles from "@styles/components/pages/zip-codes/DeleteZipCode.module.scss";

export default function DeleteZipCode({
  showModals,
  setShowModals,
  getZipCodes,
  currentZipCode,
}) {
  /**
   * @function
   * @name deleteZipCode
   * @description Deletes a zip code by ID.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function deleteZipCode(event) {
    try {
      event.preventDefault();

      // Get zip code ID.
      const id = currentZipCode._id;

      // Request options.
      const options = {
        method: "DELETE",
        url: `/zip-codes/${id}`,
      };

      // Request.
      const { httpStatus, message } = await makeRequest(options);

      // Check for errors.
      if (httpStatus != 200) {
        showAlert({
          title: "Error",
          type: "danger",
          message,
        });
        return;
      }

      // Show success alert.
      showAlert({ title: "Zip code deleted", message });

      // Close modal.
      setShowModals((flags) => ({ ...flags, deleteZipCode: false }));

      // Fetch zip codes.
      getZipCodes();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  return (
    <Modal
      header="Delete zip code"
      showModal={showModals.deleteZipCode}
      setShowModal={() =>
        setShowModals((flags) => ({ ...flags, deleteZipCode: false }))
      }
    >
      <form
        aria-label="Delete zip code form"
        className={styles.container}
        onSubmit={deleteZipCode}
      >
        <p>Are you sure that you want to delete this zip code?</p>

        <Button
          text="Delete zip code"
          color="danger"
          type="submit"
          ariaLabel="Delete zip code"
        />
      </form>
    </Modal>
  );
}

DeleteZipCode.propTypes = {
  showModals: PropTypes.shape({
    createZipCode: PropTypes.bool.isRequired,
    updateZipCode: PropTypes.bool.isRequired,
    deleteZipCode: PropTypes.bool.isRequired,
  }).isRequired,
  setShowModals: PropTypes.func.isRequired,
  currentZipCode: PropTypes.shape({
    _id: PropTypes.string,
    zipCode: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  getZipCodes: PropTypes.func.isRequired,
};
