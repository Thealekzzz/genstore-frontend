import React from 'react';

import Container from '../../components/Container/Container';

import styles from "./PageNotFound.module.css";

import cow from "../../imgs/cow.svg";

const PageNotFound = () => {
  return (
    <Container justifyContent="center" direction="column">
      <div className={styles.imageWrapper}>
        <img src={cow} alt="" className={styles.image} />
        <span className={styles.errorNumber}>404</span>
      </div>

      <p className={styles.errorText}>Ой... Такой страницы у нас точно нет.</p>
    </Container>
  );
};

export default PageNotFound;