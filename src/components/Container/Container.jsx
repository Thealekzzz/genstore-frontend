import React from 'react';

import styles from './Container.module.css';

const Container = ({ direction, justifyContent, style, children, className }) => {
  return (
    <div
      className={[styles.container, className || ''].join(' ')}
      style={{
        flexDirection: direction || 'row',
        justifyContent: justifyContent || 'flex-start',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
