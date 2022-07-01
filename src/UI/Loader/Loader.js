import React from "react";

import styles from "./Loader.module.css";

/**
 * UI component for loader
 */
export default function Loader() {
  return (
    <div className={styles.Loader}>
      <span className={styles.Dot}></span>
      <div className={styles.Dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
