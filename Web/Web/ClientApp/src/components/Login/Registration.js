import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Registration.css';
import AuthClient from '../../Clients/AuthClient';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { validateEmail, validatePassword, validateUsername, validateName, validatePasswordMatch}  from './RegistrationValidationHelpers'

// we should move all these to their own files
export const useStyles = makeStyles((theme) => ({
	button: {
		margin: '0 auto',
		marginTop: '14px',
		display: "flex",
		width: '42ch',
		fontWeight: '700',
		color: 'white',
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 16,
		backgroundColor: theme.palette.primary.main,
		"&:hover": {
			backgroundColor: theme.palette.primary.dark
		}
	},
	smallForm: {
		margin: theme.spacing(1.25),
		width: '20ch'
	},
	largeForm: {
		margin: theme.spacing(1.25),
		width: '43ch'
	}
}));


export function Registration(props) {

	const classes = useStyles();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordMatch, setPasswordMatch] = useState('');
	const [firstNameError, setFirstNameError] = useState(false)
	const [lastNameError, setLastNameError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [usernameError, setUsernameError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [passwordMatchError, setPasswordMatchError] = useState(false)
	const [formValid, setFormValid] = useState(false)
	const history = useHistory();

	const postUserRegistrationRequest = async (data) => {
		const response = await AuthClient.register(data)
		const success = response[0]
		const ID = response[1]
		if (success) {
			props.updateLoggedIn()
			history.push('/')
			props.setUserID(ID)
		}
	}

	const registerUser = () => {
		return postUserRegistrationRequest({
			"firstName": firstName,
			"lastName": lastName,
			"userName": username,
			"email": email,
			"password": password
		});
	}

	const register = () => {
		validateForm()
		if (formValid) {
			registerUser()
		}
	}

	const validateForm = () => {
		const errorList = [validateEmail(email), validatePassword(password), validateUsername(username), validateName(firstName), validateName(lastName), validatePasswordMatch(password, passwordMatch)]

		if (errorList.indexOf(false) === -1) {
			setFormValid(true)
		}
	}

	const handleEmailInput = (event) => {
		if (validateEmail(event.target.value)) {
			setEmailError(false)
			setEmail(event.target.value)
		}
		else {
			setEmailError(true)
		}
	}

	const handleUsernameInput = (event) => {
		if (validateUsername(event.target.value)) {
			setUsernameError(false)
			setUsername(event.target.value)
		}
		else {
			setUsernameError(true)
		}
	}

	const handlePasswordInput = (event) => {
		if (validatePassword(event.target.value)) {
			setPasswordError(false)
			setPassword(event.target.value)
		}
		else {
			setPasswordError(true)
		}
	}

	const handlePasswordMatchInput = (event) => {
		if (validatePasswordMatch(password, event.target.value)) {
			setPasswordMatchError(false)
			setPasswordMatch(event.target.value)
		}
		else {
			setPasswordMatchError(true)
		}
	}

	const handleFirstNameInput = (event) => {
		if (validateName(event.target.value)) {
			setFirstNameError(false)
			setFirstName(event.target.value)
		}
		else {
			setFirstNameError(true)
		}
	}

	const handleLastNameInput = (event) => {
		if (validateName(event.target.value)) {
			setLastNameError(false)
			setLastName(event.target.value)
		}
		else {
			setLastNameError(true)
		}
	}

	return (
		<div className="global-flex-container">
			<div className="registration-card">
				<form className={classes.root}>
					<div className="flex-container">
						<div className="nameRow">
							<TextField required id="outlined-required" className={classes.smallForm} label="First Name" variant="outlined" placeholder="First Name"
								InputLabelProps={{
									shrink: true,
								}}
								onChangeCapture={handleFirstNameInput}
								autoComplete='off'
								error={firstNameError}
							/>
							<TextField required id="outlined-required" className={classes.smallForm} label="Last Name" variant="outlined" placeholder="Last Name"
								InputLabelProps={{
									shrink: true,
								}}
								onChangeCapture={handleLastNameInput}
								autoComplete='off'
								error={lastNameError}
							/>
						</div>
						<TextField required id="outlined-required" className={classes.largeForm} label="Username" variant="outlined" placeholder="Username"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={handleUsernameInput}
							autoComplete='off'
							error={usernameError}
							helperText="*Must have at least 8 characters"
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Password" variant="outlined" placeholder="Password"
							InputLabelProps={{
							shrink: true,
							}}
							onChange={handlePasswordInput}
							autoComplete='off'
							type='password'
							error={passwordError}
							helperText="*Must contain uppercase, lowercase, number, and symbol"
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Re-enter Password" variant="outlined" placeholder="Re-enter Password"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={handlePasswordMatchInput}
							autoComplete='off'
							type='password'
							error={passwordMatchError}
							helperText={passwordMatchError
								? "*Passwords do not match"
								: ''}
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Email" variant="outlined" placeholder="Email"
							InputLabelProps={{
								shrink: true,
							}}
							onChangeCapture={handleEmailInput}
							autoComplete='off'
							error={emailError}
						/>
					</div>
				</form>
					<Button onClick={register} className={classes.button} variant="contained"> Register </Button>
			</div>
		</div>
	);
}
