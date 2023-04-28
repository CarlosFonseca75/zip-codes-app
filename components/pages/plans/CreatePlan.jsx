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
import styles from "@styles/components/pages/plans/CreatePlan.module.scss";

// Default data.
const defaultData = {
  name: "",
  description: "",
};

export default function CreatePlan({ showModals, setShowModals, getPlans }) {
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
      setShowModals((flags) => ({ ...flags, createPlan: false }));

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
      const { name, description } = data;

      if (name && description) return true;

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
   * @name createPlan
   * @description Submits the form and creates a new plan.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function createPlan(event) {
    try {
      event.preventDefault();

      // Validate form.
      if (!isFormValidAndComplete()) return;

      // Loader.
      setIsLoading(true);

      // Request options.
      const options = {
        method: "POST",
        url: "/plans",
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
      showAlert({ title: "Plan created", message });

      // Reset form.
      setData(defaultData);

      // Close modal.
      setShowModals((flags) => ({ ...flags, createPlan: false }));

      // Fetch plans.
      getPlans();
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
      header="Create plan"
      showModal={showModals.createPlan}
      setShowModal={onCloseModal}
    >
      <form
        aria-label="Create plan form"
        className={styles.container}
        onSubmit={createPlan}
      >
        <p>Complete the following fields:</p>

        <Input
          id="name"
          type="text"
          name="name"
          label="Name:"
          value={data.name}
          placeholder="Enter your plan name, e.g. Small, Medium, Big."
          onChange={onChange}
          maxLength={20}
          required
        />

        <Input
          id="description"
          type="text"
          name="description"
          label="Description:"
          value={data.description}
          placeholder="Enter your plan description, e.g. 0.5m 1.0m (until 0.5 m3)."
          onChange={onChange}
          maxLength={50}
          required
        />

        <Button
          text="Create plan"
          type="submit"
          ariaLabel="Create plan"
          loading={isLoading}
          disabled={formHasErrors}
        />
      </form>
    </Modal>
  );
}

CreatePlan.propTypes = {
  showModals: PropTypes.shape({
    createPlan: PropTypes.bool.isRequired,
    updatePlan: PropTypes.bool.isRequired,
    deletePlan: PropTypes.bool.isRequired,
  }).isRequired,
  setShowModals: PropTypes.func.isRequired,
  getPlans: PropTypes.func.isRequired,
};
