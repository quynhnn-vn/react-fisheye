import React from "react";
import logo from "assets/icons/logo.png";

import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.Header}>
      <Link to="/" aria-label="Fisheye Home page">
        <img src={logo} alt="Fisheye Home page" className={styles.Logo} />
      </Link>
      <h1>Nos photographes</h1>
    </header>
  );
}
