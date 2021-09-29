import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import FundingClient from '../../Clients/FundingClient';
import UserClient from '../../Clients/UserClient';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import Picker from '../Generic/Picker';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { v4 as uuidv4 } from 'uuid';

import './FundingModal.css';

export default function TransferForm(props) {

	const [transferType, setTransferType] = useState("ach")
	const [transferDirection, setTransferDirection] = useState()
	const [amount, setAmount] = useState()
	const [selectedAch, setSelectedAch] = useState()
	const [achRelationship, setAchRelationship] = useState()
	const [error, setError] = useState({})
	const [anchorEl, setAnchorEl] = useState(null);

	const transferOptions = ["ach"]
	const transferDirectionOptions = ["INCOMING", "OUTGOING"]

	useEffect(() => {
		const loadFundingInfo = async () => {
			const newInfo = await FundingClient.GetAchRelationship(UserClient.GetIdFromStoredJwt())
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

		var result = await FundingClient.ExecuteTransfer(body, UserClient.GetIdFromStoredJwt())
		debugger;
		if (result === 200) {
			props.setTransferInitiated(true)
		}
		else if (result === 403) {
			props.addAlert({ active: true, message: "Insufficient Funds", id: uuidv4()})
		}
		else if (result === 400) {
			setError({ active: true, message: "Unknown Error"})
		}
		debugger
	}

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);

	return (
		<Grid container spacing={1} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
			{error.active &&
				<Alert severity="error" >
					<AlertTitle>Error</AlertTitle>
				{error.message}
				</Alert >}
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
				<OutlinedTextInput
					label='Amount'
					type='number'
					value={amount}
					width='100%'
					error={amount < 0 || amount > 50000}
					onChange={(event) => setAmount(event.target.value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<HelpOutlineIcon
									style={{ color: '#e0e0e0' }}
									aria-owns={open ? 'mouse-over-popover' : undefined}
									aria-haspopup="true"
									onMouseEnter={handlePopoverOpen}
									onMouseLeave={handlePopoverClose}
								/>
								<Popover
									id="mouse-over-popover"
									sx={{
										pointerEvents: 'none',
									}}
									open={open}
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									style={{zIndex: 100000}}
									onClose={handlePopoverClose}
									disableRestoreFocus
								>
									<Typography sx={{ p: 1 }}>Amount must be between $0 and $50,000.</Typography>
								</Popover>
							</InputAdornment>)
					}}
				/>
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
