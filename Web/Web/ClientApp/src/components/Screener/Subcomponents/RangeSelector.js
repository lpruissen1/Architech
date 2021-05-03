import React from "react";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function RangeSelector() {
	const [value, setValue] = React.useState(50);

    return (
		<Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
	);
}
