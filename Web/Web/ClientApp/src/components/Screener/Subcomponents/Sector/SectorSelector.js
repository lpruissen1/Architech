import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import CheckBox from '../CheckBox.js';
import IndustryCheckBox from './IndustryCheckBox.js';
import './SectorSelector.css';

const useStyles = makeStyles((theme) => ({
	buttonUnchecked: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
	},
	buttonChecked: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		variant: 'contained',
		fontWeight: 500,
	},
	buttonPartial: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		variant: 'contained',
		fontWeight: 5000,
	},
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
			sectors.forEach(sector => sector.isChecked = "unchecked")
			sectors.forEach(sector => sector.industries.forEach(industry => industry.isChecked = false))
			setSelectAllChecked(false)	
		}
		else {
			sectors.forEach(sector => sector.isChecked = "checked")
			sectors.forEach(sector => sector.industries.forEach(industry => industry.isChecked = true))
			setSelectAllChecked(true)
		}

		props.handleUpdate()
	}

	const handleSectorOnClick = (event) => {
		let sectors = props.sectors
		sectors.forEach(sector => {
			if (sector.value === event.currentTarget.value) {
				if (sector.isChecked === "checked") {
					sector.isChecked = "unchecked"
					sector.industries.forEach(industry => industry.isChecked = false)
				}
				else{
					sector.isChecked = "checked"
					sector.industries.forEach(industry => industry.isChecked = true)
				}
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

	const GetSectorButtonStyle = (status) => {
		if (status === "unchecked") {
			return {
				className: classes.buttonUnchecked,
				variant: "outlined",
				color: "dimgray"
			}
		}
		if (status === "checked") {
			return {
				className: classes.buttonChecked,
				variant: "contained",
				color: "primary"
			}
		}

		return {
			className: classes.buttonPartial,
			variant: "contained",
			color: "secondary"
		}
	}

	return (
		<div className = "sectorSelectorContainer">
			<ul className="ks-cboxtags">
				<CheckBox
					type="checkbox"
					checked={selectAllChecked}
					onClick={handleAllChecked}
					id="5"
					value={selectAllChecked ? "Unselect All" : "Select All"}
				/>
				{
					props.sectors && props.sectors.map((sector) => {
						let style = GetSectorButtonStyle(sector.isChecked) 
						return (<Button
							className={style.className}
							key={sector.value}
							value={sector.value}
							onClick={handleSectorOnClick}
							variant={style.variant}
							disableElevation
							disableRipple
							color={style.color}
							style={{ outline: 'none' }}>
							{sector.value}
						</Button>)
					})
				}
			</ul>
			<Button
				className={classes.industryButton}
				onClick={handleIndustryClick}
				style={{ outline: 'none' }}
			>
				Filter By Industry
			</Button>
			{renderIndustry && <IndustryCheckBox
				sectors={props.sectors}
				handleUpdate={props.handleUpdate}
				setSelectAllChecked={setSelectAllChecked}
			/>}
		</div>
	);
}


