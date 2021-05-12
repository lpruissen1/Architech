import React, { useState } from "react";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function RangedRule(props) {
	const [high, setHigh] = useState(props.rule.upper);
	const [low, setLow] = useState(props.rule.lower);

	const updateRuleRanges = (event) => {
		let rule = props.rule
		rule.lower = event[0]
		rule.upper = event[1]
		setHigh(event[1])
		setLow(event[0])
		props.handleUpdate()
	}

	return (
		<>
			<div>{props.option.displayName}</div>
			<div>High: {high}</div>
			<div>Low: {low}</div>
			<Range min={props.option.selectorMin} max={props.option.selectorMax} defaultValue={[props.rule.lower, props.rule.upper]} onAfterChange={updateRuleRanges} />
		</>
	);
}
