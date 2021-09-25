import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import FundingClient from '../../Clients/FundingClient';
import UserClient from '../../Clients/UserClient';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import PrimaryActionButton from '../Generic/PrimaryActionButton';

export default function CreateAchRelationship() {
	const [transfers, setTransfers] = useState()
	const [nickname, setNickname] = useState()
	const [accountType, setAccountType] = useState()
	const [accountNumber, setAccountNumber] = useState()
	const [accountRoutingNumber, setAccountRoutingNumber] = useState()

	const loadTransfers = async () => {
		const transfers = await FundingClient.GetTransfers(UserClient.GetIdFromStoredJwt())
		setTransfers(activePortfolios)
	}

	useEffect(() => { loadTransfers() }, [])

	// list them out 
	return (
		<>
			<Grid container spacing={1}>
				<Grid item spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
					<OutlinedTextInput label='Account Owner Name' width='100%' onChange={(event) => setAccountOwnerName(event.target.value)}/>
				</Grid>
				<Grid item spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
					<OutlinedTextInput label='Account Nickname' width='100%' onChange={(event) => setNickname(event.target.value)} />
				</Grid>
				<Grid item spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
					<OutlinedTextInput label='Account Type' width='100%' onChange={(event) => setAccountType(event.target.value)} />
				</Grid>
				<Grid item spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
					<OutlinedTextInput label='Bank Account Number' width='100%' onChange={(event) => setAccountNumber(event.target.value)} />
				</Grid>
				<Grid item spacing={4} style={{ paddingRight: 30, paddingLeft: 10 }}>
					<OutlinedTextInput label='Bank Routing Numer' width='100%' onChange={(event) => setAccountRoutingNumber(event.target.value)} />
				</Grid>
				<PrimaryActionButton text="Link Account" onClick={sendRequest}/>
			</Grid>
		</>
	)
}
