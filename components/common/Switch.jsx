// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Styles.
import styles from "@styles/components/common/Switch.module.scss";

export default function Switch({ id, leftText, rightText, checked, onChange }) {
  return (
    <div className={styles.container}>
      {/* Left text. */}
      <span>{leftText}</span>

      {/* Switch. */}
      <label htmlFor={id} className={styles.switch}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>

      {/* Right text. */}
      <span>{rightText}</span>
    </div>
  );
}

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
