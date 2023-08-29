import React, { useState } from 'react';

import styles from "./ExtraBullContainer.module.css"

const ExtraBullContainer = ({ bullData }) => {

	// let markerCaptions = ["семенной код", "идентификационный номер", "инвентарный номер"]

	const [inputValue, setInputValue] = useState("");

	function handleInputChange(evt) {
		setInputValue(evt.target.value);
	}

	return (
		<article className={styles.bullContainer}>
			<p className={styles.title}>
				<div className={styles.titleLeft}>
					<span className={styles.titleAccent}>{bullData.name}</span>
					{[bullData.NAAB, bullData.ID, bullData.inv].filter(el => Boolean(el)).join(", ")}

				</div>

				<input type="text" className={styles.titleInput} placeholder='Поиск по кличке' value={inputValue} onChange={handleInputChange} />
			</p>

			<div className={styles.optionsHead}>
				<p className={styles.optionsHeadItem}>Полное имя</p>
				<p className={styles.optionsHeadItem}>Семенной код</p>
				<p className={styles.optionsHeadItem}>Идентификатор</p>
				<p className={styles.optionsHeadItem}>TPI</p>
				<p className={styles.optionsHeadItem}>Молоко</p>
			</div>

			<div className={styles.bullsOptions}>
				{bullData.matches.filter(option => option.Name.trim() !== "").filter(option => option.Name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1).slice(0, 100).map(option => {
					return (
						<label htmlFor={`${bullData.name}_${option.Name}`} className={styles.bullsOption} key={`${bullData.name}_${option.Name}_${option.InterRegNumber ? option.InterRegNumber : option["NAAB Code"]}`}>
							<input type="radio" name={bullData.name} id={`${bullData.name}_${option.Name}`} value={`${bullData.name}_${option.Name}`} />
							<p className={styles.bullInfo}>{option["Name"]}</p>
							<p className={styles.bullInfo}>{option["NAAB Code"]}</p>
							<p className={styles.bullInfo}>{option["InterRegNumber"]}</p>
							<p className={styles.bullInfo}>{option["TPI"]}</p>
							<p className={styles.bullInfo}>{option["Milk"]}</p>
						</label>
					)
				})}

				<label htmlFor={`${bullData.name}`} className={styles.bullsOption}>
					<input type="radio" name={bullData.name} id={`${bullData.name}`} value={`${bullData.name}`} />
					<p className={styles.bullInfo}>Если ни один не подошел</p>
				</label>
			</div>

		</article>
	);
};

export default ExtraBullContainer;