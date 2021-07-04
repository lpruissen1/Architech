import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 600, 
		boxShadow: 'none'
	}
}));

export default function UpdateButton(props) {
	const classes = useStyles();

	return (
		<>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossOrigin="anonymous" />
			<Button
				onClick={props.handleUpdate}
				variant='contained'
				color='primary'
				size="small"
				style={{ outline: 'none' }}
				className={classes.button}>Update Index</Button>
			{!props.changeMade && <p> Changes saved successfully </p>}
		</>)
}
