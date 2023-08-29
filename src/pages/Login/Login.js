import React, { useState, useContext } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';

import StatusField from '../../components/StatusField/StatusField';

import AuthorizedContext from '../../contexts/AuthorizedContext';

import { SERVER_PORT, SERVER_URL, SITE_PORT, SITE_URL } from '../../data/data';

import "./Login.css"

const Login = ({ setUserData, setIsAuthorized, ...props }) => {
    const navigate = useNavigate();
    const [loginInputValue, setLoginInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");

    const [proccessStatus, setProccessStatus] = useState({ visible: false, message: "", status: "" });

    const isAuthorized = useContext(AuthorizedContext);

    function handleInputChange(e, setter) {
        setter(e.target.value);
    }

    function submitLoginHandler(e) {
        e.preventDefault();

        if (loginInputValue.trim() === "" || passwordInputValue.trim() === "") {
            setProccessStatus({ visible: true, status: "Error", message: "Данные не введены" });
            return;
        }

        const fd = {
            login: loginInputValue,
            password: passwordInputValue,
        };

        setProccessStatus({ visible: true, status: "Loading", message: "Выполняю вход" });

        fetch(`${SERVER_URL}:${SERVER_PORT}/api/login`, {
            method: "POST",
            body: JSON.stringify(fd),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((data) => data.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    
                    setProccessStatus({ visible: true, status: "Success", message: data.message });
                    setUserData(data.user);
                    setIsAuthorized(true);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);

                    return;

                } else {
                    throw new Error(data.message);
                }
            })
            .catch((err) => {
                setProccessStatus({ visible: true, status: "Error", message: err.message });
                console.log("Ошибка при работе с сервером");
            });
    }

    return (
        <>
            {isAuthorized && <Navigate to="/" />}

            <section className="login-container">
                <h1 className="login-container__title">Вход</h1>
                <form action="/login" method="post" className="login-container__form">

                    <input required
                        value={loginInputValue}
                        onChange={(e) => handleInputChange(e, setLoginInputValue)}
                        type="email"
                        placeholder="Электронная почта"
                        name="email"
                        className="login-container__form-input form-input"
                    />
                    <input required
                        value={passwordInputValue}
                        onChange={(e) => handleInputChange(e, setPasswordInputValue)}
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        className="login-container__form-input form-input"
                    />

                    <StatusField status={proccessStatus} />
                    <button type="submit" disabled={["Loading", "Success"].includes(proccessStatus.status)} className="login-section__form-submit form-button" onClick={submitLoginHandler}>Войти</button>
                    <div className="login-container__errors-field login-container__errors-field_hidden"></div>

                </form>


            </section>
            <p className="action-text">Еще нет аккаунта? <Link to="/registration">Зарегистрироваться →</Link></p>
        </>
    );
};

export default Login;