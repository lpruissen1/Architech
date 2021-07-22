import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


export const useStyles = makeStyles((theme) => ({
	largeForm: {
		margin: theme.spacing(1.5),
		width: '43ch',
		"& .MuiInputBase-root": {
			color: '#fff',
			height: 60,
			textAlign: 'center'
		}
	}
}));

// where did you come from and what was the state of where you came from
export default function TextInput(props) {

	const classes = useStyles();

	return (
		<TextField required id="outlined-required" className={classes.largeForm} variant="filled" label={props.label}
			InputLabelProps={{
				style: { color: '#c0c0c0' },
			}}
			onChange={props.onChange}
			error={props.error}
			autoComplete='off'
			style={{ backgroundColor: '#525252', borderRadius: 4, fontColor: '#fff', width: props.width}}
			helperText={props.helperText}
			type={props.type}
			InputProps={props.InputProps && props.InputProps}
		/>
	)
}

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	width: PropTypes.number,
}
