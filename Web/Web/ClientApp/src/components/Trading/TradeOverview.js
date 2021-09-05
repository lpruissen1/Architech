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

export default function TradeOverview() {
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

		debugger

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
		<>
			<Picker options={
				portfolios && portfolios.map((portfolio) => {
					return (
						portfolio.name)
				})} value={selectedPortfolio} setState={setSelectedPortfolio} label={"Portfolio"}
			/>
			<OutlinedTextInput label='Amount' value={amount} width='100%' onChange={(event) => setAmount(event.target.value)} />
			{potentialPurchaseOrder ?
				<>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<div style={{ width: '100%', height: '100%', color:"#ffffff" }}>
								<Typography variant='h6'>Review Purchase Order</Typography>
							</div>
						</Grid>
						<Grid item xs={12}>
							<PurchaseOrderTable tickers={potentialPurchaseOrder} />
						</Grid>

						<Grid item xs={6}>
							<Button
								variant='outlined'
								style={{ borderColor: '#c0c0c0', color:'#c0c0c0', marginLeft: 20, marginBottom: 24, outline: 'none', minWidth: 100 }}
								onClick={() => setPotentialPruchaseOrder()}
							>
								Clear
							</Button>
						</Grid>
						<Grid item xs={6}>
							<PrimaryActionButton text='Send' width='100%' onClick={() => sendBulkOrder()} />
						</Grid>
					</Grid>

				</>
				:
				<PrimaryActionButton text='Calculate' width='100%' onClick={CalculatePurchaseOrder} />
			}
		</>
	)
}
