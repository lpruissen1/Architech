import React, { useState } from 'react'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from '@material-ui/core/Button';
import './Registration.css';
import AuthClient from '../../Clients/AuthClient';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import RaisedCard from '../GeneralComponents/RaisedCard';
import LargeTextInput from '../GeneralComponents/LargeTextInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';


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
	smallForm: {
		margin: theme.spacing(1.5),
		width: '20ch'
	},
	largeForm: {
		margin: theme.spacing(1.5),
		width: '43ch',
		"& .MuiInputBase-root": {
			color: '#fff',
			height: 60,
			textAlign: 'center'
		}
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
							<LargeTextInput
									label="Username"
									onChange={(event) => {
										setUsername(event.target.value);
									}}
									error={credentialError}
								/>
							<LargeTextInput
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
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>)}}
							/>
						</div>
					</form>
					<Button
						onClick={loginUser}
						className={classes.button}
						variant="contained"
						color="primary"
						style={{ outline: 'none' }}
							disableElevation>
							Login
					</Button>
					<p className="registration-link"> Don't have an account? 
						<Link to="/register">
							<span className="signup"> Sign up now!</span>
						</Link>
					</p>
					</>}
			/>
        </div>
    );
}
