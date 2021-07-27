import React, { useState, useEffect } from 'react';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import Grid from '@material-ui/core/Grid';

export default function PersonalInfoWorkflow(props) {

	return (
		<Grid container spacing={1} style={{ paddingLeft: '5%', paddingRight: '5%' }}>
			<Grid item xs={6} style={{ borderLeft: '2px solid #545454', paddingRight: 30 }}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<OutlinedTextInput label='First Name' value={props.firstName} onChange={(event) => props.setFirstName(event.target.value)} />
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Last Name' value={props.lastName} onChange={(event) => props.setLastName(event.target.value)} />
					</Grid>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Street Address' width='100%' onChange={(event) => props.setAddress(event.target.value)} />
					</Grid>
					<Grid item xs={5}>
						<OutlinedTextInput label='City' onChange={(event) => props.setCity(event.target.value)}/>
					</Grid>
					<Grid item xs={3}>
						<OutlinedTextInput label='State' onChange={(event) => props.setState(event.target.value)}/>
					</Grid>
					<Grid item xs={4}>
						<OutlinedTextInput label='Postal Code' onChange={(event) => props.setPostalCode(event.target.value)}/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} style={{ borderLeft: '2px solid #545454', paddingRight: 30 }}>
				<Grid container spacing={1}>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Email Address' value={props.email} width='100%' onChange={(event) => props.setEmail(event.target.value)} />
					</Grid>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Phone Number' width='100%' onChange={(event) => props.setPhoneNumber(event.target.value)}/>
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Date of Birth' onChange={(event) => props.setDateOfBirth(event.target.value)}/>
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Country of Tax Residency' onChange={(event) => props.setTaxResidency(event.target.value)}/>
					</Grid>
				</Grid>
			</Grid> 
		</Grid>
	)
}
