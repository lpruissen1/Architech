import React, { useState, useEffect } from 'react'
import AccountsClient from '../../Clients/AccountsClient'
import AuthClient from '../../Clients/AuthClient'

export default function OrderHistory(props) {
	const [orders, setOrders] = useState()


	const loadOrderHistory = async () => {
		const orders = await AccountsClient.GetOrders(AuthClient.GetIdFromStoredJwt())
		setOrders(orders)
	}

	useEffect(() => { loadOrderHistory() }, [])

	return (
		<>
			Taint
		</>
	)
}
