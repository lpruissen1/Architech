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
	const [portfolios, setPortfolios] = useState([]);
	const [selectedPortfolio, setSelectedPortfolio] = useState();
	const [amount, setAmount] = useState();

	const [potentialPurchaseOrder, setPotentialPruchaseOrder] = useState();

	const loadPortfolios = async () => {
		const activePortfolios = await CustomIndexClient.getCustomIndexByUserId(AuthClient.GetIdFromStoredJwt())
		setPortfolios(activePortfolios)
	}

	const CalculatePurchaseOrder = async () => {
		var portfolio = portfolios.filter(x => x.name === selectedPortfolio)[0]

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

		const response = await ScreenerClient.postPurchaseOrderRequest({
			screeningRequest: screeningRequest,
			weightingRequest: weightingRequest,
			amount: amount
		})

		setPotentialPruchaseOrder(response.tickers)
		// success, show
		// fail, let them know

	}

	const sendBulkOrder = () => {
		const bulkMarketOrder = {
			Orders: potentialPurchaseOrder
		}

		AccountsClient.ExecuteBulkOrder(bulkMarketOrder, AuthClient.GetIdFromStoredJwt())
	}

	useEffect(() => { loadPortfolios() }, [])

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
					portfolios && portfolios.map((portfolio) => {
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
					value={amount}
					width='100%'
					onChange={(event) => setAmount(event.target.value)}
				/>
			</Grid>
			<Grid item xs={3}>
				{!potentialPurchaseOrder && <PrimaryActionButton text='Generate Order' width='50%' onClick={CalculatePurchaseOrder} />}
			</Grid>
			<Grid item xs={12} style={{ marginTop: 36 }}>
				<Grid container spacing={1}>
					<Grid item xs={10} style={{ borderBottom: '1px solid #727272' }}>
						<Typography variant='subtitle1' style={{ color: '#f0f0f0' }}>Order Summary</Typography>
					</Grid>
					<Grid item xs={10}>
						{potentialPurchaseOrder ?
							<>
								<Grid container spacing={1}>
									<Grid item xs={12} style={{ marginBottom: 0 }}>
										<PurchaseOrderTable tickers={potentialPurchaseOrder} />
									</Grid>
									<Grid item xs={2}>
										<Button
											variant='outlined'
											style={{ borderColor: '#c0c0c0', color: '#c0c0c0', outline: 'none', marginTop: 16, width: '90%', textTransform: 'none', fontSize: 16 }}
											onClick={() => setPotentialPruchaseOrder()}
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
