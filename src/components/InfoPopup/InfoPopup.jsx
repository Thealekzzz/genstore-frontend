import React from 'react';

import styles from './InfoPopup.module.css';

const InfoPopup = (props) => {
  return (
    <div className={[styles.popup, !props.isOpen && styles.hidden].join(' ')} style={props.style}>
      {props.title && <p className={styles.title}>{props.title}</p>}
      {props.message && <p className={styles.message}>{props.message}</p>}
    </div>
  );
};

export default InfoPopup;
