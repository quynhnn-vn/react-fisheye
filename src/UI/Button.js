import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, onClick, label }) {
  return (
    <button arial-label={label} className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
}
