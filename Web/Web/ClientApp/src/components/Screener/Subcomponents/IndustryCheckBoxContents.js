import React, { useState } from 'react';
import './SectorSelector.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

export default function IndustryCheckBoxContent(props) {
	const [check, setCheck] = useState(props.name.isChecked)

	const handleCheck = (event) => {
		const checked = props.name.isChecked
		props.name.isChecked = !checked

		setCheck(props.name.isChecked)
	}

	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={props.name.isChecked}
					onChange={handleCheck}
					icon={
						<CheckBoxOutlineBlankIcon
							fontSize="small" />}
					checkedIcon={
						<CheckBoxIcon
							color='primary'
							fontSize="small" />}
				/>
			}
			label={props.name.value}
		/>
	);
}

