import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import './SaveButton.css'

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 600, 
	},
	buttonSaved: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 600,
		backgroundColor: theme.palette.primary
	}
}));

export default function SaveButton(props) {
	const [checked, setChecked] = useState(true)
	const classes = useStyles();

	const handleSaveClick = () => {
		setChecked(!checked)
		props.handleSave()
	}

	return (
		<>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous" />
			<Button
				onClick={handleSaveClick}
				variant='contained'
				color='primary'
				size="small"
				className={checked ? classes.button : classes.buttonSaved}
				disableElevation
			>
				{checked ? 'Save Index' : 'Saved'}
			</Button>
		</>)
}
