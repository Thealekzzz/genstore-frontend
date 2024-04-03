import { Box, Button, styled } from '@mui/material';

import AnimalIcon from '../../imgs/animal.svg';
import OrderIcon from '../../imgs/order.svg';
import { SERVER_PORT, SERVER_URL } from '../../config';
import { Link } from 'react-router-dom';

const Sidebar = ({ userData }) => {
  return (
    <Container>
			<Link to="/profile" style={{ textDecoration: 'none' }}>
				<AccountButton>
					<Avatar src={`${SERVER_URL}:${SERVER_PORT}/images/${userData.photo || 'sample.jpg'}`} />
					<AccountName>{userData.name} {userData.surname ? (userData.surname[0] + '.') : ''}</AccountName>
				</AccountButton>
			</Link>

      <SidebarGroup>
        <SidebarLink to='/orders'>
          <img src={OrderIcon} alt="Иконка страницы заказов" />
          <p>Заявки</p>
        </SidebarLink>
        <SidebarLink to='/animals'>
          <img src={AnimalIcon} alt="Иконка страницы животных" />
          <p>Быки</p>
        </SidebarLink>
      </SidebarGroup>
    </Container>
  );
};

export default Sidebar;

const Container = styled(Box)(() => ({
	height: 'calc(100vh - 60px)',
	width: 300,
	backgroundColor: 'white',

	display: 'flex',
	flexDirection: 'column',
	gap: 30,

	padding: 10,
	
}));

const SidebarGroup = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 16,

	padding: '0 15px',

	borderRadius: 5,
	// backgroundColor: '#ecf0f5',

}));

const AccountButton = styled(Button)(() => ({
	backgroundColor: '#ecf0f5',

	width: '100%',
	height: 60,
	padding: '0 10px',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'start',
	gap: 10,

	borderRadius: 5,

	'&:hover': {
		backgroundColor: '#d8dce0',
	}
}));

const AccountName = styled('p')(() => ({
	color: '#1a1d38',
	fontSize: 14,
	fontWeight: 600,
	textTransform: 'none',
	textDecoration: 'none',

}));

const Avatar = styled('img')(() => ({
	width: 40,
	height: 40,

	border: 'none',
	outline: 'none',
	borderRadius: '50%',
	backgroundColor: 'red',

	objectFit: 'cover',
}));

const SidebarLink = styled(Link)(({ isActive }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: 6,

	fontSize: 14,
	fontWeight: 500,
	
	backgroundColor: isActive ? '#ecf0f5' : 'transparent',
	textDecoration: 'none',
	color: 'black',

	opacity: .6,

	transition: 'opacity .2s linear, background-color .2s linear',
  cursor: 'pointer',

	'&:hover': {
		// backgroundColor: '#eef2f5',
		opacity: 1,
	}
}));