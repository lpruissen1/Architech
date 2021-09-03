import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import PrimaryLinkButton from '../Generic/PrimaryLinkButton';
import RaisedCard from '../Generic/RaisedCard';
import './FundingModal.css';

export const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.success.dark,
		backgroundColor: '#fff',
		borderRadius: '50%'
	}
}));

export default function FundingModal(props) {

	return (
		<div className='funding-modal'>
			<RaisedCard style={{ boxShadow: 'none', width: '35%', height: '70%', margin: 'auto', padding: 40 }}>
				<Grid container spacing={1} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
					<Grid item xs={6}>
						<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
							<PrimaryActionButton text='Close' onClick={() =>props.fundMeDaddy()} />
						</div>
					</Grid>
				</Grid>
			</RaisedCard>
		</div>
	)
}
