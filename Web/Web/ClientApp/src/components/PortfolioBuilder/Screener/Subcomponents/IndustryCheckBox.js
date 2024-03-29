﻿import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import IndustryCheckBoxContent from './IndustryCheckBoxContents.js';
import './SectorSelector.css';

export default function IndustryCheckBox(props) {
	const handleOnClick = (event) => {

		let values = event.target.value.split("|")
		let sector = props.sectors.filter(sector => sector.value === values[0])[0]
		let targetIndustry = values[1]

		sector.industries && sector.industries.forEach(industry => {
			if (industry.value === targetIndustry) {
				industry.isChecked = !industry.isChecked
			}
		})

		if (sector.industries.filter(industry => industry.isChecked === true).length === sector.industries.length) {
			sector.isChecked = "checked"
		}
		else if (sector.industries.filter(industry => industry.isChecked === false).length === sector.industries.length) {
			sector.isChecked = "unchecked"
		}
		else {
			sector.isChecked = "partial"
		}

		if (props.sectors.filter(sector => sector.isChecked !== "checked").length > 0) {
			props.setSelectAllChecked(false)
		}

		props.handleUpdate()
	}

	return (
		<div style={{ justifyContent: 'center' }} className='industryGridContainer'>
			<Grid
				container
				spacing={5}
			>
			{props.sectors && props.sectors.map(sector => {
				return (
					<Grid item xs={4} key={sector.value}>
						<FormControl>
							<FormLabel
								style={{color: '#c0c0c0'}}
								className='industryLabel'
							>
								{sector.value}
							</FormLabel>
							<FormGroup>
								{sector.industries && sector.industries.map(industry => {
									return (
										<IndustryCheckBoxContent 
											key={industry.value}
											isChecked={industry.isChecked}
											value={sector.value + "|" + industry.value}
											onClick={handleOnClick}
											label={industry.value}
									/>)
								})
							}
							</FormGroup>
						</FormControl>
					</ Grid>)})}
			</ Grid>
		</div>
	)
}
