﻿import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UnitFormatter } from '../../../Formatter/Formatter';
import TimePeriodFormatter from '../../../Formatter/TimeFormatter.js';
import PrimaryTextButton from '../../Generic/PrimaryTextButton';
import RaisedCard from '../../Generic/RaisedCard';
import BasicMetricTable from './BasicMetricTable';
import DeleteModal from './DeleteModal';
import './NewPortfolioCard.css';
import './PortfolioCard.css';
import PortfolioTableRow from './PortfolioTableRow.js';
import SectorAndIndustryTable from './SectorAndIndustryTable';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export const useStyles = makeStyles((theme) => ({
	deleteButton: {
		color: '#d0d0d0',
	},
	tableHead: {
		backgroundColor: '#484848',
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
			pathname: `/portfolioBuilder/${props.portfolio.indexId}`,
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
			{ name: "Industrials", industries: ['Aerospace & Defense', 'Airlines', 'Business Services', 'Consulting & Outsourcing', 'Employment Services', 'Engineering & Construction', 'Farm & Construction', 'Industrial Products', 'Transportation & Logistics', 'Waste Management'] },
			{ name: "Consumer Cyclical", industries: ['Advertising & Marketing Services', 'Autos', 'Entertainment', 'Homebuilding & Construction', 'Manufacturing - Apparel & Furniture', 'Packaging & Containers', 'Personal Services', 'Retail - Apparel & Specialty', 'Travel & Leisure'] },
			{ name: "Financial Services", industries: ['Asset Management', 'Banks', 'Brokerages & Exchanges', 'Credit Services', 'Insurance', 'Insurance - Life', 'Insurance - Property & Casualty', 'Insurance - Specialty'] },
			{ name: "Healthcare", industries: ['Biotechnology', 'Drug Manufacturers', 'Health Care Plans', 'Health Care Providers', 'Medical Devices', 'Medical Diagnostics & Research', 'Medical Distribution', 'Medical Instruments & Equipment'] },
			{ name: "Energy", industries: ['Oil & Gas - Drilling', 'Oil & Gas - E&P', 'Oil & Gas - Integrated', 'Oil & Gas - Midstream', 'Oil & Gas - Refining & Marketing', 'Oil & Gas - Services'] },
			{ name: "Technology", industries: ['Application Software', 'Communication Equipment', 'Computer Hardware', 'Online Media', 'Semiconductors'] },
			{ name: "Basic Materials", industries: ['Agriculture', 'Chemicals', 'Forest Products', 'Metals & Mining', 'Steel'] },
			{ name: "Consumer Defensive", industries: ['Beverages - Alcoholic', 'Beverages - Non-Alcoholic', 'Consumer Packaged Goods', 'Tobacco Products', 'Retail - Defensive'] },
			{ name: "Utilities", industries: ['Utilities - Independent Power Producers', 'Utilities - Regulated'] },
			{ name: "Real Estate", industries: ['REITs'] },
			{ name: "Communication Services", industries: ['Communication Services'] }
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

		props.portfolio.rangedRule.forEach(rule => {
			prettyNames.forEach(name => {
				if (name.ruleType === rule.ruleType) {
					displayRules.push({ displayName: name.displayName, min: UnitFormatter(rule.lower, rule.ruleType), max: UnitFormatter(rule.upper, rule.ruleType), timePeriod: '' })
				}
			})
		})

		props.portfolio.timedRangeRule.forEach(rule => {
			prettyNames.forEach(name => {
				if (name.ruleType === rule.ruleType) {
					displayRules.push({ displayName: name.displayName, min: UnitFormatter(rule.lower, rule.ruleType), max: UnitFormatter(rule.upper, rule.ruleType), timePeriod: TimePeriodFormatter(rule.timePeriod) })
				}
			})
		})

		return displayRules
	}

	return (
		<div style={{ borderRadius: 8, boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.15)' }}>
			<div className="portfolioCard" style={{ marginBottom: 20 }}>
				<TableContainer style={{ borderRadius: 8 }}>
					<Table aria-label="collapsible table" size="small" style={{ backgroundColor: '#484848' }}>
						<TableHead className={classes.tableHead}>
							<TableRow style={{ borderBottom: 'none' }}>
								<TableCell className={classes.headCells} style={{ borderBottom: 'none', backgroundColor: '#505050' }} colSpan={2}><Typography variant="subtitle1" style={{ color: '#fff', minWidth: 150 }}>{props.portfolio.name}</Typography></TableCell>
								<TableCell align="right" style={{ width: '70%', borderBottom: 'none', backgroundColor: '#505050', paddingRight: 0}}>
									<PrimaryTextButton
										endIcon={<DriveFileRenameOutlineIcon />}
										onClick={handleEditOnClick}
										text='Edit'
										style={{height: 30, marginTop: 0, marginBottom: 0}}
									/>

								</TableCell>
								<TableCell style={{ borderBottom: 'none', backgroundColor: '#505050', width: 20 }} align="right" className={classes.headCells}>
									{modal &&
										<DeleteModal
											handleDelete={handleDelete}
											closeModal={closeModal} />
									}
									<IconButton className={classes.deleteButton} onClick={renderModal} style={{color: '#fff', outline: 'none' }} aria-label="delete">
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
								name="Sectors"
								data={getSectorAndIndustryDisplay().map(sector => sector.name).join(', ')}
								interiorTable={
									<SectorAndIndustryTable
										getSectorAndIndustryDisplay={getSectorAndIndustryDisplay} />
								} />
							<PortfolioTableRow
								name="Metrics"
								data={getMetricDisplayInfo().map(metric => metric.displayName).join(", ")}
								interiorTable={<BasicMetricTable
									getMetricDisplayInfo={getMetricDisplayInfo} />}
							/>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}
