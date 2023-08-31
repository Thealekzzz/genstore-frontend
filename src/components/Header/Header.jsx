import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from "./imgs/logo.svg";
import calcIcon from "./imgs/calc.svg";
import profileIcon from "./imgs/profile.svg";
import managerPageIcon from "./imgs/managerPage.svg";
import closeIcon from "./imgs/close.svg";

import styles from "./Header.module.css";
import burger from "./blocks/burger.module.css";

import Container from '../Container/Container';
import ButtonAccent from '../ButtonAccent/ButtonAccent';
import Button from '../Button/Button';

import AuthorizedContext from '../../contexts/AuthorizedContext';

import useWindowDimensions from '../../hooks/useWindowDimensions';

import { SERVER_PORT, SERVER_URL } from '../../config';

// styles = {...styles, ...burgerStyles};

const Header = ({ userData }) => {
	const isAuthorized = useContext(AuthorizedContext);

	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const { width } = useWindowDimensions();

	function handleBurgerClick() {
		setIsMobileNavOpen(!isMobileNavOpen);
	}

	return (
		<header className={styles.header}>
			<div className={styles['header__container']}>
				<Link to="/" className={styles['header__logo-wrapper']}>
					<img src={logo} className={styles['header__logo']} alt="Логотип, фото" />
					<span>Генстор</span>
				</Link>

				{width > 700
					? (
						<>
							<nav className={styles['header__links']}>
								<Link to="/" className={styles['header__link']}>Главная</Link>
								<Link to="/createrequest" className={styles['header__link']}>Расчет</Link>
								<Link to="/search" className={styles['header__link']}>Поиск</Link>
							</nav>

							<nav className={styles['header__icons']}>
								{isAuthorized && userData?.role === "manager" && <Link to="/evaluate"><img src={calcIcon} alt="Выполнить расчет, кнопка" /></Link>}
								{isAuthorized && userData?.role === "manager" && <Link to="/managerpage"><img src={managerPageIcon} alt="Аккаунт менеджера, кнопка" /></Link>}
								<Link to="/profile"><img src={profileIcon} alt="Профиль, кнопка" /></Link>
							</nav>
						</>

					) : (
						<div className={burger['burger']} onClick={handleBurgerClick}>
							<div className={burger['burger__dash']}>
							</div>

							<div className={burger['burger__mobile-nav'] + " " + (isMobileNavOpen ? "" : burger["burger__mobile-nav_hidden"])}>
								<div className={burger['mobile-nav__header']}>
									<span>
										Меню
									</span>

									<img src={closeIcon} alt="" className={burger['mobile-nav__close']} onClick={handleBurgerClick} />
								</div>

								<div className={burger['mobile-nav__content']}>
									<Link to="/" className={burger['mobile-nav__link']}>Главная</Link>
									<Link to="/createrequest" className={burger['mobile-nav__link']}>Расчет</Link>
									<Link to="/search" className={burger['mobile-nav__link']}>Поиск</Link>
									<Link to="/profile" className={burger['mobile-nav__link']}>Профиль</Link>
								</div>
							</div>
						</div>
					)}
			</div>

		</header>
	);
};

export default Header;