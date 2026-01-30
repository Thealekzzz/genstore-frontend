import ExtraBullContainer from '../ExtraBullContainer/ExtraBullContainer';

import styles from './ExtraBullsList.module.css';

const ExtraBullsList = ({
  extraMatchesBullsMarkers,
  handleGlobalSearchBullClicked,
  globalSearchSelectedBulls,
  isGlobalSearchSelectedDefault,
  ref,
}) => {
  return (
    <form action="/evaluate2" className={[styles.bullsList, 'animated'].join(' ')} ref={ref}>
      {extraMatchesBullsMarkers
        .filter((a) => a.name?.trim() !== '')
        .sort((a, b) => a.name - b.name)
        .map((el) => {
          return (
            <ExtraBullContainer
              bullData={el}
              key={el.name}
              handleGlobalSearchBullClicked={handleGlobalSearchBullClicked}
              globalSearchSelectedBulls={globalSearchSelectedBulls}
              isGlobalSearchSelectedDefault={isGlobalSearchSelectedDefault}
            />
          );
        })}
    </form>
  );
};

export default ExtraBullsList;
