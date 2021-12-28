import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import UserClient from '../../Clients/UserClient';
import FundingClient from '../../Clients/FundingClient';
import LinkIcon from '@mui/icons-material/Link';


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
		<Grid container spacing={1} style={{ width: '100%' }}>
			<Grid item xs={7}>
				<Grid container spacing={3}>
					<Grid item xs={4}>
						<OutlinedTextInput label='Account Owner Name' width='100%' style={{ backgroundColor: '#404040' }} onChange={(event) => setAccountOwnerName(event.target.value)}/>
					</Grid>
					<Grid item xs={4}>
						<OutlinedTextInput label='Account Nickname' width='100%' style={{ backgroundColor: '#404040' }} onChange={(event) => setNickname(event.target.value)} />
					</Grid>
					<Grid item xs={4}>
						<OutlinedTextInput label='Account Type' width='100%' style={{ backgroundColor: '#404040' }} onChange={(event) => setAccountType(event.target.value)} />
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Bank Account Number' width='100%' style={{ backgroundColor: '#404040' }} onChange={(event) => setAccountNumber(event.target.value)} />
					</Grid>
					<Grid item xs={6}>
						<OutlinedTextInput label='Bank Routing Number' width='100%' style={{ backgroundColor: '#404040' }} onChange={(event) => setAccountRoutingNumber(event.target.value)} />
					</Grid>
					<Grid item xs={12}>
						<PrimaryActionButton text="Link Account" style={{ fontSize: 14, fontWeight: 600, width: '100%', marginLeft: 8, marginTop: 0 }} startIcon={<LinkIcon />} onClick={sendRequest} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
