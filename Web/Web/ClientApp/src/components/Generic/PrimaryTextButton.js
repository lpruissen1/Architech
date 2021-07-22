import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from "react";

const useStyles = makeStyles((theme) => ({
	primaryTextButton: {
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
			className={classes.primaryTextButton}
			onClick={props.onClick}
			style={{ outline: 'none', ...props.style }}
		>
			{props.text}
		</Button>
	)
}

PrimaryTextButton.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	width: PropTypes.number,
	style: PropTypes.object
}
