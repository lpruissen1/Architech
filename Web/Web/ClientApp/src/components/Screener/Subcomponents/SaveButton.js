import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import './SaveButton.css'

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 16
	},
	buttonSaved: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 16,
		backgroundColor: theme.palette.primary.dark
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
				? <Button onClick={handleSaveClick} variant='contained' color='primary' className={classes.button}>Save Index</Button>
				: <Button color='primary' variant='contained' className={classes.buttonSaved} endIcon={<CheckCircleOutlinedIcon />}>Saved</Button>}
		</>)
}
