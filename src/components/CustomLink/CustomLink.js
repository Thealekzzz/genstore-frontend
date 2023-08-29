import React from 'react';

import styles from "./CustomLink.module.css";
import { Link } from 'react-router-dom';

const CustomLink = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
};

export default CustomLink;