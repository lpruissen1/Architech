import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	buttonChecked: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		backgroundColor: theme.palette.primary.main,
		color: 'rgba(100, 255, 215)',
		minWidth: 140,
		border: '2px solid',
		borderColor: 'rgba(100, 255, 215)'
	},
	buttonUnchecked: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		color: '#d0d0d0',
		minWidth: 140,
		borderColor: '#d0d0d0',
		border: '2px solid'
	}
}));

export default function PrimaryToggleButton(props) {

	const classes = useStyles()

	return (
		<Button
			disableElevation
			disableRipple
			className={props.checked ? classes.buttonChecked : classes.buttonUnchecked}
			onClick={props.onClick}
			variant={props.checked ? 'contained' : 'outlined'}
			color={props.checked ? 'primary' : 'default'}
			style={{ outline: 'none', ...props.style }}
			value={props.value}
		>
			{props.text}
		</Button> 
		)
}

