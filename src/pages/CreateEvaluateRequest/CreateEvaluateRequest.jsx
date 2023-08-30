import React, { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

import PageHeading from '../../ui/PageHeading/PageHeading';
import SectionHeading from '../../ui/SectionHeading/SectionHeading';

import infoIcon_blue from "../../imgs/info_blue.svg";
import questionIcon from "../../imgs/question.svg";

import { SERVER_PORT, SERVER_URL } from '../../data/data';

import capitalize from '../../utils/capitalize';
import InfoPopup from '../../ui/InfoPopup/InfoPopup';
import ButtonWithStatus from '../../components/ButtonWithStatus/ButtonWithStatus';
import Form from '../../components/Form/Form';
import Container from '../../components/Container/Container';
import ButtonFile from '../../components/ButtonFile/ButtonFile';

import styles from "./CreateEvaluateRequest.module.css";

import TokenContext from '../../contexts/TokenContext';
import AuthorizedContext from '../../contexts/AuthorizedContext';

import WhiteContainer from '../../components/WhiteContainer/WhiteContainer';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const CreateEvaluateRequest = () => {
	const token = useContext(TokenContext);

	const fileInput = React.useRef();
	const filenameInfoPopup = React.useRef();

	const { width } = useWindowDimensions();

	// const [sectionTitleInfoPopupVisible, setSectionTitleInfoPopupVisible] = React.useState(false);
	const [filenameInfoPopupVisible, setFilenameInfoPopupVisible] = useState(false);

	const [isFileChosen, setIsFileChosen] = useState(false);
	const [chosenFilename, setChosenFilename] = useState("");
	const [fileId, setFileId] = useState(null);
	const [evaluationNameInputValue, setEvaluationNameInputValue] = useState("");
	const [commentInputValue, setCommentInputValue] = useState("");

	const [submittingStatus, setSubmittingStatus] = useState({ visible: false, status: "", message: "" });

	const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

	const isAuthorized = useContext(AuthorizedContext);

	function updateSubmitButtonState(filesNumber, inputValue) {
		setIsSubmitButtonDisabled(filesNumber === 0 || inputValue.length < 5);
	}

	function handleSelectFileButtonClick() {
		fileInput.current.click();
	}

	function handleFileInputChange(e) {
		if (e.target.files && e.target.files.length > 0) {
			const fd = new FormData();

			setIsFileChosen(true);
			setChosenFilename(e.target.files[0].name);

			fd.append('file', e.target.files[0]);

			fetch(`${SERVER_URL}:${SERVER_PORT}/api/files`, {
				method: 'POST',
				body: fd,
				headers: {
					authorization: token ? "Bearer " + token : null,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res.fileId);
					setFileId(res.fileId);	
				})
				.catch((err) => {
					console.log(err);
				});


			// Если инпут с названием расчета пустой - пишу туда имя файла 
			if (!evaluationNameInputValue) {
				setEvaluationNameInputValue(capitalize(e.target.files[0].name.split(".")[0]));
				setIsSubmitButtonDisabled(false);
			}
		} else {
			setIsFileChosen(false);

		}
	}

	function handleTextInput(e) {
		setEvaluationNameInputValue(e.target.value);
		updateSubmitButtonState(isFileChosen, e.target.value);

	}

	function handleCommentInput(evt) {
		setCommentInputValue(evt.target.value);
	}

	// function handleSectionTitleInfoButtonClick() {
	// 	setSectionTitleInfoPopupVisible((prev) => !prev);
	// }

	function handleFilenameInfoButtonClick() {
		setFilenameInfoPopupVisible((prev) => !prev);
	}

	function handleFormSubmit(form) {
		setIsSubmitButtonDisabled(true);
		setSubmittingStatus({ message: "Сохранение заявки", status: "Loading", visible: true });

		console.log(fileId);

		if (!fileId) {
			setSubmittingStatus({ message: "Не добавлен файл", status: "Error", visible: true });
			setIsSubmitButtonDisabled(false);
			return;
		}


		const { file, ...fields } = form;
		fields.fileId = fileId;

		console.log(fields)

		fetch(`${SERVER_URL}:${SERVER_PORT}/api/orders`, {
			method: "POST",
			body: JSON.stringify(fields),
			headers: {
				authorization: token ? "Bearer " + token : null,
				'Content-Type': 'application/json',
			}
		})
			.then(data => data.json())
			.then(res => {
				console.log(res);
				setTimeout(() => {
					setSubmittingStatus({ message: "Заявка сохранена", status: "Success", visible: true });

				}, 200);

				setTimeout(() => {
					window.location.href = "/";
				}, 1500);

			})
			.catch((err) => {
				setSubmittingStatus({ message: err.message, status: "Error", visible: true });

			})
	}

	return (
		<>
			{!isAuthorized && <Navigate to="/" />}

			<Container style={{ marginTop: 50, maxWidth: 700 }} direction="column">
				<PageHeading>Создать заявку</PageHeading>

				<div className={styles["create-request__content"]}>
					<WhiteContainer extClass={styles["create-request__info"]}>
						<img src={infoIcon_blue} alt="Информация, иконка." />

						<div className={styles["create-request__info-texts"]}>
							<p className={styles["create-request__info-text"]}>Для проведения расчета показателей потомства необходимо <b>загрузить файл с данными о предках</b> потомства. </p>
							<p className={styles["create-request__info-text"]}>Оплату расчета можно будет произвести после проведения расчета. </p>
							<Link to={"/calculator"} className={[styles["create-request__info-text"], styles['link']].join(" ")}>Сколько будет стоить расчет? </Link>
							{/* <CustomLink to='/#concept' className={styles['link']}>Подробнее &rarr;</CustomLink> */}
						</div>

					</WhiteContainer>

					<WhiteContainer>
						<Form
							onSubmit={handleFormSubmit}
							style={{ width: "100%", flexDirection: "column", display: "flex", gap: 20 }}
							inputClass={styles["input-field__input"]}
							errorMsgClass={styles["input-field__error-message"]}
							errorMsgHiddenClass={styles["input-field__error-message_hidden"]}
							errorMsgInvalidClass={styles["input-field__input_invalid"]}
						>
							<SectionHeading>Создание заявки на выполнение расчета</SectionHeading>

							<div className={styles["create-request__input-wrapper"]}>
								<input required name='file' type="file" className={[styles["input-field__input"], styles["create-request__file-input"]].join(" ")} ref={fileInput} onInput={handleFileInputChange} accept=".xlsx, .csv, .xls" />
								<ButtonFile onClick={handleSelectFileButtonClick}>{isFileChosen ? chosenFilename : "Выбрать файл"}</ButtonFile>
								<span className={styles["input-field__error-message"]}></span>

							</div>

							<h2 className={styles["create-request__subtitle"]}>Дополнительная информация</h2>

							<div className={styles["create-request__inputs"]}>
								<div className={styles["input-field"]}>
									<input
										required
										minLength={5}
										maxLength={80}
										type="text"
										name="name"
										id="name"
										className={styles["input-field__input"]}
										value={evaluationNameInputValue}
										onChange={handleTextInput}
										placeholder=" "
										autoComplete="nope"
									/>
									<label htmlFor="name" className={styles["input-field__label"]}>Название расчета</label>
									<span className={styles["input-field__error-message"]}></span>

									{width > 700 && <>
										<img src={questionIcon} alt="Узнать дополнительную информацию, кнопка." className={styles['create-request__icon']} onClick={handleFilenameInfoButtonClick} />
										<InfoPopup style={{ width: 300, left: 340, top: 6 }} ref={filenameInfoPopup} visible={filenameInfoPopupVisible}>
											<p className={styles['info-popup__text_size_L']}>Название необходимо чтобы не запутаться в своих расчетах, когда их станет много</p>
											<p className={styles['info-popup__text_size_S']}>Оно будет отображаться в списке ваших расчетов, а также использовано как название для итогового файла.</p>
										</InfoPopup>
									</>}

								</div>

								<div className={styles["input-field"]}>
									<input
										minLength={5}
										maxLength={80}
										type="text"
										name="userComment"
										id="userComment"
										className={styles["input-field__input"]}
										value={commentInputValue}
										onChange={handleCommentInput}
										placeholder=" "
										autoComplete="nope"
									/>
									<label htmlFor="userComment" className={styles["input-field__label"]}>Комментарий</label>
									<span className={styles["input-field__error-message"]}></span>
								</div>
							</div>

							<ButtonWithStatus
								type="submit"
								buttonDisabled={isSubmitButtonDisabled}
								processStatus={submittingStatus}
								buttonText="Отправить"
								statusOnTheLeft={true}
							/>
						</Form>
					</WhiteContainer>

				</div>
			</Container>
		</>
	);
};

export default CreateEvaluateRequest;