import React from 'react';

export default function CheckBox(props) {
	return (
		<li className="checkbox">
			<input
				id={props.value + "Checkbox"}
				onChange={props.onClick}
				checked={props.checked}
				type="checkbox"
				value={props.value} />
			<label htmlFor={props.value + "Checkbox"}>{props.value}</label>
		</li>
	)
};
