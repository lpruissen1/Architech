﻿import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles, alpha } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


export const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		'& label.Mui-focused': {
			color: '#c0c0c0',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#848484',
			},
			'&:hover fieldset': {
				borderColor: '#969696',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#969696',
				boxShadow: `${alpha(theme.palette.info.main, 0.25)} 0 0 0 2px`,
				borderColor: theme.palette.info.main,
			},
		},
		"& .MuiOutlinedInput-root.Mui-disabled": {
			color: "#969696",
			'& fieldset': {
				borderColor: '#848484',
			},
		}
	},
	multilineColor: {
		color: '#f0f0f0',
	}
}));

// where did you come from and what was the state of where you came from
export default function OutlinedNumberInput(props) {

	const classes = useStyles();

	const handleInput = (event) => {
		const reg = /^\d+$/;
		if (reg.test(event.target.value) || event.target.value === '') {
			props.onChange(event)
		}
	}

	return (
		<TextField required id="outlined-required" className={classes.root} variant="outlined" size='smalll' label={props.label}
			InputLabelProps={{
				style: { color: '#f0f0f0', backgroundColor: '#363636', paddingRight: 10 },
				shrink: true
			}}
			classes={{ input: classes.input }}
			onChange={handleInput}
			disabled={props.disabled}
			error={props.error}
			autoComplete='off'
			value={props.value}
			style={{ borderRadius: 4, fontColor: '#ffffff', width: props.width }}
			helperText={props.helperText}
			placeholder={props.placeholder}
			type='number'
			InputProps={{ className: classes.multilineColor, ...props.InputProps }}
		/>
	)
}

OutlinedNumberInput.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	width: PropTypes.number,
	value: PropTypes.string
}
