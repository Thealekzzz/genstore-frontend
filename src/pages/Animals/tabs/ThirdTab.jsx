import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const tableRows = [
  { name: 'Productive Life', key: 'PL', postfix: '' },
  { name: 'Cow Livability', key: 'C-LIV', postfix: '' },
  { name: 'Heifer Livability', key: 'H-LIV', postfix: '' },
  { name: 'Daughter Pregnancy Rate', key: 'DPR', postfix: '' },
  { name: 'Somatic Cell Score', key: 'SCS', postfix: '' },
  { name: 'Sire Calving Ease', key: 'SCE', postfix: '' },
  { name: 'SCE Rel', key: 'SCE Rel', postfix: '' },
  { name: 'Dtr Calving Ease', key: 'DCE', postfix: '' },
  { name: 'Sire stillbirth', key: 'SSB', postfix: '' },
  { name: 'Dtr stillbirth', key: 'DSB', postfix: '' },
  { name: 'Cow Conception Rate', key: 'CCR', postfix: '' },
  { name: 'Heifer Conception Rate', key: 'HCR', postfix: '' },
  { name: 'MAST', key: 'MAST', postfix: '' },
  { name: 'KET', key: 'KET', postfix: '' },
  { name: 'RP', key: 'RP', postfix: '' },
  { name: 'MET', key: 'MET', postfix: '' },
  { name: 'DA', key: 'DA', postfix: '' },
  { name: 'MF', key: 'MF', postfix: '' },
  { name: 'DWP$', key: 'DWP$', postfix: '' },
  { name: 'WT$', key: 'WT$', postfix: '' },
];

const ThirdTab = ({ selectedBull, isPopupOpen, averageValues }) => {
  const [graphData, setGraphData] = useState([]);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!isPopupOpen) {
      setGraphData(
        tableRows.map(({ name }) => ({
          name: name,
          data: 0,
        })),
      );

      return;
    }

    const maxValueInData = tableRows.reduce((prev, { key }) => Math.max(prev, +selectedBull[key]), 0);

    setGraphData(
      tableRows.map(({ name, key }) => ({
        name: name,
        data: (+selectedBull[key] / maxValueInData) * 90,
      })),
    );
  }, [selectedBull, isPopupOpen]);

  return (
    <Container>
      <Table>
        <FieldHeader>Показатель</FieldHeader>
        <FieldHeader>Значение</FieldHeader>
        <FieldHeader>Среднее по стаду</FieldHeader>

        {tableRows.map(({ name, key, postfix }) => (
          <>
            <Field>{name}</Field>
            <FieldAccent>
              {selectedBull[key] ? `${selectedBull[key] > 0 ? '+' : ''}${selectedBull[key]} ${postfix}` : '--'}
            </FieldAccent>
            <Field>
              {selectedBull[key]
                ? `${averageValues[key] > 0 ? '+' : ''}${averageValues[key].toFixed(2)} ${postfix}`
                : '--'}
            </Field>
          </>
        ))}
      </Table>

      <Graph>
        <BarChart
          width={width - 720}
          height={tableRows.length * 39}
          data={graphData}
          layout="vertical"
          margin={{
            top: 50,
          }}
        >
          <CartesianGrid strokeDasharray="9 5" syncWithTicks={true} />
          <XAxis type="number" domain={[-100, 100]} scale={'sqrt'} hide={true} />
          <YAxis type="category" dataKey="name" hide={true} />
          <Bar dataKey="data" animationDuration={300}>
            {tableRows.map(({ key }, index) => (
              <Cell key={`cell-${index}`} fill={selectedBull[key] > 0 ? 'seagreen' : 'tomato'} />
            ))}
          </Bar>
        </BarChart>
      </Graph>
    </Container>
  );
};

export default ThirdTab;

const Container = styled(Box)(() => ({
  width: '100%',
  display: 'flex',

  padding: '0 40px',
}));

const Table = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '220px 120px 150px',
  gridAutoRows: '36px',
  alignItems: 'center',

  padding: '10px 20px',
  margin: '10px 0',
  // border: '1px solid #ccc',
  borderRadius: 10,
}));

const FieldHeader = styled(Typography)(() => ({
  fontSize: 14,
  color: 'black',
  fontWeight: 600,
}));

const Field = styled(Typography)(() => ({
  fontSize: 14,
  color: '#888888',
  fontWeight: 400,
}));

const FieldAccent = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: 'black',
}));

const Graph = styled(Box)(() => ({
  width: '100%',
}));
