import React from 'react'
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
	},
	multilineColor: {
		color: '#c0c0c0',
	}
}));

// where did you come from and what was the state of where you came from
export default function TextInput(props) {

	const classes = useStyles();

	return (
		<TextField required id="outlined-required" className={classes.root} variant="outlined" size='smalll' label={props.label}
			InputLabelProps={{
				style: { color: '#c0c0c0', backgroundColor: '#363636', paddingRight: 10 },
				shrink: true
			}}
			classes={{ input: classes.input }}
			onChange={props.onChange}
			error={props.error}
			autoComplete='off'
			value={props.value}
			style={{ borderRadius: 4, fontColor: '#fff', width: props.width}}
			helperText={props.helperText}
			type={props.type}
			InputProps={{ className: classes.multilineColor }}
		/>
	)
}

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	width: PropTypes.number,
	value: PropTypes.string
}
