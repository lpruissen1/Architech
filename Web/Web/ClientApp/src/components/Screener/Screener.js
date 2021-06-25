import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CustomIndexClient from '../../Clients/CustomIndexClient';
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
		{ value: '', displayName: 'Useless', isChecked: true },
		{ value: '', displayName: 'Useless', isChecked: true },
		{ value: '', displayName: 'Useless', isChecked: true }])
	const [sectors, setSectors] = useState([
		{
			value: "Healthcare", isChecked: false, industries: [
				{ value: 'Biotechnology', isChecked: false },
				{ value: 'Drug Manufacterers', isChecked: false },
				{ value: 'Health Care Plans', isChecked: false },
				{ value: 'Health Care Providers', isChecked: false },
				{ value: 'Medical Devices', isChecked: false },
				{ value: 'Medical Diagnostics & Research', isChecked: false },
				{ value: 'Medical Distribution', isChecked: false },
				{ value: 'Medical Instruments & Equipment', isChecked: false }
			]
		},
		{
			value: "Technology", isChecked: false, industries: [
				{ value: 'Application Software', isChecked: false },
				{ value: 'Communication Equipment', isChecked: false },
				{ value: 'Computer Hardware', isChecked: false },
				{ value: 'Online Media', isChecked: false },
				{ value: 'Semiconductors', isChecked: false },
			]
		},
		{
			value: "Financial Services", isChecked: false, industries: [
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
			value: "Industrials", isChecked: false, industries: [
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
			value: "Consumer Cyclical", isChecked: false, industries: [
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
			value: "Utilities", isChecked: false, industries: [
				{ value: 'Utilities - Independent Power Producers', isChecked: false },
				{ value: 'Utilities - Regulated', isChecked: false },
			]
		},
		{
			value: "Basic Materials", isChecked: false, industries: [
				{ value: 'Agriculture', isChecked: false },
				{ value: 'Chemicals', isChecked: false },
				{ value: 'Forest Products', isChecked: false },
				{ value: 'Metals & Mining', isChecked: false },
				{ value: 'Steel', isChecked: false },
			]
		},
		{
			value: "Real Estate", isChecked: false, industries: [
				{ value: 'REITs', isChecked: false }
			]
		},
		{
			value: "Communication Services", isChecked: false, industries: [
				{ value: 'Communication Services', isChecked: false }
			]
		},
		{
			value: "Consumer Defensive", isChecked: false, industries: [
				{ value: 'Beverages - Alcoholic', isChecked: false },
				{ value: 'Beverages - Non-Alcoholic', isChecked: false },
				{ value: 'Consumer Packaged Goods', isChecked: false },
				{ value: 'Tobacco Products', isChecked: false },
				{ value: 'Retail - Defensive', isChecked: false },
			]
		},
		{
			value: "Energy", isChecked: false, industries: [
				{ value: 'Oil & Gas - Drilling', isChecked: false },
				{ value: 'Oil & Gas - Drilling', isChecked: false },
				{ value: 'Oil & Gas - Integrated', isChecked: false },
				{ value: 'Oil & Gas - Midstream', isChecked: false },
				{ value: 'Oil & Gas - Refining & Marketing', isChecked: false },
				{ value: 'Oil & Gas - Services', isChecked: false },
			]
		}
	])
	const [tickers, setTickers] = useState([])
	const [rangedRules, setRangedRules] = useState([])
	const [timedRangeRules, setTimedRangeRules] = useState([])
	const [loading, setLoading] = useState(true)
	const [collapseOpen, setCollapseOpen] = useState(false)
	const [changeMade, setChangeMade] = useState(false)

	let { indexID } = useParams();

	const [index, setIndex] = useState(indexID)

	const loadIndex = async () => {
		const loadedIndex = await CustomIndexClient.getCustomIndexByIndexId(props.userID, index)
		let tempSectors = []
		
		sectors.forEach(sector => {
			if (loadedIndex.sectors && loadedIndex.sectors.includes(sector.value)) {
				tempSectors.push({value: sector.value, isChecked: true, industries: sector.industries})
			}
			else {
				tempSectors.push({value: sector.value, isChecked: false, industries: sector.industries})
			}
		})

		setSectors(tempSectors)
		setRangedRules(loadedIndex.rangedRule)
		setTimedRangeRules(loadedIndex.timedRangeRule)
	}

	const handleRangedRuleUpdate = (rule) => {
		const rules = rangedRules;

		if (!rules.find(function (existingRule, index) {
			if (existingRule.id === rule.id)
				return true;
		})) {
			// if new rule 
			setRangedRules([...rangedRules, rule])
		}
		screen()
	}

	const handleTimedRangeRuleUpdate = (rule) => {
		setTimedRangeRules([...timedRangeRules, rule])
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
		const possibleTimeSpans = ['Quarter', 'HalfYear', 'Year', 'ThreeYears', 'FiveYears']

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

	const getActiveSectors = (sectorList) => {
		let activeSectors = []
		sectorList.forEach(sector => {
			if (sector.isChecked === true)
				activeSectors.push(sector.value)
		})
		return activeSectors
	}

	const getActiveMarkets = (marketList) => {
		let activeMarkets = []

		marketList.forEach(market => {
			if (market.isChecked === true)
				activeMarkets.push(market.value)
		})
		return activeMarkets
	}

	const screen = async () => {
		if (validate()) {
			setLoading(true)
			setChangeMade(true)

			const tickers = await ScreenerClient.postScreeningRequest({
				markets: getActiveMarkets(markets),
				sectors: getActiveSectors(sectors),
				rangedRule: rangedRules,
				timedRangeRule: timedRangeRules
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
	useEffect(() => { screen() }, [markets, rangedRules, sectors, timedRangeRules]);

	const saveIndex = () => {
		const newIndexID = uuidv4()
		
		CustomIndexClient.CreateCustomIndex({
			userId: props.userID,
			indexId: newIndexID, 
			markets: [
				"Sp500"
			],
			sectors: getActiveSectors(sectors),
			rangedRule: rangedRules,
			timedRangeRule: timedRangeRules
		});

		setIndex(newIndexID)
	}

	const updateIndex = () => {
		CustomIndexClient.UpdateCustomIndex(props.userID, {
			userId: props.userID,
			indexId: index,
			markets: [
				"Sp500"
			],
			sectors: getActiveSectors(sectors),
			rangedRule: rangedRules,
			timedRangeRule: timedRangeRules
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
							markets={markets}
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
