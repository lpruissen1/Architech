import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
import PrimaryLinkButton from '../Generic/PrimaryLinkButton';
import RaisedCard from '../Generic/RaisedCard';
import './FinishRegistrationModal.css';

export const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.success.dark,
		backgroundColor: '#fff',
		borderRadius: '50%'
	}
}));

export default function FinishRegistrationModal() {

	const classes = useStyles()

	return (
		<RaisedCard style={{ boxShadow: 'none', width: '35%', height: '70%', margin: 'auto', padding: 40 }}>
			<Grid container spacing={1} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
				<Grid item xs={12} style={{ height: '35%' }}>
					<div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
						<CheckCircleIcon className={classes.root} style={{ width: 96, height: 96 }} />
					</div>
				</Grid>
				<Grid item xs={12}>
					<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
						<Typography variant='h5'>Success!</Typography>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
						<Typography variant='body1'> Your Alpaca Brokerage account has been successfully created</Typography>
					</div>
				</Grid>
				<Grid item xs={6}>
					<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
						<PrimaryLinkButton to='/' text='Go to Dashboard' />
					</div>
				</Grid>
				<Grid item xs={6}>
					<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
						<PrimaryLinkButton to='/profile' text='Link an account' />
					</div>
				</Grid>
			</Grid>
		</RaisedCard>
	)
}
