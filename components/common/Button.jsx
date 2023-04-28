// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Styles.
import styles from "@styles/components/common/Button.module.scss";

export default function Button({
  text,
  type,
  color = "primary",
  onClick,
  ariaLabel,
  disabled,
  loading,
}) {
  return (
    <div className={`${styles.container} ${styles[`container--${color}`]} ${disabled || loading ? styles[`container--disabled`] : ""}`}>
      <button
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
      >
        {loading ? <span>Loading...</span> : text}
      </button>
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit"]),
  color: PropTypes.oneOf(["primary", "secondary", "danger"]),
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
