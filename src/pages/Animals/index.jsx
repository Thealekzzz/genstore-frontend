import { useEffect, useState } from "react";
import { deleteUserBulls, getBulls } from "../../api/bulls";
import { Box, Button, Checkbox, FormControlLabel, MenuItem, Select, Snackbar, Typography } from "@mui/material";
import SortAscIcon from '../../imgs/sortAsc.svg';
import SortDescIcon from '../../imgs/sortDesc.svg';
import Popup from "../../components/Popup/Popup";
import { ContainerHeader, HeaderCell, OrdersContainer, TableBody, TableHeader, TableRow, Title } from "./components";
import BullPopup from "./BullPopup";
import getAvarageValues from "../../utils/bulls";
import wordEnding from "../../utils/wordEnding";

const fieldsToShowInTable = {
	'Имя': 'Name',
	'TPI': 'TPI',
	'Молоко': 'Milk',
	'Белок': 'Protein',
	'Жир': 'Fat'
};

function compareFn(a, b, key, asc) {
	if (a[key] < b[key]) {
		return asc ? -1 : 1;

	} else if (a[key] > b[key]) {
		return asc ? 1 : -1;
	}

	return 0;
}

const Animals = ({ userData }) => {
	const [areBullsLoading, setAreBullsLoading] = useState(false);

	const [bulls, setBulls] = useState([]);
	const [hasMoreBulls, setHasMoreBulls] = useState([]);
	const [offset, setOffset] = useState(0);
	const [filteredBulls, setFilteredBulls] = useState([]);
	const [orderIds, setOrderIds] = useState([]);
	const [averageValues, setAverageValues] = useState([]);

	const [selectValue, setSelectValue] = useState('all');
	const [sortedBy, setSortedBy] = useState({ value: null, asc: false });
	const [isOnlyFullPedigree, setIsOnlyFullPedigree] = useState(false);

	const [selectedBull, setSelectedBull] = useState({});
	const [isBullPopupOpen, setIsBullPopupOpen] = useState(false);

	const [checkedBullIds, setCheckedBullIds] = useState([]);
	const [lastCheckedBullId, setLastCheckedBullId] = useState(null);


	function handleSelectChange(event) {
		setSelectValue(event.target.value);
	}

	function handleFullPedigreeCheckboxChange(event) {
		setIsOnlyFullPedigree(event.target.checked);
	}

	function handleOpenPopup(bull) {
		setIsBullPopupOpen(true);
		setSelectedBull(bull);
	}

	function handleSortButtonClick(sortBy) {
		const newSortedBy = { value: sortBy, asc: sortedBy.value === sortBy ? !sortedBy.asc : false };
		setSortedBy(newSortedBy);
	}

	function handleLoadMoreBulls() {
		const newOffset = offset + 200;

		getBulls(userData.userId, newOffset)
			.then(({ data, hasMoreData }) => {
				const newBulls = [...bulls, ...data];

				setBulls(newBulls);
				setHasMoreBulls(hasMoreData);
				setAverageValues(getAvarageValues(newBulls));
			})
			.catch(() => {
				console.error("Ошибка при получении данных о быках");
			})
			.finally(() => {
				setAreBullsLoading(false);
			});

		setOffset(newOffset);
	}

	function handleBullCheckboxChange(event, bull) {
		if (event.nativeEvent.shiftKey && lastCheckedBullId) {
			const lastCheckedBullIndex = filteredBulls.findIndex((checkedBull) => checkedBull.id === lastCheckedBullId);
			const currentCheckedBullIndex = filteredBulls.findIndex((checkedBull) => checkedBull.id === bull.id);

			const bullIdsToAdd = filteredBulls.slice(Math.min(lastCheckedBullIndex, currentCheckedBullIndex), Math.max(lastCheckedBullIndex, currentCheckedBullIndex) + 1).map((checkedBull) => checkedBull.id);

			if (event.target.checked) {
				setCheckedBullIds([...new Set([...checkedBullIds, ...bullIdsToAdd])]);

			} else {
				setCheckedBullIds(checkedBullIds.filter((checkedBullId) => !bullIdsToAdd.includes(checkedBullId)));
			}

		} else {
			if (event.target.checked) {
				setCheckedBullIds([...checkedBullIds, bull.id]);

			} else {
				setCheckedBullIds(checkedBullIds.filter((checkedBullId) => checkedBullId !== bull.id));
			}
		}

		setLastCheckedBullId(bull.id);
	}

	function handleDeleteCheckedBulls() {
		deleteUserBulls(checkedBullIds)
			.then(() => {
				setBulls((prev) => prev.filter((bull) => !checkedBullIds.includes(bull.id)));
				setCheckedBullIds([]);
			});
	}

	useEffect(() => {
		console.log(checkedBullIds);
	}, [checkedBullIds]);

	useEffect(() => {
		let newFilteredAndSortedBulls = [];

		// Фильтр по выпадающему меню
		if (selectValue === 'all') {
			newFilteredAndSortedBulls = [...bulls];

		} else if (selectValue === 'withoutOrder') {
			newFilteredAndSortedBulls = bulls.filter((bull) => !bull.orderId);

		} else {
			newFilteredAndSortedBulls = bulls.filter((bull) => bull.orderId === selectValue);
		}

		// Фильтр по чекбоксу полной родословной
		if (isOnlyFullPedigree) {
			newFilteredAndSortedBulls = newFilteredAndSortedBulls
				.filter((bull) => bull.techPedigree
					.split(":")
					.map((parentData) => parentData.split("-"))
					.every((parentMarkers) => parentMarkers[0] !== '' && parentMarkers[1] !== ''))
		}

		newFilteredAndSortedBulls.sort((a, b) => compareFn(a, b, sortedBy.value, sortedBy.asc));

		setFilteredBulls(newFilteredAndSortedBulls);
		setCheckedBullIds([]);

	}, [selectValue, sortedBy, isOnlyFullPedigree, bulls]);

	useEffect(() => {
		setAreBullsLoading(true);

		getBulls(userData.userId)
			.then(({ data: bulls, hasMoreData }) => {
				setBulls(bulls);
				setHasMoreBulls(hasMoreData);
				setFilteredBulls(bulls);
				setOrderIds([...new Set(bulls.map((bull) => bull.orderId))]);
				setAverageValues(getAvarageValues(bulls));
			})
			.catch(() => {
				console.error("Ошибка при получении данных о быках");
			})
			.finally(() => {
				setAreBullsLoading(false);
			});
	}, []);

	return (
		<>
			<OrdersContainer>
				<ContainerHeader>
					<Title>Мои животные</Title>

					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={selectValue}
						color="primary"
						size="small"
						onChange={handleSelectChange}
					>
						<MenuItem value={'all'}>Из всех заявок</MenuItem>
						{orderIds.map((orderId) => (
							<MenuItem key={orderId || 'withoutOrder'} value={orderId || 'withoutOrder'}>{orderId ? `Из заявки №${orderId}` : 'Вне заявок'}</MenuItem>
						))}
					</Select>

					<FormControlLabel
						control={<Checkbox
							name="fullPedigree"
							onChange={handleFullPedigreeCheckboxChange}
							value={isOnlyFullPedigree}
						/>}
						label="Только полная родословная"
					/>

				</ContainerHeader>

				{bulls.length > 0 ? (
					<>
						<TableHeader numberOfFields={Object.keys(fieldsToShowInTable).length}>
							<div></div>
							{Object.entries(fieldsToShowInTable).map(([fieldName, field]) => (
								<HeaderCell key={fieldName}>
									<p>{fieldName}</p>
									<Button
										variant="circle"
										onClick={() => handleSortButtonClick(field)}
										sx={{
											opacity: field === sortedBy.value ? 1 : .2,

											'&:hover': {
												opacity: field === sortedBy.value ? 1 : .5,
											}
										}}
									>
										{field !== sortedBy.value && (
											<img src={SortDescIcon} alt="" width={20} />
										)}
										{field === sortedBy.value && sortedBy.asc && (
											<img src={SortAscIcon} alt="" width={20} />
										)}
										{field === sortedBy.value && !sortedBy.asc && (
											<img src={SortDescIcon} alt="" width={20} />
										)}
									</Button>
								</HeaderCell>
							))}
						</TableHeader>

						<TableBody>
							{filteredBulls.map((bull) => (
								<TableRow key={bull.id} numberOfFields={Object.keys(fieldsToShowInTable).length} onClick={() => handleOpenPopup(bull)}>
									<Checkbox
										onChange={(e) => handleBullCheckboxChange(e, bull)}
										onClick={(e) => e.stopPropagation()}
										checked={checkedBullIds.includes(bull.id)}
									/>
									{Object.values(fieldsToShowInTable).map((field) => (
										<p key={field}>{bull[field]}</p>
									))}
								</TableRow>
							))}

						</TableBody>
						{hasMoreBulls && (
							<Button
								onClick={handleLoadMoreBulls}
								variant="contained"
								sx={{
									margin: '50px auto',
									display: 'block',
								}}
							>Загрузить еще</Button>
						)}
					</>
				) : (
					<p className="noEvaluates">{areBullsLoading ? "Загрузка животных..." : "Животных пока нет"}</p>

				)}
			</OrdersContainer>

			<Snackbar
				open={checkedBullIds.length > 0}
				autoHideDuration={6000}
			>
				<Box
					sx={{
						padding: '10px 20px',
						backgroundColor: "white",
						boxShadow: '0 0 20px rgba(0,0,0,0.1)',
						display: "flex",
						alignItems: "center",
						gap: 2,
					}}
				>
					<Typography>Выбрано {checkedBullIds.length} {wordEnding(checkedBullIds.length, 'животн', ['ых', 'ое', 'ых'])}</Typography>
					<Button
						color="primary"
						variant="outlined"
						onClick={handleDeleteCheckedBulls}
					>
						Удалить
					</Button>
					<Button
						color="primary"
						variant="contained"
						onClick={() => setCheckedBullIds([])}
					>
						Отмена
					</Button>
				</Box>
			</Snackbar>

			<Popup
				isOpen={isBullPopupOpen}
				setIsOpen={setIsBullPopupOpen}
				style={{
					width: 'calc(100% - 100px)',
					height: 'calc(100% - 140px)',

					overflowY: 'auto',
				}}
			>
				<BullPopup selectedBull={selectedBull} isPopupOpen={isBullPopupOpen} averageValues={averageValues} />
			</Popup>
		</>
	);
};

export default Animals;
