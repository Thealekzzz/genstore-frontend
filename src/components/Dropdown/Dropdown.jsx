import { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import styles from "./Dropdown.module.css";
import arrowIcon from "./imgs/arrow.svg";

const DropdownMenu = ({ options, onSelect, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || null);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleCloseDropdown = useCallback((evt) => {
    if (
      !evt.target.closest(`.${styles.dropdownMenu}`)
      || evt.key === 'Escape'
    ) {
      setIsOpen(false);
    }
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleCloseDropdown);
      window.addEventListener('keydown', handleCloseDropdown);
    } else {
      window.removeEventListener('click', handleCloseDropdown);
      window.removeEventListener('keydown', handleCloseDropdown);
    }

  }, [isOpen, handleCloseDropdown]);

  return (
    <div className={styles.dropdownMenu}>
      <button className={styles.dropdown} onClick={handleDropdownClick}>
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

DropdownMenu.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default DropdownMenu;