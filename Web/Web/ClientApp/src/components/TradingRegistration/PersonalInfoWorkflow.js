import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import ImageInput from '../Generic/ImageConverter';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import StatePicker from '../Generic/StatePicker';
import DatePicker from '../Generic/DatePicker';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	adornedEnd: {
		backgroundColor: "#c0c0c0"
	}
}));

export default function PersonalInfoWorkflow(props) {
	const classes = useStyles();

	return (
		<Grid container spacing={1} style={{ paddingLeft: 20, paddingRight: 20 }}>
			<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 24, marginBottom: 36}}><Typography variant='h5'>Personal Information</Typography></Grid>
			<Grid item xs={12}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
							<Grid item xs={4}>
								<OutlinedTextInput label='First Name' disabled={true} value={props.firstName} width='100%' onChange={(event) => props.setFirstName(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Last Name' disabled={true} value={props.lastName} width='100%' onChange={(event) => props.setLastName(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<DatePicker label='Date of Birth *' value={props.dateOfBirth} width='100%' setHighLevelState={props.setDateOfBirth} />
							</Grid>
						</Grid>
				`	</Grid>
					<Grid item xs={12}>
						<Grid container spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
							<Grid item xs={8}>
								<OutlinedTextInput label='Email Address' disabled={true} value={props.email} width='100%' onChange={(event) => props.setEmail(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Phone Number' placeholder='XXX-XXX-XXXX' value={props.phoneNumber} width='100%' onChange={(event) => props.setPhoneNumber(event.target.value)} />
							</Grid>
						</Grid>
				`	</Grid>
					<Grid item xs={12}>
						<Grid container spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
							<Grid item xs={8}>
								<OutlinedTextInput label='Street Address' value={props.address} width='100%' onChange={(event) => props.setAddress(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='City' value={props.city} width='100%' onChange={(event) => props.setCity(event.target.value)} />
							</Grid>
						</Grid>
				`	</Grid>
					<Grid item xs={12}>
						<Grid container spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
							<Grid item xs={4}>
								<StatePicker setState={props.setState} value={props.state}/>
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Postal Code' value={props.postalCode} width='100%' onChange={(event) => props.setPostalCode(event.target.value)} />
							</Grid>
							<Grid item xs={4}>
								<OutlinedTextInput label='Country of Tax Residency' value={props.taxResidency} width='100%' onChange={(event) => props.setTaxResidency(event.target.value)} />
							</Grid>
						</Grid>
				`	</Grid>
				</Grid>
			</Grid>
			<Grid align="left" justify="left" item xs={12} style={{ color: '#f0f0f0', marginTop: 24, marginBottom: 10 }}><Typography variant='h5'>Identity Verification</Typography></Grid>
			<Grid align="left" justify="left" item xs={12} style={{ color: '#e0e0e0', marginBottom: 36 }}><Typography variant='body1'>Upload images of the front and back of your driver's license</Typography></Grid>
			<Grid align='left' justify='left' item xs={6} style={{ paddingBottom: 80, paddingLeft: 30  }}>
				<ImageInput key='front' value={props.idFront} setImage={props.setIdFront} setFileName={props.setIdFrontFileName} label="Upload ID Front" id='front'/>
			</Grid>
			<Grid align='left' justify='left' item xs={6} style={{ paddingBottom: 80, paddingLeft: 30 }}>
				<ImageInput key='back' value={props.idBack} setImage={props.setIdBack} setFileName={props.setIdBackFileName} label="Upload ID Back" id='back'/>
			</Grid>
		</Grid>
	)
}
