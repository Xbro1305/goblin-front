import React from "react";
import styles from "./Input.module.scss";

export const Input = ({ onChange, value, placeholder }) => {
  return (
    <label className={styles.inputLabel}>
      <input
        required
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p>{placeholder}</p>
    </label>
  );
};
