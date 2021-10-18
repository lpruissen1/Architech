import Typography from '@material-ui/core/Typography';
import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function OrderCard(props) {

	return (
		<div style={{ backgroundColor: '#424242', borderRadius: 4 }}>
			<Grid container spacing={1} style={{ paddingTop: 16, paddingBottom: 16 }}>
				<Grid item xs={3}>
					<Typography variant='subtitle1' style={{ color: '#d0d0d0' }}>{props.order.status}</Typography>
					<Typography style={{ fontSize: 10, color: '#848484' }}>Order Sent: {props.order.createdAt}</Typography>
					{props.order.status === 'filled' ? <Typography style={{ fontSize: 10, color: '#848484' }}>Order Filled: {props.order.filledAt}</Typography> : <></>}
				</Grid>
				<Grid item xs={9}>
					<Typography style={{ fontSize: 10, color: '#848484' }}>Order ID - {props.order.orderId}</Typography>
					<Typography variant='subtitle1' style={{ color: '#ffffff' }}>{props.order.side} {props.order.ticker}</Typography>
					{props.order.status === 'filled'
						? <Typography variant='body1' style={{ color: '#e0e0e0' }}>{props.order.filledQuantity} @ ${(props.order.filledAmount / props.order.filledQuantity).toFixed(2)}</Typography>
						: <Typography variant='body1' style={{ color: '#e0e0e0' }}>{props.order.orderedAmount} @ Market </Typography>
					}
				</Grid> 
			</Grid>
		</div>
		)
}
