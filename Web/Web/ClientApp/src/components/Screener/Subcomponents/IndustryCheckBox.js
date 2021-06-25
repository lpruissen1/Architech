import React, { useState } from 'react';
import './SectorSelector.css';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import IndustryCheckBoxContent from './IndustryCheckBoxContents.js';


const useStyles = makeStyles((theme) => ({
	checkbox: {
		color: '#696969',
		'&$checked': {
			color: theme.palette.primary.main,
			backgroundColor: "transparent !important",
		'&:hover': {
			backgroundColor: 'transparent !important'
		}
	},
	iconButton: {
		"&:hover": {
			backgroundColor: "green"
		}
	},
	checked: {},
	},
}));

export default function IndustryCheckBox(props) {
	const classes = useStyles();

	return (
		<div className='industryGridContainer'>
			<Grid
				container
				spacing={5}
			>
			{props.sectors && props.sectors.map(sector => {
				return (
					<Grid item xs={4}>
						<FormControl>
							<FormLabel
								className='industryLabel'
							>
								{sector.value}
							</FormLabel>
							<FormGroup>
								{sector.industries && sector.industries.map(industry => {
									return (
										<IndustryCheckBoxContent
											handleUpdate={props.handleUpdate}
										className={classes.checkbox}
										name={industry}
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
