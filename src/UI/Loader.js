import React from "react";
import { AiOutlineCamera } from "react-icons/ai";

import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.Loader}>
      <AiOutlineCamera className={styles.Rotate} />
    </div>
  );
}
