import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ButtonAccent.module.css';

const ButtonAccent = React.forwardRef(({ 
    href,
    buttonDisabled,
    onClick,
    children,
    type,
    isOnCenter=false
}, ref) => {
    return (
        <>
            {href ? (
                <Link
                    to={href}
                    className={styles.buttonAccent}
                    disabled={buttonDisabled || false}
                    onClick={onClick}
                    ref={ref}
                    style={{justifyContent: isOnCenter ? "center" : "initial"}}
                >
                    {children}
                </Link>

            ) : (
                <button
                    type={type || "button"}
                    className={styles.buttonAccent}
                    disabled={buttonDisabled || false}
                    onClick={onClick}
                    ref={ref}
                    style={{justifyContent: isOnCenter ? "center" : "initial"}}
                >
                    {children}
                </button>
            )}
        </>
    );
});

export default ButtonAccent;