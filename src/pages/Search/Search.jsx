import React, { useContext, useState } from 'react';

import styles from "./Search.module.css";
import "./Search.css";

// import homeIcon from "../../imgs/home.svg";
// import profileIcon from "../../imgs/profile.svg";
// import requestsIcon from "../../imgs/requests.svg";
// import bulbIcon from "../../imgs/bulb.svg";
import searchIcon from "../../imgs/search.svg";

import Container from '../../components/Container/Container';
import DropdownMenu from '../../components/Dropdown/Dropdown';

import TokenContext from '../../contexts/TokenContext';

import { SERVER_PORT, SERVER_URL } from '../../data/data';
import wordEnding from '../../utils/wordEnding';

const Search = () => {
  // const [isSearchBySingleParameter, setIsSearchBySingleParameter] = useState(true);

  const columnNames = {
    "AltaGenetic": ["NAAB Code", "InterRegNumber", "Name", "Full Name", "Breed", "TPI", "NM$", "CM$", "FM$", "GM$", "Milk", "Protein", "Prot%", "Fat", "Fat %", "CFP", "FE", "Feed Saved", "Prel", "D / H", "PL", "C-LIV", "H-LIV", "DPR", "SCS", "SCE", "SCE Rel", "SCE Obs", "DCE", "SSB", "DSB", "CCR", "HCR", "EFC", "GL", "MAST", "KET", "RP", "MET", "DA", "MF", "MS", "DWP$", "WT$", "CW$", "PTAT", "UDC", "FLC", "BWC", "DC", "TRel", "D / H2", "Stature", "Strength", "Body Depth", "Dairy form", "Rump Angle", "Thurl Width", "RLSV", "RLRV", "Foot Angle", "FLS", "F. Udder Att.", "R Udder Height", "Rear Udder Width", "Udder Cleft", "Udder Depth", "FTP", "RTP", "RTP SV", "Teat Length", "Pedigree", "aAa", "DMS", "Kappa-Casein", "Beta-Casein", "BBR", "B-LACT", "Genetic Codes", "Haplotypes", "RHA", "EFI", "Birth Date", "Proof", "ADV", "GS", "FS", "511", "EDGE", "CP", "CP511"]
  }

  const token = useContext(TokenContext);

  const [markerType, setMarkerType] = useState("NAAB");
  const [separator, setSeparator] = useState("Пробел");

  const [inputValue, setInputValue] = useState("");

  const [filterInputsValue, setFilterInputsValue] = useState({});

  const [
    extendedMarkersOfBullsWithSingleMatch,
    setExtendedMarkersOfBullsWithSingleMatch
  ] = useState(new Map());
  const [
    extendedMarkersOfBullsWithSeveralMatches,
    setExtendedMarkersOfBullsWithSeveralMatches
  ] = useState(new Map());
  const [
    extendedMarkersOfBullsWithNoMatches,
    setExtendedMarkersOfBullsWithNoMatches
  ] = useState(new Set());

  const markerTypes = {
    "NAAB": "NAAB Code",
    "ID": "InterRegNumber",
  };

  const separators = {
    "Пробел": " ",
    "Запятая": ",",
    "Точка с запятой": ";",
  }


  function handleFilterInputChange(evt, marker) {
    setFilterInputsValue(prev => {
      // Сохраняю предыдущее значение фильтров для текущего запроса (marker)
      const prevForMarker = prev.marker || {};

      // Записываю значения фильтров, изменяя только текущий фильтр (evt.target.id) для текущего запроса (marker)
      return {...prev, [marker]: {...prevForMarker, [evt.target.id]: evt.target.value}};
    });
  }


  function handleOptionClick(marker, bullData, evt) {
    const prevSeveral = new Map(extendedMarkersOfBullsWithSeveralMatches);
    const prevSingle = new Map(extendedMarkersOfBullsWithSingleMatch);

    prevSingle.set(marker, bullData);
    prevSeveral.get(marker).forEach(currBull => {
      if (currBull.InterRegNumber === bullData.InterRegNumber) {
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

    const markers = inputValue.split(separators[separator]).map(el => el.trim()).filter(el => el.length);

    console.log(markers);

    fetch(`${SERVER_URL}:${SERVER_PORT}/api/bulls`, {
      method: "POST",
      body: JSON.stringify({ markers, markerType: markerTypes[markerType] }),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        // По инфе в стейтам рисовать таблицу и окна выбора быка

        // Добавляю данные быков в стейты, соответствующие кол-ву совпадений
        data.data.forEach(markerExtended => {
          if (markerExtended.matches.length === 0) {
            // console.log("Ноль совпадений");
            setExtendedMarkersOfBullsWithNoMatches(prev => {
              return prev.add(markerExtended.marker);
            });

          } else if (markerExtended.matches.length === 1) {
            // console.log("1 совпадение");
            setExtendedMarkersOfBullsWithSingleMatch(prev => {
              // const current = new Map(prev);
              // current.set(markerExtended.marker, markerExtended.matches[0]);
              return prev.set(markerExtended.marker, markerExtended.matches[0]);
            });

          } else {
            // console.log("Много совпадений");
            setExtendedMarkersOfBullsWithSeveralMatches(prev => {
              return prev.set(markerExtended.marker, markerExtended.matches);
            });

          }
        });

        setTimeout(() => {
          console.log("No matches", extendedMarkersOfBullsWithNoMatches);
          console.log("1 match", extendedMarkersOfBullsWithSingleMatch);
          console.log("Several matches", extendedMarkersOfBullsWithSeveralMatches);

        }, 200);

      })
  }


  return (
    <Container className={styles["container"]}>
      <main className={[styles["main"], styles["search"]].join(" ")}>
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

          <div className={styles["search__form"]}>
            <ul className={styles["search__settings"]}>
              <li className={styles["search__setting"]}>
                <span>Поиск по</span>
                <DropdownMenu options={Object.keys(markerTypes)} defaultValue={markerType} onSelect={option => setMarkerType(option)} />
              </li>

              <li className={styles["search__setting"]}>
                <span>Разделитель</span>
                <DropdownMenu options={Object.keys(separators)} defaultValue={separator} onSelect={option => setSeparator(option)} />
              </li>
            </ul>

            <form className={styles["search__line-wrapper"]} onSubmit={handleSubmit}>
              <input placeholder={`Введите ${markerType}`} value={inputValue} onChange={evt => setInputValue(evt.target.value)} type="text" className={styles["search__line"]} />
              <button className={styles['search_icon-wrapper']} type='submit'>
                <img src={searchIcon} alt="" className={styles["search_icon"]} />

              </button>

            </form>
          </div>
        </div>

        <div
          className={[styles['search__unfound'], extendedMarkersOfBullsWithNoMatches.size ? "" : styles['search__unfound_hidden']].join(" ")}
        >
          <h3 className={styles['search__section-title']}>Ненайденные животные</h3>
          <ul className={styles['search__unfound-items']}>
            {[...extendedMarkersOfBullsWithNoMatches.values()].map(extendedMarker => (
              <li className={styles['search__unfound-item']}>
                {extendedMarker}
              </li>
            ))}

          </ul>
        </div>

        <div
          className={[
            styles["search__table-wrapper"],
            !extendedMarkersOfBullsWithSingleMatch.size ? styles["search__table-wrapper_hidden"] : ""
          ].join(" ")}
        >
          <table className={[styles["search__table"]].join(" ")}>
            <tbody>
              <tr>
                {columnNames["AltaGenetic"].map((colName, index) => (
                  <th key={"h_" + index}>{colName}</th>
                ))}
              </tr>
              {[...extendedMarkersOfBullsWithSingleMatch.values()].map((value, i) => (
                <tr key={"r_" + i}>
                  {columnNames["AltaGenetic"].map((colName, k) => (
                    <td key={"d_" + k}>{value[colName] || ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul
          className={[
            styles["search__extras"],
            !extendedMarkersOfBullsWithSeveralMatches.size ? styles["search__extras_hidden"] : ""
          ].join(" ")}
        >

          {[...extendedMarkersOfBullsWithSeveralMatches.entries()]
            .map(([marker, matches], i) => {
              return (
                <li key={"bull_" + i} className={[styles["search__extra"], styles["extra"]].join(" ")}>
                  <div className={styles["extra__header"]}>
                    <p>Для {marker} нашлось {matches.length} {wordEnding(matches.length, "совпадени", ["й", "е", "я"])}</p>
                  </div>

                  <div className={styles["extra__table"]}>
                    <div className={styles["extra__table-header"]}>
                      {["NAAB", "ID", "Имя", "Полное имя", "TPI"].map((name, index) => {
                        return (<span key={index}>{name}</span>)
                      })}
                    </div>

                    <div className="search__extra-filter-row">
                      <input 
                        type="text" 
                        className="search__extra-filter-input" 
                        id='NAAB Code' 
                        placeholder='NAAB' 
                        autoComplete='nope'
                        value={filterInputsValue[marker]?.["NAAB Code"] || ""} 
                        onChange={(evt) => handleFilterInputChange(evt, marker)} />

                      <input 
                        type="text" 
                        className="search__extra-filter-input" 
                        id='InterRegNumber' 
                        placeholder='ID' 
                        autoComplete='nope'
                        value={filterInputsValue[marker]?.["InterRegNumber"] || ""} 
                        onChange={(evt) => handleFilterInputChange(evt, marker)} />

                      <input 
                        type="text" 
                        className="search__extra-filter-input" 
                        id='Name' 
                        placeholder='Имя' 
                        autoComplete='nope'
                        value={filterInputsValue[marker]?.["Name"] || ""} 
                        onChange={(evt) => handleFilterInputChange(evt, marker)} />

                      <input 
                        type="text" 
                        className="search__extra-filter-input" 
                        id='Full Name' 
                        placeholder='Полное имя' 
                        autoComplete='nope'
                        value={filterInputsValue[marker]?.["Full Name"] || ""} 
                        onChange={(evt) => handleFilterInputChange(evt, marker)} />

                      {/* <input type="text" className="search__extra-filter-input" placeholder='TPI' /> */}
                    </div>

                    {matches
                      .filter(match => {
                        // Фильтрую совпадения (matches) для текущего запроса (marker)
                        return Object.entries(filterInputsValue[marker] || {}).every(([name, value]) => match[name].toUpperCase().indexOf(value.toUpperCase()) !== -1);
                      })
                      .slice(0, 200)
                      .map((match, i) => {
                        return (
                          <div
                            key={"match_" + i}
                            className={[
                              styles["extra__table-row"],
                              match.chosen ? styles["extra__table-row_active"] : "",
                            ].join(" ")}
                            onClick={(evt) => handleOptionClick(marker, match, evt)}
                          >
                            {["NAAB Code", "InterRegNumber", "Name", "Full Name", "TPI"].map((char, index) => {
                              return (<span key={"char_" + index}>{match[char]}</span>)
                            })}
                          </div>

                        )
                      })}

                  </div>
                </li>
              )

            })}

        </ul>
      </main>
    </Container>
  );
};

export default Search;