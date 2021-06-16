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
	const [updateButton, setUpdateButton] = useState(false)

	let { indexID } = useParams();

	const loadIndex = async () => {
		const index = await CustomIndexClient.getCustomIndexByIndexId(props.userID, indexID)
		let tempSectors = []
		
		sectors.forEach(sector => {
			if (index.sectors && index.sectors.includes(sector.value)) {
				tempSectors.push({value: sector.value, isChecked: true})
			}
			else {
				tempSectors.push({value: sector.value, isChecked: false})
			}
		})

		setSectors(tempSectors)
		setRangedRules(index.rangedRule)
		setTimedRangeRules(index.timedRangeRule)
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

		// if not new rule update existing

		// then screen
		screen()
	}

	const handleTimedRangeRuleUpdate = (rule) => {
		setTimedRangeRules([...timedRangeRules, rule])
	}

	const deleteRangedRule = (selectedRule) => {
		const resultingRules = rangedRules.filter(rule => rule.ruleType !== selectedRule);
		setRangedRules(resultingRules)
	}

	const deleteTimedRangeRule = (selectedRule) => {
		const resultingRules = timedRangeRules.filter(rule => rule.ruleType !== selectedRule);
		setTimedRangeRules(resultingRules)
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
		setLoading(true)

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

	const handleMount = () => {
		if (indexID) {
			loadIndex()
			setCollapseOpen(true)
			setUpdateButton(true)
		}
	}

	useEffect(() => {handleMount()}, []);
	useEffect(() => { screen() }, [rangedRules, sectors, timedRangeRules]);


	const saveIndex = () => {
		return CustomIndexClient.postCustomIndexRequest({
			userId: props.userID,
			markets: [
				"Sp500"
			],
			"sectors": getActiveSectors(sectors),
			"rangedRule": rangedRules,
			"timedRangeRule": timedRangeRules
		});
	}

	const updateIndex = () => {
		return CustomIndexClient.updateCustomIndexRequest(props.userID, {
			userId: props.userID,
			indexId: indexID,
			markets: [
				"Sp500"
			],
			"sectors": getActiveSectors(sectors),
			"rangedRule": rangedRules,
			"timedRangeRule": timedRangeRules
		});
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
							deleteTimedRangeRule={deleteTimedRangeRule}/>
						<br/>
						{updateButton
							? <UpdateButton handleUpdate={updateIndex}/>
							: <SaveButton handleSave={saveIndex} />}
					</div>
				</Card>
				<Card className='tickerCard'>
					<div className='tickerTableContainer'>
						<TickerTable tickers={tickers} loading={loading} />
					</div>
				</Card>
			</div>
		</div>
	)
}
