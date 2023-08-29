import React from 'react';

import "./InfoPopup.css"

const InfoPopup = React.forwardRef((props, ref) =>{

    

    return (
        <div className={['info-popup', props.visible ? "" : "info-popup_invisible"].join(" ")} style={props.style}>
            {props.children}
        </div>
    );
});

export default InfoPopup;