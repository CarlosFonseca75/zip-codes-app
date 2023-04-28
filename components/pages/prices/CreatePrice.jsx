// Dependencies.
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components.
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import Select from "@components/common/Select";

// Helpers.
import makeRequest from "@helpers/makeRequest";
import showAlert from "@helpers/showAlert";

// Styles.
import styles from "@styles/components/pages/prices/CreatePrice.module.scss";

// Default data.
const defaultData = {
  price: "",
  zipCode: "",
  plan: "",
};

export default function CreatePrice({
  showModals,
  setShowModals,
  getPrices,
  zipCodes,
  plans,
}) {
  // State.
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [formHasErrors, setFormHasErrors] = useState(false);

  /**
   * @function
   * @name onCloseModal
   * @description Close modal and set data and errors to default values.
   * @returns {void}
   */
  function onCloseModal() {
    try {
      // Close modal.
      setShowModals((flags) => ({ ...flags, createPrice: false }));

      // Set default data.
      setData(defaultData);

      // Hide errors.
      setFormHasErrors(false);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return false;
    }
  }

  /**
   * @function
   * @name onChange
   * @description Sets form data when the inputs values are changed.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  function onChange(event) {
    try {
      const { id, value } = event.target;

      setData((currentData) => ({
        ...currentData,
        [id]: value,
      }));
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * @function
   * @name isFormValidAndComplete
   * @description Validates if the form is complete and valid.
   * @returns {boolean} Returns true if the form is complete and valid, false otherwise.
   */
  function isFormValidAndComplete() {
    try {
      const { price, zipCode, plan } = data;

      if (price && zipCode && plan) return true;

      setFormHasErrors(true);

      return false;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return false;
    }
  }

  /**
   * @async
   * @function
   * @name createPrice
   * @description Submits the form and creates a new price.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function createPrice(event) {
    try {
      event.preventDefault();

      // Validate form.
      if (!isFormValidAndComplete()) return;

      // Loader.
      setIsLoading(true);

      // Request options.
      const options = {
        method: "POST",
        url: "/prices",
        data,
      };

      // Request.
      const { httpStatus, message } = await makeRequest(options);

      // Check for errors.
      if (httpStatus != 201) {
        showAlert({
          title: "Error",
          type: "danger",
          message,
        });
        return;
      }

      // Show success alert.
      showAlert({ title: "Price created", message });

      // Reset form.
      setData(defaultData);

      // Close modal.
      onCloseModal();

      // Fetch prices.
      getPrices();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * @function
   * @name onDataChange
   * @description Resets the form error state when new data is received.
   * @return {void}
   */
  useEffect(() => {
    setFormHasErrors(false);
  }, [data]);

  return (
    <Modal
      header="Create price"
      showModal={showModals.createPrice}
      setShowModal={onCloseModal}
    >
      <form
        aria-label="Create price form"
        className={styles.container}
        onSubmit={createPrice}
      >
        <p>Complete the following fields:</p>

        <Input
          id="price"
          type="number"
          name="price"
          label="Price (yearly):"
          value={data.price}
          placeholder="Enter the price."
          onChange={onChange}
          required
        />

        <Select
          id="zipCode"
          label="Zip code:"
          value={data.zipCode}
          placeholder="Select a zip code."
          onChange={onChange}
          options={zipCodes}
        />

        <Select
          id="plan"
          label="Plan:"
          value={data.plan}
          placeholder="Select a plan."
          onChange={onChange}
          options={plans}
        />

        <Button
          text="Create price"
          type="submit"
          ariaLabel="Create price"
          disabled={formHasErrors}
          loading={isLoading}
        />
      </form>
    </Modal>
  );
}

CreatePrice.propTypes = {
  showModals: PropTypes.shape({
    createPrice: PropTypes.bool.isRequired,
    updatePrice: PropTypes.bool.isRequired,
    deletePrice: PropTypes.bool.isRequired,
  }).isRequired,
  setShowModals: PropTypes.func.isRequired,
  getPrices: PropTypes.func.isRequired,
  zipCodes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};
