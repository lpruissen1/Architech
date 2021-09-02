import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

export const useStyles = makeStyles((theme) => ({
	buttonChecked: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		backgroundColor: theme.palette.primary.main,
		color: '#303030',
		minWidth: 140,
		border: '2px solid rgba(255,215,100)',
		'&:hover': {
			border: '2px solid #CCAC50'
		},
	},
	buttonUnchecked: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		color: '#d0d0d0',
		minWidth: 140,
		borderColor: '#d0d0d0',
		border: '2px solid'
	}
}));

export default function PrimaryToggleButton(props) {

	const classes = useStyles()

	return (
		<Button
			disableElevation
			disableRipple
			className={props.checked ? classes.buttonChecked : classes.buttonUnchecked}
			onClick={props.onClick}
			variant={props.checked ? 'contained' : 'outlined'}
			color={props.checked ? 'primary' : 'default'}
			style={{ outline: 'none', ...props.style }}
			value={props.value}
		>
			{props.text}
		</Button> 
	)
}

PrimaryToggleButton.propTypes = {
	text: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	width: PropTypes.number,
	style: PropTypes.object
}

