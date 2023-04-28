// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import Button from "@components/common/Button";

// Helpers.
import getCurrency from "@helpers/getCurrency";

// Styles.
import styles from "@styles/components/pages/prices/Price.module.scss";

export default function Price({ _id, price, zipCode, plan, setShowModals, setCurrentPrice }) {
  /**
   * @function
   * @name openModalWithPrice
   * @description Opens a modal depending on the modalName and sets the current price.
   * @param {string} modalName The name of the modal to be opened.
   * @returns {void}
   */
  function openModalWithPrice(modalName) {
    try {
      // Set price.
      const priceData = { _id, price, zipCode, plan };
      setCurrentPrice(priceData);

      // Show modal.
      setShowModals((prev) => ({ ...prev, [modalName]: true }));
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  return (
    <div className={styles.card}>
      {/* Price. */}
      <p className={styles.card__price}>
        <strong>
          {getCurrency(price)} <span>MXN</span>
        </strong>
      </p>

      {/* Zip code. */}
      <p className={styles["card__zip-code"]}>
        <strong>Zip code:</strong> {zipCode?.zipCode}
      </p>

      {/* Plan. */}
      <p className={styles.card__plan}>
        <strong>Plan:</strong> {plan?.name}
      </p>

      {/* Actions. */}
      <div className={styles.card__actions}>
        <Button
          text="Update price"
          color="primary"
          type="button"
          ariaLabel="Update price"
          onClick={() => openModalWithPrice("updatePrice")}
        />
        <Button
          text="Delete price"
          color="danger"
          type="button"
          ariaLabel="Delete price"
          onClick={() => openModalWithPrice("deletePrice")}
        />
      </div>
    </div>
  );
}

Price.propTypes = {
  _id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  zipCode: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    zipCode: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  plan: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  setShowModals: PropTypes.func.isRequired,
  setCurrentPrice: PropTypes.func.isRequired,
};
