﻿import React, { useState, useEffect } from 'react'
import CustomIndexClient from '../../Clients/CustomIndexClient';
import AuthClient from '../../Clients/AuthClient';
import Picker from '../Generic/Picker';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import ScreenerClient from '../../Clients/ScreenerClient';
import AccountsClient from '../../Clients/AccountsClient';
import PositionsClient from '../../Clients/PositionsClient';
import PurchaseOrderTable from './PurchaseOrderTable';
import { Typography, Grid, Button } from '@material-ui/core/';

export default function PlaceTrade() {
	const [availablePortfolio, setAvailablePortfolio] = useState([]);
	const [tradedPortfolios, setTradedPortfolios] = useState([]);

	const [selectedPortfolio, setSelectedPortfolio] = useState();
	const [buyAmount, setBuyAmount] = useState();

	const [selectedPortfolioSell, setSelectedPortfolioSell] = useState();
	const [sellAmount, setSellAmount] = useState();

	const [potentialOrder, setPotentialOrder] = useState();

	const loadPortfolios = async () => {
		const portfolios = await CustomIndexClient.getCustomIndexByUserId(AuthClient.GetIdFromStoredJwt())
		setAvailablePortfolio(portfolios)
	}

	const loadTradedPortfolios = async () => {
		const activePortfolios = await PositionsClient.GetAllPositionsNew(AuthClient.GetIdFromStoredJwt())
		setTradedPortfolios(activePortfolios.portfolios)
	}

	const CalculateSellOrder  = async () => {
		var portfolio = tradedPortfolios.filter(x => x.name === selectedPortfolioSell)[0]

		var positionCount = portfolio.positions.length;

		var sellOrders = portfolio.positions && portfolio.positions.map(position => {
			var amount = Math.min(parseInt(sellAmount) / positionCount, position.currentPrice * position.quantity)
			return { ticker: position.ticker, amount: amount }
		})

		var order = {
			portfolioId: portfolio.Id,
			direction: "sell",
			orders: sellOrders
		}

		setPotentialOrder(order)
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
			portfolioId: portfolio.Id,
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
		loadTradedPortfolios()
	}, [])

	return (
		<Grid container spacing={1}>
			<Grid item xs={3} style={{ color: '#d0d0d0', paddingLeft: 12, marginRight: 20 }}>
				<Typography variant='body1'>Target Portfolio</Typography>
			</Grid>
			<Grid item xs={8} style={{ color: '#d0d0d0', paddingLeft: 12 }}>
				<Typography variant='body1'>Amount ($)</Typography>
			</Grid>
			<Grid item xs={3} justify='left' align='left' style={{ marginRight: 20 }}>
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
			<Grid item xs={3} style={{ marginBottom: 20, marginRight: 20 }}>
				<OutlinedTextInput
					value={buyAmount}
					width='100%'
					onChange={(event) => setBuyAmount(event.target.value)}
				/>
			</Grid>
			<Grid item xs={3}>
				<PrimaryActionButton text='Generate Order' width='50%' onClick={CalculatePurchaseOrder} />
			</Grid>
			<Grid item xs={3} style={{ color: '#d0d0d0', paddingLeft: 12, marginRight: 20 }}>
				<Typography variant='body1'>Sell Target Portfolio</Typography>
			</Grid>
			<Grid item xs={8} style={{ color: '#d0d0d0', paddingLeft: 12 }}>
				<Typography variant='body1'>Amount ($)</Typography>
			</Grid>
			<Grid item xs={3} justify='left' align='left' style={{ marginRight: 20 }}>
				<Picker
					options={
						tradedPortfolios && tradedPortfolios.map((portfolio) => {
							return (
								portfolio.name)
						})}
					value={selectedPortfolioSell}
					setState={setSelectedPortfolioSell}
					width='100%'
				/>
			</Grid>
			<Grid item xs={3} style={{ marginBottom: 20, marginRight: 20 }}>
				<OutlinedTextInput
					value={sellAmount}
					width='100%'
					onChange={(event) => setSellAmount(event.target.value)}
				/>
			</Grid>
			<Grid item xs={3}>
				<PrimaryActionButton text='Generate Sell Order' width='50%' onClick={CalculateSellOrder} />
			</Grid>
			<Grid item xs={12} style={{ marginTop: 36 }}>
				<Grid container spacing={1}>
					<Grid item xs={10} style={{ borderBottom: '1px solid #727272' }}>
						<Typography variant='subtitle1' style={{ color: '#f0f0f0' }}>Order Summary</Typography>
					</Grid>
					<Grid item xs={10}>
						{potentialOrder ?
							<>
								<Grid container spacing={1}>
									<Grid item xs={12} style={{ marginBottom: 0 }}>
										<PurchaseOrderTable tickers={potentialOrder.orders} />
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='outlined'
											style={{ borderColor: '#c0c0c0', color: '#c0c0c0', outline: 'none', marginTop: 16, width: '90%', textTransform: 'none', fontSize: 16 }}
											onClick={() => setPotentialOrder()}
										>
											Clear
										</Button>
									</Grid>
									<Grid item xs={2} justify='left'>
										<PrimaryActionButton text='Send' width='90%' onClick={() => sendBulkOrder()} />
									</Grid>
								</Grid>

							</>
							: <div style={{ height: 300 }}> </div>
						}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
