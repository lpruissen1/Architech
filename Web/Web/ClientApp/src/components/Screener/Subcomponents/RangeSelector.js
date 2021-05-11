import React from "react";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function RangeSelector(props) {

	// pass in initial input min/max and min/max for entire slider
	// we need an id for each rule so we can keep a list for display and removal purposes
	return (
		<>
			<div>{props.displayName}</div>
			<Range min={0} max={20} defaultValue={[3, 10]} />
		</>
	);
}
