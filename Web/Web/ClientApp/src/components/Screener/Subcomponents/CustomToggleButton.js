import React from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './CustomToggleButton.css'

export default function CustomToggleButton(props) {

	return (
		<ToggleButton type="checkbox" className="toggleButton">{props.value}</ToggleButton>
	);
}
