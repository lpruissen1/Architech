import React, { useState } from 'react'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from '@material-ui/core/Button';
import './Registration.css';
import AuthClient from '../../Clients/AuthClient';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import RaisedCard from '../Generic/RaisedCard';
import TextInput from '../Generic/TextInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PrimaryActionButton from '../Generic/PrimaryActionButton';


export const useStyles = makeStyles((theme) => ({
	visibility: {
	color: '#c0c0c0',
	outline: 'none'
	}
}));

// where did you come from and what was the state of where you came from
export function Login(props) {

	const classes = useStyles();
    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [credentialError, setCredentialError] = useState(false)
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);
	const history = useHistory();

    const loginUser = async () => {
		const response = await AuthClient.Login(username, password);
		if (response) {
			props.updateLoggedIn()
			history.push('/')
			props.setUserId(response)
			setCredentialError(false)
		}

		setCredentialError(true)
	};

    return (
        <div className="global-flex-container">
			<RaisedCard
				className="loginCard"
				style={{display: 'block', marginTop: '5%', paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 40 }}
				children={
					<>
					<form className={classes.root}>
						<div className="flex-container">
								<TextInput
									width='43ch'
									label="Username"
									onChange={(event) => {
										setUsername(event.target.value);
									}}
									error={credentialError}
								/>
								<TextInput
									width= '43ch'
									label="Password"
									onChange={(event) => {
										setPassword(event.target.value);
									}}
									error={credentialError}
									type={showPassword ? "text" : "password"}
									helperText={credentialError ? "Invalid Credentials" : ""}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
												>
													{showPassword ? <VisibilityOff className={classes.visibility} /> : <Visibility className={classes.visibility} />}
												</IconButton>
											</InputAdornment>)}}
							/>
						</div>
					</form>
					<PrimaryActionButton
						onClick={loginUser}
						text='Login'
						width='42ch'
					/>
					<p style={{ color: '#c0c0c0', margin: 14, textAlign: 'center', marginBottom: 0 }}
					> Don't have an account? 
						<Link to="/register">
								<span style={{ color: 'rgba(255,215,100)', fontWeight: 600,  }}> Sign up now!</span>
						</Link>
					</p>
					</>}
			/>
        </div>
    );
}
