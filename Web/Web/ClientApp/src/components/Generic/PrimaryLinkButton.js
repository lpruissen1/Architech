import Button from '@material-ui/core/Button';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 16,
		fontWeight: 700,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 4,
		backgroundColor: 'rgba(255,215,100)',
		color: '#303030',
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
			boxShadow: 'none',
		},
	},
	disabledButton: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 16,
		fontWeight: 700,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 4,
		backgroundColor: '#727272',
		color: '#303030',
		'&:hover': {
			backgroundColor: '#727272',
			boxShadow: 'none',
		},
	}
}));


export default function PrimaryLinkButton(props) {
	const classes = useStyles()

	return (
		<Link to={props.to} style={{textDecoration: 'none'}}> 
		<Button
			className={props.disabled ? classes.disabledButton : classes.root}
			variant="contained"
			style={{ outline: 'none', textDecoration: 'none', width: props.width, ...props.style }}
			disableElevation
		>
			{props.text}
			</Button>
		</Link>
	)
}

PrimaryLinkButton.propTypes = {
	text: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	width: PropTypes.number,
	style: PropTypes.object,
	to: PropTypes.string.isRequired
}
