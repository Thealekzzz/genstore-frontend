import { useContext, useEffect, useState } from 'react';

import styles from './Search.module.css';
import './Search.css';

// import homeIcon from "../../imgs/home.svg";
// import profileIcon from "../../imgs/profile.svg";
// import requestsIcon from "../../imgs/requests.svg";
// import bulbIcon from "../../imgs/bulb.svg";
import searchIcon from '../../imgs/search.svg';

import Container from '../../components/Container/Container';
import DropdownMenu from '../../components/Dropdown/Dropdown';

import TokenContext from '../../contexts/TokenContext';

import { SERVER_PORT, SERVER_URL } from '../../config';
import wordEnding from '../../utils/wordEnding';
import Loader from '../../components/Loader/Loader';
import { columnNames } from '../../consts';

const Search = () => {
  // const [isSearchBySingleParameter, setIsSearchBySingleParameter] = useState(true);
  const token = useContext(TokenContext);

  const [markerType, setMarkerType] = useState('NAAB');
  const [separator, setSeparator] = useState('Пробел');

  const [inputValue, setInputValue] = useState('');
  const [filterInputsValue, setFilterInputsValue] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [extendedMarkersOfBullsWithSingleMatch, setExtendedMarkersOfBullsWithSingleMatch] = useState(new Map());
  const [extendedMarkersOfBullsWithSeveralMatches, setExtendedMarkersOfBullsWithSeveralMatches] = useState(new Map());
  const [extendedMarkersOfBullsWithNoMatches, setExtendedMarkersOfBullsWithNoMatches] = useState(new Set());

  const markerTypes = {
    NAAB: 'naab_code',
    ID: 'inter_reg_number',
    Кличка: 'name',
    'Инв. Номер': 'inventory_number',
  };

  const separators = {
    Пробел: ' ',
    Запятая: ',',
    'Точка с запятой': ';',
  };

  function handleFilterInputChange(evt, marker) {
    setFilterInputsValue((prev) => {
      // Сохраняю предыдущее значение фильтров для текущего запроса (marker)
      const prevForMarker = prev.marker || {};

      // Записываю значения фильтров, изменяя только текущий фильтр (evt.target.id) для текущего запроса (marker)
      return { ...prev, [marker]: { ...prevForMarker, [evt.target.id]: evt.target.value } };
    });
  }

  function handleOptionClick(marker, bullData) {
    const prevSeveral = new Map(extendedMarkersOfBullsWithSeveralMatches);
    const prevSingle = new Map(extendedMarkersOfBullsWithSingleMatch);

    prevSingle.set(marker, bullData);
    prevSeveral.get(marker).forEach((currBull) => {
      if (currBull.inter_reg_number === bullData.inter_reg_number) {
        currBull.chosen = true;
      } else {
        currBull.chosen = false;
      }
    });

    setExtendedMarkersOfBullsWithSeveralMatches(prevSeveral);
    setExtendedMarkersOfBullsWithSingleMatch(prevSingle);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (isLoading) return;

    const markers = [
      ...new Set(
        inputValue
          .split(separators[separator])
          .map((el) => el.trim())
          .filter((el) => el.length),
      ),
    ];

    console.log(markers);

    setIsLoading(true);
    fetch(`${SERVER_URL}:${SERVER_PORT}/api/search`, {
      method: 'POST',
      body: JSON.stringify({ markers, markerType: markerTypes[markerType] }),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const noMatches = new Set(extendedMarkersOfBullsWithNoMatches);
        const singleMatch = new Map(extendedMarkersOfBullsWithSingleMatch);
        const extraMatches = new Map(extendedMarkersOfBullsWithSeveralMatches);

        // Добавляю данные быков в стейты, соответствующие кол-ву совпадений
        data.data.forEach((markerExtended) => {
          if (markerExtended.matches.length === 0) {
            // console.log("Ноль совпадений");
            noMatches.add(markerExtended.marker);
          } else if (markerExtended.matches.length === 1) {
            // console.log("1 совпадение");
            singleMatch.set(markerExtended.marker, markerExtended.matches[0]);
          } else {
            // console.log("Много совпадений");
            extraMatches.set(markerExtended.marker, markerExtended.matches);
          }
        });

        singleMatch.forEach((singleMatchBull) => {
          if (!singleMatchBull.birth_date) {
            return;
          }

          singleMatchBull.birth_date = singleMatchBull.birth_date.slice(0, 10).split("-").reverse().join(".");
        });

        extraMatches.forEach((extraMatchBulls) => {
          extraMatchBulls.forEach((bull) => {
            if (!bull.birth_date) {
              return;
            }
  
            bull.birth_date = bull.birth_date.slice(0, 10).split("-").reverse().join(".");
          })
        });

        setExtendedMarkersOfBullsWithNoMatches(noMatches);
        setExtendedMarkersOfBullsWithSingleMatch(singleMatch);
        setExtendedMarkersOfBullsWithSeveralMatches(extraMatches);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log('Ошибка запроса данных', err);
      });
  }

  useEffect(() => {
    console.log('No matches', extendedMarkersOfBullsWithNoMatches);
    console.log('1 match', extendedMarkersOfBullsWithSingleMatch);
    console.log('Several matches', extendedMarkersOfBullsWithSeveralMatches);
  }, [
    extendedMarkersOfBullsWithNoMatches,
    extendedMarkersOfBullsWithSingleMatch,
    extendedMarkersOfBullsWithSeveralMatches,
  ]);

  return (
    <Container className={styles['container']}>
      <main className={[styles['main'], styles['search']].join(' ')}>
        <div className={styles['search__header']}>
          {/* <ul className={styles["search__options"]}>
            <li className={[
              styles['search__option'],
              isSearchBySingleParameter ? styles["search__option_active"] : ""].join(" ")
            }>Один параметр</li>

            <li className={[
              styles['search__option'],
              isSearchBySingleParameter ? "" : styles["search__option_active"]].join(" ")
            }>Несколько параметров</li>
          </ul> */}

          <div className={styles['search__form']}>
            <ul className={styles['search__settings']}>
              <li className={styles['search__setting']}>
                <span>Поиск по</span>
                <DropdownMenu
                  options={Object.keys(markerTypes)}
                  defaultValue={markerType}
                  onSelect={(option) => setMarkerType(option)}
                />
              </li>

              <li className={styles['search__setting']}>
                <span>Разделитель</span>
                <DropdownMenu
                  options={Object.keys(separators)}
                  defaultValue={separator}
                  onSelect={(option) => setSeparator(option)}
                />
              </li>
            </ul>

            <form className={styles['search__line-wrapper']} onSubmit={handleSubmit}>
              <input
                placeholder={`Введите ${markerType}`}
                value={inputValue}
                onChange={(evt) => setInputValue(evt.target.value)}
                type="text"
                className={styles['search__line']}
              />
              <button className={styles['search_icon-wrapper']} type="submit" disabled={isLoading}>
                {isLoading ? <Loader /> : <img src={searchIcon} alt="" className={styles['search_icon']} />}
              </button>
            </form>
          </div>
        </div>

        <div
          className={[
            styles['search__unfound'],
            extendedMarkersOfBullsWithNoMatches.size ? '' : styles['search__unfound_hidden'],
          ].join(' ')}
        >
          <h3 className={styles['search__section-title']}>Ненайденные животные</h3>
          <ul className={styles['search__unfound-items']}>
            {[...extendedMarkersOfBullsWithNoMatches.values()].map((extendedMarker) => (
              <li key={extendedMarker} className={styles['search__unfound-item']}>
                {extendedMarker}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={[
            styles['search__table-wrapper'],
            !extendedMarkersOfBullsWithSingleMatch.size ? styles['search__table-wrapper_hidden'] : '',
          ].join(' ')}
        >
          <table className={[styles['search__table']].join(' ')}>
            <tbody>
              <tr>
                {columnNames['AltaGenetic'].map(({ tableColumnName }, index) => (
                  <th key={'h_' + index}>{tableColumnName}</th>
                ))}
              </tr>
              {[...extendedMarkersOfBullsWithSingleMatch.values()].map((value, i) => (
                <tr key={'r_' + i}>
                  {columnNames['AltaGenetic'].map(({ dbColumnName }, k) => (
                    <td key={'d_' + k}>{value[dbColumnName] || ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul
          className={[
            styles['search__extras'],
            !extendedMarkersOfBullsWithSeveralMatches.size ? styles['search__extras_hidden'] : '',
          ].join(' ')}
        >
          {[...extendedMarkersOfBullsWithSeveralMatches.entries()].map(([marker, matches], i) => {
            return (
              <li key={'bull_' + i} className={[styles['search__extra'], styles['extra']].join(' ')}>
                <div className={styles['extra__header']}>
                  <p>
                    Для {marker} нашлось {matches.length} {wordEnding(matches.length, 'совпадени', ['й', 'е', 'я'])}
                  </p>
                </div>

                <div className={styles['extra__table']}>
                  <div className={styles['extra__table-header']}>
                    {['NAAB', 'ID', 'Инв. номер', 'Имя', 'Полное имя', 'TPI'].map((name, index) => {
                      return <span key={index}>{name}</span>;
                    })}
                  </div>

                  <div className="search__extra-filter-row">
                    <input
                      type="text"
                      className="search__extra-filter-input"
                      id="naab_code"
                      placeholder="NAAB"
                      autoComplete="nope"
                      value={filterInputsValue[marker]?.naab_code || ''}
                      onChange={(evt) => handleFilterInputChange(evt, marker)}
                    />

                    <input
                      type="text"
                      className="search__extra-filter-input"
                      id="inter_reg_number"
                      placeholder="ID"
                      autoComplete="nope"
                      value={filterInputsValue[marker]?.inter_reg_number || ''}
                      onChange={(evt) => handleFilterInputChange(evt, marker)}
                    />

                    <input
                      type="text"
                      className="search__extra-filter-input"
                      id="inventory_number"
                      placeholder="Инв. номер"
                      autoComplete="nope"
                      value={filterInputsValue[marker]?.inventory_number || ''}
                      onChange={(evt) => handleFilterInputChange(evt, marker)}
                    />

                    <input
                      type="text"
                      className="search__extra-filter-input"
                      id="name"
                      placeholder="Имя"
                      autoComplete="nope"
                      value={filterInputsValue[marker]?.name || ''}
                      onChange={(evt) => handleFilterInputChange(evt, marker)}
                    />

                    <input
                      type="text"
                      className="search__extra-filter-input"
                      id="full_name"
                      placeholder="Полное имя"
                      autoComplete="nope"
                      value={filterInputsValue[marker]?.full_name || ''}
                      onChange={(evt) => handleFilterInputChange(evt, marker)}
                    />

                    {/* <input type="text" className="search__extra-filter-input" placeholder='TPI' /> */}
                  </div>

                  {matches
                    .filter((match) => {
                      // Фильтрую совпадения (matches) для текущего запроса (marker)
                      return Object.entries(filterInputsValue[marker] || {}).every(
                        ([name, value]) => match[name].toUpperCase().indexOf(value.toUpperCase()) !== -1,
                      );
                    })
                    .slice(0, 200)
                    .map((match, i) => {
                      return (
                        <div
                          key={'match_' + i}
                          className={[
                            styles['extra__table-row'],
                            match.chosen ? styles['extra__table-row_active'] : '',
                          ].join(' ')}
                          onClick={(evt) => handleOptionClick(marker, match, evt)}
                        >
                          {['naab_code', 'inter_reg_number', 'inventory_number', 'name', 'full_name', 'tpi'].map(
                            (char, index) => {
                              return <span key={'char_' + index}>{match[char]}</span>;
                            },
                          )}
                        </div>
                      );
                    })}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </Container>
  );
};

export default Search;
