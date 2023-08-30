import React, { useState } from "react";

import styles from "./Dropdown.module.css";
import arrowIcon from "./imgs/arrow.svg";

const DropdownMenu = ({ options, onSelect, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className={styles.dropdownMenu}>
      <button className={styles.dropdown} onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedOption || "Select an option"}</span>
        <img src={arrowIcon} className={styles.arrow} style={{transform: `rotateZ(${isOpen ? "90deg" : 0})`}} alt="" />
      </button>

      <ul className={[styles.options, !isOpen ? styles.hidden: ""].join(" ")} >
        {options.map((option) => (
          <li className={styles.option} key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;