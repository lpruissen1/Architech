import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import IndustryCheckBox from './IndustryCheckBox.js';
import './SectorSelector.css';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
	buttonUnchecked: {
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		paddingLeft: 10,
		paddingRight: 10,
		borderColor: '#d0d0d0',
		color: '#d0d0d0',
		width: '100%',
		borderRadius: 10,
		border: '2px solid'
	},
	buttonChecked: {
		textTransform: 'none',
		fontSize: 14,
		variant: 'contained',
		fontWeight: 500,
		paddingLeft: 10,
		paddingRight: 10,
		color: '#303030',
		backgroundColor: theme.palette.primary.main,
		width: '100%',
		borderRadius: 10,
		border: '2px solid',
		borderColor: theme.palette.primary.main
	},
	buttonPartial: {
		textTransform: 'none',
		fontSize: 14,
		variant: 'contained',
		backgroundColor: fade(theme.palette.primary.main, 0.6),
		color: '#303030',
		width: '100%',
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		border: '2px solid',
		borderColor: theme.palette.primary.main,
		'&:hover': {
			backgroundColor: fade(theme.palette.primary.main, 0.7),
		},
	},
	industryButton: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		color: theme.palette.primary.dark,
		'&:hover': {
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
				spacing={2}
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
						<Grid item xs={3} key={sector.value}>
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


