import React from 'react';

import styles from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = ({ href, buttonDisabled, onClick, children, isOnCenter = false, ...props }) => {
  return (
    <>
      {href ? (
        <Link
          to={href}
          className={styles.button}
          // onClick={onLinkButtonClick}
          disabled={buttonDisabled}
          style={{ justifyContent: isOnCenter ? 'center' : 'initial' }}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <button
          className={styles.button}
          onClick={onClick}
          disabled={buttonDisabled}
          style={{ justifyContent: isOnCenter ? 'center' : 'initial' }}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
