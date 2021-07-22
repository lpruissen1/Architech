import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './Rules.css';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 100,
		fontSize: 12
	},
	select: {
		backgroundColor: '#545454',
		borderRadius: 4,
		'&:before': {
			borderColor: '#c0c0c0',
		},
		'&:after': {
			borderColor: '#c0c0c0',
		}
	},
	icon: {
		fill: '#c0c0c0',
	},
	paper: {
		backgroundColor: '#545454'
	}
}));

export default function TimePeriodSelector(props) {
	const classes = useStyles();
	const [time, setTime] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const [timeSpans, setTimeSpans] = React.useState([
		{ value: 'Quarter', displayName: 'One Quarter' },
		{ value: 'HalfYear', displayName: 'Two Quarters' },
		{ value: 'Year', displayName: 'One Year' },
		{ value: 'ThreeYear', displayName: 'Three Years' },
		{ value: 'FiveYear', displayName: 'Five Years' }])

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

		for (let i = 0; i < timeSpans.length; i++) {
			appendedComponents.push(
				<MenuItem
					style={{backgroundColor: '#545454', color: '#d0d0d0', fontSize: 12}}
					key={timeSpans[i].value}
					value={timeSpans[i].value}
					disabled={!props.renderedTimeSpans.includes(timeSpans[i].value)}>{timeSpans[i].displayName}</MenuItem>
			)
		}

		return appendedComponents
	}

	return (
		<div className='time-selector-container'>
			<FormControl
				className={classes.formControl}>
				<InputLabel style={{ zIndex: 1, marginLeft: 5, marginTop: 2, color: '#d0d0d0', fontSize: 12 }}id="demo-controlled-open-select-label">Time Period</InputLabel>
				<Select
					className={classes.select}
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={time}
					onChange={handleTimePeriodUpdate}
					placeholder=''
					inputProps={{
						classes: {
							icon: classes.icon,
						},
					}}
					MenuProps={{
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "left"
						},
						getContentAnchorEl: null,
						classes: {
							paper: classes.paper,
						},
					}}
					>
					{createMenuItems()}
				</Select>
			</FormControl>
		</div>
	);
}
