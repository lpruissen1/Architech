import React, { useState } from "react";
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import './Rules.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TimePeriodSelector from "./TimePeriodSelector";

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.primary,
		width: 300
	},
}));

function numFormatter(num) {
	if (num > 1000000 && num < 1000000000) {
		return (num / 1000000).toFixed(0) + 'M';
	} else if (num >= 1000000000 && num < 1000000000000) {
		return (num / 1000000000).toFixed(0) + 'B';
	} else if (num >= 1000000000000) {
		return (num / 1000000000000).toFixed(2) + 'T';
	} else if (num > 9999 && num < 100000) {
		return '< 0.1M';
	} else if (num < 10000) {
		return num
	}
}

const RuleSlider = withStyles({
	root: {
		height: 8,
		maxWidth: 240
	},
	thumb: {
		height: 20,
		width: 20,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: -6,
		marginLeft: -10,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},
	valueLabel: {
		left: 'calc(-50%)',
		fontSize: 10,
		width: 40,
	},
	track: {
		height: 6,
		borderRadius: 20,
	},
	rail: {
		height: 6,
		borderRadius: 20,
	},
})(Slider);


export default function TimeRangedRule(props) {
	const [value, setValue] = React.useState([props.rule.lower, props.rule.upper]);
	const [high, setHigh] = useState(props.rule.upper);
	const [low, setLow] = useState(props.rule.lower);
	const classes = useStyles();

	const updateView = (event, newValue) => {
		setValue(newValue);
		let rule = props.rule
		rule.lower = value[0]
		rule.upper = value[1]
		setHigh(value[1])
		setLow(value[0])
	}

	const updateRuleRanges = (event, newValue) => {
		updateView(event, newValue)
		props.handleUpdate()
	}

	const updateTimePeriod = (time) => {
		let rule = props.rule
		rule.timePeriod = time;
		props.handleUpdate()
	}

	const deleteRule = () => {
		const rule = props.rule
		props.deleteTimedRangeRule(rule)
	}

	return (
		<div className="ranged-rule-container">
			<Grid container
				spacing={1}
				direction="row"
				alignItems="flex-end">
				<Grid item xs={4} justifyContent="flex-start">
					<Typography style={{ marginBottom: 14 }}>{props.option.displayName}</Typography>
				</Grid>
				<Grid item xs={4} justifyContent="flex-start">
					<div className={classes.root}>
						<RuleSlider
							valueLabelDisplay="auto"
							min={props.option.selectorMin}
							max={props.option.selectorMax}
							value={value}
							valueLabelFormat={value => <div>{numFormatter(value)}</div>}
							onChange={updateView}
							onChangeCommitted={updateRuleRanges} />
					</div>
				</Grid>
				<Grid item xs={3} justify="center" align="center">
					<TimePeriodSelector
						updateTimePeriod={updateTimePeriod}
						renderedTimeSpans={props.renderedTimeSpans}/>
				</Grid>
				<Grid item xs={1} justifyContent='flex-end'>
					<IconButton onClick={deleteRule} aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>
		</div>
	);
}
