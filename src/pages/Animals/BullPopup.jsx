import styled from '@emotion/styled';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Title } from './components';
import { useEffect, useState } from 'react';
import FirstTab from './tabs/FirstTab';
import FourTab from './tabs/FourTab';
import { searchBulls } from '../../api/search';
import SecondTab from './tabs/SecondTab';
import ThirdTab from './tabs/ThirdTab';
import FifthTab from './tabs/FifthTab';
import { SERVER_PORT, SERVER_URL } from '../../config';

const sexByNumber = {
  0: 'Ж',
  1: 'М',
};

const mainFields = [
  { name: 'Кличка', key: 'name' },
  { name: 'ID', key: 'inter_reg_number' },
  { name: 'Инвентарный номер', key: 'inv' },
  { name: 'Пол', key: 'sex', proceedValue: (value) => sexByNumber[value] || '--' },
  { name: 'Дата рождения', key: 'birth_date' },
  { name: 'Порода', key: 'breed' },
];

const BullPopup = ({ selectedBull, isPopupOpen, averageValues, onBullUpdate }) => {
  const [isPedigreeLoading, setIsPedigreeLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  
  const [pedigree, setPedigree] = useState({});
  const [tabValue, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const downloadBullPDF = async () => {
    setIsPdfLoading(true);

    const response = await fetch(
      `${SERVER_URL}:${SERVER_PORT}/api/bulls/pdf?bull_id=${selectedBull.id}`
    );

    if (!response.ok) {
      console.log("Ошибка получения файла");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `bull_${selectedBull.id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
    setIsPdfLoading(false);
  };


  useEffect(() => {
    if (isPopupOpen) {
      setIsPedigreeLoading(true);
      searchBulls({
        data: selectedBull.techPedigree
          .split(':')
          .map((parentData) => parentData.split('-'))
          .map(([naab, ID]) => ({ naab: naab || null, ID: ID || null })),
      })
        .then((data) => {
          setPedigree({
            O: data[0],
            M: null,
            OO: null,
            MO: null,
            OM: data[1],
            MM: null,
            OOO: null,
            MOO: null,
            OMO: null,
            MMO: null,
            OOM: null,
            MOM: null,
            OMM: data[2],
            MMM: null,
          });
        })
        .catch((err) => {
          console.error('Ошибка загрузки родословной для быка');
          console.log(err);
        })
        .finally(() => {
          setIsPedigreeLoading(false);
        });
    } else {
      setPedigree({});
    }
  }, [selectedBull, isPopupOpen]);

  return (
    <Container>
      <Head>
        <Title>Основная информация</Title>
        <Button onClick={downloadBullPDF} disabled={isPdfLoading}>{isPdfLoading ? 'Генерирую...' : 'Скачать карточку'}</Button>
      </Head>

      <MainInformation>
        <MainInformationGroup>
          {mainFields.slice(0, 3).map(({ name, key, proceedValue }) => (
            <MainInformationRow key={key}>
              <FieldName>{name}</FieldName>
              <FieldValue>{(proceedValue ? proceedValue(selectedBull[key]) : selectedBull[key]) || '--'}</FieldValue>
            </MainInformationRow>
          ))}
        </MainInformationGroup>
        <MainInformationGroup>
          {mainFields.slice(3, 6).map(({ name, key, proceedValue }) => (
            <MainInformationRow key={key}>
              <FieldName>{name}</FieldName>
              <FieldValue>{(proceedValue ? proceedValue(selectedBull[key]) : selectedBull[key]) || '--'}</FieldValue>
            </MainInformationRow>
          ))}
        </MainInformationGroup>
      </MainInformation>

      <TabsContainer>
        <Tabs value={tabValue} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab value={1} label="Общие" />
          <Tab value={2} label="Экстерьер" />
          <Tab value={3} label="Здоровье" />
          <Tab value={4} label="Родословная" />
          <Tab value={5} label="Промеры" />
        </Tabs>

        {tabValue === 1 && (
          <FirstTab selectedBull={selectedBull} isPopupOpen={isPopupOpen} averageValues={averageValues} />
        )}

        {tabValue === 2 && (
          <SecondTab selectedBull={selectedBull} isPopupOpen={isPopupOpen} averageValues={averageValues} />
        )}

        {tabValue === 3 && (
          <ThirdTab selectedBull={selectedBull} isPopupOpen={isPopupOpen} averageValues={averageValues} />
        )}

        {tabValue === 4 && (
          <FourTab
            selectedBull={selectedBull}
            isPopupOpen={isPopupOpen}
            averageValues={averageValues}
            pedigree={pedigree}
            isPedigreeLoading={isPedigreeLoading}
          />
        )}

        {tabValue === 5 && (
          <FifthTab
            selectedBull={selectedBull}
            isPopupOpen={isPopupOpen}
            averageValues={averageValues}
            onBullUpdate={onBullUpdate}
          />
        )}
      </TabsContainer>
    </Container>
  );
};

export default BullPopup;

const Container = styled(Box)(() => ({
  boxSizing: 'border-box',

  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  gap: 10,

  padding: 12,

  width: '100%',
  height: '100%',
}));

const Head = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 20,
}));

const MainInformation = styled(Box)(() => ({
  display: 'flex',

  marginTop: 20,
}));

const MainInformationGroup = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));

const MainInformationRow = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '200px 300px',
}));

const FieldName = styled(Typography)(() => ({
  fontSize: 14,
  color: '#888888',
  fontWeight: 400,
}));

const FieldValue = styled(Typography)(() => ({
  fontSize: 14,
  color: 'black',
  fontWeight: 600,
}));

const TabsContainer = styled(Box)(() => ({
  width: '100%',
  marginTop: 40,
  paddingBottom: 100,
}));

const Button = styled('button')(() => ({
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
