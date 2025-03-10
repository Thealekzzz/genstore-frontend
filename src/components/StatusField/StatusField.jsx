import { Box, Typography, styled } from '@mui/material';
import { PropTypes } from 'prop-types';

import infoIcon from '../../imgs/info.svg';
import doneIcon from '../../imgs/done.svg';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';

const iconsByStatus = {
  Success: doneIcon,
  Error: infoIcon,
};

const StatusField = ({ status }) => {
  return (
    <Wrapper visible={status.visible} status={status.status}>
      {status.status === 'Loading' ? (
        <LoadingSpinner />
      ) : (
        <Image src={iconsByStatus[status.status] || infoIcon} alt="" />
      )}

      <Message>{status.message}</Message>
    </Wrapper>
  );
};

StatusField.propTypes = {
  status: PropTypes.object,
};

export default StatusField;

const stylesByStatus = {
  Success: {
    backgroundColor: 'seagreen',
  },
  Error: {
    backgroundColor: 'tomato',
  },
  Loading: {},
};

const Wrapper = styled(Box)(({ visible, status }) => ({
  display: visible ? 'flex' : 'none',
  alignItems: 'center',
  gap: '10px',

  minHeight: '40px',
  padding: '10px 20px',

  borderRadius: '5px',
  backgroundColor: '#4380f0',

  ...stylesByStatus[status],
}));

const Message = styled(Typography)(() => ({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '12px',
}));

const Image = styled('img')(() => ({
  width: 20,
  height: 20,
}));
