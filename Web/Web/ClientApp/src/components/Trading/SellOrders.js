import React, { useState, useEffect } from 'react'
import AuthClient from '../../Clients/AuthClient';
import Picker from '../Generic/Picker';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import AccountsClient from '../../Clients/AccountsClient';
import PositionsClient from '../../Clients/PositionsClient';
import PurchaseOrderTable from './PurchaseOrderTable';
import { Typography, Grid, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(0),
		textTransform: 'none',
		fontSize: 12,
		fontWeight: 600,
		color: '#ffffff',
		backgroundColor: 'rgba(256, 256, 256, 0.1)',
		"&:hover": {
			backgroundColor: 'rgba(256, 256, 256, 0.05)'
		}
	}
}));



export default function PlaceTrade() {

	const classes = useStyles();


	const [tradedPortfolios, setTradedPortfolios] = useState([]);

	const [selectedPortfolioSell, setSelectedPortfolioSell] = useState();
	const [sellAmount, setSellAmount] = useState();

	const [sellTicker, setSellTicker] = useState();
	const [sellAmountTicker, setSellAmountTicker] = useState()

	const [potentialOrder, setPotentialOrder] = useState();

	const loadTradedPortfolios = async () => {
		const activePortfolios = await PositionsClient.GetAllPositionsNew(AuthClient.GetIdFromStoredJwt())
		setTradedPortfolios(activePortfolios.portfolios)
	}

	const sellAllOrder = async () => {
		var portfolio = tradedPortfolios.filter(x => x.name === selectedPortfolioSell)[0]

		var sellOrders = portfolio.positions && portfolio.positions.map(position => {
			var amount = position.currentPrice * position.quantity
			return { ticker: position.ticker, amount: amount }
		})

		var order = {
			portfolioId: portfolio.Id,
			direction: "sell",
			orders: sellOrders
		}

		setPotentialOrder(order)
	}

	const CalculateSellOrder = async () => {
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

	const sendBulkOrder = () => {
		AccountsClient.ExecuteBulkOrder(potentialOrder, AuthClient.GetIdFromStoredJwt())
	}

	useEffect(() => {
		loadTradedPortfolios()
	}, [])

	return (
		<Grid container spacing={1}>
			<Grid item xs={7}>
				<Grid container spacing={1}>
					<Grid item xs={5} style={{ color: '#d0d0d0', paddingLeft: 18 }}>
						<Typography variant='body1'>Portfolio</Typography>
					</Grid>
					<Grid item xs={5} style={{ color: '#d0d0d0', paddingLeft: 18 }}>
						<Typography variant='body1'>Amount ($)</Typography>
					</Grid>
					<Grid item xs={2}></Grid>
					<Grid item xs={5} justify='left' align='left' style={{ paddingLeft: 10, paddingRight: 10 }}>
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
					<Grid item xs={5} style={{ paddingLeft: 10, paddingRight: 12 }}>
						<OutlinedTextInput
							value={sellAmount}
							width='100%'
							onChange={(event) => setSellAmount(event.target.value)}
						/>
					</Grid>
					<Grid item xs={2} style={{ paddingLeft: 10, paddingRight: 0 }}>
						<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Button className={classes.button} onClick={sellAllOrder} disabled={selectedPortfolioSell ? false : true}>
								Sell All
							</Button>
						</div>
					</Grid>
					<Grid item xs={12} style={{paddingLeft: 18, marginTop: 40, marginBottom: 40}}>
						<Grid item xs={12} style={{ backgroundColor: '#848484', width: '100%', height: '100%', display: 'flex', alignItems: 'center',justifyContent: 'center', borderRadius: 4 }}>
							<div style={{ backgroundColor: '#404040', height: '100%', paddingLeft: 20, paddingRight: 20, paddingTop: 0, paddingBottom: 0 }}>
								<Typography style={{ color: '#f0f0f0'}}>OR</Typography>
							</div>
						</Grid> 
					</Grid>
					<Grid item xs={5} style={{ color: '#d0d0d0', paddingLeft: 18 }}>
						<Typography variant='body1'>Ticker</Typography>
					</Grid>
					<Grid item xs={5} style={{ color: '#d0d0d0', paddingLeft: 18 }}>
						<Typography variant='body1'>Amount ($)</Typography>
					</Grid>
					<Grid item xs={2}></Grid>
					<Grid item xs={5} justify='left' align='left' style={{ paddingLeft: 10, paddingRight: 10 }}>
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
					<Grid item xs={5} style={{ paddingLeft: 10, paddingRight: 12 }}>
						<OutlinedTextInput
							value={sellAmount}
							width='100%'
							onChange={(event) => setSellAmount(event.target.value)}
						/>
					</Grid>
					<Grid item xs={2} style={{ paddingLeft: 10, paddingRight: 0 }}>
						<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Button className={classes.button} disabled={sellTicker ? false : true}>
								Sell All
							</Button>
						</div>
					</Grid>
					<Grid item xs={12} style={{ paddingLeft: 18 }}>
						<PrimaryActionButton
							text='Generate Order'
							width='100%'
							onClick={CalculateSellOrder}
							style={{ fontSize: 14, marginLeft: 0, marginRight: 0 }}
							disabled={!(selectedPortfolioSell && sellAmount || sellTicker && sellAmountTicker)}
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
				justifyContent: 'center'
			}}>
				<div style={{width: '80%',}}>
				{potentialOrder ?
					<>
						<Grid container spacing={1}>
							<Grid item xs={12} style={{ marginBottom: 0 }}>
								<PurchaseOrderTable tickers={potentialOrder.orders} direction={'Sell'} />
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
					: <PurchaseOrderTable />
					}
				</div>
			</Grid>
		</Grid>
	)
}
