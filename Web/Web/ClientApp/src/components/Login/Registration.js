import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Registration.css';
import { makeStyles } from '@material-ui/core/styles';

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

	return (
		<div className="registration-card">
			<h1>Register</h1>
			<form className={classes.root}>
				<div className="flex-container">
					<div className="nameRow">
						<TextField required id="outlined-required" className={classes.smallForm} label="Required" variant="outlined" placeholder="First Name"
							InputLabelProps={{
							shrink: true,
						}}/>
						<TextField required id="outlined-required" className={classes.smallForm} label="Required" variant="outlined" placeholder="Last Name"
							InputLabelProps={{
							shrink: true,
						}} />
					</div>
					<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Username"
						InputLabelProps={{
						shrink: true,
					}}/>
					<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Password"
						InputLabelProps={{
						shrink: true,
					}}/>
					<TextField required id="outlined-required" className={classes.largeForm} label="Required" variant="outlined" placeholder="Email"
						InputLabelProps={{
						shrink: true,
					}}/>
				</div>
			</form>
		</div>
	);
}
