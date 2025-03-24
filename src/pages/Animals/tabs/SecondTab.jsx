import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const tableRows = [
  { name: 'PTAT', key: 'PTAT', postfix: '' },
  { name: 'UDC', key: 'UDC', postfix: '' },
  { name: 'FLC', key: 'FLC', postfix: '' },
  { name: 'BWC', key: 'BWC', postfix: '' },
  { name: 'DC', key: 'DC', postfix: '' },
  { name: 'Stature', key: 'Stature', postfix: '' },
  { name: 'Strength', key: 'Strength', postfix: '' },
  { name: 'Body Depth', key: 'Body Depth', postfix: '' },
  { name: 'Dairy form', key: 'Dairy form', postfix: '' },
  { name: 'Rump Angle', key: 'Rump Angle', postfix: '' },
  { name: 'Thurl Width', key: 'Thurl Width', postfix: '' },
  { name: 'R. Legs-S View', key: 'RLSV', postfix: '' },
  { name: 'R. Legs-R View', key: 'RLRV', postfix: '' },
  { name: 'Foot Angle', key: 'Foot Angle', postfix: '' },
  { name: 'F&L Score', key: 'FLS', postfix: '' },
  { name: 'F. Udder Att.', key: 'F. Udder Att.', postfix: '' },
  { name: 'R Udder Height', key: 'R Udder Height', postfix: '' },
  { name: 'Rear Udder Width', key: 'Rear Udder Width', postfix: '' },
  { name: 'Udder Cleft', key: 'Udder Cleft', postfix: '' },
  { name: 'Udder Depth', key: 'Udder Depth', postfix: '' },
  { name: 'F. Teat Place', key: 'FTP', postfix: '' },
  { name: 'R. Teat Place', key: 'RTP', postfix: '' },
  { name: 'RTP SV', key: 'RTP SV', postfix: '' },
  { name: 'Teat Length', key: 'Teat Length', postfix: '' },
];

const SecondTab = ({ selectedBull, isPopupOpen, averageValues }) => {
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
          height={tableRows.length * 38.4}
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
              <Cell height={30} key={`cell-${index}`} fill={selectedBull[key] > 0 ? 'seagreen' : 'tomato'} />
            ))}
          </Bar>
        </BarChart>
      </Graph>
    </Container>
  );
};

export default SecondTab;

const Container = styled(Box)(() => ({
  width: '100%',
  display: 'flex',

  padding: '0 40px',
}));

const Table = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '140px 140px 160px',
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
