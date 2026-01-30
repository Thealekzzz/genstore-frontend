import { useEffect, useState } from 'react';
import { getAreThereOrdersBeyondOrders, getAverageBullData, getBulls, getBullsPdf } from '../../api/bulls';
import { Box, Button, Checkbox, FormControlLabel, MenuItem, Select, Snackbar, Typography } from '@mui/material';
import SortAscIcon from '../../imgs/sortAsc.svg';
import SortDescIcon from '../../imgs/sortDesc.svg';
import Popup from '../../components/Popup/Popup';
import { ContainerHeader, HeaderCell, OrdersContainer, TableBody, TableHeader, TableRow, Title } from './components';
import BullPopup from './BullPopup';
import wordEnding from '../../utils/wordEnding';

const fieldsToShowInTable = {
  Имя: 'name',
  TPI: 'tpi',
  Молоко: 'milk',
  Белок: 'protein',
  Жир: 'fat',
};

const Animals = ({ userData, orders }) => {
  const [areBullsLoading, setAreBullsLoading] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const [bulls, setBulls] = useState([]);
  const [areThereOrdersBeyondOrders, setAreThereOrdersBeyondOrders] = useState(false);
  const [hasMoreBulls, setHasMoreBulls] = useState([]);
  const [offset, setOffset] = useState(0);
  const [averageValues, setAverageValues] = useState([]);
  
  const [selectedOrder, setSelectedOrder] = useState('all');
  const [sortedBy, setSortedBy] = useState({ value: null, asc: false });
  const [isOnlyFullPedigree, setIsOnlyFullPedigree] = useState(false);
  
  const [selectedBull, setSelectedBull] = useState({});
  const [isBullPopupOpen, setIsBullPopupOpen] = useState(false);

  const [checkedBullIds, setCheckedBullIds] = useState([]);
  const [lastCheckedBullId, setLastCheckedBullId] = useState(null);

  function handleSelectChange(event) {
    setSelectedOrder(event.target.value);
  }

  function handleFullPedigreeCheckboxChange(event) {
    setIsOnlyFullPedigree(event.target.checked);
  }

  function handleOpenPopup(bull) {
    setIsBullPopupOpen(true);
    setSelectedBull(bull);
  }

  function handleSortButtonClick(sortBy) {
    const newSortedBy = { value: sortBy, asc: sortedBy.value === sortBy ? !sortedBy.asc : false };
    setOffset(0);
    setSortedBy(newSortedBy);
  }

  function handleLoadMoreBulls() {
    setOffset(offset + 200);
  }

  function handleBullCheckboxChange(event, bull) {
    if (event.nativeEvent.shiftKey && lastCheckedBullId) {
      const lastCheckedBullIndex = bulls.findIndex((checkedBull) => checkedBull.id === lastCheckedBullId);
      const currentCheckedBullIndex = bulls.findIndex((checkedBull) => checkedBull.id === bull.id);

      const bullIdsToAdd = bulls
        .slice(
          Math.min(lastCheckedBullIndex, currentCheckedBullIndex),
          Math.max(lastCheckedBullIndex, currentCheckedBullIndex) + 1,
        )
        .map((checkedBull) => checkedBull.id);

      if (event.target.checked) {
        setCheckedBullIds([...new Set([...checkedBullIds, ...bullIdsToAdd])]);
      } else {
        setCheckedBullIds(checkedBullIds.filter((checkedBullId) => !bullIdsToAdd.includes(checkedBullId)));
      }
    } else {
      if (event.target.checked) {
        setCheckedBullIds([...checkedBullIds, bull.id]);
      } else {
        setCheckedBullIds(checkedBullIds.filter((checkedBullId) => checkedBullId !== bull.id));
      }
    }

    setLastCheckedBullId(bull.id);
  }

  // function handleDeleteCheckedBulls() {
  //   deleteUserBulls(checkedBullIds).then(() => {
  //     setBulls((prev) => prev.filter((bull) => !checkedBullIds.includes(bull.id)));
  //     setCheckedBullIds([]);
  //   });
  // }

  function downloadPdfForCheckedBulls() {
    setIsPdfLoading(true);

    getBullsPdf(checkedBullIds)
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `Карточки быков [${checkedBullIds.length} шт].pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);
      })
      .finally(() => {
        setIsPdfLoading(false);
      });

  }

  function handleBullUpdate(updatedBull) {
    setBulls(bulls.map((bull) => (bull.id === updatedBull.id ? updatedBull : { ...bull })));
    setSelectedBull(updatedBull);
  }

  useEffect(() => {
    getAverageBullData(userData.userId)
      .then((averageData) => {
        setAverageValues(averageData);
      })
      .catch(() => {
        console.error('Ошибка при получении данных о быках');
      })

    getAreThereOrdersBeyondOrders(userData.userId)
      .then((areThereOrdersBeyondOrders) => {
        setAreThereOrdersBeyondOrders(areThereOrdersBeyondOrders);
      })
      .catch(() => {
        console.error('Ошибка при получении данных о быках');
      })
  }, [userData]);

  useEffect(() => {
    setAreBullsLoading(true);

    getBulls(userData.userId, offset, isOnlyFullPedigree, selectedOrder, sortedBy)
      .then(({ data: newBulls, hasMoreData }) => {
        if (offset === 0) {
          setBulls(newBulls);

        } else {
          setBulls((prev) => ([...prev, ...newBulls]));
        }

        setHasMoreBulls(hasMoreData);
      })
      .catch(() => {
        console.error('Ошибка при получении данных о быках');
      })
      .finally(() => {
        setAreBullsLoading(false);
      });
  }, [userData, offset, selectedOrder, isOnlyFullPedigree, sortedBy]);

  return (
    <>
      <OrdersContainer>
        <ContainerHeader>
          <Title>Мои животные</Title>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOrder}
            color="primary"
            size="small"
            onChange={handleSelectChange}
          >
            <MenuItem value={'all'}>Все животные</MenuItem>
            {areThereOrdersBeyondOrders && <MenuItem value={'beyond'}>Вне заявок</MenuItem>}
            {orders.map(({ orderId }) => (
              <MenuItem key={orderId || 'withoutOrder'} value={orderId || 'withoutOrder'}>
                {orderId ? `Из заявки №${orderId}` : 'Вне заявок'}
              </MenuItem>
            ))}
          </Select>

          <FormControlLabel
            control={
              <Checkbox name="fullPedigree" onChange={handleFullPedigreeCheckboxChange} value={isOnlyFullPedigree} />
            }
            label="Только полная родословная"
          />
        </ContainerHeader>

        {bulls.length > 0 ? (
          <>
            <TableHeader numberOfFields={Object.keys(fieldsToShowInTable).length}>
              <div></div>
              {Object.entries(fieldsToShowInTable).map(([fieldName, field]) => (
                <HeaderCell key={fieldName}>
                  <p>{fieldName}</p>
                  <Button
                    variant="circle"
                    onClick={() => handleSortButtonClick(field)}
                    sx={{
                      opacity: field === sortedBy.value ? 1 : 0.2,

                      '&:hover': {
                        opacity: field === sortedBy.value ? 1 : 0.5,
                      },
                    }}
                  >
                    {field !== sortedBy.value && <img src={SortDescIcon} alt="" width={20} />}
                    {field === sortedBy.value && sortedBy.asc && <img src={SortAscIcon} alt="" width={20} />}
                    {field === sortedBy.value && !sortedBy.asc && <img src={SortDescIcon} alt="" width={20} />}
                  </Button>
                </HeaderCell>
              ))}
            </TableHeader>

            <TableBody areBullsLoading={areBullsLoading}>
              {bulls.map((bull) => (
                <TableRow
                  key={bull.id}
                  numberOfFields={Object.keys(fieldsToShowInTable).length}
                  onClick={() => handleOpenPopup(bull)}
                >
                  <Checkbox
                    onChange={(e) => handleBullCheckboxChange(e, bull)}
                    onClick={(e) => e.stopPropagation()}
                    checked={checkedBullIds.includes(bull.id)}
                  />
                  {Object.values(fieldsToShowInTable).map((field) => (
                    <p key={field}>{bull[field]}</p>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            {hasMoreBulls && (
              <Button
                onClick={handleLoadMoreBulls}
                variant="contained"
                sx={{
                  margin: '50px auto',
                  display: 'block',
                }}
              >
                Загрузить еще
              </Button>
            )}
          </>
        ) : (
          <p className="noEvaluates">{areBullsLoading ? 'Загрузка животных...' : typeof selectedOrder === 'number' ? 'В этой заявке ещё нет рассчитанных животных' : 'Животных пока нет'}</p>
        )}
      </OrdersContainer>

      <Snackbar open={checkedBullIds.length > 0} autoHideDuration={6000}>
        <Box
          sx={{
            padding: '10px 20px',
            backgroundColor: 'white',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography>
            Выбрано {checkedBullIds.length} {wordEnding(checkedBullIds.length, 'животн', ['ых', 'ое', 'ых'])}
          </Typography>
          <Button color="primary" variant="contained" onClick={downloadPdfForCheckedBulls} disabled={isPdfLoading}>
            {isPdfLoading ? (
              'Генерирую...'
            ) : ('Скачать PDF')}
          </Button>
          <Button color="primary" variant="outlined" onClick={() => setCheckedBullIds([])} disabled={isPdfLoading}>
            Отмена
          </Button>
        </Box>
      </Snackbar>

      <Popup
        isOpen={isBullPopupOpen}
        setIsOpen={setIsBullPopupOpen}
        style={{
          width: 'calc(100% - 100px)',
          height: 'calc(100% - 140px)',

          overflowY: 'auto',
        }}
      >
        <BullPopup selectedBull={selectedBull} isPopupOpen={isBullPopupOpen} averageValues={averageValues} onBullUpdate={handleBullUpdate} />
      </Popup>
    </>
  );
};

export default Animals;
