import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

export default function ReviewPage(props) {

	return (
		<div>
			<Grid container spacing={1}>
				<Grid item alignContent='center' xs={4} style={{ color: '#f0f0f0', backgroundColor: '#484848', borderTopLeftRadius: 4, padding: 0, borderBottom: '2px solid #545454' }}>
					<div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<Typography variant='h6'>Personal Information</Typography>
					</div>
				</Grid>
				<Grid item xs={8} style={{borderBottom: '2px solid #545454'}}>
					<Grid container spacing={1} style={{paddingLeft: '5%'}}>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10, paddingTop: 20 }}><Typography variant='body1'><strong>Name: </strong>{props.firstName} {props.lastName}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10, paddingTop: 20 }}><Typography variant='body1'><strong>Date of Birth: </strong>{props.dateOfBirth}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>Email: </strong>{props.email}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>Phone Number: </strong>{props.phoneNumber}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>Address: </strong>{props.address}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>City: </strong>{props.city}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10}}><Typography variant='body1'><strong>State: </strong>{props.state}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>Postal Code: </strong>{props.postalCode}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10, paddingBottom: 20 }}><Typography variant='body1'><strong>SSN: </strong> {props.ssn && "XXX-XX-" + props.ssn.substring(props.ssn.length - 4)}</Typography></Grid>
						<Grid item align='left' justify='left' xs={6} style={{ color: '#d0d0d0', padding: 10, paddingBottom: 20 }}><Typography variant='body1'><strong>Tax Residency: </strong>{props.taxResidency}</Typography></Grid>
					</Grid>
				</Grid>
				<Grid item alignContent='center' xs={4} style={{ color: '#f0f0f0', backgroundColor: '#484848', padding: 0, borderBottom: '2px solid #545454' }}>
					<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Typography variant='h6'>Identity Verification</Typography>
					</div>
				</Grid>
				<Grid item xs={8} style={{ borderBottom: '2px solid #545454' }}>
					<Grid container spacing={1} style={{ paddingLeft: '5%' }}>
						<Grid item align='left' justify='left' xs={12} style={{ color: '#d0d0d0', paddingLeft: 10, paddingTop: 24, paddingBottom: 24 }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Grid container spacing={1}>
									<Grid item xs={2} style={{ color: '#d0d0d0'}}>
										<div style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
											<Typography><strong>License Front:</strong></Typography>
										</div>
									</Grid>
									<Grid item align='left' justify='left' xs={4} style={{ color: '#d0d0d0', padding: 10}}>{props.idFrontFileName && <Chip label={props.idFrontFileName} />}</Grid>
									<Grid item xs={2} style={{ color: '#d0d0d0' }}>
										<div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
											<Typography><strong>License Back:</strong></Typography>
										</div>
									</Grid>
									<Grid item align='left' justify='left' xs={4} style={{ color: '#d0d0d0', padding: 10}}>{props.idBackFileName && <Chip label={props.idBackFileName} />}</Grid>
								</Grid>
							</div> 
						</Grid>
					</Grid>
				</Grid>
				<Grid item alignContent='center' xs={4} style={{ color: '#f0f0f0', backgroundColor: '#484848', padding: 0, borderBottom: '2px solid #545454', borderBottomLeftRadius: 4 }}>
					<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Typography variant='h6'>Disclosures & Agreements</Typography>
					</div>
				</Grid>
				<Grid item xs={8} style={{ borderBottom: '2px solid #545454' }}>
					<Grid container spacing={1} style={{ paddingLeft: '5%' }}>
						<Grid item align='left' justify='left' xs={12} style={{ color: '#d0d0d0', padding: 10, paddingTop: 20 }}><Typography variant='body1'><strong>Funding Source: </strong>{props.fundingSource}</Typography></Grid>
						<Grid item align='left' justify='left' xs={12} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>Controlled Person: </strong>{props.isControlledPerson}</Typography></Grid>
						<Grid item align='left' justify='left' xs={12} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>FINRA Affiliated: </strong>{props.isAffiliatedExchangeOrFinra}</Typography></Grid>
						<Grid item align='left' justify='left' xs={12} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>Politically Exposed: </strong>{props.isPoliticallyExposed}</Typography></Grid>
						<Grid item align='left' justify='left' xs={12} style={{ color: '#d0d0d0', padding: 10 }}><Typography variant='body1'><strong>Family Exposed: </strong>{props.immediateFamilyExposed}</Typography></Grid>
						<Grid item align='left' justify='left' xs={12} style={{ color: '#d0d0d0', padding: 10, paddingBottom: 20 }}><Typography variant='body1'><strong>Agreement Signed: </strong>{props.agreed ? "true" : "false"}</Typography></Grid>
					</Grid>
				</Grid>
			</Grid> 
		</div>
	)
}
