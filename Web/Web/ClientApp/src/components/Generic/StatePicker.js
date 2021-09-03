import PropTypes from 'prop-types';
import React from 'react';
import Picker from './Picker';

export default function StatePicker(props) {

	const options = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

	return (
		<Picker options={options} value={props.value} width={props.width} style={props.style} setState={props.setState} label="State *"/>)
}

StatePicker.propTypes = {
	width: PropTypes.number,
	style: PropTypes.object
}
