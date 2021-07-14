import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	industryButton: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		color: theme.palette.primary.main,
		'&:hover': {
			color: theme.palette.primary.dark,
		},
	}
}));

export default function PrimaryTextButton(props) {
	const classes = useStyles()

	return (
		<Button
			className={classes.industryButton}
			onClick={props.onClick}
			style={{ outline: 'none', ...props.style }}
		>
			{props.text}
		</Button>
	)
}
