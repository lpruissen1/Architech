import React, { useState, useEffect } from 'react'
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
			props.setUserId(ID)
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

	const validateForm = () => {
		const errorList = [firstNameError, lastNameError, usernameError, passwordError, passwordMatchError, emailError]

		if (errorList.indexOf(true) === -1) {
			setFormValid(true)
		}
		else {
			setFormValid(false)
		}
	}

	const handleEmailInput = () => {
		if (validateEmail(email)) {
			setEmailError(false)
		}
		else {
			setEmailError(true)
		}
	}

	const handleUsernameInput = () => {
		if (validateUsername(username)) {
			setUsernameError(false)
		}
		else {
			setUsernameError(true)
		}
	}

	const handlePasswordInput = () => {
		if (validatePassword(password)) {
			setPasswordError(false)
		}
		else {
			setPasswordError(true)
		}
	}

	const handlePasswordMatchInput = () => {
		if (validatePasswordMatch(password, passwordMatch)) {
			setPasswordMatchError(false)
		}
		else {
			setPasswordMatchError(true)
		}
	}

	const handleFirstNameInput = () => {
		if (validateName(firstName)) {
			setFirstNameError(false)
		}
		else {
			setFirstNameError(true)
		}
	}

	const handleLastNameInput = () => {
		if (validateName(lastName)) {
			setLastNameError(false)
		}
		else {
			setLastNameError(true)
		}
	}

	useEffect(() => { handleFirstNameInput() }, [firstName])
	useEffect(() => { handleLastNameInput() }, [lastName])
	useEffect(() => { handleUsernameInput() }, [username])
	useEffect(() => { handlePasswordInput() }, [password])
	useEffect(() => { handlePasswordMatchInput() }, [passwordMatch])
	useEffect(() => { handleEmailInput() }, [email])
	useEffect(() => { validateForm()}, [firstNameError, lastNameError, usernameError, passwordError, passwordMatchError, emailError])

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
								onChange={(e) => setFirstName(e.target.value)}
								autoComplete='off'
								error={firstName ? firstNameError : false}
							/>
							<TextField required id="outlined-required" className={classes.smallForm} label="Last Name" variant="outlined" placeholder="Last Name"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => setLastName(e.target.value)}
								autoComplete='off'
								error={lastName ? lastNameError : false}
							/>
						</div>
						<TextField required id="outlined-required" className={classes.largeForm} label="Username" variant="outlined" placeholder="Username"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e) => setUsername(e.target.value)}
							autoComplete='off'
							error={username ? usernameError : false}
							helperText={usernameError && "*Must have at least 8 characters"}
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Password" variant="outlined" placeholder="Password"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete='off'
							type='password'
							error={password ? passwordError : false}
							helperText={passwordError && "*Must contain uppercase, lowercase, number, and symbol"}
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Re-enter Password" variant="outlined" placeholder="Re-enter Password"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e) => setPasswordMatch(e.target.value)}
							autoComplete='off'
							type='password'
							error={passwordMatch ? passwordMatchError : false}
							helperText={passwordMatchError
								? "*Passwords do not match"
								: ''}
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Email" variant="outlined" placeholder="Email"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete='off'
							error={email ? emailError : false}
						/>
					</div>
				</form>
				{formValid ?
					<Button onClick={registerUser} className={classes.button} variant="contained"> Register </Button>
					:
					<Button className={classes.button} variant="contained" disabled> Register </Button>
					}
			</div>
		</div>
	);
}
