import React, { useState } from 'react';
import './SectorSelector.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

export default function IndustryCheckBoxContent(props) {
	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={props.name.isChecked}
					onChange={props.name.isChecked = !props.name.isChecked}
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

