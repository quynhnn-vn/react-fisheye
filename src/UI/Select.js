import { ExpandMore } from "@mui/icons-material";
import { Select, MenuItem } from "@mui/material";
import React from "react";
import styles from "./Select.module.css";

export default function CustomSelect({ id, label, value, onChange, options }) {
  return (
    <Select
      labelId={id}
      id={id}
      aria-label={label}
      aria-labelledby={label}
      value={value}
      onChange={onChange}
      className={styles.DropDown}
      IconComponent={ExpandMore}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value} className={styles.MenuItem}>
          {option.title}
        </MenuItem>
      ))}
    </Select>
  );
}
