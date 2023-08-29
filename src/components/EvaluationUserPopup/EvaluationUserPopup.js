import React, { useState } from 'react';
import Popup from '../Popup/Popup';

import getPrettyDateTime from '../../utils/getPrettyDateTime';

import styles from "./EvaluationUserPopup.module.css";
import lockedIcon from "../../imgs/locked.svg";
import questionIcon from "../../imgs/question.svg";
import catImage from "./imgs/cat.png";
import dogImage from "./imgs/dog.png";

import InfoPopup from '../InfoPopup/InfoPopup';
import ExpandableContent from '../ExpandableContent/ExpandableContent';

const EvaluationUserPopup = (props) => {
  // Попапы
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [isPaymentInfoPopupOpen, setIsPaymentInfoPopupOpen] = useState(false);
  const [isEvaluatedStatusPopupOpen, setIsEvaluatedStatusPopupOpen] = useState(false);

  // Секции


  const statusInfoVariants = [
    "Эта заявка еще не обработана. Оплата будет возможна после того, как менеджеры произведут расчет по отправленным данным",
    "Менеджеры уже обработали эту заявку, ниже доступны варианты оплаты",
    "Менеджеры обработали эту заявку, оплата произведена",
  ];


  return (
    <Popup isOpen={props.isOpen} setIsOpen={props.setIsOpen} style={{ width: 800 }}>
      <h2 className={styles.title}>{props.evaluationData.evaluationName}</h2>

      <ul className={styles.content}>
        <li className={styles.section}>
          <h3 className={styles.sectionName}>Общая информация</h3>

          <p className={styles.sectionItem}>
            <span className={styles.itemName}>Название файла</span>
            <span className={styles.itemValue}>
              {props.evaluationData.filename}
            </span>

          </p>
          <p className={styles.sectionItem}>
            <span className={styles.itemName}>Дата создания</span>
            <span className={styles.itemValue}>
              {getPrettyDateTime(props.evaluationData.createdAt)}
            </span>

          </p>

          <p className={styles.sectionItem}>
            <span className={styles.itemName}>Комменатрий</span>
            <span className={styles.itemValue}>
              {props.evaluationData.userComment || "Не указан"}
            </span>

          </p>

          <h3 className={styles.sectionName} style={{ marginTop: 20 }}>Статус</h3>

          <div className={styles.statusList}>
            <p
              className={styles.statusItem}
              style={{
                backgroundColor: props.evaluationData.isPaid ? "seagreen" : "#f26025"
              }}
            >
              {props.evaluationData.isPaid ? "Заявка оплачена" : "Заявка не оплачена"}
            </p>
            <p
              className={styles.statusItem}
              style={{
                backgroundColor: props.evaluationData.isEvaluated ? "seagreen" : "#f26025"
              }}
            >
              {props.evaluationData.isEvaluated ? "Расчет выполнен" : "Расчет не выполнен"}

            </p>
            <img
              src={questionIcon}
              className={styles.questionIcon}
              alt=""
              onClick={() => setIsStatusPopupOpen(!isStatusPopupOpen)}
            />
            <InfoPopup
              isOpen={isStatusPopupOpen}
              title="Статус заявки"
              message={statusInfoVariants[props.evaluationData.isEvaluated + props.evaluationData.isPaid]}
              style={{ top: 190, left: 320 }}
            />

          </div>


        </li>

        <li>
          <ExpandableContent
            style={{
              width: "100%",
              backgroundColor: "#ECF2FA"
            }}
            isExpandable={!["created", "pending"].includes(props.evaluationData.status)}
            titleItem={(
              <>
                <h3 className={styles.sectionName}>
                  Оплата
                </h3>
                {["created", "pending"].includes(props.evaluationData.status) && (
                  <>
                    <img src={lockedIcon} alt="" />
                    <img
                      src={questionIcon}
                      className={styles.questionIcon}
                      alt=""
                      onClick={(evt) => {evt.stopPropagation(); setIsPaymentInfoPopupOpen(prev => !prev)}}
                    />

                    <InfoPopup
                      isOpen={isPaymentInfoPopupOpen}
                      title="Оплата"
                      message="Оплата заявки станет доступна после того, как менеджеры произведут расчет по отправленным данным"
                      style={{ top: 256, left: 160 }}
                    />
                  </>
                )}
              </>
            )}
          >
            <div className={styles.ExtendableInner}>
              <div className={styles.ExtendableInnerWrapper}>
                <img src={catImage} width={200} alt="" />
                <p className={styles.ExtendableInnerText}>
                  Скоро мы настроим возможность оплаты проведенных вычислений, а&nbsp;пока что здесь живет этот шикарный котик 😺
                </p>
              </div>
            </div>
          </ExpandableContent>
        </li>

        <li>
          <ExpandableContent
            style={{
              width: "100%",
              backgroundColor: "#ECF2FA"
            }}
            isExpandable={!["created", "pending", "awaiting payment"].includes(props.evaluationData.status)}
            titleItem={(
              <>
                <h3 className={styles.sectionName}>
                  Результат
                </h3>
                {["created", "pending", "awaiting payment"].includes(props.evaluationData.status) && (
                  <>
                    <img src={lockedIcon} alt="" />
                    <img
                      src={questionIcon}
                      className={styles.questionIcon}
                      alt=""
                      onClick={(evt) => {evt.stopPropagation(); setIsEvaluatedStatusPopupOpen(prev => !prev)}}
                    />

                    <InfoPopup
                      isOpen={isEvaluatedStatusPopupOpen}
                      title="Результаты расчета"
                      message="После оплаты расчета в этом разделе можно будет скачать итоговый файл с данными"
                      style={{ top: 256, left: 160 }}
                    />
                  </>
                )}
              </>
            )}
          >
            <div className={styles.ExtendableInner}>
              <div className={styles.ExtendableInnerWrapper}>
                <img src={dogImage} width={200} alt="" />
                <p className={styles.ExtendableInnerText}>
                  А сюда мы пока что поселили пёсика. Но скоро здесь можно будет скачать итоговый файл расчета
                </p>
              </div>
            </div>
          </ExpandableContent>
        </li>


      </ul>
    </Popup>
  );
};

export default EvaluationUserPopup;