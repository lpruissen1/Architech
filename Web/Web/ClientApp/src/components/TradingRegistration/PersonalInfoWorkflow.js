import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ImageInput from '../Generic/ImageConverter';
import OutlinedTextInput from '../Generic/OutlinedTextInput';

export default function PersonalInfoWorkflow(props) {

	return (
		<Grid container spacing={1} style={{ paddingLeft: 20, paddingRight: 20 }}>
			<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 24, marginBottom: 24}}><Typography variant='h6'>Personal Information</Typography></Grid>
			<Grid item xs={12}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
							<Grid item xs={4}>
								<OutlinedTextInput label='First Name' width='100%' value={props.firstName} onChange={(event) => props.setFirstName(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Last Name' width='100%' value={props.lastName} onChange={(event) => props.setLastName(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Date of Birth' width='100%' onChange={(event) => props.setDateOfBirth(event.target.value)} />
							</Grid>
						</Grid>
				`	</Grid>
					<Grid item xs={12}>
						<Grid container spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
							<Grid item xs={8}>
								<OutlinedTextInput label='Email Address' value={props.email} width='100%' onChange={(event) => props.setEmail(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Phone Number' width='100%' onChange={(event) => props.setPhoneNumber(event.target.value)} />
							</Grid>
						</Grid>
				`	</Grid>
					<Grid item xs={12}>
						<Grid container spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
							<Grid item xs={8}>
								<OutlinedTextInput label='Street Address' width='100%' onChange={(event) => props.setAddress(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='City' width='100%' onChange={(event) => props.setCity(event.target.value)} />
							</Grid>
						</Grid>
				`	</Grid>
					<Grid item xs={12}>
						<Grid container spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
							<Grid item xs={4}>
								<OutlinedTextInput label='State' width='100%' onChange={(event) => props.setState(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Postal Code' width='100%' onChange={(event) => props.setPostalCode(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Country of Tax Residency' width='100%' onChange={(event) => props.setTaxResidency(event.target.value)} />
							</Grid>
						</Grid>
				`	</Grid>
				</Grid>
			</Grid>
			<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 24 }}><Typography variant='h6'>Identity Verification</Typography></Grid>
			<Grid align="left" justify="left" item xs={12} style={{ color: '#e0e0e0', marginBottom: 30 }}><Typography variant='body1'>Upload images of the front and back of your driver's license</Typography></Grid>
			<Grid align='left' justify='left' item xs={6} style={{ paddingBottom: 80, paddingLeft: 30  }}>
				<ImageInput key='front' setImage={props.setIdFront} label="Upload ID Front" id='front'/>
			</Grid>
			<Grid align='left' justify='left' item xs={6} style={{ paddingBottom: 80, paddingLeft: 30 }}>
				<ImageInput key='back' setImage={props.setIdBack} label="Upload ID Back" id='back'/>
			</Grid>
		</Grid>
	)
}
