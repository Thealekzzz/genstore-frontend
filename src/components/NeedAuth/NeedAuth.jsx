import React from 'react';
import { Link } from 'react-router-dom';

import './NeedAuth.css';

const NeedAuth = () => {
  return (
    <div className="block">
      <div className="page__container">
        <div className="need-auth section">
          <p className="section__text">Для просмотра этой страницы надо войти в свой аккаунт</p>

          <Link to="/login" className="button">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NeedAuth;
