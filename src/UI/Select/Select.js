import React from "react";
import { ExpandMore } from "@mui/icons-material";
import { Select, MenuItem } from "@mui/material";
import styles from "./Select.module.css";

/**
 * UI component for select
 */
export default function CustomSelect(props) {
  const { id, label, labelBy, value, onChange, options } = props;
  return (
    <Select
      id={id}
      labelId={id}
      aria-label={label}
      aria-labelledby={labelBy}
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
