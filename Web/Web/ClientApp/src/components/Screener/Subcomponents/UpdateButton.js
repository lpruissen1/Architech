import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 600, 
		boxShadow: 'none'
	},
	buttonSaved: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 600,
		boxShadow: 'none',
		backgroundColor: theme.palette.primary
	}
}));

export default function UpdateButton(props) {
	const classes = useStyles();

	return (
		<>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous" />
			<Button onClick={props.handleUpdate} variant='contained' color='primary' size="small" className={classes.button}>Update Index</Button>
			{!props.changeMade && <p> Changes saved successfully </p>}
		</>)
}
