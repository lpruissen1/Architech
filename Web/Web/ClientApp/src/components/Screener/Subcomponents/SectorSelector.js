import React, { useState } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import CustomToggleButton from './CustomToggleButton';
import ToggleButton from 'react-bootstrap/ToggleButton';

export default function SectorSelector() {
	const [value, setValue] = useState(["Healthcare", "Mining", "Financial Services"])

	const sectors = ["Healthcare", "Mining", "Financial Services"]


	return (
		<ToggleButtonGroup value={value} type="checkbox" value={value}> 
			{value.map((sector) =>
				<CustomToggleButton value={sector}>{sector}</CustomToggleButton >
			)}

		</ToggleButtonGroup>
	);
}
