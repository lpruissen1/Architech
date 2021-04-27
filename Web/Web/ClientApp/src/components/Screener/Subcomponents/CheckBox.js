import React from 'react';

export default function CheckBox(props) {
	return (
		<li class="checkbox">
			<input key={props.id} id={props.value + "Checkbox"} onClick={props.handleCheckChildElement} type="checkbox" checked={props.isChecked} value={props.value} /> <label for={props.value + "Checkbox"}>{props.value}</label>
		</li>
	)
};
