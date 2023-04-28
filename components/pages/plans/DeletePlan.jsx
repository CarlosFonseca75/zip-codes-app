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
import styles from "@styles/components/pages/plans/DeletePlan.module.scss";

export default function DeletePlan({
  showModals,
  setShowModals,
  getPlans,
  currentPlan,
}) {
  /**
   * @function
   * @name deletePlan
   * @description Deletes a plan by ID.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function deletePlan(event) {
    try {
      event.preventDefault();

      // Get plan ID.
      const id = currentPlan._id;

      // Request options.
      const options = {
        method: "DELETE",
        url: `/plans/${id}`,
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
      showAlert({ title: "Plan deleted", message });

      // Close modal.
      setShowModals((flags) => ({ ...flags, deletePlan: false }));

      // Fetch plans.
      getPlans();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  return (
    <Modal
      header="Delete plan"
      showModal={showModals.deletePlan}
      setShowModal={() =>
        setShowModals((flags) => ({ ...flags, deletePlan: false }))
      }
    >
      <form
        aria-label="Delete plan form"
        className={styles.container}
        onSubmit={deletePlan}
      >
        <p>Are you sure that you want to delete this plan?</p>

        <Button
          text="Delete plan"
          color="danger"
          type="submit"
          ariaLabel="Delete plan"
        />
      </form>
    </Modal>
  );
}

DeletePlan.propTypes = {
  showModals: PropTypes.shape({
    createPlan: PropTypes.bool.isRequired,
    updatePlan: PropTypes.bool.isRequired,
    deletePlan: PropTypes.bool.isRequired,
  }).isRequired,
  setShowModals: PropTypes.func.isRequired,
  currentPlan: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  getPlans: PropTypes.func.isRequired,
};
