import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import RaisedCard from '../Generic/RaisedCard';

export const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.success.dark,
		backgroundColor: '#fff',
		borderRadius: '50%'
	}
}));

export default function TransferComplete(props) {

	const classes = useStyles()

	return (
			<Grid container spacing={1} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
				<Grid item xs={12} style={{ height: '35%' }}>
					<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
						<CheckCircleIcon className={classes.root} style={{ width: 96, height: 96 }} />
					</div>
				</Grid>
				<Grid item xs={12}>
					<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
						<Typography variant='h5'>Transfer Initiated</Typography>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
						<Typography variant='body1'>ACH transfers will be displayed in your account in one business day</Typography>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
						<PrimaryActionButton text='Close' onClick={() => props.fundMeDaddy()} />
					</div>
				</Grid>
			</Grid>
	)
}
