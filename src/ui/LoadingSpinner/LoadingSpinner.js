import React from 'react';
import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
    return (
        <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
};

export default LoadingSpinner;