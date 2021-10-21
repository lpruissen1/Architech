import React, { useEffect, useState } from 'react';
import AuthClient from '../../Clients/AuthClient';
import OrderClient from '../../Clients/OrderClient';
import UserClient from '../../Clients/UserClient';
import OrderCard from './OrderCard';
import Grid from '@material-ui/core/Grid';

export default function OrderHistory(props) {
	const [orders, setOrders] = useState()


	const loadOrderHistory = async () => {
		const ordersResponse = await OrderClient.GetOrders(AuthClient.GetIdFromStoredJwt())
		setOrders(ordersResponse.orders)
	}

	const cancelOrder = async (order) => {
		var result = await OrderClient.CancelOrder(UserClient.GetIdFromStoredJwt(), order.orderId)

		if (result) {
			await loadOrderHistory()
		}
	}

	useEffect(() => { loadOrderHistory() }, [])

	return (
		<Grid container spacing={1}>
			{orders && orders.slice(0).reverse().map((order) => (
				<Grid item xs={10} style={{ marginBottom: 12 }}>
					<OrderCard order={order} cancelOrder={cancelOrder} />
				</Grid>
			))}
		</Grid>
	)
}
