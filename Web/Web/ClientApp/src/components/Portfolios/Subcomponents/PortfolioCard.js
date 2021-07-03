import React, { useState } from 'react';
import './NewPortfolioCard.css';
import './PortfolioCard.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
		backgroundColor: theme.palette.primary.main,
	},
	headCells: {
		paddingTop: 0,
		paddingBottom: 0,
	}
}));

export function PortfolioCard(props) {
	const [modal, setModal] = useState(false)
	const history = useHistory();
	const handleEditOnClick = () => {
		history.push({
			pathname: `/screener/${props.portfolio.indexId}`,
			state: { markets: 'Hello world' }
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

	const getSectorAndIndustryDisplay = () => {

		// move these into seperate repo
		const sectors = [
			{name: "Industrials", industries: ['Aerospace & Defense','Airlines', 'Business Services','Consulting & Outsourcing','Employment Services','Engineering & Construction','Farm & Construction' ,'Industrial Products','Transportation & Logistics','Waste Management']},
			{name: "Consumer Cyclical", industries: ['Advertising & Marketing Services', 'Autos', 'Entertainment', 'Homebuilding & Construction', 'Manufacturing - Apparel & Furniture', 'Packaging & Containers','Personal Services','Retail - Apparel & Specialty', 'Travel & Leisure']},
			{name: "Financial Services", industries: ['Asset Management', 'Banks', 'Brokerages & Exchanges', 'Credit Services', 'Insurance', 'Insurance - Life', 'Insurance - Property & Casualty', 'Insurance - Specialty']},
			{name: "Healthcare", industries: ['Biotechnology', 'Drug Manufacturers', 'Health Care Plans', 'Health Care Providers', 'Medical Devices', 'Medical Diagnostics & Research', 'Medical Distribution', 'Medical Instruments & Equipment']},
			{name: "Energy", industries: ['Oil & Gas - Drilling', 'Oil & Gas - E&P', 'Oil & Gas - Integrated', 'Oil & Gas - Midstream', 'Oil & Gas - Refining & Marketing', 'Oil & Gas - Services']},
			{name: "Technology", industries: ['Application Software', 'Communication Equipment', 'Computer Hardware', 'Online Media', 'Semiconductors']},
			{name: "Basic Materials", industries: ['Agriculture', 'Chemicals', 'Forest Products', 'Metals & Mining', 'Steel']},
			{name: "Consumer Defensive", industries: ['Beverages - Alcoholic', 'Beverages - Non-Alcoholic', 'Consumer Packaged Goods', 'Tobacco Products', 'Retail - Defensive']},
			{name: "Utilities", industries: ['Utilities - Independent Power Producers', 'Utilities - Regulated']},
			{name: "Real Estate", industries: ['REITs']},
			{name: "Communication Services", industries: ['Communication Services']}
		]

		const displaySectors = []

		sectors.forEach(sector => {
			const activeIndustries = []
			sector.industries.forEach(industry => {
				if (props.portfolio.industries.includes(industry)) {
					activeIndustries.push(industry)
				}
			})

			if (activeIndustries.length > 0) {
				displaySectors.push({ name: sector.name, industries: activeIndustries })
			}
		})
		
		return displaySectors
	}


	// move these into seperate repo
	const getMetricDisplayInfo = () => {
		const prettyNames = [
			{ ruleType: "MarketCap", displayName: "Market Capitalization" },
			{ ruleType: "DividendYield", displayName: "Dividend Yield" },
			{ ruleType: "PriceToEarningsRatioTTM", displayName: "Price To Earnings Ratio (ttm)" },
			{ ruleType: "PriceToSalesRatioTTM", displayName: "Price To Sales Ratio (ttm)" },
			{ ruleType: "RevenueGrowthAnnualized", displayName: "Revenue Growth (annualized)" },
			{ ruleType: "EPSGrowthAnnualized", displayName: "EPS Growth (annualized)" },
			{ ruleType: "AnnualizedTrailingPerformance", displayName: "Trailing Performance (annualized)" },
			{ ruleType: "CoefficientOfVariation", displayName: "Coefficient of Variation" },
		]

		const displayRules = []
		
		props.portfolio.rangedRules.forEach(rule => {
			prettyNames.forEach(name => {
				if (name.ruleType === rule.ruleType) {
					displayRules.push({ displayName: name.displayName, min: numFormatter(rule.lower), max: numFormatter(rule.upper), timePeriod: '' })
				}
			})
		})

		props.portfolio.timedRangeRules.forEach(rule => {
			prettyNames.forEach(name => {
				if (name.ruleType === rule.ruleType) {
					displayRules.push({ displayName: name.displayName, min: numFormatter(rule.lower), max: numFormatter(rule.upper), timePeriod: timePeriodFormatter(rule.timePeriod) })
				}
			})
		})
		
		return displayRules
	}

	// Fix this to take the ruletype and value and return proper formatting (e.g. %, $, etc.)
	// as well as this
	const numFormatter = (num) => {
		if (num > 1000000 && num < 1000000000) {
			return '$' + (num / 1000000).toFixed(0) + 'M';
		} else if (num >= 1000000000 && num < 1000000000000) {
			return '$' + (num / 1000000000).toFixed(0) + 'B';
		} else if (num >= 1000000000000) {
			return '$' + (num / 1000000000000).toFixed(2) + 'T';
		} else if (num > 9999 && num < 100000) {
			return '< $0.1M';
		} else if (num < 10000) {
			return '$' + num
		}
	}

	// this can be broken out 
	const timePeriodFormatter = (timePeriod) => {
		if (timePeriod === 'Quarter') {
			return 'One Quarter'
		}
		else if (timePeriod === 'HalfYear') {
			return 'Two Quarters'
		}
		else if (timePeriod === 'Year') {
			return 'One Year'
		}
		else if (timePeriod === "ThreeYears") {
			return "Three Years"
		}
		else if(timePeriod === "FiveYears")
			return "Five Years"

		return "Nan"
	}

	return (
		<>
			<div className="portfolioCard">
				<TableContainer component={Paper}>
					<Table aria-label="collapsible table" size="small">
						<TableHead className={classes.tableHead}>
							<TableRow>
								<TableCell className={classes.headCells} colSpan={2}><Typography variant="h6" style={{ color: '#fff', minWidth: 150 }}>Blueprint Name</Typography></TableCell>
								<TableCell align="right" style={{ width: '70%'}}>
									<Button
										className={classes.editButton}
										onClick={handleEditOnClick}>Edit</Button>
								</TableCell>
								<TableCell align="right" className={classes.headCells}>
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
									<IconButton className={classes.deleteButton} onClick={renderModal} style={{color: '#fff' }} aria-label="delete" className={classes.headCells}>
										<DeleteIcon style={{ color: '#fff' }}/>
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
								name="Sectors and Industries"
								data={getSectorAndIndustryDisplay().map(sector => sector.name).join(', ')}
								interiorTable={
									<>
										<Typography variant="h6" gutterBottom component="div">
											Sectors and Industries
									</Typography>
										<Table size="small" aria-label="purchases">
											<TableHead>
												<TableRow>
													<TableCell>Sector</TableCell>
													<TableCell>Industries</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{getSectorAndIndustryDisplay().map((sector) => (
													<TableRow key={sector.name}>
														<TableCell component="th" scope="row">
															{sector.name}
														</TableCell>
														<TableCell>{sector.industries.join(', ')}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</>} />
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
