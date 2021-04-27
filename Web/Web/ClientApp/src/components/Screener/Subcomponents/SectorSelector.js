import React, { useState } from 'react';
import './SectorSelector.css';
import './CustomToggleButton.js';
import SectorButtons from './CustomToggleButton.js';

export default function SectorSelector() {
	const [value, setValue] = useState(["Healthcare", "Mining", "Financial Services"])
	const [selected, setSelected] = useState([true, true, true])

	return (
		<> 
			{value.map((sector) =>
				<ToggleButton selected={selected} value={sector} toggleSelected={() => { setSelected(!selected); }}></ ToggleButton>
			)}
			<SectorButtons />
		</>
	);
}


export class ToggleButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {};
	}

	render() {
		const { selected, toggleSelected, value } = this.props;
		return (
			<>
				<button onClick={toggleSelected} className={selected ? "buttonSelected" : "button"}>{value}</ button>
			</>
		);
	}
}
