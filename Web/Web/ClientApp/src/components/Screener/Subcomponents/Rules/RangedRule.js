import React, { useState } from "react";
//import Slider, { Range } from 'rc-slider';
import Slider from '@material-ui/core/Slider';
import 'rc-slider/assets/index.css';

export default function RangedRule(props) {
	const [value, setValue] = React.useState([props.rule.lower, props.rule.upper]);
	const [high, setHigh] = useState(props.rule.upper);
	const [low, setLow] = useState(props.rule.lower);

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
			<Slider
				min={props.option.selectorMin}
				max={props.option.selectorMax}
				value={value}
				onChange={updateRuleRanges}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
			/>
		</>
	);
}
