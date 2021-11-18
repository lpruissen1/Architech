import React, { useState, useEffect } from 'react'
import CustomIndexClient from '../../Clients/CustomIndexClient';
import AuthClient from '../../Clients/AuthClient';
import Picker from '../Generic/Picker';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import ScreenerClient from '../../Clients/ScreenerClient';
import AccountsClient from '../../Clients/AccountsClient';
import PurchaseOrderTable from './PurchaseOrderTable';
import { Typography, Grid, Button } from '@material-ui/core/';

export default function PlaceTrade() {
	const [availablePortfolio, setAvailablePortfolio] = useState([]);
	const [availableTickers, setAvailableTickers] = useState([])

	const [selectedPortfolio, setSelectedPortfolio] = useState();
	const [selectedTicker, setSelectedTicker] = useState();

	const [buyAmount, setBuyAmount] = useState();
	const [buyAmountTicker, setBuyAmountTicker] = useState();

	const [potentialOrder, setPotentialOrder] = useState();

	const loadPortfolios = async () => {
		const portfolios = await CustomIndexClient.getCustomIndexByUserId(AuthClient.GetIdFromStoredJwt())
		setAvailablePortfolio(portfolios)
	}

	const CalculatePurchaseOrder = async () => {
		var portfolio = availablePortfolio.filter(x => x.name === selectedPortfolio)[0]


		const weightingRequest = {
			Option: portfolio.weightingOption,
			Tickers: [],
			manualWeights: portfolio.manualWeights
		}

		const screeningRequest = {
			markets: portfolio.markets,
			industries: portfolio.industries,
			rangedRule: portfolio.rangedRules,
			timedRangeRule: portfolio.timedRangeRules,
			inclusions: portfolio.inclusions,
			exclusions: portfolio.exclusions
		}


		// alter response to contain direction
		const response = await ScreenerClient.postPurchaseOrderRequest({
			screeningRequest: screeningRequest,
			weightingRequest: weightingRequest,
			amount: buyAmount
		})

		var order = {
			portfolioId: portfolio.indexId,
			orders: response.tickers,
			direction: "buy"
		}

		setPotentialOrder(order)
		// success, show
		// fail, let them know

	}

	const sendBulkOrder = () => {
		AccountsClient.ExecuteBulkOrder(potentialOrder, AuthClient.GetIdFromStoredJwt())
	}

	useEffect(() => {
		loadPortfolios()
	}, [])

	return (
		<Grid container spacing={1}>
			<Grid item xs={7}>
				<Grid container spacing={1}>
					<Grid item xs={6} style={{ color: '#d0d0d0', paddingLeft: 18 }}>
						<Typography variant='body1'>Portfolio</Typography>
					</Grid>
					<Grid item xs={6} style={{ color: '#d0d0d0', paddingLeft: 18 }}>
						<Typography variant='body1'>Amount ($)</Typography>
					</Grid>
					<Grid item xs={6} justify='left' align='left' style={{ paddingLeft: 10, paddingRight: 10 }}>
						<Picker
							options={
							availablePortfolio && availablePortfolio.map((portfolio) => {
								return (
									portfolio.name)
							})}
							value={selectedPortfolio}
							setState={setSelectedPortfolio}
							width= '100%'
						/>
					</Grid>
					<Grid item xs={6} style={{ paddingLeft: 10, paddingRight: 12 }}>
						<OutlinedTextInput
							value={buyAmount}
							width='100%'
							onChange={(event) => setBuyAmount(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12} style={{paddingLeft: 18, marginTop: 40, marginBottom: 40}}>
						<Grid item xs={12} style={{ backgroundColor: '#848484', width: '100%', height: '100%', display: 'flex', alignItems: 'center',justifyContent: 'center', borderRadius: 4 }}>
							<div style={{ backgroundColor: '#404040', height: '100%', paddingLeft: 20, paddingRight: 20, paddingTop: 0, paddingBottom: 0 }}>
								<Typography style={{ color: '#f0f0f0'}}>OR</Typography>
							</div>
						</Grid> 
					</Grid>
					<Grid item xs={6} style={{ color: '#d0d0d0', paddingLeft: 18 }}>
						<Typography variant='body1'>Ticker</Typography>
					</Grid>
					<Grid item xs={6} style={{ color: '#d0d0d0', paddingLeft: 18 }}>
						<Typography variant='body1'>Amount ($)</Typography>
					</Grid>
					<Grid item xs={6} justify='left' align='left' style={{ paddingLeft: 10, paddingRight: 10 }}>
						<Picker
							options={
								availableTickers && availableTickers.map((ticker) => {
									return (
										ticker)
								})}
							value={selectedTicker}
							setState={setSelectedTicker}
							width='100%'
						/>
					</Grid>
					<Grid item xs={6} style={{ paddingLeft: 10, paddingRight: 12 }}>
						<OutlinedTextInput
							value={buyAmountTicker}
							width='100%'
							onChange={(event) => setBuyAmountTicker(event.target.value)}
						/>
					</Grid>
					<Grid item xs={12} style={{ paddingLeft: 18 }}>
						<PrimaryActionButton
							text='Generate Order'
							width='100%'
							onClick={CalculatePurchaseOrder}
							style={{ fontSize: 14, marginLeft: 0, marginRight: 0 }}
							disabled={!(selectedPortfolio && buyAmount || selectedTicker && buyAmountTicker)}
						/>
					</Grid>
					{potentialOrder ? 
						<Grid item xs={12} style={{ paddingLeft: 18 }}>
							<Button
								style={{ borderColor: '#c0c0c0', color: '#c0c0c0', outline: 'none', width: '100%', textTransform: 'none', fontSize: 14, marginLeft: 0, marginRight: 0 }}
								onClick={() => setPotentialOrder()}
							>
								Clear Order
							</Button>
						</Grid>	
						: <></>}
				</Grid>
			</Grid>
			<Grid item xs={5} style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<div style={{width: '80%',}}>
					{potentialOrder ?
						<>
							<Grid container spacing={1} justify='right' align='right'>
								<Grid item xs={12} style={{ marginBottom: 0, paddingLeft: 36 }}>
									<PurchaseOrderTable tickers={potentialOrder.orders} sendBulkOrder={sendBulkOrder} direction='Buy' />
								</Grid>
							</Grid>

						</>
						:<Grid container spacing={1} justify='right' align='right'>
								<Grid item xs={12} style={{ marginBottom: 0, paddingLeft: 36 }}>
									<PurchaseOrderTable />
								</Grid>
							</Grid>
						
				}
				</div>
			</Grid>
		</Grid>
	)
}
