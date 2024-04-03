import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getBulls } from "../../api/bulls";
import { Box, Button, MenuItem, Select, Typography, styled } from "@mui/material";
import SortIcon from '../../imgs/sort.svg';

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
	
	const [selectValue, setSelectValue] = useState('all');
	const [sortedBy, setSortedBy] = useState({ value: null, asc: false });

	function handleSelectChange(event) {
		setSelectValue(event.target.value);

		if (event.target.value === 'all') {
			setFilteredBulls(bulls);
		} else {
			setFilteredBulls(bulls.filter((bull) => bull.orderId === event.target.value));
		}
	}

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

		console.log(sortedBulls);

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
			})
			.catch(() => {
				console.error("Ошибка при получении данных о быках");
			})
			.finally(() => {
				setAreBullsLoading(false);
			});
  }, []);

  return (
    <Container>
      <Sidebar userData={userData} />

      <ContentContainer>
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
										<TableRow key={bull.id} numberOfFields={Object.keys(fieldsToShowInTable).length}>
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
      </ContentContainer>
    </Container>
  );
};

export default Animals;

const Container = styled(Box)(() => ({
	display: 'flex',
}));

const ContentContainer = styled(Box)(() => ({
  boxSizing: 'border-box',

  width: '100%',
  height: 'calc(100vh - 60px)',
  padding: 20,

  overflowY: 'scroll',

}));

const OrdersContainer = styled(Box)(() => ({
  width: '100%',
  minHeight: 200,
  padding: 20,

  backgroundColor: 'white',

  borderRadius: 10,
}));

const ContainerHeader = styled(Box)(() => ({
	height: 60,

	display: 'flex',
	alignItems: 'center',
	gap: 30,
}));

const HeaderCell = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: 6,
}));

const Title = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 700,
}));

const TableHeader = styled(Box)(({ numberOfFields }) => ({
	display: 'grid',
	gridTemplateColumns: `repeat(${numberOfFields}, 1fr)`,

	padding: 15,

	fontSize: 14,
	fontWeight: 700
}));

const TableBody = styled('ul')(() => ({
	width: '100%',
    
	listStyle: 'none',

	padding: 0,
	margin: 0,
}));

const TableRow = styled(Box)(({ numberOfFields }) => ({
	display: 'grid',
	gridTemplateColumns: `repeat(${numberOfFields}, 1fr)`,

	padding: 15,
	borderTop: '1px solid #eee',
	
	cursor: 'pointer',
	
	'&:hover': {
		backgroundColor: '#f2f2f5',
	}
}));