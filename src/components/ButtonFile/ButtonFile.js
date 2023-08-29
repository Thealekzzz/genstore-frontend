import React from 'react';

import styles from './ButtonFile.module.css';

const ButtonFile = React.forwardRef(({ buttonDisabled, onClick, children }, ref) => {
  return (
    <>
      <button
        type="button"
        className={styles.ButtonFile}
        disabled={buttonDisabled || false}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    </>
  );
});

export default ButtonFile;