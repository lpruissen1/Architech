import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import AccountsClient from '../../Clients/AccountsClient';
import UserClient from '../../Clients/UserClient';
import FundingClient from '../../Clients/FundingClient';


export default function CreateAchRelationship() {
	const [accountOwnerName, setAccountOwnerName] = useState()
	const [nickname, setNickname] = useState()
	const [accountType, setAccountType] = useState()
	const [accountNumber, setAccountNumber] = useState()
	const [accountRoutingNumber, setAccountRoutingNumber] = useState()
	
	const sendRequest = async () => {
		const body = {
			bankAccountOwnerName: accountOwnerName,
			accountType: accountType,
			bankAccountNumber: accountNumber,
			bankAccountRoutingNumber: accountRoutingNumber,
			bankAccountNickname: nickname
		}

		FundingClient.CreateAchRelationship(UserClient.GetIdFromStoredJwt(), body)
	} 

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
