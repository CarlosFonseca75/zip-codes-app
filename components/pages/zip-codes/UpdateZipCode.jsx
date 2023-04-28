// Dependencies.
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components.
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";

// Helpers.
import makeRequest from "@helpers/makeRequest";
import showAlert from "@helpers/showAlert";

// Styles.
import styles from "@styles/components/pages/zip-codes/UpdateZipCode.module.scss";

// Default data.
const defaultData = {
  zipCode: "",
  city: "",
  state: "",
};

export default function UpdateZipCode({
  showModals,
  setShowModals,
  getZipCodes,
  currentZipCode,
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
      setShowModals((flags) => ({ ...flags, updateZipCode: false }));

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
      const { zipCode, city, state } = data;

      if (zipCode && city && state) return true;

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
   * @name updateZipCode
   * @description Submits the form and updates the zip code.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function updateZipCode(event) {
    try {
      event.preventDefault();

      // Validate form.
      if (!isFormValidAndComplete()) return;

      // Loader.
      setIsLoading(true);

      // Get zip code ID.
      const id = currentZipCode._id;

      // Request options.
      const options = {
        method: "PUT",
        url: `/zip-codes/${id}`,
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
      showAlert({ title: "Zip code updated", message });

      // Close modal.
      setShowModals((flags) => ({ ...flags, updateZipCode: false }));

      // Fetch zip-codes.
      getZipCodes();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * @function
   * @name handleUpdateModal
   * @description Sets the current zip code data to be updated.
   * @returns {void}
   */
  useEffect(() => {
    try {
      if (showModals.updateZipCode) {
        setData(currentZipCode);
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
      header="Update zip code"
      showModal={showModals.updateZipCode}
      setShowModal={onCloseModal}
    >
      <form
        aria-label="Update zip code form"
        className={styles.container}
        onSubmit={updateZipCode}
      >
        <p>Complete the following fields:</p>

        <Input
          id="zipCode"
          type="number"
          name="zipCode"
          label="Zip code:"
          value={data.zipCode}
          placeholder="Enter your zip-code, e.g. 37207."
          onChange={onChange}
          maxLength={5}
          minLength={5}
          required
        />

        <Input
          id="city"
          type="text"
          name="city"
          label="City:"
          value={data.city}
          placeholder="Enter the city."
          onChange={onChange}
          maxLength={20}
          required
        />

        <Input
          id="state"
          type="text"
          name="state"
          label="State:"
          value={data.state}
          placeholder="Enter the state."
          onChange={onChange}
          maxLength={20}
          required
        />

        <Button
          text="Update zip code"
          type="submit"
          ariaLabel="Update zip code"
          loading={isLoading}
          disabled={formHasErrors}
        />
      </form>
    </Modal>
  );
}

UpdateZipCode.propTypes = {
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
