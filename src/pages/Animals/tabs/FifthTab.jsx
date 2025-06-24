import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { patchUserBulls } from '../../../api/bulls';

const inputs = [
  {
    title: 'Высота в холке',
    name: 'withers_height',
    type: 'number',
  },
  {
    title: 'Обхват груди за лопатками',
    name: 'chest_circumference',
    type: 'number',
  },
  {
    title: 'Косая длина туловища',
    name: 'oblique_body_length',
    type: 'number',
  },
];

const FifthTab = ({ selectedBull, onBullUpdate }) => {
  const [values, setValues] = useState(
    Object.fromEntries(inputs.map(({ name }) => [name, String(selectedBull[name] || '')])),
  );
  const [isPatching, setIsPatching] = useState(false);
  const [status, setStatus] = useState({ isVisible: false, isSuccess: false, text: '' });

  const handleUpdate = (event) => {
    const { name, value } = event.target;

    if (!/^\d*$/.test(value)) {
      return;
    }

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    if (
      Object.values(values).some((value) => {
        return !value?.length || !/^\d*$/.test(value);
      })
    ) {
      setStatus({ isVisible: true, isSuccess: false, text: 'Не все поля заполнены' });
      return;
    }

    setIsPatching(true);

    patchUserBulls({ bull: { id: selectedBull.id, ...values } })
      .then((updatedBull) => {
        onBullUpdate(updatedBull);
        setIsPatching(false);
        setStatus({ isVisible: true, isSuccess: true, text: 'Данные сохранены' });
      })
      .catch((err) => {
        console.log(err);
        setIsPatching(false);
        setStatus({ isVisible: true, isSuccess: false, text: 'Ошибка сохранения :(' });
      })
      .finally(() => {
        setTimeout(() => {
          setStatus((prev) => ({ ...prev, isVisible: false }));
        }, 3000);
      });
  };

  useEffect(() => {
    setValues(Object.fromEntries(inputs.map(({ name }) => [name, String(selectedBull[name] || '')])));
  }, [selectedBull]);

  return (
    <Container>
      {inputs.map(({ title, name }) => (
        <InputRow key={title}>
          <Typography>{title}</Typography>
          <HorizontalBox>
            <StyledInput
              required
              value={values[name] || ''}
              onChange={handleUpdate}
              placeholder="--"
              name={name}
              maxLength={4}
            />
            <CM isVisible={values[name]}>см</CM>
          </HorizontalBox>
        </InputRow>
      ))}

      <HorizontalBox
        sx={{
          marginTop: 2,
        }}
      >
        <FormButton type="submit" disabled={isPatching} onClick={handleSubmit}>
          Сохранить
        </FormButton>
        <StatusText isVisible={status.isVisible} isSuccess={status.isSuccess}>
          {status.text}
        </StatusText>
      </HorizontalBox>
    </Container>
  );
};

export default FifthTab;

const Container = styled(Box)(() => ({
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  gap: 10,

  padding: '40px 40px 0',

  position: 'relative',
}));

export const InputRow = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(100px, 300px) 200px',
  alignItems: 'center',
}));

export const HorizontalBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

export const CM = styled(Typography)(({ isVisible }) => ({
  visibility: isVisible ? 'visible' : 'hidden',
  opacity: isVisible ? 1 : 0,

  transition: 'opacity ease .1s, visibility ease .1s',
}));

const StyledInput = styled('input')(({ color }) => ({
  boxSizing: 'border-box',
  fontSize: 14,
  fontStyle: 'normal',
  lineHeight: 1,

  color: color,

  width: '100%',
  height: 30,
  padding: '16px 8px',

  opacity: 1,

  border: '2px solid transparent',
  borderRadius: 6,
  outline: 'none',

  transition: 'all ease .1s',

  '&:hover': {
    border: '2px solid #3580e839',
  },

  '&:focus': {
    border: '2px solid #3580E8',
  },
}));

const FormButton = styled('button')(() => ({
  boxSizing: 'border-box',
  padding: '12px 20px',

  border: 'none',
  outline: 'none',
  borderRadius: '5px',

  color: 'white',
  fontFamily: '"Montserrat", "Arial", sans-serif',
  fontSize: 12,
  fontWeight: 'bold',

  backgroundColor: '#4380f0',
  cursor: 'pointer',
  opacity: 1,
  transition: 'opacity 0.2s, background-color 0.2s, scale 0.1s',

  '&:hover': {
    opacity: 0.9,
  },

  '&:active': {
    scale: 0.95,
  },

  '&:disabled': {
    backgroundColor: '#ccc',
    cursor: 'auto',
    opacity: 1,
  },
}));

export const StatusText = styled(Typography)(({ isSuccess, isVisible }) => ({
  fontSize: 12,
  fontWeight: 'bold',

  color: isSuccess ? 'seagreen' : 'tomato',
  visibility: isVisible ? 'visible' : 'hidden',
  opacity: isVisible ? 1 : 0,
  transform: `translateY(${isVisible ? 0 : 6}px)`,

  transition: 'transform ease-in-out .3s, opacity ease-in-out .3s, visibility ease-in-out .3s',
}));
