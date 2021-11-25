import Typography from '@material-ui/core/Typography';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default function TransferCard(props) {

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date.toString('YYYY-MM-dd')
	}

	return (
		<div style={{ backgroundColor: '#505050', borderRadius: 6 }}>
			<Grid container spacing={1} style={{ paddingTop: 16, paddingBottom: 16 }}>
				<Grid item xs={3} style={{ borderRight: '1px solid #909090', paddingLeft: 20, paddingRight: 8 }}>
					<Typography variant='subtitle1' style={{ color: props.transfer.status === 'CANCELED' ? '#FF644C' : '#ffffff' }}>{capitalizeFirstLetter(props.transfer.status)}</Typography>
					<Typography style={{ fontSize: 10, color: '#909090' }}>Transfer Sent: {formatDate(props.transfer.created)}</Typography>
				</Grid>
				<Grid item xs={7} style={{ paddingLeft: 20 }}>
					<Typography style={{ fontSize: 10, color: '#909090' }}>Transfer ID - {props.transfer.transferId}</Typography>
					<Typography variant='subtitle1' style={{ color: props.transfer.direction === 'INCOMING' ? '#64ffda' : '#FF644C', fontWeight: 600 }}>{capitalizeFirstLetter(props.transfer.direction)} ${props.transfer.amount}</Typography>
				</Grid>
				<Grid item xs={2} justify='right' align='top' style={{
					display: 'flex', width: '100%', height: '100%', justifyContent: 'right', alignItems: 'flex-start', paddingRight: 12
				}}>
					{(props.transfer.status !== "COMPLETE" && props.transfer.status !== "CANCELED")
						? <Button style={{ fontSize: 10, marginTop: 0, outline: 'none' }} color='primary' onClick={() => props.cancelTransfer(props.transfer)}>Cancel</Button>
						: <></>
					}
				</Grid>
			</Grid>
		</div>
	)
}
