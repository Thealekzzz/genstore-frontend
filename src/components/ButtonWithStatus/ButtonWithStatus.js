// import React from 'react';

import styles from "./ButtonWithStatus.module.css";

// import infoIcon from "../../imgs/info.svg";
// import doneIcon from "../../imgs/done.svg";
// import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import StatusField from '../StatusField/StatusField';
import ButtonAccent from "../ButtonAccent/ButtonAccent";

const ButtonWithStatus = ({ type, statusOnTheLeft, handleClick, buttonRef, processStatus, buttonDisabled, buttonText }) => {
    return (
        <div className={styles.buttonWrapper} style={{flexDirection: statusOnTheLeft ? "row-reverse" : "row", alignSelf: statusOnTheLeft ? "flex-end" : "flex-start"}}>
            <ButtonAccent 
                type={type}
                onClick={handleClick} 
                ref={buttonRef}
                buttonDisabled={buttonDisabled}
            >
                {buttonText}
            </ButtonAccent>

            <StatusField status={processStatus} />
        </div>
    );
};

export default ButtonWithStatus;