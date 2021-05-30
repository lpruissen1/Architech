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

export function Login(props) {

    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const history = useHistory();

    const loginUser = async () => {
		const success = await AuthClient.login(username, password);
		if (success) {
			props.updateLoggedIn()
			history.push('/')
		}
    };

    return (
        <div className="global-flex-container">
            <div className="registration-card">
                <form className={classes.root}>
                    <div className="flex-container">
                        <TextField required id="outlined-required" className={classes.largeForm} variant="outlined" placeholder="Username"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            autoComplete='off' />
                        <TextField required id="outlined-required" className={classes.largeForm} variant="outlined" placeholder="Password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            autoComplete='off' />
                    </div>
                </form>
                <Button onClick={loginUser} className={classes.button} variant="contained"> Login </Button>
			</div>
			<Link to="/register">
				<Button className={classes.button} variant="contained"> Register User </Button>
			</Link>
        </div>
    );
}
