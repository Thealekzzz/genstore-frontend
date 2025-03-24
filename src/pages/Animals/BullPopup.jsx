import styled from '@emotion/styled';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Title } from './components';
import { useEffect, useState } from 'react';
import FirstTab from './tabs/FirstTab';
import FourTab from './tabs/FourTab';
import { searchBulls } from '../../api/search';
import SecondTab from './tabs/SecondTab';
import ThirdTab from './tabs/ThirdTab';

const mainFields = [
  { name: 'Кличка', key: 'Name' },
  { name: 'ID', key: 'InterRegNumber' },
  { name: 'Инвентарный номер', key: 'inv' },
  { name: 'Пол', key: 'sex' },
  { name: 'Дата рождения', key: 'birth' },
  { name: 'Порода', key: 'breed' },
];

const BullPopup = ({ selectedBull, isPopupOpen, averageValues }) => {
  const [isPedigreeLoading, setIsPedigreeLoading] = useState(false);
  const [pedigree, setPedigree] = useState({});
  const [tabValue, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (isPopupOpen) {
      setIsPedigreeLoading(true);
      searchBulls({
        data: selectedBull.techPedigree
          .split(':')
          .map((parentData) => parentData.split('-'))
          .map(([naab, ID]) => ({ naab, ID })),
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
      <Title>Основная информация</Title>

      <MainInformation>
        <MainInformationGroup>
          {mainFields.slice(0, 3).map(({ name, key }) => (
            <MainInformationRow key={key}>
              <FieldName>{name}</FieldName>
              <FieldValue>{selectedBull[key] || '--'}</FieldValue>
            </MainInformationRow>
          ))}
        </MainInformationGroup>
        <MainInformationGroup>
          {mainFields.slice(3, 6).map(({ name, key }) => (
            <MainInformationRow key={key}>
              <FieldName>{name}</FieldName>
              <FieldValue>{selectedBull[key] || '--'}</FieldValue>
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
