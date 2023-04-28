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
import styles from "@styles/components/pages/prices/UpdatePrice.module.scss";

// Default data.
const defaultData = {
  price: 0,
  zipCode: "",
  plan: "",
};

export default function UpdatePrice({
  showModals,
  setShowModals,
  getPrices,
  zipCodes,
  plans,
  currentPrice,
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
      setShowModals((flags) => ({ ...flags, updatePrice: false }));

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
   * @name updatePrice
   * @description Submits the form and updates the price.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function updatePrice(event) {
    try {
      event.preventDefault();

      // Validate form.
      if (!isFormValidAndComplete()) return;

      // Loader.
      setIsLoading(true);

      // Get price ID.
      const id = currentPrice._id;

      // Request options.
      const options = {
        method: "PUT",
        url: `/prices/${id}`,
        data,
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
      showAlert({ title: "Price updated", message });

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
   * @name handleUpdateModal
   * @description Sets the current price data to be updated.
   * @returns {void}
   */
  useEffect(() => {
    try {
      if (showModals.updatePrice) {
        const { price, zipCode, plan } = currentPrice;

        const priceToUpdate = {
          zipCode: zipCode._id,
          plan: plan._id,
          price,
        };

        setData(priceToUpdate);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }, [showModals]);

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
      header="Update price"
      showModal={showModals.updatePrice}
      setShowModal={onCloseModal}
    >
      <form
        aria-label="Update price form"
        className={styles.container}
        onSubmit={updatePrice}
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
          text="Update price"
          type="submit"
          ariaLabel="Create price"
          disabled={formHasErrors}
          loading={isLoading}
        />
      </form>
    </Modal>
  );
}

UpdatePrice.propTypes = {
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
  currentPrice: PropTypes.shape({
    _id: PropTypes.string,
    zipCode: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    plan: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  }).isRequired,
};
