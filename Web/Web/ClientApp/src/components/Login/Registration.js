import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Registration.css';
import AuthClient from '../../Clients/AuthClient';
import { makeStyles } from '@material-ui/core/styles';
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
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
		backgroundColor: theme.palette.info.main,
		"&:hover": {
			backgroundColor: '#0075A1'
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


export function Registration() {

	const classes = useStyles();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const postUserRegistrationRequest = (data) => {
		AuthClient.register(data)
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
		registerUser()
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
								autoComplete='off'
							/>
							<TextField required id="outlined-required" className={classes.smallForm} label="Required" variant="outlined" placeholder="Last Name"
								InputLabelProps={{
								shrink: true,
								}}
								onChange={(event) => {
									setLastName(event.target.value)
								}}
								autoComplete='off'
							/>
						</div>
						<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Username"
							InputLabelProps={{
							shrink: true,
							}}
							onChange={(event) => {
								setUsername(event.target.value)
							}}
							autoComplete='off'
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Password"
							InputLabelProps={{
							shrink: true,
							}}
							onChange={(event) => {
								setPassword(event.target.value)
							}}
							autoComplete='off'
						/>
						<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Email"
							InputLabelProps={{
							shrink: true,
							}}
							onChange={(event) => {
								setEmail(event.target.value)
							}}
							autoComplete='off'
						/>
					</div>
				</form>
				<Button onClick={register} className={classes.button} variant="contained"> Register </Button>
			</div>
		</div>
	);
}
