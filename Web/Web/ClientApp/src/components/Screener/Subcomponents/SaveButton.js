import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import './SaveButton.css'

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 16,
		fontWeight: 550,
		border: '2px solid'
	},
	buttonSaved: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 16,
		fontWeight: 550,
		backgroundColor: theme.palette.primary
	}
}));

export default function SaveButton(props) {
	const [checked, setChecked] = useState(true)
	const classes = useStyles();

	const handleSaveClick = (event) => {
		setChecked(!checked)
		props.handleSave()
	}

	return (
		<>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous" />
			{checked
				? <Button onClick={handleSaveClick} variant='outlined' color='primary' className={classes.button}>Save Index</Button>
				: <Button color='primary' variant='contained' className={classes.buttonSaved} endIcon={<CheckCircleOutlinedIcon />}>Saved</Button>}
		</>)
}
