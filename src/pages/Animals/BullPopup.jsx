import styled from "@emotion/styled";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Title } from "./components";
import { useState } from "react";
import FirstTab from "./tabs/FirstTab";

const mainFields = [
  {name: 'Кличка', key: 'Name'},
  {name: 'ID', key: 'InterRegNumber'},
  {name: 'Инвентарный номер', key: 'inv'},
  {name: 'Пол', key: 'sex'},
  {name: 'Дата рождения', key: 'birth'},
  {name: 'Порода', key: 'breed'},
];

const BullPopup = ({ selectedBull, isPopupOpen, averageValues }) => {
  const [tabValue, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="wrapped label tabs example" 
        >
          <Tab value={1} label="Общие" />
          <Tab value={2} label="Фенотип" />
          <Tab value={3} label="Здоровье" />
        </Tabs>


        {tabValue === 1 && (
          <FirstTab selectedBull={selectedBull} isPopupOpen={isPopupOpen} averageValues={averageValues} />
        )}

      </TabsContainer>
    </Container>
  );
};

export default BullPopup;

const Container = styled(Box)(() => ({
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
}));