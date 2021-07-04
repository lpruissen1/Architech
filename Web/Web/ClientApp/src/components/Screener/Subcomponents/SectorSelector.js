import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import IndustryCheckBox from './IndustryCheckBox.js';
import './SectorSelector.css';




const useStyles = makeStyles((theme) => ({
	buttonUnchecked: {
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		borderColor: '#696969',
		color: '#696969',
		width: '100%',
		borderRadius: 10,
	},
	buttonChecked: {
		textTransform: 'none',
		fontSize: 14,
		variant: 'contained',
		fontWeight: 500,
		color: '#fff',
		width: '100%',
		borderRadius: 10,
	},
	buttonPartial: {
		textTransform: 'none',
		fontSize: 14,
		variant: 'contained',
		backgroundColor: 'rgba(41, 139, 114, .6)',
		color: '#fff',
		width: '100%',
		borderRadius: 10,
		'&:hover': {
			backgroundColor: 'rgba(41, 139, 114, .7)',
		},

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

		if (sectors.filter(sector => sector.isChecked === "unchecked").length > 0) {
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
				variant: "outlined"
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
			variant: "contained"
		}
	}

	return (
		<div className = "sectorSelectorContainer">
			<Grid
				container
				spacing={1}
			>
				<Grid item xs={3}>
					<Button
						className={selectAllChecked ? classes.buttonChecked : classes.buttonUnchecked}
						variant={selectAllChecked ? 'contained' : 'outlined'}
						color={selectAllChecked ? 'primary' : undefined}
						disableElevation
						disableRipple
						style={{ outline: 'none' }}
						onClick={handleAllChecked}
						id="5"
					>{selectAllChecked ? 'Unselect All' : 'Select All'}</Button>
				</Grid>
				{
					props.sectors && props.sectors.map((sector) => {
						let style = GetSectorButtonStyle(sector.isChecked) 
						return (
						<Grid item xs={3}>
							<Button
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
							</Button>
						</Grid>)
					})
				}
			</Grid>
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


