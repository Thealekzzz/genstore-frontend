import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SERVER_PORT, SERVER_URL } from '../../data/data';

import "./Profile.css";
import styles from "./Profile.module.css";

import ButtonAccent from '../../components/ButtonAccent/ButtonAccent';
import Container from '../../components/Container/Container';
import getPrettyDateTime from '../../utils/getPrettyDateTime';
import EvaluationUserPopup from '../../components/EvaluationUserPopup/EvaluationUserPopup';
import Popup from '../../components/Popup/Popup';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Form from '../../components/Form/Form';

import AuthorizedContext from '../../contexts/AuthorizedContext';
import TokenContext from '../../contexts/TokenContext';

const Profile = ({ setIsAuthorized, ...props }) => {
	const nameByStatus = {
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

	const token = useContext(TokenContext);

	const [orders, setOrders] = useState([]);
	const [areEvaluatesLoading, setAreEvaluatesLoading] = useState(false);
	const [isEvaluationPopupOpen, setIsEvaluationPopupOpen] = useState(false);
	const [selectedEvaluationData, setSelectedEvaluationData] = useState({});
	const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

	const [nameInputValue, setNameInputValue] = useState("");
	const [surnameInputValue, setSurameInputValue] = useState("");
	const [lastnameInputValue, setLastameInputValue] = useState("");

	const isAuthorized = useContext(AuthorizedContext);

	function handleLogoutButtonClick() {
		localStorage.removeItem("token");
		setIsAuthorized(false);
		navigate("/login");
	}

	function handleEvaluationItemClick(evaluationData) {
		setIsEvaluationPopupOpen(true);
		setSelectedEvaluationData(evaluationData);
	}

	function handleNameInput(evt) {
		setNameInputValue(evt.target.value);
	}

	function handleSurnameInput(evt) {
		setSurameInputValue(evt.target.value);
	}

	function handleLastnameInput(evt) {
		setLastameInputValue(evt.target.value);
	}

	useEffect(() => {
		setAreEvaluatesLoading(true);
		fetch(`${SERVER_URL}:${SERVER_PORT}/api/orders`, {
			method: "GET",
			headers: {
				authorization: token ? "Bearer " + token : null,
			}
		})
			.then(res => res.json())
			.then(data => {
				setAreEvaluatesLoading(false);
				setOrders(data.orders);
			})
			.catch(err => {
				console.error("Ошибка при получении данных о расчетах пользователя");
			});
	}, [token]);

	return (
		<>
			<Container style={{ flexDirection: "column", maxWidth: 1000 }}>
				{isAuthorized ? (<>
					<section className="profile-lead">
						<div className="profile-lead__back"></div>
						<img src={`${SERVER_URL}:${SERVER_PORT}/images/${props.userData.photo || 'sample.jpg'}`} alt="" className="profile-lead__user-photo" />
						<div className="profile-lead__bottom">
							<div className="profile-lead__info-block">
								<div className="profile-lead__username-and-balance">
									{props.userData.name}
									<div className="profile-lead__point"></div>
									<div className="profile-lead__balance">
										Баланс 0
										<img src="./src/rouble.svg" alt="" />
									</div>
								</div>
							</div>

							<div className="profile-lead__right-side">
								{/* <Button onClick={() => setIsEditPopupOpen(true)}>Редактировать профиль</Button> */}
								<ButtonAccent onClick={handleLogoutButtonClick}>Выйти</ButtonAccent>

							</div>
						</div>
					</section>

					<section
						className={["orders"].join((" "))}
						style={{
							justifyContent: orders.length > 0 ? "center" : "initial",
							marginTop: 20
						}}>
						<h2 className='ordersTitle'>Мои заявки</h2>
						{orders.length > 0 ? (
							<>
								<div className="header">
									<p>Дата</p>
									<p>Название</p>
									<p>Файл</p>
									<p>Статус</p>
								</div>
								<ul className='ordersList'>
									{orders.map(order => (
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
							<p className="noEvaluates">{areEvaluatesLoading ? "Загрузка заявок..." : "Заявок пока нет"}</p>

						)}
					</section>

				</>) : (
					<p className='profile-container__unathorized-message'>Для просмотра профиля необходимо войти в аккаунт</p>
				)}

			</Container >

			<EvaluationUserPopup isOpen={isEvaluationPopupOpen} setIsOpen={setIsEvaluationPopupOpen} evaluationData={selectedEvaluationData} />
			<Popup isOpen={isEditPopupOpen} setIsOpen={setIsEditPopupOpen} style={{ gap: 20, width: 600 }}>
				<div className={styles["popup__header"]}>
					<SectionTitle>Редактировать профиль</SectionTitle>
				</div>

				<div className={styles["popup__photo-section"]}>
					<img src="" alt="" className={styles["popup__photo"]} />

					<div className={styles["popup__personal-info"]}>
						<h3 className={styles["popup__name"]}>Алексей Кузнецов</h3>
						<span className={styles["popup__city"]}>Санкт-Петербург</span>
					</div>
				</div>

				<Form className={styles["popup__form"]} onSubmit={console.log}>
					<div className={styles["form__general"]}>
						<div className={styles["input-field"]}>
							<input
								required
								minLength={5}
								maxLength={80}
								type="text"
								name="name"
								id="name"
								className={styles["input-field__input"]}
								value={nameInputValue}
								onChange={handleNameInput}
								placeholder=" "
								autoComplete="nope"
							/>
							<label htmlFor="name" className={styles["input-field__label"]}>Имя</label>
							<span className={styles["input-field__error-message"]}></span>
						</div>

						<div className={styles["input-field"]}>
							<input
								minLength={5}
								maxLength={80}
								type="text"
								name="surname"
								id="surname"
								className={styles["input-field__input"]}
								value={surnameInputValue}
								onChange={handleSurnameInput}
								placeholder=" "
								autoComplete="nope"
							/>
							<label htmlFor="surname" className={styles["input-field__label"]}>Фамилия</label>
							<span className={styles["input-field__error-message"]}></span>
						</div>

						<div className={styles["input-field"]}>
							<input
								minLength={5}
								maxLength={80}
								type="text"
								name="lastname"
								id="lastname"
								className={styles["input-field__input"]}
								value={lastnameInputValue}
								onChange={handleLastnameInput}
								placeholder=" "
								autoComplete="nope"
							/>
							<label htmlFor="lastname" className={styles["input-field__label"]}>Отчество</label>
							<span className={styles["input-field__error-message"]}></span>
						</div>
					</div>

					<div className={styles["form__additional"]}>

					</div>
				</Form>
			</Popup>

		</>
	);
};

export default Profile;