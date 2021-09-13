import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import Picker from '../Generic/Picker';
import './FundingModal.css';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import AccountsClient from '../../Clients/AccountsClient';
import UserClient from '../../Clients/UserClient';

export default function TransferForm(props) {

	const [transferType, setTransferType] = useState("ach")
	const [transferDirection, setTransferDirection] = useState()
	const [amount, setAmount] = useState()
	const [selectedAch, setSelectedAch] = useState()
	const [achRelationship, setAchRelationship] = useState()

	const transferOptions = ["ach"]
	const transferDirectionOptions = ["INCOMING", "OUTGOING"]

	useEffect(() => {
		const loadFundingInfo = async () => {
			const newInfo = await AccountsClient.GetAchRelationship(UserClient.GetIdFromStoredJwt())
			setAchRelationship(newInfo)
		}

		loadFundingInfo();
	}, []);

	const MakeTransferRequest = async () => {
		const body = {
			transferType: transferType,
			relationshipId: achRelationship.relationshipId,
			amount: amount,
			direction: transferDirection
		}

		var result = await AccountsClient.ExecuteTransfer(body, UserClient.GetIdFromStoredJwt())
		props.setTransferInitiated(true)
	}

	return (
		<Grid container spacing={1} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
			<Grid item xs={12}>
				<Picker options={transferOptions} setState={setTransferType} value={transferType} label='Transfer Type' />
			</Grid>
			<Grid item xs={12}>
				<Picker options={transferDirectionOptions} setState={setTransferDirection} value={transferDirection} label='Transfer Type' />
			</Grid>
			<Grid item xs={12}>
				<Picker options={[achRelationship && achRelationship.nickname]} setState={setSelectedAch} value={selectedAch} label='Select Account' />
			</Grid>
			<Grid item xs={12}>
				<OutlinedTextInput label='Amount' value={amount} width='100%' onChange={(event) => setAmount(event.target.value)} />
			</Grid>
			<Grid item xs={6}>
				<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
					<PrimaryActionButton text='Close' onClick={() => props.fundMeDaddy()} />
				</div>
			</Grid>
			<Grid item xs={6}>
				<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }} >
					<PrimaryActionButton text='Transfer' onClick={() => MakeTransferRequest()} />
				</div>
			</Grid>
		</Grid>
	)
}
