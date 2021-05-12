import React from "react";
import { Range } from 'rc-slider';


export default function TimedRangeRule(props) {
	const updateRuleRanges = (event) => {
		let rule = props.rule
		rule.lower = event[0]
		rule.upper = event[1]
		props.handleUpdate()
	}

	const updateTimePeriod = (event) => {
		let rule = props.rule
		rule.timePeriod = event
		props.handleUpdate()
	}

	return (
		// dropdown with time periods
		<>
			<div>{props.option.displayName}</div>
			<Range min={props.option.selectorMin} max={props.option.selectorMax} defaultValue={[props.rule.lower, props.rule.upper]} onChange={updateRuleRanges} />
		</>
	);
}
