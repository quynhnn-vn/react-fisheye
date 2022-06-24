import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, onClick, alt }) {
  return (
    <button className={styles.Button} onClick={onClick} alt={alt}>
      {children}
    </button>
  );
}
