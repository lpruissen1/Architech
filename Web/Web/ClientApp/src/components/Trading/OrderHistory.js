import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState } from 'react';
import AuthClient from '../../Clients/AuthClient';
import OrderClient from '../../Clients/OrderClient';
import UserClient from '../../Clients/UserClient';
import PrimaryTextButton from '../Generic/PrimaryTextButton';

export default function OrderHistory(props) {
	const [orders, setOrders] = useState()


	const loadOrderHistory = async () => {
		const ordersResponse = await OrderClient.GetOrders(AuthClient.GetIdFromStoredJwt())
		setOrders(ordersResponse.orders)
	}

	const cancelOrder = async (order) => {
		await OrderClient.CancelOrder(UserClient.GetIdFromStoredJwt(), order.orderId)
	}

	useEffect(() => { loadOrderHistory() }, [])

	return (
		<>
			<Typography variant="h6" gutterBottom component="div">
				Orders
			</Typography>
			<Table size="small" aria-label="purchases">
				<TableHead>
					<TableRow>
						<TableCell style={{ color: '#d0d0d0' }}>Order Id</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Ticker</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Created Time</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Filled Time</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Direction</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Order Amount</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Order Quantity</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Filled Amount</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Filled Quantity</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Status</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders && orders.slice(0).reverse().map((order) => (
						<TableRow key={orders.OrderId}>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.orderId}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.ticker}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.createdAt}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.filledAt ? order.filledAt : "--"}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.side}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.orderedAmount ? order.orderedAmount : "--"}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.orderedQuantity ? order.orderedQuantity : "--"}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.filledAmount ? order.filledAmount : "--"}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.filledQuantity ? order.filledQuantity : "--"}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{order.status}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{(order.status !== "filled" && order.status !== "canceled") ? <PrimaryTextButton text="Cancel Order" onClick={() => cancelOrder(order)} /> : <></>}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
