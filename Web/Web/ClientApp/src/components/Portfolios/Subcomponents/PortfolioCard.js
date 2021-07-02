import React, { useState } from 'react';
import './NewPortfolioCard.css';
import './PortfolioCard.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PortfolioTableRow from './PortfolioTableRow.js';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	deleteButton: {
		color: 'white',
	},
	editButton: {
		color: 'white',
		marginLeft: 'auto'
	},
	modalButtonContinue: {
		textTransform: 'none',
		margin: theme.spacing(1),
	},
	modalButtonBack: {
		textTransform: 'none',
		margin: theme.spacing(1),
		color: 'dimgrey'
	},
	tableHead: {
		backgroundColor: theme.palette.primary.main
	}
}));

export function PortfolioCard(props) {
	const [modal, setModal] = useState(false)
	const [rules, setRules] = useState()
	const history = useHistory();
	const handleOnClick = () => {
		history.push({
			pathname: `/screener/${props.portfolio.indexId}`,
		});
	}

	const classes = useStyles();

	const handleDelete = () => {
		const userId = props.userId
		const indexId = props.portfolio.indexId
		props.deletePortfolio(userId, indexId)
	}

	const renderModal = () => {
		setModal(true)
	}

	const closeModal = () => {
		setModal(false)
	}


	const getMetricDisplayInfo = () => {
		const prettyNames = [
			{ ruleType: "MarketCap", displayName: "Market Capitalization" },
			{ ruleType: "DividendYield", displayName: "Dividend Yield" },
			{ ruleType: "PriceToEarningsRatioTTM", displayName: "Price To Earnings Ratio (ttm)" },
			{ ruleType: "PriceToSalesRatioTTM", displayName: "Price To Sales Ratio (ttm)" },
			{ ruleType: "RevenueGrowthAnnualized", displayName: "Revenue Growth (annualized)" },
			{ ruleType: "EPSGrowthAnnualized", displayName: "EPS Growth (annualized)" },
			{ ruleType: "TrailingPerformanceAnnualized", displayName: "Trailing Performance (annualized)" },
			{ ruleType: "CoefficientOfVariation", displayName: "Coefficient of Variation" },
		]

		const tempRules = []
		const names = []
		debugger
		props.portfolio.rangedRules.forEach(rule => {
			prettyNames.forEach(name => {
				if (name.ruleType === rule.ruleType) {
					tempRules.push({ displayName: name.displayName, min: rule.lower, max: rule.upper, timePeriod: '' })
				}
			})
		})

		return tempRules
	}

	return (
		<>
			<div className="portfolioCard">
				<TableContainer component={Paper}>
					<Table aria-label="collapsible table">
						<TableHead className={classes.tableHead}>
							<TableRow>
								<TableCell />
								<TableCell>Blueprint Name</TableCell>
								<TableCell align="right">
									<Button
										className={classes.editButton}
										onClick={handleOnClick}>Edit</Button>
								</TableCell>
								<TableCell align="right">
									{modal && (
									<div className="deleteModal">
										<h2> Are you sure you would like to delete this portfolio? </h2>
										<p> Deleting an active portfolio will result in all holdings being sold. </p>
										<Button
											onClick={handleDelete}
											color="primary"
											variant='contained'
											className={classes.modalButtonContinue}
											disableElevation> Yes, delete portfolio </Button>
										<Button
											onClick={closeModal}
											variant="outlined"
											className={classes.modalButtonBack}> No, take me back </Button>
									</div>)}
									<IconButton className={classes.deleteButton} onClick={renderModal} color="white" aria-label="delete">
										<DeleteIcon />
									</IconButton>
								</TableCell>       
							</TableRow>
						</TableHead>
						<TableBody>
							<PortfolioTableRow
								name="Markets"
								data={props.portfolio.markets.join(", ")}
								interiorTable={<h1> Blahhhh </h1>} />
							<PortfolioTableRow
								name="Industries"
								data={props.portfolio.industries.join(", ")}
								interiorTable={<h1> BRRRRR </h1>} />
							<PortfolioTableRow
								name="Basic Metrics"
								data={getMetricDisplayInfo().map(metric => metric.displayName).join(", ")}
								interiorTable={
									<>
									<Typography variant="h6" gutterBottom component="div">
										Basic Metrics
									</Typography>
									<Table size="small" aria-label="purchases">
										<TableHead>
											<TableRow>
												<TableCell>Metric Type</TableCell>
												<TableCell>Min</TableCell>
												<TableCell>Max</TableCell>
												<TableCell>Time Period</TableCell>
											 </TableRow>
										</TableHead>
									<TableBody>
									  {getMetricDisplayInfo().map((metric) => (
										<TableRow key={metric.displayName}>
										  <TableCell component="th" scope="row">
											{metric.displayName}
										  </TableCell>
										  <TableCell>{metric.min}</TableCell>
										  <TableCell>{metric.max}</TableCell>
										  <TableCell>{metric.timePeriod}</TableCell>
										</TableRow>
									  ))}
									</TableBody>
									</Table>
									</>
								} />
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>

	);
}
