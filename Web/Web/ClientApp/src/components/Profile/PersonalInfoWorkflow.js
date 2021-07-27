import React, { usestate } from 'react';
import { useState } from 'react';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import Grid from '@material-ui/core/Grid';

export default function PersonalInfoWorkflow(props) {
	const [firstName, setFirstName] = useState()

	return (
		<Grid container spacing={1} style={{ paddingLeft: '5%', paddingRight: '5%' }}>
			<Grid item xs={6} style={{ borderLeft: '1px solid #545454' }}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<OutlinedTextInput label='First Name' onChange={() => setFirstName('')} />
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Last Name' onChange={() => setFirstName('')} />
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} style={{ borderLeft: '1px solid #545454' }}>
				<OutlinedTextInput label='First Name' style={{ fontSize: 12 }} onChange={() => setFirstName('')} />
			</Grid> 
		</Grid>
	)
}
