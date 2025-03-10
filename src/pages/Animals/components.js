import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
}));

export const ContentContainer = styled(Box)(() => ({
  boxSizing: 'border-box',

  width: '100%',
  height: 'calc(100vh - 60px)',
  padding: 20,

  overflowY: 'scroll',
}));

export const OrdersContainer = styled(Box)(() => ({
  width: '100%',
  minHeight: 200,
  padding: 20,

  backgroundColor: 'white',

  borderRadius: 10,
}));

export const ContainerHeader = styled(Box)(() => ({
  height: 60,

  display: 'flex',
  alignItems: 'center',
  gap: 30,
}));

export const HeaderCell = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
}));

export const Title = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 700,
}));

export const TableHeader = styled(Box)(({ numberOfFields }) => ({
  display: 'grid',
  gridTemplateColumns: `50px repeat(${numberOfFields}, 1fr)`,

  padding: 15,

  fontSize: 14,
  fontWeight: 700,
}));

export const TableBody = styled('ul')(() => ({
  width: '100%',

  listStyle: 'none',

  padding: 0,
  margin: 0,
}));

export const TableRow = styled(Box)(({ numberOfFields }) => ({
  display: 'grid',
  gridTemplateColumns: `50px repeat(${numberOfFields}, 1fr)`,
  alignItems: 'center',

  height: 50,

  padding: '0 15px',
  borderTop: '1px solid #eee',

  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#f2f2f5',
  },
}));
