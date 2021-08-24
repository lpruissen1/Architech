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

	return (
		<Grid container spacing={1} style={{ paddingLeft: '16%', paddingRight: '12%'}}>
			<Grid item xs={6} style={{ color: '#f0f0f0' }}><Typography variant='h6'>Funding</Typography></Grid>
			<Grid item xs={6} style={{ color: '#f0f0f0', paddingLeft: '10%' }}><Typography variant='h6'>Restrictions</Typography></Grid>
			<Grid item xs={6} style={{ color: '#c0c0c0' }}><Typography variant='body1'>Primary source of funds for this account</Typography></Grid>
			<Grid item xs={6} style={{ color: '#c0c0c0', paddingLeft: '10%' }}><Typography variant='body1'>Select all that apply</Typography></Grid>
			<Grid item xs={6} style={{ paddingLeft: '5%', paddingTop: 10 }}>
				
			</Grid>
			<Grid item xs={6} style={{ paddingLeft: '15%', paddingTop: 10 }}>
			</Grid> 
			<Grid item xs={12} style={{ paddingRight: 20 }}>
				<OutlinedTextInput label='Street Address' width='100%' onChange={(event) => props.setAddress(event.target.value)} />
			</Grid>
			<Grid item xs={5}>
				<OutlinedTextInput label='City' onChange={(event) => props.setCity(event.target.value)} />
			</Grid>
			<Grid item xs={3}>
				<OutlinedTextInput label='State' onChange={(event) => props.setState(event.target.value)} />
			</Grid>
			<Grid item xs={4}>
				<OutlinedTextInput label='Postal Code' onChange={(event) => props.setPostalCode(event.target.value)} />
			</Grid>
			<Grid item xs={12} style={{ paddingRight: 20 }}>
				<OutlinedTextInput label='Email Address' value={props.email} width='100%' onChange={(event) => props.setEmail(event.target.value)} />
			</Grid>
			<Grid item xs={12} style={{ paddingRight: 20 }}>
				<OutlinedTextInput label='Phone Number' width='100%' onChange={(event) => props.setPhoneNumber(event.target.value)} />
			</Grid>
		</Grid>
	)
}
