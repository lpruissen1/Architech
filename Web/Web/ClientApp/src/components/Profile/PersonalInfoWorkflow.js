import React, { usestate } from 'react';
import { useState } from 'react';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import Grid from '@material-ui/core/Grid';

export default function PersonalInfoWorkflow(props) {
	const [firstName, setFirstName] = useState()

	return (
		<Grid container spacing={1} style={{ paddingLeft: '5%', paddingRight: '5%' }}>
			<Grid item xs={6} style={{ borderLeft: '2px solid #545454', paddingRight: 30 }}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<OutlinedTextInput label='First Name' onChange={() => setFirstName('')} />
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Last Name' onChange={() => setFirstName('')} />
					</Grid>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Street Address' width='100%' />
					</Grid>
					<Grid item xs={5}>
						<OutlinedTextInput label='City' />
					</Grid>
					<Grid item xs={3}>
						<OutlinedTextInput label='State' />
					</Grid>
					<Grid item xs={4}>
						<OutlinedTextInput label='Postal Code' />
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} style={{ borderLeft: '2px solid #545454', paddingRight: 30 }}>
				<Grid container spacing={1}>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Email Address' width='100%' />
					</Grid>
					<Grid item xs={12} style={{ paddingRight: 20 }}>
						<OutlinedTextInput label='Phone Number' width='100%' />
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Date of Birth' />
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Country of Tax Residency' />
					</Grid>
				</Grid>
			</Grid> 
		</Grid>
	)
}
