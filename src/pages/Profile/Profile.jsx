import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { SERVER_PORT, SERVER_URL } from '../../config';

import "./Profile.css";

import { Box, Button, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { regions } from '../../consts';
import { getCompanies } from '../../api/companies';
import { patchMe } from '../../api/user';
import { deepEqual } from '../../utils/objects';
import Animals from '../Animals';
import Orders from '../Orders';

const Profile = ({ setIsAuthorized, userData, setUserData }) => {
	const { values, handleChange, handleBlur, errors, setValues } = useFormAndValidation();

	const [companies, setCompanies] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [initialState, setInitialState] = useState({});

	const navigate = useNavigate();
	const { page } = useParams();


	function handleLogoutButtonClick() {
		localStorage.removeItem("token");
		setIsAuthorized(false);
		setUserData({});
		navigate("/login");
	}

	function handlePatchUser() {
		const { name, surname, region, company } = values;

		if (!name || !surname) {
			setErrorMessage("Имя и фамилия должны быть заполнены");
			return;
		}

		patchMe({ name, surname, region, company })
			.then((data) => {
				setErrorMessage('');
				setUserData((prev) => ({ ...prev, ...data.changes }));

			})
			.catch((error) => {
				setErrorMessage(error.message);
			});
	}

	useEffect(() => {
		console.log(userData);
		setValues(userData);
		setInitialState({ ...userData });
	}, []);

	useEffect(() => {
		console.log(values);
	}, [values]);

	useEffect(() => {
		getCompanies()
			.then((data) => {
				setCompanies(data);
			});
	}, []);


	return (
		<Container>
			<Sidebar userData={userData} page={page} />
			<ContentContainer>

				{page === 'animals' && (
					<Animals userData={userData} />
				)}

				{page === 'orders' && (
					<Orders userData={userData} />
				)}



				{page === undefined && (
					<ProfileContainer>
						<Top>
							<AvatarBlock>
								<Avatar src={`${SERVER_URL}:${SERVER_PORT}/images/${userData.photo || 'sample.jpg'}`} />

								<NameBlock>
									<Name variant='h3'>
										{userData.name} {userData.surname}
									</Name>
									<Email>
										{userData.login}
									</Email>
								</NameBlock>

							</AvatarBlock>

							<Button onClick={handleLogoutButtonClick} variant='outlined' size='large'>Выйти</Button>
						</Top>

						<Information>
							<BlockTitle>
								Информация
							</BlockTitle>

							<TwoColumns>
								<TextField
									required
									name='name'
									value={values.name || ''}
									onChange={handleChange}
									onBlur={handleBlur}
									error={Boolean(errors.name)}
									placeholder='Имя'
									label='Имя'
								/>

								<TextField
									required
									name='surname'
									value={values.surname || ''}
									onChange={handleChange}
									onBlur={handleBlur}
									error={Boolean(errors.surname)}
									placeholder='Фамилия'
									label='Фамилия'
								/>
							</TwoColumns>

							<TwoColumns>
								<Select
									required
									labelId='test-select-label'
									id='test-select'

									value={values.region || ''}
									name='region'
									color="primary"
									label='Регион'

									onChange={handleChange}
									onBlur={handleBlur}

									autoWidth={false}
									placeholder='Регион'

									style={{
										maxWidth: '100%',
										color: 'black'
									}}
								>
									{regions.map((region) => (
										<MenuItem key={region} value={region}>{region}</MenuItem>
									))}
								</Select>

								<Select
									required
									value={values.company || ''}
									name='company'
									color="primary"
									label='Хозяйство'

									onChange={handleChange}
									onBlur={handleBlur}

									style={{ maxWidth: '100%' }}
									autoWidth={false}
								>
									{companies.map((company) => (
										<MenuItem key={company.companyId} value={company.companyId}>{company.name}</MenuItem>
									))}
								</Select>
							</TwoColumns>

							<ButtonBlock>
								<Button
									variant='contained'
									size='large'

									disabled={deepEqual(initialState, values)}

									onClick={handlePatchUser}
								>Сохранить</Button>

								{errorMessage && (
									<ErrorMessage>{errorMessage}</ErrorMessage>
								)}
							</ButtonBlock>

						</Information>

					</ProfileContainer>
				)}
			</ContentContainer>

		</Container>
	);
};

export default Profile;

const Container = styled(Box)(() => ({
	display: 'flex',
}));

const ContentContainer = styled(Box)(() => ({
	boxSizing: 'border-box',

	width: '100%',
	height: 'calc(100vh - 60px)',
	padding: 20,

	overflowY: 'scroll',

}));

const ProfileContainer = styled(Box)(() => ({
	width: '100%',
	minHeight: 200,
	padding: 40,

	backgroundColor: 'white',

	borderRadius: 10,
}));

const Avatar = styled('img')(() => ({
	width: 200,
	height: 200,

	borderRadius: 100,
	objectFit: 'cover',
}));

const Information = styled('form')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'start',
	gap: 20,

	padding: '40px 20px 0',
}));

const BlockTitle = styled(Typography)(() => ({
	fontSize: 20,

	fontWeight: 600,

}));

const TwoColumns = styled(Box)(() => ({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	alignItems: 'stretch',
	gap: 20,

	maxWidth: 800,
	width: '100%',
}));

const ButtonBlock = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: 20,
}));

const ErrorMessage = styled(Typography)(() => ({
	color: 'red',
	fontSize: 12,
}));

const Top = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'start',
}));

const AvatarBlock = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	gap: 20,
}));

const NameBlock = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 0,
}));

const Name = styled(Typography)(() => ({
	fontSize: 20,
	fontWeight: 700,
}));

const Email = styled(Typography)(() => ({
	fontSize: 12,
}));