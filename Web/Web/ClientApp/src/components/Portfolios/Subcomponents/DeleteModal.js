import React, { useState } from 'react';
import './NewPortfolioCard.css';
import './PortfolioCard.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	modalButtonContinue: {
		textTransform: 'none',
		margin: theme.spacing(1),
	},
	modalButtonBack: {
		textTransform: 'none',
		margin: theme.spacing(1),
		color: 'dimgrey'
	}
}));


export default function DeleteModal(props) {
	const classes = useStyles()

	return (
		<div className="deleteModal">
			<Typography variant="subtitle2"> Are you sure you would like to delete this portfolio? </Typography>
			<Typography variant="body2"> Deleting an active portfolio will result in all holdings being sold. </Typography>
			<Button
				onClick={props.handleDelete}
				color="primary"
				variant='contained'
				className={classes.modalButtonContinue}
				disableElevation> Yes, delete portfolio </Button>
			<Button
				onClick={props.closeModal}
				variant="outlined"
				className={classes.modalButtonBack}> No, take me back </Button>
		</div>
	)
}
