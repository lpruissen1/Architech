import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CustomIndexClient from '../../Clients/CustomIndexClient';
import AuthClient from '../../Clients/AuthClient';
import ScreenerClient from '../../Clients/ScreenerClient';
import './Screener.css';
import SaveButton from './Subcomponents/SaveButton';
import UpdateButton from './Subcomponents/UpdateButton';
import ScreeningControls from './Subcomponents/ScreeningControls';
import { TickerTable } from './Subcomponents/TickerTable';
import {useParams} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export function Screener(props) {
	const [markets, setMarkets] = useState([
		{ value: 'Sp500', displayName: 'S&P 500', isChecked: true },
		{ value: 'Useless1', displayName: 'Useless1', isChecked: true },
		{ value: 'Useless2', displayName: 'Useless2', isChecked: true },
		{ value: 'Useless3', displayName: 'Useless3', isChecked: true }])

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

	const [tickers, setTickers] = useState([])
	const [rangedRules, setRangedRules] = useState([])
	const [timedRangeRules, setTimedRangeRules] = useState([])
	const [inclusions, setInclusions] = useState([])
	const [exclusions, setExclusions] = useState([])
	const [loading, setLoading] = useState(true)
	const [collapseOpen, setCollapseOpen] = useState(false)
	const [changeMade, setChangeMade] = useState(false)

	let { indexID } = useParams();

	const [index, setIndex] = useState(indexID)

	const loadIndex = async () => {
		const loadedIndex = await CustomIndexClient.getCustomIndexByIndexId(AuthClient.GetIdFromStoredJwt(), index)
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
	}

	const handleRangedRuleUpdate = (rule) => {
		setRangedRules([...rangedRules, rule])
	}

	const handleTimedRangeRuleUpdate = (rule) => {
		setTimedRangeRules([...timedRangeRules, rule])
	}

	const handleInclusionAddition = (ticker) => {
		if (!inclusions.includes(ticker))
			setInclusions([...inclusions, ticker])
	}

	const handleInclusionDelete = (deletedTicker) => {
		const newInclusions = inclusions.filter(ticker => ticker !== deletedTicker)
		setInclusions(newInclusions)
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

	const getActiveMarkets = (marketList) => {
		let activeMarkets = []

		marketList.forEach(market => {
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

	const screen = async () => {
		if (validate()) {
			setLoading(true)
			setChangeMade(true)

			const tickers = await ScreenerClient.postScreeningRequest({
				markets: getActiveMarkets(markets),
				industries: getActiveIndustries(),
				rangedRule: rangedRules,
				timedRangeRule: timedRangeRules,
				inclusions: inclusions,
				exclusions: exclusions
			})

			setTickers(tickers)
			setLoading(false)
		}
	}

	// Create function to validate custom index then call in screener, if valid do the screening request
	const validate = () => {

		timedRangeRules.forEach(rule => {
			if (rule.timePeriod === "") {
				return false
			}
		})

		return true
	} 

	const handleMount = () => {
		if (index) {
			loadIndex()
			setCollapseOpen(true)
		}
	}

	useEffect(() => { handleMount() }, []);
	useEffect(() => { screen() }, [markets, rangedRules, sectors, timedRangeRules, inclusions, exclusions]);

	const saveIndex = () => {
		const newIndexID = uuidv4()
		
		CustomIndexClient.CreateCustomIndex({
			userId: AuthClient.GetIdFromStoredJwt(),
			indexId: newIndexID, 
			markets: [
				"Sp500"
			],
			industries: getActiveIndustries(),
			rangedRule: rangedRules,
			timedRangeRule: timedRangeRules,
			inclusions: inclusions,
			exclusions: exclusions
		});

		setIndex(newIndexID)
	}

	const updateIndex = () => {
		CustomIndexClient.UpdateCustomIndex(props.userID, {
			userId: AuthClient.GetIdFromStoredJwt(),
			indexId: index,
			markets: [
				"Sp500"
			],
			industries: getActiveIndustries(),
			rangedRule: rangedRules,
			timedRangeRule: timedRangeRules,
			inclusions: inclusions,
			exclusions: exclusions
		});

		setChangeMade(false)
	}

	return (
		<div>
			<h1 id="tabelLabel" >Screener</h1>
			<div className='rowThing'>
				<Card className='screenerCard'>
					<div>
						<ScreeningControls
							sectors={sectors}
							rangedRules={rangedRules}
							timedRangeRules={timedRangeRules}
							handleUpdate={screen}
							handleRangedRuleUpdate={handleRangedRuleUpdate}
							handleTimedRangeRuleUpdate={handleTimedRangeRuleUpdate}
							collapseOpen={collapseOpen}
							deleteRangedRule={deleteRangedRule}
							deleteTimedRangeRule={deleteTimedRangeRule}
							checkIfRangedRuleExists={checkIfRangedRuleExists}
							checkIfTimedRangeRuleExists={checkIfTimedRangeRuleExists}
							inclusions={inclusions}
							exclusions={exclusions}
							markets={markets}
							AddInclusion={handleInclusionAddition}
							DeleteInclusion={handleInclusionDelete}
							AddExclusion={handleExclusionAddition}
							DeleteExclusion={handleExclusionDelete}
						/>
						<br/>
						{indexID
							? <UpdateButton
								changeMade={changeMade}
								handleUpdate={updateIndex} />
							: <SaveButton
								handleSave={saveIndex} />}
					</div>
				</Card>
				<Card className='tickerCard'>
					<div className='tickerTableContainer'>
						<TickerTable
							tickers={tickers}
							loading={loading} />
					</div>
				</Card>
			</div>
		</div>
	)
}
