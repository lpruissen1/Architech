import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import OutlinedTextInput from '../Generic/OutlinedTextInput';
import AuthClient from '../../Clients/AuthClient';
import CustomIndexClient from '../../Clients/CustomIndexClient';
import WeightingClient from '../../Clients/WeightingClient';
import ScreenerClient from '../../Clients/ScreenerClient';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import RaisedCard from '../Generic/RaisedCard';
import TabPanel from '../Generic/TabPanel';
import InclusionsExclusions from './Screener/Subcomponents/InclusionsExclusions';
import MarketSelector from './Screener/Subcomponents/MarketSelector';
import BasicRulesSection from "./Screener/Subcomponents/Rules/BasicRulesSection";
import SectorSelector from './Screener/Subcomponents/SectorSelector';
import TickerTable from './TickerTable/TickerTable';
import { Weighter } from './Weighting/Weighter';

export const useStyles = makeStyles((theme) => ({
	indicator: {
		backgroundColor: 'rgba(255,215,100)'
	},
	root: {
		textTransform: 'none',
		fontSize: 15
	},
	appBar: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		height: 48,
		backgroundColor: '#404040',
		color: '#fff'
	}
}));

export function PortfolioBuilder() {

	const [markets, setMarkets] = useState([
		{ value: 'Sp500', displayName: 'Large Cap 500', isChecked: true },
		{ value: 'Useless1', displayName: 'Tech 100', isChecked: true },
		{ value: 'Useless2', displayName: 'Small Cap 2000', isChecked: true },
		{ value: 'Useless3', displayName: 'ESG 50', isChecked: true }])

	const [sectors, setSectors] = useState([
		{
			value: "Industrials", isChecked: "unchecked", industries: [
				{ value: 'Aerospace & Defense', isChecked: false },
				{ value: 'Airlines', isChecked: false },
				{ value: 'Business Services', isChecked: false },
				{ value: 'Consulting & Outsourcing', isChecked: false },
				{ value: 'Employment Services', isChecked: false },
				{ value: 'Engineering & Construction', isChecked: false },
				{ value: 'Farm & Construction', isChecked: false },
				{ value: 'Industrial Products', isChecked: false },
				{ value: 'Transportation & Logistics', isChecked: false },
				{ value: 'Waste Management', isChecked: false }
			]
		},
		{
			value: "Consumer Cyclical", isChecked: "unchecked", industries: [
				{ value: 'Advertising & Marketing Services', isChecked: false },
				{ value: 'Autos', isChecked: false },
				{ value: 'Entertainment', isChecked: false },
				{ value: 'Homebuilding & Construction', isChecked: false },
				{ value: 'Manufacturing - Apparel & Furniture', isChecked: false },
				{ value: 'Packaging & Containers', isChecked: false },
				{ value: 'Personal Services', isChecked: false },
				{ value: 'Retail - Apparel & Specialty', isChecked: false },
				{ value: 'Travel & Leisure', isChecked: false },
			]
		},
		{
			value: "Financial Services", isChecked: "unchecked", industries: [
				{ value: 'Asset Management', isChecked: false },
				{ value: 'Banks', isChecked: false },
				{ value: 'Brokerages & Exchanges', isChecked: false },
				{ value: 'Credit Services', isChecked: false },
				{ value: 'Insurance', isChecked: false },
				{ value: 'Insurance - Life', isChecked: false },
				{ value: 'Insurance - Property & Casualty', isChecked: false },
				{ value: 'Insurance - Specialty', isChecked: false }
			]
		},
		{
			value: "Healthcare", isChecked: "unchecked", industries: [
				{ value: 'Biotechnology', isChecked: false },
				{ value: 'Drug Manufacturers', isChecked: false },
				{ value: 'Health Care Plans', isChecked: false },
				{ value: 'Health Care Providers', isChecked: false },
				{ value: 'Medical Devices', isChecked: false },
				{ value: 'Medical Diagnostics & Research', isChecked: false },
				{ value: 'Medical Distribution', isChecked: false },
				{ value: 'Medical Instruments & Equipment', isChecked: false }
			]
		},
		{
			value: "Energy", isChecked: "unchecked", industries: [
				{ value: 'Oil & Gas - Drilling', isChecked: false },
				{ value: 'Oil & Gas - E&P', isChecked: false },
				{ value: 'Oil & Gas - Integrated', isChecked: false },
				{ value: 'Oil & Gas - Midstream', isChecked: false },
				{ value: 'Oil & Gas - Refining & Marketing', isChecked: false },
				{ value: 'Oil & Gas - Services', isChecked: false },
			]
		},
		{
			value: "Technology", isChecked: "unchecked", industries: [
				{ value: 'Application Software', isChecked: false },
				{ value: 'Communication Equipment', isChecked: false },
				{ value: 'Computer Hardware', isChecked: false },
				{ value: 'Online Media', isChecked: false },
				{ value: 'Semiconductors', isChecked: false },
			]
		},
		{
			value: "Basic Materials", isChecked: "unchecked", industries: [
				{ value: 'Agriculture', isChecked: false },
				{ value: 'Chemicals', isChecked: false },
				{ value: 'Forest Products', isChecked: false },
				{ value: 'Metals & Mining', isChecked: false },
				{ value: 'Steel', isChecked: false },
			]
		},
		{
			value: "Consumer Defensive", isChecked: "unchecked", industries: [
				{ value: 'Beverages - Alcoholic', isChecked: false },
				{ value: 'Beverages - Non-Alcoholic', isChecked: false },
				{ value: 'Consumer Packaged Goods', isChecked: false },
				{ value: 'Tobacco Products', isChecked: false },
				{ value: 'Retail - Defensive', isChecked: false },
			]
		},
		{
			value: "Utilities", isChecked: "unchecked", industries: [
				{ value: 'Utilities - Independent Power Producers', isChecked: false },
				{ value: 'Utilities - Regulated', isChecked: false },
			]
		},
		{
			value: "Real Estate", isChecked: "unchecked", industries: [
				{ value: 'REITs', isChecked: false }
			]
		},
		{
			value: "Communication Services", isChecked: "unchecked", industries: [
				{ value: 'Communication Services', isChecked: false }
			]
		}
	])

	const [rangedRules, setRangedRules] = useState([])
	const [timedRangeRules, setTimedRangeRules] = useState([])
	const [exclusions, setExclusions] = useState([])

	// Move input up a level as to not have to re-render everything

	const [name, setName] = useState("")

	const [step, setStep] = React.useState(0);
	const [tickers, setTickers] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [inclusions, setInclusions] = useState([])

	const [weightingOption, setWeightingOption] = useState("")
	const [manualWeights, setManualWeights] = useState([])
	
	let { indexID } = useParams();

	const [indexId, setIndexId] = useState(indexID)

	const classes = useStyles()

	const handleInclusionAddition = (ticker) => {
		if (!inclusions.includes(ticker))
			setInclusions([...inclusions, ticker])
	}

	const handleInclusionDelete = (deletedTicker) => {
		const newInclusions = inclusions.filter(ticker => ticker !== deletedTicker)
		setInclusions(newInclusions)
	}

	const handleChange = (event, newValue) => {
		setStep(newValue);
	};

	const handleRangedRuleUpdate = (rule) => {
		setRangedRules([...rangedRules, rule])
	}

	const handleTimedRangeRuleUpdate = (rule) => {
		setTimedRangeRules([...timedRangeRules, rule])
	}

	const handleExclusionAddition = (ticker) => {
		if (!exclusions.includes(ticker))
			setExclusions([...exclusions, ticker])
	}

	const handleExclusionDelete = (deletedTicker) => {
		const newExclusions = exclusions.filter(ticker => ticker !== deletedTicker)
		setExclusions(newExclusions)
	}

	const deleteRangedRule = (selectedRule) => {
		const resultingRules = rangedRules.filter(rule => rule.id !== selectedRule.id);
		setRangedRules(resultingRules)
	}

	const deleteTimedRangeRule = (selectedRule) => {
		const resultingRules = timedRangeRules.filter(rule => rule.id !== selectedRule.id);
		setTimedRangeRules(resultingRules)
	}

	const loadIndex = async () => {
		const loadedIndex = await CustomIndexClient.getCustomIndexByIndexId(AuthClient.GetIdFromStoredJwt(), indexId)
		let tempSectors = []

		sectors.forEach(sector => {
			sector.industries.forEach(industry => {
				if (loadedIndex.industries.includes(industry.value)) {
					industry.isChecked = true
				}

				else {
					industry.isChecked = false
				}
			})

			if (sector.industries.filter(industry => industry.isChecked === true).length === sector.industries.length) {
				tempSectors.push({ value: sector.value, isChecked: "checked", industries: sector.industries })
			}
			else if (sector.industries.filter(industry => industry.isChecked === false).length === sector.industries.length) {
				tempSectors.push({ value: sector.value, isChecked: "unchecked", industries: sector.industries })
			}
			else {
				tempSectors.push({ value: sector.value, isChecked: "partial", industries: sector.industries })
			}
		})

		setSectors(tempSectors)
		setRangedRules(loadedIndex.rangedRule)
		setTimedRangeRules(loadedIndex.timedRangeRule)
		setName(loadedIndex.name)
	}

	const getActiveMarkets = () => {
		let activeMarkets = []

		markets.forEach(market => {
			if (market.isChecked === true)
				activeMarkets.push(market.value)
		})
		return activeMarkets
	}

	const getActiveIndustries = () => {
		let activeIndustries = []

		sectors.forEach(sector => {
			sector.industries.forEach(industry => {
				if (industry.isChecked === true)
					activeIndustries.push(industry.value)
			})
		})
		return activeIndustries
	}

	const checkIfRangedRuleExists = (rule) => {
		if (rangedRules.filter(rangedRule => rangedRule.ruleType === rule).length > 0) {
			return true
		}
		return false
	}

	const checkIfTimedRangeRuleExists = (rule) => {
		const possibleTimeSpans = ['Quarter', 'HalfYear', 'Year', 'ThreeYear', 'FiveYear']

		const selectedTimeSpans = getTimePeriodsForTimedRangeRule(rule)
		const renderedTimeSpans = possibleTimeSpans.filter(timeSpan => !selectedTimeSpans.includes(timeSpan))

		return renderedTimeSpans
	}

	const getTimePeriodsForTimedRangeRule = (rule) => {
		const relevantTimedRangeRules = timedRangeRules.filter(timedRangeRule => timedRangeRule.ruleType === rule)
		if (relevantTimedRangeRules.length > 1) {
			const relevantTimePeriods = relevantTimedRangeRules.map(timeRule => timeRule.timePeriod)

			return relevantTimePeriods
		}

		return []
	}

	const saveIndex = () => {
		const newIndexID = uuidv4()

		CustomIndexClient.CreateCustomIndex({
			userId: AuthClient.GetIdFromStoredJwt(),
			indexId: newIndexID,
			name: name,
			markets: [
				"Sp500"
			],
			industries: getActiveIndustries(),
			rangedRule: rangedRules,
			timedRangeRule: timedRangeRules,
			inclusions: inclusions,
			exclusions: exclusions,
			weightingOption: weightingOption,
			manualWeights: manualWeights
		});

		setIndexId(newIndexID)
	}

	const updateIndex = () => {
		CustomIndexClient.UpdateCustomIndex(AuthClient.GetIdFromStoredJwt(), {
			userId: AuthClient.GetIdFromStoredJwt(),
			name: name,
			indexId: indexId,
			markets: [
				"Sp500"
			],
			industries: getActiveIndustries(),
			rangedRule: rangedRules,
			timedRangeRule: timedRangeRules,
			inclusions: inclusions,
			exclusions: exclusions,
			weightingOption: weightingOption,
			manualWeights: manualWeights
		});
	}

	const handleMount = () => {
		if (indexId) {
			loadIndex()
		}
	}

	// 1. Screen button
	const screen = async () => {
		if (validate()) {

			setLoading(true)

			const response = await ScreenerClient.postScreeningRequest({
				markets: getActiveMarkets(),
				industries: getActiveIndustries(),
				rangedRule: rangedRules,
				timedRangeRule: timedRangeRules,
				inclusions: inclusions,
				exclusions: exclusions
			})

			setTickers(response.securities)
			setLoading(false)
			await handleWeighting()
		}
	}

	const validate = () => {

		for (let i = 0; i < timedRangeRules.length; i++) {
			if (timedRangeRules[i].timePeriod === "") {
				return false
			}
		}
		return true
	}


	// move this up
	const handleWeighting = async () => {
		if (weightingOption !== "" && tickers) {
			var blah = tickers.map(thing => { return thing.ticker })

			var result = await WeightingClient.postWeightingRequest(weightingOption, blah, manualWeights)
			setTickers(result.tickers)
		}
	}

	useEffect(() => { handleWeighting() }, [weightingOption, manualWeights])
	useEffect(() => { handleMount() }, []);

	// 2. Look into tab switching
	// 4. Memoize everything
	// 5. Look through state of screening things
	// 6. Move weighting up
	return (
		<Grid container spacing={2} justify='center'>
				<Grid item xs={9}>
				<RaisedCard
					style={{ overflow: 'scroll', minHeight: 580, marginLeft: 20}}
					children={
						<>
							<AppBar className={classes.appBar} elevation={1} style={{ position: 'sticky', top: 0 }}>
								<Tabs
									classes={{
										indicator: classes.indicator
									}}
									style={{ outline: 'none' }}
									value={step}
									onChange={handleChange}
									aria-label="simple tabs example">
									<Tab className={classes.root} style={{ outline: 'none' }} label="Screen" />
									<Tab className={classes.root} style={{ outline: 'none' }} label="Weigh" />
									<Tab className={classes.root} style={{ outline: 'none' }} label="Backtest" />
									<PrimaryActionButton text="Screen" onClick={screen}/>
								</Tabs>
							</AppBar>
							<TabPanel value={step} index={0}>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Typography style={{ marginTop: 20, marginLeft: 10, color: '#fff', marginBottom: 20 }} variant='h6'>Portfolio Name</Typography>
										<OutlinedTextInput value={name} onChange={(event) => setName(event.target.value)} />
									</Grid>
									<Grid item xs={12}>
										<Typography style={{ marginTop: 20, marginLeft: 10, color: '#fff' }} variant='h6'>Choose Your Markets</Typography>
										<MarketSelector
											markets={markets}
										/>
									</Grid>
									<Grid item xs={12}>
										<Typography style={{ marginLeft: 10, color: '#fff' }} variant='h6'>Choose Your Sectors</Typography>
										<SectorSelector
											sectors={sectors}
											setSectors={setSectors}
										/>
									</Grid>
									<Grid item xs={12}>
										<Typography style={{ marginTop: 20, marginLeft: 10, color: '#fff' }} variant='h6'>Add Metrics</Typography>
										<BasicRulesSection
											rangedRules={rangedRules}
											timedRangeRules={timedRangeRules}
											handleRangedRuleUpdate={handleRangedRuleUpdate}
											handleTimedRangeRuleUpdate={handleTimedRangeRuleUpdate}
											deleteRangedRule={deleteRangedRule}
											deleteTimedRangeRule={deleteTimedRangeRule}
											checkIfRangedRuleExists={checkIfRangedRuleExists}
											checkIfTimedRangeRuleExists={checkIfTimedRangeRuleExists}
										/>
									</Grid>
									<Grid item xs={12}>
										<Box className="inclusion-selector-container">
											<InclusionsExclusions
												inclusions={inclusions}
												exclusions={exclusions}
												AddInclusion={handleInclusionAddition}
												AddExclusion={handleExclusionAddition}
												DeleteInclusion={handleInclusionDelete}
												DeleteExclusion={handleExclusionDelete}
											/>
										</Box>
									</Grid>
								</Grid>
							</TabPanel>
							<TabPanel value={step} index={1}>
								<Weighter
									inclusions={inclusions}
									weightingOption={weightingOption}
									setWeightingOption={setWeightingOption}
									manualWeights={manualWeights}
									setManualWeights={setManualWeights}
								/>
							</TabPanel>
							<TabPanel value={step} index={2}>
										Item Three
							</TabPanel>
						</>
					}
					/>
				</Grid>
			<Grid container item xs={3} justify="center">
				<RaisedCard
					style={{ position: 'fixed', width: '18%', maxHeight: '75%', overflow: 'scroll' }}
					children={
						<TickerTable
							tickers={tickers}
							loading={loading}
							tickerInfo={tickers}
						/>}
					/>
			</Grid>
			<Grid item xs={2}>
				<PrimaryActionButton
					onClick={indexId ? updateIndex : saveIndex}
					style={{ marginBottom: 20 }}
					text='Save Index'
					width='100%'
				/>			
			</Grid>
		</Grid>
	);
}
