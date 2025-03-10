import { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import getPrettyDateTime from '../../utils/getPrettyDateTime';

import TokenContext from '../../contexts/TokenContext';

import EvaluationUserPopup from '../../components/EvaluationUserPopup/EvaluationUserPopup';
import { getOrders } from '../../api/orders';

const Orders = () => {
  const nameByStatus = {
    created: 'Создана',
    pending: 'В работе',
    'awaiting payment': 'Ожидает оплаты',
    done: 'Выполнена',
  };

  const colorByStatus = {
    created: 'tomato',
    pending: '#4380f0',
    'awaiting payment': '#f2ae21',
    done: '#CACACA',
  };

  const token = useContext(TokenContext);

  const [orders, setOrders] = useState([]);
  // const [bulls, setBulls] = useState([]);

  const [areEvaluatesLoading, setAreEvaluatesLoading] = useState(false);
  const [isEvaluationPopupOpen, setIsEvaluationPopupOpen] = useState(false);
  const [selectedEvaluationData, setSelectedEvaluationData] = useState({});

  function handleEvaluationItemClick(order) {
    setIsEvaluationPopupOpen(true);
    setSelectedEvaluationData(order);
  }

  useEffect(() => {
    setAreEvaluatesLoading(true);

    getOrders()
      .then((data) => {
        setAreEvaluatesLoading(false);
        setOrders(data.orders);
      })
      .catch(() => {
        console.error('Ошибка при получении данных о расчетах пользователя');
      });
  }, [token]);

  return (
    <>
      <OrdersContainer>
        <Title>Мои заявки</Title>

        {orders.length > 0 ? (
          <>
            <div className="header">
              <p>Дата</p>
              <p>Название</p>
              <p>Файл</p>
              <p>Статус</p>
            </div>
            <ul className="ordersList">
              {orders.map((order) => (
                <li onClick={() => handleEvaluationItemClick(order)} className="orderItem" key={order.orderId}>
                  <p>{getPrettyDateTime(order.createdAt)}</p>
                  <p>{order.name}</p>
                  <p>{order.filename}</p>
                  <p style={{ backgroundColor: colorByStatus[order.status] }}>{nameByStatus[order.status]}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <CenterContainer>
            <p className="noEvaluates">{areEvaluatesLoading ? 'Загрузка заявок...' : 'Заявок пока нет'}</p>
            <Link to="/createrequest">
              <Button variant="contained">Создать заявку</Button>
            </Link>
          </CenterContainer>
        )}
      </OrdersContainer>

      <EvaluationUserPopup
        isOpen={isEvaluationPopupOpen}
        setIsOpen={setIsEvaluationPopupOpen}
        evaluationData={selectedEvaluationData}
      />
    </>
  );
};

export default Orders;

const OrdersContainer = styled(Box)(() => ({
  width: '100%',
  minHeight: 200,
  padding: 20,

  backgroundColor: 'white',

  borderRadius: 10,
}));

const Title = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 700,
}));

const CenterContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
