import React from 'react';

import styles from "./StatusField.module.css";

import infoIcon from "../../imgs/info.svg";
import doneIcon from "../../imgs/done.svg";
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';

const StatusField = ({ status }) => {
    const classesByStatus = {
        "Success": "statusWrapperSuccess",
        "Error": "statusWrapperError",
        "Loading": "",
    };

    const iconsByStatus = {
        "Success": doneIcon,
        "Error": infoIcon,
    };

    return (
        <div className={[styles.statusWrapper, status.visible ? "" : styles.hidden, styles[classesByStatus[status.status]]].join(" ")}>

            {status.status === "Loading" 
                ? <LoadingSpinner /> 
                : <img src={iconsByStatus[status.status]} alt="" width={20} height={20} />}

            <p>
                {status.message}
            </p>
        </div>
    );
};

export default StatusField;