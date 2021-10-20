import Typography from '@material-ui/core/Typography';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import OrderClient from '../../Clients/OrderClient';
import UserClient from '../../Clients/UserClient';
import Button from '@material-ui/core/Button';

export default function OrderCard(props) {

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
					<Typography variant='subtitle1' style={{ color: props.order.status === 'canceled' ? '#FF644C' : '#ffffff' }}>{capitalizeFirstLetter(props.order.status)}</Typography>
					{props.order.status !== 'filled' ? <Typography style={{ fontSize: 10, color: '#909090' }}>Order Sent: {formatDate(props.order.createdAt)}</Typography> : <></>}
					{props.order.status === 'filled' ? <Typography style={{ fontSize: 10, color: '#909090' }}>Order Filled: {formatDate(props.order.filledAt)}</Typography> : <></>}
				</Grid>
				<Grid item xs={7} style={{ paddingLeft: 20 }}>
					<Typography style={{ fontSize: 10, color: '#909090' }}>Order ID - {props.order.orderId}</Typography>
					<Typography variant='subtitle1' style={{ color: props.order.side === 'buy' ? '#64ffda' : '#FF644C', fontWeight: 600 }}>{capitalizeFirstLetter(props.order.side)} {props.order.ticker}</Typography>
					{props.order.status === 'filled'
						? <Typography variant='body1' style={{ color: '#d3d3d3' }}>{props.order.filledQuantity} shares @ ${(props.order.filledAmount / props.order.filledQuantity).toFixed(2)}/share</Typography>
						: <Typography variant='body1' style={{ color: '#d3d3d3' }}>${props.order.orderedAmount} @ Market </Typography>
					}
				</Grid>
				<Grid item xs={2} justify='right' align='top' style={{
					display: 'flex', width: '100%', height: '100%', justifyContent: 'right', alignItems: 'flex-start', paddingRight: 12
				}}>
					{(props.order.status !== "filled" && props.order.status !== "canceled")
						? <Button style={{ fontSize: 10, marginTop: 0, outline: 'none' }} color='primary' onClick={() => props.cancelOrder(props.order)}>Cancel</Button>
						: <></>
					}
				</Grid>
			</Grid>
		</div>
		)
}
