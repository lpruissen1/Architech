import React, { useState } from "react";
import Slider from '@material-ui/core/Slider';
import './Rules.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
	active: {},
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


export default function RangedRule(props) {
	const [value, setValue] = React.useState([props.rule.lower, props.rule.upper]);
	const [high, setHigh] = useState(props.rule.upper);
	const [low, setLow] = useState(props.rule.lower);
	const classes = useStyles();

	const updateRuleRanges = (event, newValue) => {
		setValue(newValue);
		let rule = props.rule
		rule.lower = value[0]
		rule.upper = value[1]
		setHigh(value[1])
		setLow(value[0])
		props.handleUpdate()
	}

	return (
		<>
			<div>{props.option.displayName}</div>
			<div>High: {high}</div>
			<div>Low: {low}</div>
			<div className={classes.root}>
				<RuleSlider
					valueLabelDisplay="auto"
					aria-label="pretto slider"
					min={props.option.selectorMin}
					max={props.option.selectorMax}
					value={value}
					valueLabelFormat={value => <div>{numFormatter(value)}</div>}
					onChange={(event, newValue) => setValue(newValue)}
					onChangeCommitted={updateRuleRanges}/>
			</div>
		</>
	);
}
