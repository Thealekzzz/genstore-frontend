import React from 'react';

import styles from "./WhiteContainer.module.css";

const WhiteContainer = ({ style, children, extClass }) => {
  return (
    <div style={style} className={[styles['white-container'], extClass].join(" ")}>
      {children}
    </div>
  );
};

export default WhiteContainer;