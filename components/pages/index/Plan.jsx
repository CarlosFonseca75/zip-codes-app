// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Helpers.
import getCurrency from "@helpers/getCurrency";

// Styles.
import styles from "@styles/components/pages/index/Plan.module.scss";

export default function Plan({ name, description, price }) {
  return (
    <div className={styles.card}>
      {/* Name. */}
      <p className={styles.card__name}>
        <strong>{name}</strong>
      </p>

      {/* Description */}
      <p className={styles.card__description}>{description}</p>

      {/* Price. */}
      <p className={styles.card__price}>
        <strong>
          {getCurrency(price)} <span>MXN</span>
        </strong>
      </p>
    </div>
  );
}

Plan.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number,
};
