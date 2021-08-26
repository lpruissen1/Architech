import React, { useState } from 'react';
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

	const handleControlledPerson = (event) => {
		props.setIsControlledPerson(event.target.value)
	}

	const handleAffiliated = (event) => {
		props.setIsAffiliatedExchangeOrFinra(event.target.value)
	}

	const handleExposed = (event) => {
		props.setIsPoliticallyExposed(event.target.value)
	}

	const handleImmediateFamilyExposed = (event) => {
		props.setImmediateFamilyExposed(event.target.value)
	}

	return (
		<Grid container spacing={1} style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 36 }}>
			<Grid item xs={12}>
				<Grid container spacing={1}>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 24, marginBottom: 14 }}><Typography variant='h6'>SSN Verification</Typography></Grid>
					<Grid align='left' justify='left' item xs={12} style={{ paddingLeft: 70 }}>
						<OutlinedTextInput label='SSN' width='30%' value={props.ssn} onChange={(event) => props.setSsn(event.target.value)} />
					</Grid>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 30}}><Typography variant='h6'>Funding</Typography></Grid>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#e0e0e0', marginBottom: 14 }}><Typography variant='body1'>Primary source of funds for this account (select one)</Typography></Grid>
					<Grid align='left' justify='left' style={{ marginLeft: 24 }} item xs={12}>
					<FormControl component="fieldset">
							<RadioGroup aria-label="gender" name="gender1" value={props.fundingSource} onChange={handleChange}>
								<Grid container spacing={1} style={{ paddingLeft: 60 }}>
									<Grid item xs={4}>
										<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="employment_income" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Employment Income" />
									</Grid>
									<Grid item xs={8}>
										<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="investments" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Investments" />
									</Grid>
									<Grid item xs={4}>
										<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="inheritance" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Inheritance" />
									</Grid>
									<Grid item xs={8}>
										<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="business_income" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Business Income" />
									</Grid>
									<Grid item xs={4}>
										<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="savings" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Savings" />
									</Grid>
									<Grid item xs={8}>
										<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value="family" control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="Family" />
									</Grid>
								</Grid>
						</RadioGroup>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={1} style={{ marginBottom: 48 }}>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 30 }}><Typography variant='h6'>Additional Disclosures</Typography></Grid>
					<Grid align="left" justify="left" item xs={12} style={{ color: '#e0e0e0', marginBottom: 24 }}><Typography variant='body1'>Select true or false for each of the following statements</Typography></Grid>
					<Grid item xs={6} align='right' justify='right' style={{ color: '#c0c0c0' }}>
						<Typography variant='body2' style={{ marginTop: 8 }}>I am a controlled person (defined by XYZ)</Typography>
					</Grid>
					<Grid item xs={4}>
						<RadioGroup aria-label="gender" name="gender1" value={props.isControlledPerson} onChange={handleControlledPerson}>
							<Grid container>
								<Grid item xs={6}>
									<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value='true' control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="True" />
								</Grid>
								<Grid item xs={6}>
									<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value='false' control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="False" />
								</Grid>
							</Grid>
						</RadioGroup>
					</Grid>
					<Grid item xs={2}></Grid>
					<Grid item xs={6} align='right' justify='right' style={{ color: '#c0c0c0' }}>
						<Typography variant='body2' style={{ marginTop: 8 }}>I am affiliated with an exchange or FINRA</Typography>
					</Grid>
					<Grid item xs={4}>
						<RadioGroup aria-label="gender" name="gender1" value={props.isAffiliatedExchangeOrFinra} onChange={handleAffiliated}>
							<Grid container>
								<Grid item xs={6}>
									<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value='true' control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="True" />
								</Grid>
								<Grid item xs={6}>
									<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value='false' control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="False" />
								</Grid>
							</Grid>
						</RadioGroup>
					</Grid>
					<Grid item xs={2}></Grid>
					<Grid item xs={6} align='right' justify='right' style={{ color: '#c0c0c0' }}>
						<Typography variant='body2' style={{marginTop: 8 }}>I am politically exposed</Typography>
					</Grid>
					<Grid item xs={4}>
						<RadioGroup aria-label="gender" name="gender1" value={props.isPoliticallyExposed} onChange={handleExposed}>
							<Grid container>
								<Grid item xs={6}>
									<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value='true' control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="True" />
								</Grid>
								<Grid item xs={6}>
									<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value='false' control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="False" />
								</Grid>
							</Grid>
						</RadioGroup>
					</Grid>
					<Grid item xs={2}></Grid>
					<Grid item xs={6} align='right' justify='right' style={{ color: '#c0c0c0' }}>
						<Typography variant='body2' style={{marginTop: 8 }}>I have an immediate family member who is politically exposed</Typography>
					</Grid>
					<Grid item xs={4}>
						<RadioGroup aria-label="gender" name="gender1" value={props.immediateFamilyExposed} onChange={handleImmediateFamilyExposed}>
							<Grid container>
								<Grid item xs={6}>
									<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value='true' control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="True" />
								</Grid>
								<Grid item xs={6}>
									<FormControlLabel style={{ color: '#c0c0c0', fontSize: 11 }} value='false' control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label="False" />
								</Grid>
							</Grid>
						</RadioGroup>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
