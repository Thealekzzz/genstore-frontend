import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from "@mui/material";

import { SERVER_PORT, SERVER_URL } from '../../config';

import uploadIcon from '../../imgs/upload.svg';
import * as styles from "./styles.js";

import TokenContext from '../../contexts/TokenContext';
// import AuthorizedContext from '../../contexts/AuthorizedContext';

import checkResponse from '../../utils/checkResponse';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

const CreateOrder = () => {
	// const isAuthorized = useContext(AuthorizedContext);
	const token = useContext(TokenContext);

	const navigateTo = useNavigate();

	function handleFileChange(evt) {
		if (evt.target.files.length) {
			setSelectedFile(evt.target.files[0]);
			setValues((prev) => ({
				...prev,
				name: evt.target.files[0].name,
			}));
			console.log(evt.target.files[0].name);

			const fd = new FormData();

			fd.append('file', evt.target.files[0]);

			fetch(`${SERVER_URL}:${SERVER_PORT}/api/files/upload/order`, {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token}`,
				},
				body: fd,
			})
				.then(checkResponse)
				.then(({ fileId, rowsNumber, cost }) => {
					setFileId(fileId);
					setRowsNumber(rowsNumber);
					setCost(cost);
				})
				.catch(({ message }) => {
					setIsErrorSnackOpen(true);
					setErrorMessage(message);
				});
		} else {
			setSelectedFile(null);
		}

		handleChange(evt);
	}

	function handleTypeOptionClick(option) {
		setValues((prev) => ({
			...prev,
			type: option,
		}));
	}

	function handlePromoButtonClick() {
		const promoInputValueUppercase = promoInputValue.toUpperCase();

		if (!promoInputValueUppercase) {
			return;
		}

		if (appliedPromocodes.findIndex((promo) => promo.code === promoInputValueUppercase) !== -1
		) {
			setIsInformationSnackOpen(true);
			setInformationMessage('Промокод уже использован');
			setPromoInputValue('');
			return;
		}

		setIsPromocodeFetching(true);

		fetch(`${SERVER_URL}:${SERVER_PORT}/api/promocodes/${promoInputValueUppercase}`, {
			headers: {
				authorization: `Bearer ${token}`,
			}
		})
			.then(checkResponse)
			.then(({ code, description, sale, ...data }) => {
				console.log(data);
				setAppliedPromocodes((prev) => ([...prev, { code, description, sale }]));
				setPromoInputValue('');
				setIsPromocodeFetching(false);

			})
			.catch(({ message }) => {
				setIsErrorSnackOpen(true);
				setErrorMessage(message);
				setIsPromocodeFetching(false);
			});

	}

	function handleSubmitButtonClick() {
		const payload = {
			...values,
			fileId,
			promocodes: appliedPromocodes.map((promocodeData) => promocodeData.code),
		};
		delete payload.file;

		console.log(payload);

		setIsOrderCreating(true);

		fetch(`${SERVER_URL}:${SERVER_PORT}/api/orders`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
			.then(checkResponse)
			.then(() => {
				setInformationMessage('Заказ создан!')
				setIsInformationSnackOpen(true);

				setTimeout(() => {
					navigateTo('/profile');
				}, 3000);

				setIsOrderCreating(false);
			})
			.catch(({ message }) => {
				setIsErrorSnackOpen(true);
				setErrorMessage(message);
				setIsOrderCreating(false);
			});

	}

	const { values, handleChange, handleBlur, isValid, errors, setValues } = useFormAndValidation();

	const [selectedFile, setSelectedFile] = useState(null);
	const [fileId, setFileId] = useState(null);

	const [rowsNumber, setRowsNumber] = useState(null);
	const [cost, setCost] = useState(null);

	const [promoInputValue, setPromoInputValue] = useState('');
	const [appliedPromocodes, setAppliedPromocodes] = useState([]);

	const [isErrorSnackOpen, setIsErrorSnackOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isInformationSnackOpen, setIsInformationSnackOpen] = useState(false);
	const [informationMessage, setInformationMessage] = useState(null);

	const [, setIsOrderCreating] = useState(false);
	const [isPromocodeFetching, setIsPromocodeFetching] = useState(false);

	const sale = Object
		.entries(appliedPromocodes)
		.reduce((acc, [, { sale }]) => acc + sale / 100, 0);
	const price = Math.round(cost * (1 - sale));

	useEffect(() => {
		setValues({
			type: 'Прогнозирование',
		})
	}, [setValues]);

	return (
		<Box {...styles.wrapper}>
			<Container {...styles.container}>
				<Box {...styles.header}>
					<Typography {...styles.title}>Отправить заявку</Typography>
				</Box>

				<Box {...styles.form} component='form'>
					<Box {...styles.horizontalContainer}>
						{/* <Box {...styles.fileWrapper}> */}
						<Button {...styles.fileButton}>
							<img src={uploadIcon} alt="" />
							{selectedFile ? selectedFile.name : 'Выбрать файл'}
							<input
								hidden
								required
								type="file"
								name='file'
								onChange={handleFileChange}
							/>
						</Button>
						{/* </Box> */}

						<Box {...styles.inputList}>
							<TextField
								{...styles.orderNameInput}
								name="name"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name || ''}
								error={!!errors.name}
								helperText={errors.name ? errors.name : 'Поможет найти нужную заявку, когда их станет много'}
							/>
							<TextField
								{...styles.orderCommentInput}
								name="userComment"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.userComment || ''}
								error={!!errors.userComment}
								helperText={errors.userComment ? errors.userComment : 'Дополнительная информация'}
							/>
						</Box>
					</Box>

					<Box {...styles.extraInfo}>
						<Box {...styles.section}>
							<Typography {...styles.label}>Какой расчет будем делать?</Typography>
							<Box {...styles.typeContainer}>
								<Box
									{...styles.typeOption}
									onClick={() => handleTypeOptionClick('Прогнозирование')}
									sx={{
										...styles.typeOption.sx,
										backgroundColor: values.type === 'Прогнозирование'
											? '#3580E8'
											: '#0001',
										color: values.type === 'Прогнозирование'
											? 'white'
											: '#0009',
									}}
								>
									<Typography
										sx={{
											...styles.typeTitle.sx,
											'&::after': {
												content: values.type === 'Прогнозирование'
													? '"✔"'
													: '""',
												ml: 1,
											},
										}}
									>
										Прогнозирование
									</Typography>
									<Typography {...styles.typeText}>
										Вычисление показателей геномной оценки потомков
									</Typography>
								</Box>
								<Box
									{...styles.typeOption}
									onClick={() => handleTypeOptionClick('Аудит')}
									sx={{
										...styles.typeOption.sx,
										backgroundColor: values.type === 'Аудит'
											? '#3580E8'
											: '#0001',
										color: values.type === 'Аудит'
											? 'white'
											: '#0009',
									}}
								>
									<Typography
										sx={{
											...styles.typeTitle.sx,
											'&::after': {
												content: values.type === 'Аудит'
													? '"✔"'
													: '""',
												ml: 1,
											},
										}}
									>
										Аудит
									</Typography>
									<Typography {...styles.typeText}>
										Исследование показателей геномной оценки стада
									</Typography>
								</Box>
							</Box>
						</Box>

						<Box {...styles.section}>
							<Box {...styles.horizontalSideContainer}>
								<TextField
									{...styles.promoInput}
									value={promoInputValue}
									onChange={(evt) => setPromoInputValue(evt.target.value)}
								/>
								<Button
									{...styles.promoButton}
									onClick={handlePromoButtonClick}
									disabled={isPromocodeFetching}
								>Проверить</Button>
							</Box>

							{appliedPromocodes.length !== 0 ? (<>
								{appliedPromocodes.map((promo) => (
									<Box key={promo.code} {...styles.horizontalFixedContainer}>
										<Typography {...styles.promoName}>{promo.code}</Typography>
										<Typography {...styles.promoDescription}>{promo.description}</Typography>
									</Box>
								))}
							</>) : (
								<Typography
									sx={{
										fontSize: 12,
										textAlign: 'center',
										mt: 2,
										mb: 1,
									}}
								>Промокоды не добавлены</Typography>
							)}



						</Box>

						{rowsNumber !== null && (
							<Box {...styles.section}>
								<Typography {...styles.label}>Стоимость</Typography>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										gap: .5,
									}}
								>
									<Typography {...styles.typeText}>Система нашла {rowsNumber} строк с данными в загруженном файле</Typography>
									<Typography {...styles.typeText}>Стоимость такого расчета составит {price} ₽</Typography>
									{/* <Typography {...styles.typeText}></Typography> */}
								</Box>
							</Box>
						)}
					</Box>


					<Box sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'end',
						flexDirection: 'row-reverse',
					}}>
						<Typography
							sx={{
								fontSize: 12,
								color: '#00000090',
							}}
						>
							* обязательные поля
						</Typography>
						<Button
							onClick={handleSubmitButtonClick}
							variant="contained"
							disabled={!isValid}
						>Отправить</Button>
					</Box>
				</Box>

			</Container>
			<Snackbar
				open={isErrorSnackOpen}
				autoHideDuration={4000}
				onClose={() => setIsErrorSnackOpen(false)}
			>
				<Alert severity="error" onClose={() => setIsErrorSnackOpen(false)} >
					{errorMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				open={isInformationSnackOpen}
				autoHideDuration={4000}
				onClose={() => setIsInformationSnackOpen(false)}
			>
				<Alert severity="info" onClose={() => setIsInformationSnackOpen(false)} >
					{informationMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default CreateOrder;