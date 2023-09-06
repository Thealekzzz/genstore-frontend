import React from 'react';

import ExtraBullContainer from '../ExtraBullContainer/ExtraBullContainer';

import styles from "./ExtraBullsList.module.css"

const ExtraBullsList = React.forwardRef((props, ref) => {
    return (
        <form action="/evaluate2" className={[styles.bullsList, "animated"].join(" ")} ref={ref}>

            {props.extraMatchesBullsMarkers.filter(a => a.name.trim() !== "").sort((a, b) => a.name - b.name).map(el => {
                return <ExtraBullContainer bullData={el} key={el.name}/>
            })}
        
        
        </form>
    );
});

export default ExtraBullsList;