import styled from '@emotion/styled';
import { Box, CircularProgress, Typography } from '@mui/material';

import Conn1Image from '../../../imgs/conn1.svg';
import Conn2Image from '../../../imgs/conn2.svg';

const names = {
  O: 'Отец',
  M: 'Мать',
  OO: 'Отец О.',
  MO: 'Мать О.',
  OM: 'Отец М.',
  MM: 'Мать М.',
  OOO: 'Отец О. О.',
  MOO: 'Мать О. О.',
  OMO: 'Отец М. О.',
  MMO: 'Мать М. О.',
  OOM: 'Отец О. М.',
  MOM: 'Мать О. М.',
  OMM: 'Отец М. М.',
  MMM: 'Мать М. М.',
};

const FourTab = ({ pedigree, isPedigreeLoading }) => {
  return (
    <Container>
      {isPedigreeLoading ? (
        <CircularProgress />
      ) : (
        <>
          <PagentsGroup>
            {Object.entries(pedigree)
              .slice(0, 2)
              .map(([name, data]) => (
                <ParentContainer key={name} isDefined={Boolean(data)}>
                  {data ? (
                    <>
                      <Text sx={{ transform: 'translate(-20px, -36px)', position: 'absolute' }}>{names[name]}</Text>
                      <ParentContainerHeader>
                        <Title>{data.Name || '--'}</Title>
                        <Text>{data.TPI ? (data.TPI > 0 ? '+' + data.TPI : data.TPI) : '--'}</Text>
                      </ParentContainerHeader>
                      <Text>{data.InterRegNumber || '--'}</Text>
                    </>
                  ) : (
                    <>
                      <Text sx={{ transform: 'translate(-20px, -36px)', position: 'absolute' }}>{names[name]}</Text>
                      <Text>Неизвестно</Text>
                    </>
                  )}
                </ParentContainer>
              ))}
          </PagentsGroup>

          <PagentsGroup>
            {Object.entries(pedigree)
              .slice(2, 6)
              .map(([name, data]) => (
                <ParentContainer key={name} isDefined={Boolean(data)}>
                  {data ? (
                    <>
                      <Text sx={{ transform: 'translate(-20px, -36px)', position: 'absolute' }}>{names[name]}</Text>
                      <ParentContainerHeader>
                        <Title>{data.Name}</Title>
                        <Text>{data.TPI > 0 ? '+' + data.TPI : data.TPI}</Text>
                      </ParentContainerHeader>
                      <Text>{data.InterRegNumber}</Text>
                    </>
                  ) : (
                    <>
                      <Text sx={{ transform: 'translate(-20px, -36px)', position: 'absolute' }}>{names[name]}</Text>
                      <Text>Неизвестно</Text>
                    </>
                  )}
                </ParentContainer>
              ))}
          </PagentsGroup>

          <PagentsGroup>
            {Object.entries(pedigree)
              .slice(6)
              .map(([name, data]) => (
                <ParentContainer key={name} isDefined={Boolean(data)}>
                  {data ? (
                    <>
                      <Text sx={{ transform: 'translate(-20px, -30px)', position: 'absolute' }}>{names[name]}</Text>
                      <ParentContainerHeader>
                        <Title>{data.Name}</Title>
                        <Text>{data.TPI > 0 ? '+' + data.TPI : data.TPI}</Text>
                      </ParentContainerHeader>
                      <Text>{data.InterRegNumber}</Text>
                    </>
                  ) : (
                    <>
                      <Text sx={{ transform: 'translate(-20px, -30px)', position: 'absolute' }}>{names[name]}</Text>
                      <Text>Неизвестно</Text>
                    </>
                  )}
                </ParentContainer>
              ))}
          </PagentsGroup>
        </>
      )}

      <img
        src={Conn1Image}
        alt=""
        style={{
          position: 'absolute',
          transform: 'translate(-140px, 60px)',
          display: isPedigreeLoading ? 'none' : 'block',
        }}
      />
      <img
        src={Conn1Image}
        alt=""
        style={{
          position: 'absolute',
          transform: 'translate(-140px, 350px)',
          display: isPedigreeLoading ? 'none' : 'block',
        }}
      />
      <img
        src={Conn2Image}
        alt=""
        style={{
          position: 'absolute',
          transform: 'translate(140px, 24px)',
          display: isPedigreeLoading ? 'none' : 'block',
        }}
      />
      <img
        src={Conn2Image}
        alt=""
        style={{
          position: 'absolute',
          transform: 'translate(140px, 166px)',
          display: isPedigreeLoading ? 'none' : 'block',
        }}
      />
      <img
        src={Conn2Image}
        alt=""
        style={{
          position: 'absolute',
          transform: 'translate(140px, 312px)',
          display: isPedigreeLoading ? 'none' : 'block',
        }}
      />
      <img
        src={Conn2Image}
        alt=""
        style={{
          position: 'absolute',
          transform: 'translate(140px, 458px)',
          display: isPedigreeLoading ? 'none' : 'block',
        }}
      />
    </Container>
  );
};

export default FourTab;

const Container = styled(Box)(() => ({
  width: '100%',

  display: 'flex',
  justifyContent: 'center',
  gap: 80,

  padding: '40px 40px 0',

  position: 'relative',
}));

const ParentContainer = styled(Box)(({ isDefined }) => ({
  width: 200,
  maxWidth: 200,
  minHeight: 50,

  backgroundColor: isDefined ? '#dde7f0' : '#f7f7f7',
  border: `2px solid ${isDefined ? '#2d76f5' : '#e4e4e4'}`,

  padding: '12px 24px',
  borderRadius: 10,
  position: 'relative',
}));

const ParentContainerHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Title = styled(Typography)(() => ({
  paddingRight: 10,

  fontSize: 12,
  fontWeight: 'bold',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const Text = styled(Typography)(() => ({
  fontSize: 12,
}));

const PagentsGroup = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  gap: 20,
}));
