import React, { useState, useEffect } from "react";
import CheckBox from './CheckBox.js';
import IndustryCheckBox from './IndustryCheckBox.js';
import './SectorSelector.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	industryButton: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		backgroundColor: '#fff',
		color: theme.palette.primary.main,
		'&:hover': {
			backgroundColor: '#fff',
			color: theme.palette.primary.dark,
		},
	}
}));


export default function SectorSelector(props) {
	const classes = useStyles()
	const [renderIndustry, setRenderIndustry] = useState(false)
	const [selectAllChecked, setSelectAllChecked] = useState(false)

	const handleAllChecked = () => {
		let sectors = props.sectors
		if (selectAllChecked) {
			sectors.forEach(sector => sector.isChecked = false)
			sectors.forEach(sector => sector.industries.forEach(industry => industry.isChecked = false))
			setSelectAllChecked(false)	
		}
		else {
			sectors.forEach(sector => sector.isChecked = true)
			sectors.forEach(sector => sector.industries.forEach(industry => industry.isChecked = true))
			setSelectAllChecked(true)
		}

		props.handleUpdate()
	}

	const handleCheckChildElement = (event) => {
		let sectors = props.sectors
		sectors.forEach(sector => {
			if (sector.value === event.target.value) {
				sector.isChecked = event.target.checked
				sector.industries.forEach(industry => industry.isChecked = event.target.checked)
			}
		})

		if (sectors.filter(sector => sector.isChecked === false).length > 0) {
			setSelectAllChecked(false)
		}

		props.handleUpdate()
	}

	const handleIndustryClick = () => {
		setRenderIndustry(!renderIndustry)
	}

	return (
		<div className = "sectorSelectorContainer">
			<ul className="ks-cboxtags">
				<CheckBox
					type="checkbox"
					checked={selectAllChecked}
					onClick={handleAllChecked}
					id="5"
					value="Select All"
				/>
				{
					props.sectors && props.sectors.map((sector) => {
						return (<CheckBox
							checked={sector.isChecked}
							key={sector.value}
							onClick={handleCheckChildElement}  {...sector}
						/>)
					})
				}
			</ul>
			<Button
				className={classes.industryButton}
				onClick={handleIndustryClick}
				style={{ outline: 'none' }}
			>Filter By Industry</Button>
			{renderIndustry && <IndustryCheckBox
				sectors={props.sectors}
				handleUpdate={props.handleUpdate}
			/>}
		</div>
	);
}


