// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Styles.
import styles from "@styles/components/common/Select.module.scss";

export default function Select({
  id,
  label,
  placeholder,
  value,
  onChange,
  options,
}) {
  return (
    <div className={styles.container}>
      {/* Label. */}
      <label htmlFor={id}>
        <strong>{label}</strong>
      </label>

      {/* Select. */}
      <select
        className={styles.container__select}
        id={id}
        value={value}
        onChange={onChange}
      >
        {/* Default. */}
        <option key="empty" value="" defaultValue disabled hidden>
          {placeholder}
        </option>

        {/* Options. */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};
