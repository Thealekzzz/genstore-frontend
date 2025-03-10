import { useState, useContext, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';

import StatusField from '../../components/StatusField/StatusField';

import AuthorizedContext from '../../contexts/AuthorizedContext';

import '../Login/Login.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { getCompanies } from '../../api/companies';
import { regions } from '../../consts';
import { register } from '../../api/auth';

const Registration = () => {
  const navigate = useNavigate();

  const [proccessStatus, setProccessStatus] = useState({ visible: false, message: '', status: '' });
  const [companies, setCompanies] = useState([]);

  const { values, handleChange, handleBlur, errors, isValid } = useFormAndValidation();
  const isAuthorized = useContext(AuthorizedContext);

  function submitLoginHandler(e) {
    e.preventDefault();

    if (!values.company || !values.region) {
      setProccessStatus({
        visible: true,
        message: 'Поля регион и хозяйство должны быть заполнены',
        status: 'Error',
      });
      return;
    }

    const fd = {
      name: values.name,
      surname: values.surname,
      company: values.company,
      region: values.region,
      login: values.email,
      password: values.password,
    };

    setProccessStatus({ visible: true, status: 'Loading', message: 'Регистрирую' });

    register(fd)
      .then((data) => {
        setProccessStatus({ visible: true, status: 'Success', message: data.message });
        setTimeout(() => {
          navigate('/login');
        }, 1000);

        return;
      })
      .catch((err) => {
        // setProccessStatus({visible: true, status: "Error", message: "Ошибка сервера"});
        setProccessStatus({ visible: true, status: 'Error', message: err.message });
        console.log('Ошибка при работе с сервером');
      });
  }

  useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data);
    });
  }, []);

  // useEffect(() => {
  //     console.log(values);
  // }, [values]);

  return (
    <>
      {isAuthorized && <Navigate to="/" />}

      <section className="login-container ">
        <h1 className="login-container__title">Регистрация</h1>
        <form action="/registration" method="post" className="login-container__form" onSubmit={submitLoginHandler}>
          <div className="login-container__name-fields">
            <input
              required
              minLength={3}
              value={values.name || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              type="text"
              placeholder="Имя"
              name="name"
              className={`login-container__form-input form-input ${errors.name ? 'form-input__error' : ''}`}
            />
            <input
              required
              minLength={2}
              value={values.surname || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              type="text"
              placeholder="Фамилия"
              name="surname"
              className={`login-container__form-input form-input ${errors.surname ? 'form-input__error' : ''}`}
            />
          </div>
          <input
            required
            minLength={3}
            value={values.email || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            type="email"
            placeholder="Почта"
            name="email"
            className={`login-container__form-input form-input ${errors.email ? 'form-input__error' : ''}`}
          />
          <select
            required
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.company || '-'}
            autoComplete="new-password"
            name="company"
            className={`login-container__form-input form-input ${errors.company ? 'form-input__error' : ''}`}
          >
            <option disabled hidden value="-">
              Хозяйство
            </option>
            {companies.map((company) => (
              <option key={company.companyId} value={company.companyId}>
                {company.name}
              </option>
            ))}
          </select>
          <select
            required
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.region || '-'}
            autoComplete="new-password"
            name="region"
            className={`login-container__form-input form-input ${errors.region ? 'form-input__error' : ''}`}
          >
            <option disabled hidden value="-">
              Регион
            </option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <input
            required
            minLength={8}
            value={values.password || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="new-password"
            type="password"
            placeholder="Пароль"
            name="password"
            className={`login-container__form-input form-input ${errors.password ? 'form-input__error' : ''}`}
          />
          <StatusField status={proccessStatus} />
          <button type="submit" disabled={!isValid} className="login-container__form-submit form-button">
            Регистрация
          </button>
          <div className="login-container__errors-field login-container__errors-field_hidden"></div>
        </form>
      </section>
      <p className="action-text">
        Уже есть аккаунт? <Link to="/login">Войти →</Link>
      </p>
    </>
  );
};

export default Registration;
