import React, { useContext, useEffect, useState } from 'react';

import styles from "./EvaluationPopup.module.css";

import Popup from '../Popup/Popup';
import ButtonAccent from '../ButtonAccent/ButtonAccent';
import Button from '../Button/Button';

import getPrettyDateTime from '../../utils/getPrettyDateTime';
import { SERVER_PORT, SERVER_URL, SITE_PORT, SITE_URL } from '../../data/data';
import downloadFile from '../../utils/downloadFile.js';

import TokenContext from '../../contexts/TokenContext';

const EvaluationPopup = ({ evaluationData, onEvaluationDataSave, isOpen, setIsOpen, onDeleteEvaluation }) => {
	const token = useContext(TokenContext);

	const [isPaid, setIsPaid] = useState(evaluationData.isPaid);
	const [isEvaluated, setIsEvaluated] = useState(evaluationData.isEvaluated);
	const [status, setStatus] = useState(evaluationData.status);
	const [isDataChanged, setIsDataChanged] = useState(false);

    function handleIsPaidClick() {
        setIsPaid(prev => !prev);
        !isDataChanged && setIsDataChanged(true);
    }
    
    function handleIsEvaluatedClick() {
        setIsEvaluated(prev => !prev);
        !isDataChanged && setIsDataChanged(true);
    }

	function handleStatusItemClick(evt) {
		setStatus(evt.target.getAttribute("data-value"));
		!isDataChanged && setIsDataChanged(true);
	}

	function handleDownloadButtonClick() {
		const urlToFile = `${SERVER_URL}:${SERVER_PORT}/uploadedFile/${evaluationData.savedFilename}`;
		// console.log(urlToFile);
		downloadFile(urlToFile, evaluationData.filename);
	}

	function handleDeleteButtonClick() {
		fetch(`${SERVER_URL}:${SERVER_PORT}/api/api/v1/evaluations?evaluationId=${evaluationData.evaluationId}`, {
			method: 'DELETE',
			headers: {
				authorization: token ? "Bearer " + token : null,
			},
		})
			.then(res => res.json())
			.then((response) => {
				onDeleteEvaluation(evaluationData.evaluationId);
			})
			.catch((error) => {
				console.error("Ошибка при удалении заявки");
			});
	}

    function handleSaveButtonClick() {
        const evaluationData = {
            isPaid,
            isEvaluated,
            status,
        }

        console.log(evaluationData);

		fetch(`${SERVER_URL}:${SERVER_PORT}/api/api/v1/evaluations/${evaluationData.evaluationId}`, {
			method: "PATCH",
			body: JSON.stringify(evaluationData),
			headers: {
				authorization: token ? "Bearer " + token : null,
				'Content-type': 'application/json; charset=UTF-8',
			}
		})
			.then(res => res.json())
			.then((data) => {
				console.log(data);

				onEvaluationDataSave({
					id: evaluationData.evaluationId,
					isPaid,
					isEvaluated,
					status,
				});

            // setIsPaid(props.evaluationData.isPaid);
            // setIsEvaluated(props.evaluationData.isEvaluated);
            // setStatus(props.evaluationData.status);
        })
        .catch(console.log)
        .finally(() => {
            setIsDataChanged(false);
        });


	}

	// Обновляю значения input в попапе при его открытии
	useEffect(() => {
		if (isOpen) {
			setIsPaid(evaluationData.isPaid);
			setIsEvaluated(evaluationData.isEvaluated);
			setStatus(evaluationData.status);

		}

		setIsDataChanged(false);

	}, [isOpen, evaluationData])




	return (
		<Popup isOpen={isOpen} setIsOpen={setIsOpen} style={{ minWidth: 1000, minHeight: 400 }}>
			<h2 className={styles.title}>{evaluationData.evaluationName}</h2>

			<ul className={styles.content}>
				<li className={styles.section}>
					<h3 className={styles.sectionName}>Файл</h3>

					<p className={styles.sectionItem}>
						<span className={styles.itemName}>Оригинал</span>
						<span className={styles.itemValue}>
							{evaluationData.filename}
						</span>

					</p>
					<p className={styles.sectionItem}>
						<span className={styles.itemName}>На сервере</span>
						<span className={styles.itemValue}>
							{evaluationData.savedFilename}
						</span>

					</p>
					<p className={styles.sectionItem}>
						<span className={styles.itemName}>Отправлен</span>
						<span className={styles.itemValue}>
							{getPrettyDateTime(evaluationData.createdAt)}
						</span>

					</p>
					<p className={styles.sectionItem}>
						<span className={styles.itemName}>Комментарий</span>
						<span className={styles.itemValue}>
							{evaluationData.userComment || "-"}
						</span>

					</p>

				</li>

				<li className={styles.section}>
					<h3 className={styles.sectionName}>Автор</h3>

					<p className={styles.sectionItem}>
						<span className={styles.itemName}>Имя</span>
						<span className={styles.itemValue}>
							{evaluationData.name}
						</span>

					</p>
					<p className={styles.sectionItem}>
						<span className={styles.itemName}>Email</span>
						<span className={styles.itemValue}>
							{evaluationData.login}
						</span>

					</p>

				</li>

				<li className={styles.section} style={{ backgroundColor: "white" }}>
					{/* <h3 className={styles.sectionName}>Автор</h3> */}

					<div className={styles.sectionItem}>
						<span className={styles.itemName} style={{
							color: "black",
							fontWeight: 500,
							width: "fit-content",
							marginRight: 20
						}}>Оплачен</span>
						<input checked={isPaid || false} onChange={handleIsPaidClick} type="checkbox" name="isPaid" id="isPaid" />

					</div>
					<div className={styles.sectionItem}>
						<span className={styles.itemName} style={{
							color: "black",
							fontWeight: 500,
							width: "fit-content",
							marginRight: 20
						}}>Расчет выполнен</span>
						<input checked={isEvaluated || false} onChange={handleIsEvaluatedClick} type="checkbox" name="isEvaluated" id="isEvaluated" />

					</div>
					<div className={styles.sectionItem}>
						<span className={styles.itemName} style={{
							color: "black",
							fontWeight: 500,
							width: "fit-content",
							marginRight: 20
						}}>Статус</span>
						<ul className={styles.statusWrapper}>
							<li
								onClick={handleStatusItemClick}
								data-value="created"
								className={[styles.statusItem, (status === "created") && styles.statusItemActive].join(" ")}
							>Создан</li>
							<li
								onClick={handleStatusItemClick}
								data-value="pending"
								className={[styles.statusItem, (status === "pending") && styles.statusItemActive].join(" ")}
							>В работе</li>
							<li
								onClick={handleStatusItemClick}
								data-value="awaiting payment"
								className={[styles.statusItem, (status === "awaiting payment") && styles.statusItemActive].join(" ")}
							>Ожидает оплаты</li>
							<li
								onClick={handleStatusItemClick}
								data-value="done"
								className={[styles.statusItem, (status === "done") && styles.statusItemActive].join(" ")}
							>Выполнен</li>
						</ul>

					</div>

				</li>
			</ul>

			<div className={styles.bottom}>
				<Button onClick={handleDeleteButtonClick}>Удалить заявку</Button>
				<Button onClick={handleSaveButtonClick} buttonDisabled={!isDataChanged}>Сохранить</Button>
				<Button onClick={handleDownloadButtonClick}>Скачать исходный файл</Button>
				<ButtonAccent buttonDisabled={isDataChanged} href={`${SITE_URL}:${SITE_PORT}/evaluate?evaluateId=${evaluationData.evaluationId}`}>Выполнить расчет</ButtonAccent>
			</div>
		</Popup>

	);
};

export default EvaluationPopup;