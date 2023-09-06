import React from 'react';

import styles from "./HowItWorks.module.css";

import devPhoto from "../../imgs/developer.png";
import Container from '../../components/Container/Container';
import ButtonAccent from '../../components/ButtonAccent/ButtonAccent';

const HowItWorks = (props) => {
    return (
        <Container justifyContent="center" style={{marginTop: 50, gap: 60, alignItems: "center"}}>
            <img src={devPhoto} alt="" width={500} />

            <div className={styles.leadTitleWrapper}>
                <h1 className={styles.leadSectionTitle}>Страница в разработке</h1>
                <p className={styles.leadSectionSubtitle}>Разработчик уже трудится над созданием этой страницы.</p>

                <div className={styles.leadButtons}>
                    <ButtonAccent href="/">На главную</ButtonAccent>

                </div>

            </div>

        </Container>
    );
};

export default HowItWorks;