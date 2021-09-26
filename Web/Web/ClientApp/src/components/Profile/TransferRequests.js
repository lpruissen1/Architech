import React, { useState, useEffect } from 'react';
import FundingClient from '../../Clients/FundingClient';
import UserClient from '../../Clients/UserClient';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PrimaryTextButton from '../Generic/PrimaryTextButton';

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
		<>
			<Typography variant="h6" gutterBottom component="div">
				Orders
			</Typography>
			<Table size="small" aria-label="purchases">
				<TableHead>
					<TableRow>
						<TableCell style={{ color: '#d0d0d0' }}>Transfer Id</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Time</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Amount</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Direction</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}>Status</TableCell>
						<TableCell style={{ color: '#d0d0d0' }}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{transfers && transfers.slice(0).reverse().map((transfer) => (
						<TableRow key={transfer.TransferId}>
							<TableCell component="th" scope="row" style={{ color: '#d0d0d0' }}>
								{transfer.transferId}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{transfer.created}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{transfer.amount}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{transfer.direction}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{transfer.status}
							</TableCell>
							<TableCell style={{ color: '#d0d0d0' }}>
								{(transfer.status === "QUEUED" || transfer.status === "PENDING") ? <PrimaryTextButton text="Cancel Transfer" onClick={() => cancelTransfer(transfer)}/> : <></>}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
