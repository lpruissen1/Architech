import React, { useEffect, useState } from 'react';
import FundingClient from '../../Clients/FundingClient';
import UserClient from '../../Clients/UserClient';
import OutlinedNumberInput from '../Generic/OutlinedNumberInput';
import Picker from '../Generic/Picker';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Popover from '@mui/material/Popover';
import { v4 as uuidv4 } from 'uuid';
import './FundingModal.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from '@material-ui/core/';

export const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontWeight: 600,
		color: '#ffffff',
		backgroundColor: 'rgba(256, 256, 256, 0.1)',
		"&:hover": {
			backgroundColor: 'rgba(256, 256, 256, 0.05)'
		},
		outline: 'none'
	},
	buttonContained: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontWeight: 600,
		color: '#121212',
		boxShadow: 'none',
		outline: 'none'
	}
}));

export default function TransferForm(props) {

	const classes = useStyles()

	const [transferType, setTransferType] = useState("ach")
	const [transferDirection, setTransferDirection] = useState()
	const [amount, setAmount] = useState()
	const [selectedAch, setSelectedAch] = useState()
	const [achRelationship, setAchRelationship] = useState()
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

		if (result === 200) {
			props.setTransferInitiated(true)
		}
		else if (result === 403) {
			props.addAlert({ type: "error", message: "Insufficient Funds", id: uuidv4() })
		}
		else if (result === 400) {
			props.addAlert({ type: "error", message: "Unknown Error", id: uuidv4() })
		}
	}

	const validate = () => {
		return !transferType || !transferDirection || !selectedAch || !amount || (amount < 0 || amount > 50000)
	}

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);

	return (
		<Grid container spacing={1} style={{ width: '100%', height: '100%' }}>
			<Grid item xs={12}>
				<Picker style={{ width: '96%' }} options={transferOptions} setState={setTransferType} value={transferType} label='Transfer Type' />
			</Grid>
			<Grid item xs={12}>
				<Picker style={{ width: '96%' }} options={transferDirectionOptions} setState={setTransferDirection} value={transferDirection} label='Transfer Type' />
			</Grid>
			<Grid item xs={12}>
				<Picker style={{ width: '96%' }} options={[achRelationship && achRelationship.nickname]} setState={setSelectedAch} value={selectedAch} label='Select Account' />
			</Grid>
			<Grid item xs={12}>
				<OutlinedNumberInput
					label='Amount'
					value={amount}
					width='96%'
					error={amount < 0 || amount > 50000}
					onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ''))}
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
									<Typography sx={{ p: 1 }} style={{ marginLeft: 4, marginRight: 4 }}>Amount must be between $0 and $50,000.</Typography>
								</Popover>
							</InputAdornment>)
					}}
				/>
			</Grid>
			<Grid item xs={6}>
				<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
					<Button className={classes.button} style={{ width: '100%' }} onClick={() => props.fundMeDaddy()}>
						Close
					</Button>
				</div>
			</Grid>
			<Grid item xs={6}>
				<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}>
					<Button variant='contained' color="primary" className={classes.buttonContained} style={{ width: '100%' }} onClick={() => MakeTransferRequest()} disabled={validate()}>
						Transfer
					</Button>
				</div>
			</Grid>
		</Grid>
	)
}
