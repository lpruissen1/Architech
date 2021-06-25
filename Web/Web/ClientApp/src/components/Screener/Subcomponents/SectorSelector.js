import React, { useState } from "react";
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

	const handleAllChecked = (event) => {
		let sectors = props.sectors
		sectors.forEach(sector => sector.isChecked = event.target.checked)

		props.handleUpdate()
	}

	const handleCheckChildElement = (event) => {
		let sectors = props.sectors
		sectors.forEach(sector => {
			if (sector.value === event.target.value)
				sector.isChecked = event.target.checked
		})

		props.handleUpdate()
	}

	const handleIndustryClick = () => {
		setRenderIndustry(true)
	}

	return (
		<div className = "sectorSelectorContainer">
			<ul className="ks-cboxtags">
				<CheckBox
					type="checkbox"
					handleCheckChildElement={handleAllChecked}
					id="5"
					value="Toggle All Sectors"
				/>
				{
					props.sectors && props.sectors.map((sector) => {
						return (<CheckBox
							key={sector.value}
							handleCheckChildElement={handleCheckChildElement}  {...sector}
						/>)
					})
				}
			</ul>
			<Button
				className={classes.industryButton}
				onClick={handleIndustryClick}
				style={{ outline: 'none' }}
			>Filter By Industry</Button>
			{renderIndustry && <IndustryCheckBox sectors={props.sectors} />}
		</div>
	);
}


