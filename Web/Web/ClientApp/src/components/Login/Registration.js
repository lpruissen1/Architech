import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Registration.css';
import AuthClient from '../../Clients/AuthClient';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

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
		margin: theme.spacing(1.5),
		width: '20ch'
	},
	largeForm: {
		margin: theme.spacing(1.5),
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
	const [firstNameError, setFirstNameError] = useState(false)
	const [lastNameError, setLastNameError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [usernameError, setUsernameError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const history = useHistory();

	const postUserRegistrationRequest = async (data) => {
		const success = await AuthClient.register(data)
		if (success) {
			props.updateLoggedIn()
			history.push('/')
		}
	}

	const registerUser = () => {
		return postUserRegistrationRequest({
			"firstName": firstName,
			"lastName": lastName,
			"userName": username,
			"email": email,
			"passwordHash": password
		});
	}

	const register = () => {
		registerUser()
	}

	const validateEmail = () => {
		const regex = /\S+@\S+\.\S+/
		const valid = regex.test(email)
		valid ? setEmailError(false) : setEmailError(true)
	}

	const validateUsername = () => {
		username.length >= 8 ? setUsernameError(false) : setUsernameError(true)
	}

	const validatePassword = () => {
		const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
		const valid = passw.test(password)
		valid ? setPasswordError(false) : setPasswordError(true)
	}


	return (
		<div className="global-flex-container">
			<div className="registration-card">
				<form className={classes.root}>
					<div className="flex-container">
						<div className="nameRow">
							<TextField required id="outlined-required" className={classes.smallForm} label="Required" variant="outlined" placeholder="First Name"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(event) => {
									setFirstName(event.target.value)
								}}
								onBlur={() =>
									firstName === '' ? setFirstNameError(true) : setFirstNameError(false)}
								autoComplete='off'
								error={firstNameError}
							/>
							<TextField required id="outlined-required" className={classes.smallForm} label="Required" variant="outlined" placeholder="Last Name"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(event) => {
									setLastName(event.target.value)
								}}
								onBlur={() =>
									lastName === '' ? setLastNameError(true) : setLastNameError(false)}
								autoComplete='off'
								error={lastNameError}
							/>
						</div>
						<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Username"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(event) => {
								setUsername(event.target.value)
							}}
							onBlur={validateUsername}
							autoComplete='off'
							error={usernameError}
							helperText="Must have at least 8 characters"
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Password"
							InputLabelProps={{
							shrink: true,
							}}
							onChange={(event) => {
								setPassword(event.target.value)
							}}
							onBlur={validatePassword}
							autoComplete='off'
							type='password'
							error={passwordError}
							helperText="Must contain uppercase, lowercase, number, and symbol"
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Email"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(event) => {
								setEmail(event.target.value)
							}}
							onBlur={validateEmail}
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
