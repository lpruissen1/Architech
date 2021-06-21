import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 140,
	},
}));

export default function TimePeriodSelector(props) {
	const classes = useStyles();
	const [time, setTime] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [timeSpans, setTimeSpans] = React.useState([
		{ value: 'Quarter', displayName: 'One Quarter' },
		{ value: 'HalfYear', displayName: 'Two Quarters' },
		{ value: 'Year', displayName: 'One Year' },
		{ value: 'ThreeYears', displayName: 'Three Years' },
		{ value: 'FiveYears', displayName: 'Five Years' }])

	const handleTimePeriodUpdate = (event) => {
		handleChange(event)
		props.updateTimePeriod(event.target.value)
	}

	const handleChange = (event) => {
		setTime(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const createMenuItems = () => {

		let appendedComponents = []
		debugger
		for (let i = 0; i < timeSpans.length; i++) {
			appendedComponents.push(
				<MenuItem
					value={timeSpans[i].value}
					disabled={!props.renderedTimeSpans.includes(timeSpans[i].value)}>{timeSpans[i].displayName}</MenuItem>
			)
		}

		return appendedComponents
	}

	return (
		<div>
			<FormControl
				className={classes.formControl}>
				<InputLabel id="demo-controlled-open-select-label">Time Period</InputLabel>
				<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={time}
					onChange={handleTimePeriodUpdate}
					placeholder=''
				>
					{createMenuItems()}
				</Select>
			</FormControl>
		</div>
	);
}
