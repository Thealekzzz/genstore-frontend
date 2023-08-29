import React from 'react';

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__container']}>
        <div className={styles['footer__left']}>
          <div className="footer__logo-wrapper">
            <h2 className={styles['footer__logo']}>Генстор</h2>
          </div>

          <div className={styles['footer__text']}>
            <p>ООО Генстор</p>
            <p className={styles['footer__text_small']}>ОГРН 1237800057461</p>
          </div>


        </div>

        <div className={styles['footer__right']}>
          <div className={styles['footer__column']}>
            <div className={styles['footer__column-title']}>Контакты</div>
            <ul className={styles['footer__links']}>
              {/* <li className={styles['footer__text'] + " " + styles['footer__link']}><a href="#">+7 800 555 35 35</a></li> */}
              <li className={styles['footer__text'] + " " + styles['footer__link']}><a href='mailto:genstore.spb@yandex.ru'>genstore.spb@gmail.com</a></li>
            </ul>
          </div>
          {/* <div className={styles['footer__column']}>
            <div className={styles['footer__column-title']}>Клиентам</div>
            <ul className={styles['footer__links']}>
              <li className={styles['footer__text'] + " " + styles['footer__link']}><a href="https://t.me/Vadim140100" target='_blank'>Обратная связь</a></li>
            </ul>
          </div> */}
        </div>

      </div>
    </footer>
  );
};

export default Footer;