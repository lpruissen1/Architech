import React from 'react';
import Button from '@material-ui/core/Button';
import './NewPortfolioCard.css';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	button: {
		margin: '0 auto',
		display: "flex",
		width: '100%',
		fontWeight: '700',
		color: 'rgb(70, 70, 70)',
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 16,
		backgroundColor: 'lightgrey',
		textTransform: 'none',
		"&:hover": {
			backgroundColor: "#F1F1F1"
		}
	}
}));

export function NewPortfolioCard(props) {
	const classes = useStyles();

	return (
		<Button
			className={classes.button}
			onClick={props.onClick}
			variant="contained"
			disableElevation
			startIcon={<AddIcon />}> Create new blueprint </Button>
	);
} 
