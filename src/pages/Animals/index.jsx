import { useEffect, useState } from "react";
import { getBulls } from "../../api/bulls";
import { Button, MenuItem, Select } from "@mui/material";
import SortIcon from '../../imgs/sort.svg';
import Popup from "../../components/Popup/Popup";
import { ContainerHeader, HeaderCell, OrdersContainer, TableBody, TableHeader, TableRow, Title } from "./components";
import BullPopup from "./BullPopup";
import getAvarageValues from "../../utils/bulls";

const fieldsToShowInTable = {
	'Имя': 'Name',
	'TPI': 'TPI',
	'Молоко': 'Milk',
	'Белок': 'Protein',
	'Жир': 'Fat'
};

const Animals = ({ userData }) => {
	const [areBullsLoading, setAreBullsLoading] = useState(false);

	const [bulls, setBulls] = useState([]);
	const [filteredBulls, setFilteredBulls] = useState([]);
	const [orderIds, setOrderIds] = useState([]);
	const [averageValues, setAverageValues] = useState([]);

	const [selectValue, setSelectValue] = useState('all');
	const [sortedBy, setSortedBy] = useState({ value: null, asc: false });

	const [selectedBull, setSelectedBull] = useState({});
	const [isBullPopupOpen, setIsBullPopupOpen] = useState(false);

	function handleSelectChange(event) {
		setSelectValue(event.target.value);

		if (event.target.value === 'all') {
			setFilteredBulls(bulls);
		} else {
			setFilteredBulls(bulls.filter((bull) => bull.orderId === event.target.value));
		}
	}

	function handleOpenPopup(bull) {
		setIsBullPopupOpen(true);
		setSelectedBull(bull);
	}

	// function handleClosePopup() {
	// 	setIsBullPopupOpen(false);
	// 	setSelectedBull({});
	// }

	function handleSortButtonClick(sortBy) {
		const sortedBulls = [...bulls];
		const newSortedBy = { value: sortBy, asc: sortedBy.value === sortBy ? !sortedBy.asc : false };


		if (newSortedBy.asc) {
			sortedBulls.sort((a, b) => a[sortBy] - b[sortBy]);
		} else {
			sortedBulls.sort((a, b) => b[sortBy] - a[sortBy]);
		}

		setSortedBy(newSortedBy);
		setBulls(sortedBulls);

		if (selectValue === 'all') {
			setFilteredBulls(sortedBulls);
		} else {
			setFilteredBulls(sortedBulls.filter((bull) => bull.orderId === selectValue));
		}
	}

	useEffect(() => {
		setAreBullsLoading(true);

		getBulls(userData.userId)
			.then(({ data: bulls }) => {
				setBulls(bulls);
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
							<MenuItem key={orderId} value={orderId}>Из заявки №{orderId}</MenuItem>
						))}
					</Select>
				</ContainerHeader>

				{bulls.length > 0 ? (
					<>
						<TableHeader numberOfFields={Object.keys(fieldsToShowInTable).length}>
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
										<img src={SortIcon} alt="" width={20} />
									</Button>
								</HeaderCell>
							))}
						</TableHeader>

						<TableBody>
							{filteredBulls.map((bull) => (
								<TableRow key={bull.id} numberOfFields={Object.keys(fieldsToShowInTable).length} onClick={() => handleOpenPopup(bull)}>
									{Object.values(fieldsToShowInTable).map((field) => (
										<p key={field}>{bull[field]}</p>
									))}
								</TableRow>
							))}

						</TableBody>
					</>
				) : (
					<p className="noEvaluates">{areBullsLoading ? "Загрузка животных..." : "Животных пока нет"}</p>

				)}
			</OrdersContainer>


			<Popup
				isOpen={isBullPopupOpen}
				setIsOpen={setIsBullPopupOpen}
				style={{
					width: 'calc(100% - 100px)',
					height: 'calc(100% - 140px)',
				}}
			>
				<BullPopup selectedBull={selectedBull} isPopupOpen={isBullPopupOpen} averageValues={averageValues} />
			</Popup>
		</>
	);
};

export default Animals;
