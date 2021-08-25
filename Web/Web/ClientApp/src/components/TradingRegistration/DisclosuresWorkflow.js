﻿import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedTextInput from '../Generic/OutlinedTextInput';

const useStyles = makeStyles((theme) => ({
	radio: {
		color: '#727272',
		'&$checked': {
			color: theme.palette.info.main
		},
		"& .MuiSvgIcon-root": {
			height: 18,
			weight: 18,
			width: 18
		}
	},
	checked: {}
}));

export default function DisclosuresWorkflow(props) {
	const classes = useStyles();

	const handleChange = (event) => { 
		props.setFundingSource(event.target.value);
	};

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Grid container spacing={1}>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 24}}><Typography variant='h6'>Funding</Typography></Grid>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#e0e0e0', marginBottom: 14 }}><Typography variant='body1'>Primary source of funds for this account</Typography></Grid>
					<Grid align='left' justify='left' style={{ marginLeft: 24 }} item xs={12}>
					<FormControl component="fieldset">
						<RadioGroup aria-label="gender" name="gender1" value={props.fundingSource} onChange={handleChange}>
							<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="employment_income" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Employment Income" />
							<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="investments" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Investments" />
							<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="inheritance" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Inheritance" />
							<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="business_income" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Business Income" />
							<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="savings" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Savings" />
							<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="family" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Family" />
						</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={1}>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 24 }}><Typography variant='h6'>Funding</Typography></Grid>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#e0e0e0', marginBottom: 14 }}><Typography variant='body1'>Primary source of funds for this account</Typography></Grid>
					<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }}
						control={<Radio
							classes={{ root: classes.radio, checked: classes.checked }}
							checked={props.isControlledPerson}
							onChange={() => props.setIsControlledPerson(!props.isControlledPerson)} />}
						label="I am a controlled person (defined by XYZ)" />
					<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }}
						control={<Radio
							classes={{ root: classes.radio, checked: classes.checked }}
							checked={props.isAffiliatedExchangeOrFinra}
							onChange={() => props.setIsAffiliatedExchangeOrFinra(!props.isAffiliatedExchangeOrFinra)} />}
						label="I am affiliated with an exchange or FINRA" />
					<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }}
						control={<Radio
							classes={{ root: classes.radio, checked: classes.checked }}
							checked={props.isPoliticallyExposed}
							onChange={() => props.setIsPoliticallyExposed(!props.isPoliticallyExposed)} />}
						label="I am politically exposed" />
					<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }}
						control={<Radio
							classes={{ root: classes.radio, checked: classes.checked }}
							checked={props.immediateFamilyExposed}
							onChange={() => props.setImmediateFamilyExposed(!props.immediateFamilyExposed)} />}
						label="I have an immediate family member who is politically exposed" />
				</Grid>
			</Grid>
		</Grid>
	)
}
