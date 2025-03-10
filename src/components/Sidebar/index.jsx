import { Box, Button, Typography, styled } from '@mui/material';

import AnimalIcon from '../../imgs/animal.svg';
import OrderIcon from '../../imgs/order.svg';
import { SERVER_PORT, SERVER_URL } from '../../config';
import { Link } from 'react-router-dom';

const links = [
  { name: 'Заявки', link: '/profile/orders', icon: OrderIcon, alt: 'Иконка страницы заказов' },
  { name: 'Животные', link: '/profile/animals', icon: AnimalIcon, alt: 'Иконка страницы животных' },
];

const Sidebar = ({ userData, page }) => {
  return (
    <Container>
      <Link to="/profile" style={{ textDecoration: 'none' }}>
        <AccountButton>
          <Avatar src={`${SERVER_URL}:${SERVER_PORT}/images/${userData.photo || 'sample.jpg'}`} />
          <AccountName>
            {userData.name} {userData.surname ? userData.surname[0] + '.' : ''}
          </AccountName>
        </AccountButton>
      </Link>

      <SidebarGroup>
        {links.map(({ name, link, icon, alt }) => (
          <Link to={link} key={link} style={{ textDecoration: 'none' }}>
            <SidebarLink isActive={page === link.slice('/profile/'.length)}>
              <img src={icon} alt={alt} width={20} />
              <LinkText>{name}</LinkText>
            </SidebarLink>
          </Link>
        ))}
      </SidebarGroup>

      <VersionText>V1.0.12</VersionText>
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
  gap: 5,

  // padding: '0 15px',

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
  },
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

const SidebarLink = styled(Button)(({ isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  gap: 6,

  width: '100%',
  padding: 10,

  fontSize: 14,
  fontWeight: 500,

  backgroundColor: isActive ? '#ecf0f5' : 'transparent',
  textTransform: 'none',
  color: 'black',

  opacity: 0.8,
  borderRadius: 20,

  transition: 'opacity .2s linear, background-color .2s linear',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: isActive ? '#dee5ec' : '#f5f6f8',
    opacity: 1,
  },
}));

const LinkText = styled(Typography)(() => ({
  fontSize: 14,
  color: 'black',
  lineHeight: 1,
  textDecoration: 'none',
}));

export const VersionText = styled('p')(({ theme }) => ({
  fontSize: 10,
  color: 'gray',

  position: 'absolute',
  bottom: 20,
  left: 20,
}));
