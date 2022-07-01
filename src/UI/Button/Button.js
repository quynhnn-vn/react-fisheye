import React from "react";
import styles from "./Button.module.css";

/**
 * UI component for button
 */
export default function Button(props) {
  const { children, onClick, label } = props;
  return (
    <button arial-label={label} className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
}
