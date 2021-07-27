import React, { useState, useEffect } from 'react';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import Grid from '@material-ui/core/Grid';
import UserClient from '../../Clients/UserClient';

export default function PersonalInfoWorkflow(props) {
	const [firstName, setFirstName] = useState(props.userInfo.firstName)
	const [lastName, setLastName] = useState(props.userInfo.lastName)
	const [address, setAddress] = useState()
	const [city, setCity] = useState()
	const [state, setState] = useState()
	const [postalCode, setPostalCode] = useState()
	const [email, setEmail] = useState(props.userInfo.email)
	const [phoneNumber, setPhoneNumber] = useState()
	const [dateOfBirth, setDateOfBirth] = useState()
	const [taxResidency, setTaxResidency] = useState()

	return (
		<Grid container spacing={1} style={{ paddingLeft: '5%', paddingRight: '5%' }}>
			<Grid item xs={6} style={{ borderLeft: '2px solid #545454', paddingRight: 30 }}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<OutlinedTextInput label='First Name' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Last Name' value={lastName} onChange={(event) => setLastName(event.target.value)} />
					</Grid>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Street Address' width='100%' onChange={(event) => setAddress(event.target.value)} />
					</Grid>
					<Grid item xs={5}>
						<OutlinedTextInput label='City' onChange={(event) => setCity(event.target.value)}/>
					</Grid>
					<Grid item xs={3}>
						<OutlinedTextInput label='State' onChange={(event) => setState(event.target.value)}/>
					</Grid>
					<Grid item xs={4}>
						<OutlinedTextInput label='Postal Code' onChange={(event) => setPostalCode(event.target.value)}/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} style={{ borderLeft: '2px solid #545454', paddingRight: 30 }}>
				<Grid container spacing={1}>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Email Address' value={email} width='100%' onChange={(event) => setEmail(event.target.value)} />
					</Grid>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Phone Number' width='100%' onChange={(event) => setPhoneNumber(event.target.value)}/>
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Date of Birth' onChange={(event) => setDateOfBirth(event.target.value)}/>
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Country of Tax Residency' onChange={(event) => setTaxResidency(event.target.value)}/>
					</Grid>
				</Grid>
			</Grid> 
		</Grid>
	)
}
