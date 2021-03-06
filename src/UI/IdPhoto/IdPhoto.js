import React from "react";
import { getIDPhotoSource } from "utils/utils";
import styles from "./IdPhoto.module.css";

/**
 * UI component for profile photo
 */
export default function IdPhoto({ user }) {
  return (
    <img
      src={getIDPhotoSource(user?.name)}
      alt={user?.name || "profile"}
      className={styles.IdPhoto}
      loading="lazy"
    />
  );
}
