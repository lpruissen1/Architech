import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Registration.css';
import { makeStyles } from '@material-ui/core/styles';
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
	root: {
		
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
		fetch("https://localhost:9001/User", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(function (response) {
				console.log(response)
				response.text().then(function (data) {
					debugger
					Cookie.set("jwtToken", data)
				})
			});
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
		<div className="registration-card">
			<h1>Register</h1>
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
						/>
						<TextField required id="outlined-required" className={classes.smallForm} label="Required" variant="outlined" placeholder="Last Name"
							InputLabelProps={{
							shrink: true,
							}}
							onChange={(event) => {
								setLastName(event.target.value)
							}}
						/>
					</div>
					<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Username"
						InputLabelProps={{
						shrink: true,
						}}
						onChange={(event) => {
							setUsername(event.target.value)
						}}
					/>
					<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Password"
						InputLabelProps={{
						shrink: true,
						}}
						onChange={(event) => {
							setPassword(event.target.value)
						}}
					/>
					<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Email"
						InputLabelProps={{
						shrink: true,
						}}
						onChange={(event) => {
							setEmail(event.target.value)
						}}
					/>
				</div>
			</form>
			<Button onClick={register}> Register </Button>
		</div>
	);
}
