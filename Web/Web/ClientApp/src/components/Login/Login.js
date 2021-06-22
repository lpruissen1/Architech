import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Registration.css';
import AuthClient from '../../Clients/AuthClient';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

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

// where did you come from and what was the state of where you came from
export function Login(props) {

	const classes = useStyles();
    const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [credentialError, setCredentialError] = useState(false)
	const history = useHistory();

    const loginUser = async () => {
		const response = await AuthClient.login(username, password);
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
			<div className="loginCard">
                <form className={classes.root}>
                    <div className="flex-container">
                        <TextField required id="outlined-required" className={classes.largeForm} variant="outlined" placeholder="Username" label="Username"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => {
                                setUsername(event.target.value);
							}}
							error={credentialError}
                            autoComplete='off' />
                        <TextField required id="outlined-required" className={classes.largeForm} variant="outlined" placeholder="Password" label="Password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => {
                                setPassword(event.target.value);
							}}
							type='password'
							error={credentialError}
							helperText={credentialError? "Invalid Credentials" : ""}
                            autoComplete='off' />
                    </div>
                </form>
				<Button
					onClick={loginUser}
					className={classes.button}
					variant="contained"
					disableElevation> Login </Button>
					<p className="registration-link"> Don't have an account? 
						<Link to="/register">
							<span className="signup"> Sign up now!</span>
						</Link>
					</p>
			</div>
        </div>
    );
}
