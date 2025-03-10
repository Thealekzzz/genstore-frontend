import { useEffect, useState } from 'react';

import styles from './ExtraBullContainer.module.css';
import { search } from '../../api/search';

const minSymbolsForSearch = 2;

const ExtraBullContainer = ({
  bullData,
  handleGlobalSearchBullClicked,
  globalSearchSelectedBulls,
  isGlobalSearchSelectedDefault = false,
}) => {
  // let markerCaptions = ["семенной код", "идентификационный номер", "инвентарный номер"]

  const [inputValue, setInputValue] = useState('');
  const [isGlobalSearchSelected, setIsGlobalSearchSelected] = useState(isGlobalSearchSelectedDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  function handleInputChange(evt) {
    setInputValue(evt.target.value);
  }

  function handleGlobalSearch(searchValue) {
    search({
      isShort: true,
      markerType: 'Name',
      markers: [searchValue],
    })
      .then(({ data }) => {
        setSearchResult(data[0].matches);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('error', error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!isGlobalSearchSelected) {
      return;
    }

    if (inputValue.length < minSymbolsForSearch) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setSearchResult([]);
    handleGlobalSearchBullClicked(bullData.name, null);

    const timeoutId = setTimeout(() => {
      handleGlobalSearch(inputValue);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, isGlobalSearchSelected]);

  return (
    <article className={styles.bullContainer}>
      <p className={styles.title}>
        <div className={styles.titleLeft}>
          <span className={styles.titleAccent}>{bullData.name}</span>
          {[bullData.naab, bullData.id, bullData.inv].filter((el) => Boolean(el)).join(', ')}
        </div>

        <div className={styles.titleRight}>
          <label htmlFor={`global_${bullData.name}`} className={styles.globalSearchLabel}>
            <input
              type="checkbox"
              id={`global_${bullData.name}`}
              checked={isGlobalSearchSelected}
              onChange={() => setIsGlobalSearchSelected(!isGlobalSearchSelected)}
            />
            <span className={styles.globalSearchLabelText}>Глобальный поиск</span>
          </label>

          <input
            type="text"
            className={styles.titleInput}
            placeholder="Поиск по кличке"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </p>

      <div className={styles.optionsHead}>
        <p className={styles.optionsHeadItem}>Полное имя</p>
        <p className={styles.optionsHeadItem}>Семенной код</p>
        <p className={styles.optionsHeadItem}>Идентификатор</p>
        <p className={styles.optionsHeadItem}>TPI</p>
        <p className={styles.optionsHeadItem}>Молоко</p>
      </div>

      {isGlobalSearchSelected ? (
        inputValue.length < minSymbolsForSearch ? (
          <div className={styles.globalSearchPlaceholderBlock}>
            <span>Введи кличку</span>
          </div>
        ) : isLoading ? (
          <div className={styles.globalSearchPlaceholderBlock}>
            <span>Поиск...</span>
          </div>
        ) : searchResult?.length === 0 ? (
          <div className={styles.globalSearchPlaceholderBlock}>
            <span>Нет результатов</span>
          </div>
        ) : (
          <div className={styles.bullsOptions}>
            {searchResult?.map((foundedBull) => (
              <div
                onClick={() => handleGlobalSearchBullClicked(bullData.name, foundedBull.id)}
                className={[
                  styles.bullsOption,
                  globalSearchSelectedBulls[bullData.name] === foundedBull.id ? styles.active : '',
                ].join(' ')}
                key={foundedBull.id}
              >
                <p></p>
                <p className={styles.bullInfo}>{foundedBull['Name']}</p>
                <p className={styles.bullInfo}>{foundedBull['NAAB Code']}</p>
                <p className={styles.bullInfo}>{foundedBull['InterRegNumber']}</p>
                <p className={styles.bullInfo}>{foundedBull['TPI']}</p>
                <p className={styles.bullInfo}>{foundedBull['Milk']}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className={styles.bullsOptions}>
          {bullData.matches
            .filter((option) => option.Name.trim() !== '')
            .filter((option) => option.Name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1)
            .slice(0, 100)
            .map((option) => {
              return (
                <label
                  htmlFor={`${bullData.name}_${option.Name}`}
                  className={styles.bullsOption}
                  key={`${bullData.name}_${option.Name}_${
                    option.InterRegNumber ? option.InterRegNumber : option['NAAB Code']
                  }`}
                >
                  <input
                    type="radio"
                    name={bullData.name}
                    id={`${bullData.name}_${option.Name}`}
                    value={`${bullData.name}_${option.Name}`}
                  />
                  <p className={styles.bullInfo}>{option['Name']}</p>
                  <p className={styles.bullInfo}>{option['NAAB Code']}</p>
                  <p className={styles.bullInfo}>{option['InterRegNumber']}</p>
                  <p className={styles.bullInfo}>{option['TPI']}</p>
                  <p className={styles.bullInfo}>{option['Milk']}</p>
                </label>
              );
            })}

          <label htmlFor={`${bullData.name}`} className={styles.bullsOption}>
            <input type="radio" name={bullData.name} id={`${bullData.name}`} value={`${bullData.name}`} />
            <p className={styles.bullInfo}>Если ни один не подошел</p>
          </label>
        </div>
      )}
    </article>
  );
};

export default ExtraBullContainer;
