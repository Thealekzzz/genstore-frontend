import React from 'react';

import ExtraBullContainer from '../ExtraBullContainer/ExtraBullContainer';

import styles from "./ExtraBullsList.module.css"

const ExtraBullsList = React.forwardRef(({ extraMatchesBullsMarkers, handleGlobalSearchBullClicked, globalSearchSelectedBulls }, ref) => {
    return (
        <form action="/evaluate2" className={[styles.bullsList, "animated"].join(" ")} ref={ref}>

            {extraMatchesBullsMarkers.filter(a => a.name.trim() !== "").sort((a, b) => a.name - b.name).map(el => {
                return <ExtraBullContainer 
                    bullData={el} 
                    key={el.name} 
                    handleGlobalSearchBullClicked={handleGlobalSearchBullClicked}
                    globalSearchSelectedBulls={globalSearchSelectedBulls} 
                />
            })}
        
        
        </form>
    );
});

export default ExtraBullsList;