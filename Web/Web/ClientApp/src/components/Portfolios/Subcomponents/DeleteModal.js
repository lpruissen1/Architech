import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import './NewPortfolioCard.css';
import './PortfolioCard.css';

export const useStyles = makeStyles((theme) => ({
	modalButton: {
		textTransform: 'none',
		margin: theme.spacing(1),
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
				className={classes.modalButton}
				disableElevation> Yes, delete portfolio </Button>
			<Button
				onClick={props.closeModal}
				variant="outlined"
				className={classes.modalButton}> No, take me back </Button>
		</div>
	)
}
