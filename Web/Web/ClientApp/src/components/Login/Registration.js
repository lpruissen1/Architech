import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Registration.css';
import AuthClient from '../../Clients/AuthClient';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { validateEmail, validatePassword, validateUsername, validateName, validatePasswordMatch } from './RegistrationValidationHelpers'
import TextInput from '../Generic/TextInput.js';
import RaisedCard from '../Generic/RaisedCard.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// we should move all these to their own files
export const useStyles = makeStyles((theme) => ({
	button: {
		margin: '0 auto',
		marginTop: '14px',
		display: "flex",
		width: '42ch',
		fontWeight: '700',
		color: 'white',
		textTransform: 'none',
		fontSize: 16,
	}, 
	visibility: {
		color: '#c0c0c0',
		outline: 'none'
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
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);
	const [showPasswordMatch, setShowPasswordMatch] = useState(false);
	const handleClickShowPasswordMatch = () => setShowPasswordMatch(!showPasswordMatch);
	const handleMouseDownPasswordMatch = () => setShowPasswordMatch(!showPasswordMatch);
	const history = useHistory();

	const postUserRegistrationRequest = async (data) => {
		const response = await AuthClient.Register(data)
		if (response) {
			props.updateLoggedIn()
			history.push('/')
			props.setUserId(response)
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
			<RaisedCard
				style={{ display: 'block', marginTop: '3%', paddingLeft: 20, paddingRight: 20, paddingTop: 40, paddingBottom: 40 }}
			>
					<form className={classes.root}>
						<div className="flex-container">
							<div className="nameRow">
								<TextInput
									width='20ch'
									label='First Name'
									error={firstName ? firstNameError : false}
									onChange={(e) => setFirstName(e.target.value)}
								/>
								<TextInput
									width='20ch'
									label='Last Name'
									error={lastName ? lastNameError : false}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<TextInput
								width='43ch'
								label='Username'
								error={username ? usernameError : false}
								onChange={(e) => setUsername(e.target.value)}
								helperText={username && usernameError ? "*Must have at least 8 characters" : ''}
							/>
							<TextInput
								width='43ch'
								label='Password'
								type={showPassword ? "text" : "password"}
								error={password ? passwordError : false}
								onChange={(e) => setPassword(e.target.value)}
								helperText={password && passwordError ? "*Must contain uppercase, lowercase, number, and symbol" : ''}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility className={classes.visibility} /> : <VisibilityOff className={classes.visibility} />}
											</IconButton>
										</InputAdornment>)
								}}
							/>
							<TextInput
								width='43ch'
								label='Re-enter Password'
								type='password'
								onChange={(e) => setPasswordMatch(e.target.value)}
								error={passwordMatch ? passwordMatchError : false}
								helperText={passwordMatchError
									? "*Passwords do not match"
									: ''}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPasswordMatch}
												onMouseDown={handleMouseDownPasswordMatch}
											>
												{showPasswordMatch ? <Visibility className={classes.visibility} /> : <VisibilityOff className={classes.visibility} />}
											</IconButton>
										</InputAdornment>)
								}}
							/>
							<TextInput
								width='43ch'
								label='Email'
								error={email ? emailError : false}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</form>
					{formValid
					? <Button
						onClick={registerUser}
						className={classes.button}
						variant="contained"
						color="primary"
						style={{ outline: 'none' }}
						disableElevation> Register </Button>
					: <Button
						className={classes.button}
						variant="contained"
						disabled
						disableElevation> Register </Button>}
				</RaisedCard>
		</div>
	);
}
