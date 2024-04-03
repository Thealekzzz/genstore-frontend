import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ButtonAccent from '../../components/ButtonAccent/ButtonAccent';

import { SERVER_URL, SERVER_PORT } from '../../config';

import arrowImage from "./imgs/arrow.svg";
import timeIcon from "./imgs/time.jpg";
import moneyIcon from "./imgs/money.jpg";
import jobIcon from "./imgs/job.jpg";

import tableIcon from "./imgs/conceptImages/table.svg";
import requestIcon from "./imgs/conceptImages/request.svg";
import processIcon from "./imgs/conceptImages/process.svg";
import paymentIcon from "./imgs/conceptImages/payment.svg";
import doneIcon from "./imgs/conceptImages/done.svg";


import AuthorizedContext from '../../contexts/AuthorizedContext';

import useWindowDimention from "../../hooks/useWindowDimensions.js";

import styles from "./Main.module.css";
import "./Main.css";
import Footer from '../../components/Footer/Footer.jsx';

const Main = (props) => {
	const actionTexts = [
		"Улучшите показатели стада",
		"Уменьшите затраты на прогнозирование",
		"Актуализируйте генетику стада",
	];

	const stepsData = [
		{
			image: tableIcon,
			title: "Подготовка данных",
			childrens: (
				<>
					<p className={styles['concept__scheme-popup-text']}>Для расчета необходим файл с данными о трех поколениях предков</p>
					<a href='/assets/files/Пример файла для расчета.xlsx' download={true} className={styles['concept__scheme-popup-link']}>Скачать пример файла</a>
				</>
			)
		},
		{
			image: requestIcon,
			title: "Создание заявки",
			childrens: (
					<p className={styles['concept__scheme-popup-text']}>Создайте и настройте заявку на проведение расчета <Link className={styles['concept__scheme-popup-link']} to="/createrequest">на этой странице</Link></p>
			)
		},
		{
			image: processIcon,
			title: "Выполнение расчета",
			childrens: (
					<p className={styles['concept__scheme-popup-text']}>Наши менеджеры подготовят систему и выполнят расчет</p>
			)
		},
		{
			image: paymentIcon,
			title: "Оплата расчета",
			childrens: (
					<p className={styles['concept__scheme-popup-text']}>После успешного выполнения расчета откроется возможность его оплаты</p>
			)
		},
		{
			image: doneIcon,
			title: "Открытие доступа к результатам",
			childrens: (
					<p className={styles['concept__scheme-popup-text']}>После оплаты на почту будет отправлен результирующий файл с расчитанными показателями</p>
			)
		},
	]

	const isAuthorized = useContext(AuthorizedContext);

	const [activeActionTextNumber, setActiveActionTextNumber] = useState(0);

	const actionTitleRef = useRef();

	const {width} = useWindowDimention();

	useEffect(() => {
		const id = setInterval(() => {
			actionTitleRef.current.style.opacity = 0;

			setTimeout(() => {
				setActiveActionTextNumber(prev => (++prev % actionTexts.length));
				actionTitleRef.current.style.opacity = 1;
			}, 1000);


		}, 5000);

		return () => {
			clearInterval(id);
		}


	}, []);



	return (
		<>
			<div className={styles['main']}>
				<div className={styles['main__lead']}>
					<div className={styles['lead__container']}>

						<div className={styles['lead__title-wrapper']}>
							<h1 className={styles["lead__title"]}>Генстор</h1>
							<p className={styles['lead__subtitle']}>Прогнозирование племенной ценности крупного рогатого скота на основе математических моделей</p>
						</div>
						
						<div className={styles['lead__bottom']}>
							<h1 className={styles["lead__bottom-title"]} ref={actionTitleRef}>{actionTexts[activeActionTextNumber]}</h1>
							<p className={styles['lead__bottom-subtitle']}>используя мощность облачных вычислений</p>
							<Link to="/createrequest" className={styles['button'] + " " + styles["lead__bottom-button"]}>Отправить заявку</Link>
						</div>
						
						<img src={arrowImage} className={styles['lead__arrow']} alt="Стрелка вниз, картинка" />
					</div>

				</div>

				<div className={styles['main__benefits'] + " " + styles["section"]}>
					<h2 className={styles['section__title'] + " " + styles['section__title_center']}>Почему мы?</h2>

					<ul className={styles['benefits__cards']}>
						<li className={styles['benefits__card']}>
							<img src={timeIcon} className={styles['benefits__card-image']} alt="Часы, картинка" />
							<h3 className={styles['benefits__card-title']}>Скорость и точность вычислений</h3>
							<p className={styles['benefits__card-text']}>Система быстро находит информацию о ваших быках и моментально производит расчет показателей у потомства</p>
						</li>

						<li className={styles['benefits__card']}>
							<img src={moneyIcon} className={styles['benefits__card-image']} alt="Часы, картинка" />
							<h3 className={styles['benefits__card-title']}>Экономия затрат на персонал</h3>
							<p className={styles['benefits__card-text']}>Пока человек сделает один расчет племенной ценности — наша система успеет сделать десятки таких расчетов</p>
						</li>

						<li className={styles['benefits__card']}>
							<img src={jobIcon} className={styles['benefits__card-image']} alt="Часы, картинка" />
							<h3 className={styles['benefits__card-title']}>Персональный подход</h3>
							<p className={styles['benefits__card-text']}>По результатам проведенного расчета мы даём персональные рекомендации по развитию стада</p>
						</li>
					</ul>

				</div>

				<div className="main__services block">
					<div className="page__container block__head">
						<h2 className="block__title block__title_center main__services-title">Что мы умеем?</h2>
					</div>

					<ul className="page__container main__services-list">
						<li className="main__services-item">
							<h3 className="main__services-item-title"><span className="highlighted">Прогнозирование</span>племенной ценности потомства</h3>
							<p className="main__services-item-text">Мы&nbsp;умеем прогнозировать племенную ценность потомства в&nbsp;стаде с&nbsp;использованием математических моделей</p>
						</li>
						<li className="main__services-item">
							<h3 className="main__services-item-title"><span className="highlighted">Аудит</span>генетики стада</h3>
							<p className="main__services-item-text">Мы&nbsp;можем выполнять поиск и&nbsp;ранжирование быков в&nbsp;стаде по&nbsp;племенной ценности актуальной геномной оценки</p>
						</li>
					</ul>

					<div className="page__container main__services-foooter">
						<ButtonAccent href="/createrequest" style={{ marginTop: 40 }}>Создать заявку</ButtonAccent>
					</div>

				</div>

				<div className={styles['main__team'] + " " + styles["section"]}>
					<div className={styles['team__container']}>
						<h2 className={styles['section__title']}>Команда</h2>
						<p className={styles['section__subtitle'] + " " + styles['team__subtitle']}>Проект разработан специалистами из областей сельскохозяйственной генетики и разработки вычислительных облачных сервисов</p>

						<ul className={styles['team__members']}>
							<li className={styles['team__member']}>
								<img src="https://sun9-1.userapi.com/impg/F6zxiX21uvKBE49MiLU3hfZN4AhS9BvvzCZF3A/6lx_ueqaP-k.jpg?size=960x1280&quality=96&sign=d2ca6e0438697afdfba74e30113b02b8&type=album" className={styles['team__member-image']} alt="Фото представителя команды" />
								<div>
									<h3 className={styles['team__member-name']}>Олонцев Вадим Акимович</h3>
									<p className={styles['team__member-text']}>Специалист по племенной работе</p>

								</div>
							</li>
							
							<li className={styles['team__member']}>
								<img src="https://sun9-43.userapi.com/impg/hjHDCtiz252auBYaPuJOqIH7Jv5gH3viG_vpdw/_IfKIStIVes.jpg?size=960x1280&quality=95&sign=468aad0ec23325aeb0087122cb78c7c5&type=album" className={styles['team__member-image']} alt="Фото представителя команды" />
								<div>
									<h3 className={styles['team__member-name']}>Кузнецов Алексей Васильевич</h3>
									<p className={styles['team__member-text']}>Специалист по разработке веб-приложений</p>

								</div>
							</li>
						</ul>
					</div>
				</div>

				<div id='concept' className={styles['main__concept'] + " " + styles["section"]}>
					<h2 className={styles['section__title'] + " " + styles['section__title_center']}>Как это работает?</h2>

					<ul className={styles['concept__scheme']}>
						{stepsData.map((step, index) => (
							<li key={index} className={styles['concept__scheme-item']} data-number={index + 1}>
								<img src={step.image} alt="" />
								<div className={styles['concept__scheme-popup']}>
									<h3 className={styles['concept__scheme-popup-title']}>{step.title}</h3>
									{step.childrens}
								</div>
							</li>	

						))}
						{/* <div className={styles['concept__scheme-dash']}></div> */}
					</ul>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Main;