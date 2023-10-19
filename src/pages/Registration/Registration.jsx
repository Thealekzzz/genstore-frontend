import React, { useState, useContext } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';

import StatusField from '../../components/StatusField/StatusField';

import AuthorizedContext from '../../contexts/AuthorizedContext';

import { SERVER_PORT, SERVER_URL } from '../../config';

import "../Login/Login.css"

const Registration = (props) => {
    const navigate = useNavigate();

    const [nameInputValue, setNameInputValue] = useState("");
    const [loginInputValue, setLoginInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");

    const [proccessStatus, setProccessStatus] = useState({ visible: false, message: "", status: "" });

    const isAuthorized = useContext(AuthorizedContext);

    function handleInputChange(e, setter) {
        setter(e.target.value);
    }

    // function updateButtonState() {
    //     setIsButtonDisabled(loginInputValue.length <= 5 && passwordInputValue.length < 8 ? true : false);
    // }

    function submitLoginHandler(e) {
        e.preventDefault();

        if (nameInputValue.trim() === "" || loginInputValue.trim() === "" || passwordInputValue.trim() === "") {
            console.log("Данные не введены");
            setProccessStatus({ visible: true, status: "Error", message: "Данные не введены" });
            return;
        }

        const fd = {
            name: nameInputValue,
            login: loginInputValue,
            password: passwordInputValue,
        };

        setProccessStatus({ visible: true, status: "Loading", message: "Регистрирую" });

        fetch(`${SERVER_URL}:${SERVER_PORT}/api/register`, {
            method: "POST",
            body: JSON.stringify(fd),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(data => data.json())
            .then(data => {
                setProccessStatus({ visible: true, status: "Success", message: data.message });
                setTimeout(() => {
                    navigate("/login");
                }, 1000);

                return;

            })
            .catch(err => {
                // setProccessStatus({visible: true, status: "Error", message: "Ошибка сервера"});
                setProccessStatus({ visible: true, status: "Error", message: err.message });
                console.log("Ошибка при работе с сервером");
            });
    }

    return (
        <>
            {isAuthorized && <Navigate to="/" />}

            <section className="login-container ">
                <h1 className="login-container__title">Регистрация</h1>
                <form action="/registration" method="post" className="login-container__form" onSubmit={submitLoginHandler}>
                    <input
                        required
                        value={nameInputValue}
                        onChange={e => handleInputChange(e, setNameInputValue)}
                        autoComplete="new-password"
                        type="text"
                        placeholder="Ваше имя"
                        name="name"
                        className="login-container__form-input form-input" />
                    <input
                        required
                        value={loginInputValue}
                        onChange={e => handleInputChange(e, setLoginInputValue)}
                        autoComplete="new-password"
                        type="email"
                        placeholder="Электронная почта"
                        name="email"
                        className="login-container__form-input form-input" />
                    <input
                        required
                        value={passwordInputValue}
                        onChange={e => handleInputChange(e, setPasswordInputValue)}
                        autoComplete="new-password"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        className="login-container__form-input form-input" />
                    {/* <input type="password" placeholder="Повторение пароля" name="passwordAgain" className="login-container__form-input form-input"> */}

                    <StatusField status={proccessStatus} />
                    <button type="submit" disabled={["Loading", "Success"].includes(proccessStatus.status)} className="login-container__form-submit form-button">Регистрация</button>
                    <div className="login-container__errors-field login-container__errors-field_hidden"></div>

                </form>


            </section>
            <p className="action-text">Уже есть аккаунт? <Link to="/login">Войти →</Link></p>

        </>
    );
};

export default Registration;