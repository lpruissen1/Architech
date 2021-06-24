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
	const [sectors, setSectors] = useState([
		{ value: "Healthcare", isChecked: false },
		{ value: "Technology", isChecked: false },
		{ value: "Financial Services", isChecked: false },
		{ value: "Industrials", isChecked: false },
		{ value: "Consumer Cyclical", isChecked: false },
		{ value: "Utilities", isChecked: false },
		{ value: "Basic Materials", isChecked: false },
		{ value: "Real Estate", isChecked: false },
		{ value: "Communication Services", isChecked: false },
		{ value: "Consumer Defensive", isChecked: false },
		{ value: "Energy", isChecked: false }
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
				tempSectors.push({value: sector.value, isChecked: true})
			}
			else {
				tempSectors.push({value: sector.value, isChecked: false})
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

	const screen = async () => {
		if (validate()) {
			setLoading(true)
			setChangeMade(true)

			const tickers = await ScreenerClient.postScreeningRequest({
				markets: [
					"Sp500"
				],
				"sectors": getActiveSectors(sectors),
				"rangedRule": rangedRules,
				"timedRangeRule": timedRangeRules
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
	useEffect(() => { screen() }, [rangedRules, sectors, timedRangeRules]);

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
							checkIfTimedRangeRuleExists={checkIfTimedRangeRuleExists}/>
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
