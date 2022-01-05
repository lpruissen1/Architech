import React, { useState, useEffect } from 'react';
import FundingClient from '../../Clients/FundingClient';
import UserClient from '../../Clients/UserClient';
import Grid from '@material-ui/core/Grid';
import TransferCard from './TransferCard';

export default function TransferRequests() {
	const [transfers, setTransfers] = useState()
	const [value, setValue] = useState(0)

	const loadTransfers = async () => {
		const transfers = await FundingClient.GetTransfers(UserClient.GetIdFromStoredJwt())
		setTransfers(transfers)
	}

	useEffect(() => { loadTransfers() }, [value, transfers])

	const cancelTransfer = async (transfer) => {
		await FundingClient.CancelTransfer(UserClient.GetIdFromStoredJwt(), transfer.transferId)
		setValue(value + 1)
	}

	return (
		<div style={{width: '100%', minHeight: 480}}>
			<Grid container spacing={1}>
				{transfers && transfers.slice(0).reverse().map((transfer) => (
					<Grid item xs={12} style={{ marginBottom: 12 }}>
						<TransferCard transfer={transfer} cancelTransfer={cancelTransfer} />
					</Grid>
				))}
			</Grid>
		</div>
	)
}
