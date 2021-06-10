﻿import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 100,
	},
}));

export default function TimePeriodSelector(props) {
	const classes = useStyles();
	const [time, setTime] = React.useState("Year");
	const [open, setOpen] = React.useState(false);

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

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-controlled-open-select-label">Time Period</InputLabel>
				<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={time}
					onChange={handleTimePeriodUpdate}
				>
					<MenuItem value={'Quarter'}>1 Quarter</MenuItem>
					<MenuItem value={'HalfYear'}>2 Quarters</MenuItem>
					<MenuItem value={'Year'}>1 Year</MenuItem>
					<MenuItem value={'ThreeYears'}>3 Years</MenuItem>
					<MenuItem value={'FiveYears'}>5 Years</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
}
