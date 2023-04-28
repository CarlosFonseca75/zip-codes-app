// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Styles.
import styles from "@styles/components/common/Input.module.scss";

export default function Input({
  id,
  type,
  label,
  name,
  value,
  placeholder,
  onChange,
  minLength,
  maxLength,
  required,
}) {
  return (
    <div className={styles.container}>
      {/* Label. */}
      <label htmlFor={id}>
        <strong>{label}</strong>
        {!required && (
          <span className={styles["optional-message"]}> (optional)</span>
        )}
      </label>

      {/* Input. */}
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
};
