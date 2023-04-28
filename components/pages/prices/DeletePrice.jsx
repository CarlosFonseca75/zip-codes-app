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
import styles from "@styles/components/pages/prices/DeletePrice.module.scss";

export default function DeletePrice({
  showModals,
  setShowModals,
  getPrices,
  currentPrice,
}) {
  /**
   * @function
   * @name deletePrice
   * @description Deletes a price by ID.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function deletePrice(event) {
    try {
      event.preventDefault();

      // Get price ID.
      const id = currentPrice._id;

      // Request options.
      const options = {
        method: "DELETE",
        url: `/prices/${id}`,
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
      showAlert({ title: "Price deleted", message });

      // Close modal.
      setShowModals((flags) => ({ ...flags, deletePrice: false }));

      // Fetch prices.
      getPrices();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  return (
    <Modal
      header="Delete price"
      showModal={showModals.deletePrice}
      setShowModal={() =>
        setShowModals((flags) => ({ ...flags, deletePrice: false }))
      }
    >
      <form
        aria-label="Delete price form"
        className={styles.container}
        onSubmit={deletePrice}
      >
        <p>Are you sure that you want to delete this price?</p>

        <Button
          text="Delete price"
          color="danger"
          type="submit"
          ariaLabel="Delete price"
        />
      </form>
    </Modal>
  );
}

DeletePrice.propTypes = {
  showModals: PropTypes.shape({
    createPrice: PropTypes.bool.isRequired,
    updatePrice: PropTypes.bool.isRequired,
    deletePrice: PropTypes.bool.isRequired,
  }).isRequired,
  setShowModals: PropTypes.func.isRequired,
  currentPrice: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  getPrices: PropTypes.func.isRequired,
};
