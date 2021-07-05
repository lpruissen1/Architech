import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './SaveButton.css'

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 600, 
		minWidth: 200
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
		<div style={{display: 'flex', justifyContent: 'flex-end'}}>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossOrigin="anonymous" />
			<Button
				onClick={handleSaveClick}
				variant='contained'
				color='primary'
				size="small"
				style={{ outline: 'none' }}
				className={classes.button}
				disableElevation
			>
				{checked ? 'Save Index' : 'Saved'}
			</Button>
		</ div>)
}
