// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import Button from "@components/common/Button";

// Styles.
import styles from "@styles/components/pages/plans/Plan.module.scss";

export default function Plan({ _id, name, description, setShowModals, setCurrentPlan }) {
  /**
   * @function
   * @name openModalWithPlan
   * @description Opens a modal depending on the modalName and sets the current plan.
   * @param {string} modalName The name of the modal to be opened.
   * @returns {void}
   */
  function openModalWithPlan(modalName) {
    try {
      // Set plan.
      const plan = { _id, name, description };
      setCurrentPlan(plan);

      // Show modal.
      setShowModals((prev) => ({ ...prev, [modalName]: true }));
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  return (
    <div className={styles.card}>
      {/* Name. */}
      <p className={styles.card__name}>
        <strong>{name}</strong>
      </p>

      {/* Description. */}
      <p className={styles.card__description}>{description}</p>

      {/* Actions. */}
      <div className={styles.card__actions}>
        <Button
          text="Update plan"
          color="primary"
          type="button"
          ariaLabel="Update plan"
          onClick={() => openModalWithPlan("updatePlan")}
        />
        <Button
          text="Delete plan"
          color="danger"
          type="button"
          ariaLabel="Delete plan"
          onClick={() => openModalWithPlan("deletePlan")}
        />
      </div>
    </div>
  );
}

Plan.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setShowModals: PropTypes.func.isRequired,
  setCurrentPlan: PropTypes.func.isRequired,
};
