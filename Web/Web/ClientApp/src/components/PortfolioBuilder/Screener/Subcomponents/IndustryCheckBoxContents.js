﻿import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import React from 'react';
import './SectorSelector.css';

export default function IndustryCheckBoxContent(props) {

	return (
		<FormControlLabel
			control={
				<Checkbox
					style={{color: '#d0d0d0'}}
					color='primary'
					onClick={props.onClick}
					checked={props.isChecked}
					value={props.value}
					icon={
						<CheckBoxOutlineBlankIcon
							fontSize="small" />}
					checkedIcon={
						<CheckBoxIcon
							color='primary'
							fontSize="small" />}
				/>
			}
			style={{color: '#d0d0d0'}}
			label={props.label}
		/>
	);
}

