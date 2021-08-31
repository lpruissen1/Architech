import React, { useState } from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from "@date-io/moment";
import moment from "moment";
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
		},
		'& .MuiButtonBase-root': {
			color: '#c0c0c0',
			outline: 'none'
		}
	},
	multilineColor: {
		color: '#f0f0f0',
	}
}));

// where did you come from and what was the state of where you came from
export default function DatePicker(props) {

	const classes = useStyles();

	const [selectedDate, handleDateChange] = useState()

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				label={props.label}
				value={selectedDate}
				InputLabelProps={{
					style: { color: '#f0f0f0', backgroundColor: '#363636', paddingRight: 10 },
					shrink: true
				}}
				className={classes.root}
				variant="inline"
				format="MM/dd/yyyy"
				style={{ borderRadius: 4, fontColor: '#ffffff', width: props.width }}
				inputVariant="outlined"
				margin="normal"
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
				InputProps={{
					className: classes.multilineColor
				}}
				onChange={val => {
					handleDateChange(val);
					props.setHighLevelState(moment(val).format('MM-DD-YYYY'));
				}}
			/>
		</MuiPickersUtilsProvider>
	)
}

DatePicker.propTypes = {
	label: PropTypes.string.isRequired,
	setHighLevelState: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	width: PropTypes.number,
	value: PropTypes.string
}
