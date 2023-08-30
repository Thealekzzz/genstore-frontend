import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./Evaluations.module.css";

import { SERVER_PORT, SERVER_URL } from '../../data/data';

// import Button from '../../components/Button/Button';
import ButtonAccent from '../../components/ButtonAccent/ButtonAccent';
import Container from '../../components/Container/Container';
import OrderPopup from '../../components/EvaluationPopup/EvaluationPopup';
import getPrettyDateTime from '../../utils/getPrettyDateTime';

// import AuthorizedContext from '../../contexts/AuthorizedContext';
import TokenContext from '../../contexts/TokenContext';

const Evaluations = ({ setIsAuthorized, ...props }) => {
	const statusNames = {
		"created": "Создана",
		"pending": "В работе",
		"awaiting payment": "Ожидает оплаты",
		"done": "Выполнена",
	}

	const colorByStatus = {
		"created": "tomato",
		"pending": "#4380f0",
		"awaiting payment": "#f2ae21",
		"done": "#CACACA",
	}

	const navigate = useNavigate();

	const [orders, setOrders] = useState([]);
	const [areOrdersLoading, setAreOrdersLoading] = useState(false);
	const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
	const [selectedOrderData, setSelectedOrderData] = useState({});

	// const isAuthorized = useContext(AuthorizedContext);
	const token = useContext(TokenContext);

	function handleLogoutButtonClick() {
		localStorage.removeItem('token');
		setIsAuthorized(false);
		navigate("/login");
	}

	function handleOrderItemClick(order) {
		console.log(order);
		setSelectedOrderData(order);
		setIsOrderPopupOpen(true);
	}

	function onOrderDataSave(orderData) {
		// Когда данные о заявке были изменены и сохранены - 
		// нужно обновить о ней инфу в переменной orders
		setOrders(prev => {
			// Беру старое значение orders, нахожу по ID заявку, которую нужно изменить
			// и меняю ее данные на актуальные
			const evaluateToUpdateIndex = prev.findIndex((evaluate) => evaluate.orderId === orderData.id)
			delete orderData.id

			prev[evaluateToUpdateIndex] = { ...prev[evaluateToUpdateIndex], ...orderData };

			return prev;
		});
	}

	function handleDeleteOrder(orderId) {
		setOrders(prev => prev.filter(evaluate => +evaluate.orderId !== +orderId));
		setIsOrderPopupOpen(false);
	}

	useEffect(() => {
		setAreOrdersLoading(true);
		fetch(`${SERVER_URL}:${SERVER_PORT}/api/orders?all=true`, {
			method: "GET",
			headers: {
				authorization: token ? "Bearer " + token : null,
			}
		})
			.then(res => res.json())
			.then(data => {
				setAreOrdersLoading(false);
				setOrders(data.orders);
				console.log(data);
			})
			.catch(err => {
				console.error("Ошибка при получении данных о расчетах пользователя");
			});
	}, [token]);

	return (
		<>
			<Container direction="column" style={{ maxWidth: 1000 }}>
				<section className={styles["profile-lead"]}>
					<div className={styles["profile-lead__back"]}></div>
					<img src={`${SERVER_URL}:${SERVER_PORT}/images/${props.userData.photo || 'sample.jpg'}`} alt="" className={styles["profile-lead__user-photo"]} />
					<div className={styles["profile-lead__bottom"]}>
						<div className={styles["profile-lead__info-block"]}>
							<div className={styles["profile-lead__main-info"]}>
								{props.userData.name}
								<div className={styles["profile-lead__point"]}></div>
								Аккаунт менеджера
							</div>
						</div>

						<div className={styles["profile-lead__right-side"]}>
							{/* <Button href="/edit">Редактировать аккаунт</Button> */}
							<ButtonAccent onClick={handleLogoutButtonClick}>Выйти</ButtonAccent>

						</div>
					</div>
				</section>

				<section
					className={[styles.orders].join((" "))}
					style={{
						justifyContent: orders.length > 0 ? "center" : "initial",
						marginTop: 20
					}}>
					<h2 className={styles.ordersTitle}>Заявки</h2>
					{orders.length > 0 ? (
						<>
							<div className={styles.header}>
								<p>Дата</p>
								<p>Автор</p>
								<p>Файл</p>
								<p>Статус</p>
							</div>
							<ul className={styles.ordersList}>
								{orders.map(order => (
									<li key={order.orderId} onClick={() => handleOrderItemClick(order)} className={styles.evaluateItem}>
										<p>{getPrettyDateTime(order.createdAt)}</p>
										<p>{order.user.name}</p>
										<p>{order.filename}</p>
										<p style={{ backgroundColor: colorByStatus[order.status] }}>{statusNames[order.status]}</p>
									</li>
								))}

							</ul>
						</>
					) : (
						<p className={styles.noEvaluates}>{areOrdersLoading ? "Загрузка заявок..." : "Заявок пока нет"}</p>
					)}
				</section>

				<OrderPopup onOrderDataSave={onOrderDataSave} orderData={selectedOrderData} isOpen={isOrderPopupOpen} setIsOpen={setIsOrderPopupOpen} onDeleteOrder={handleDeleteOrder} />
			</Container>
		</>
	);
};

export default Evaluations;