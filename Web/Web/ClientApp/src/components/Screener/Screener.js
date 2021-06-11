import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CustomIndexClient from '../../Clients/CustomIndexClient';
import './Screener.css';
import SaveButton from './Subcomponents/SaveButton';
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

	let { indexID } = useParams();

	const getCustomIndexRequest = () => {
		const index = CustomIndexClient.getCustomIndexByIdRequest(props.userID, indexID)
		let tempSectors = []

		sectors.forEach(sector => {
			if (index.sectors.includes(sector.value)) {
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

	const getActiveSectors = (sectorList) => {
		let activeSectors = []
		sectorList.forEach(sector => {
			if (sector.isChecked === true)
				activeSectors.push(sector.value)
		})
		return activeSectors
	}

	const postScreeningRequest = (data = {}) => {
		setLoading(true)
		fetch("https://localhost:5001/Screening/FuckYourself", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(function (response) {
				return response.json().then(function (data) {
					setTickers(data)
					setLoading(false)
				})
			});
	}

	const screen = () => {
		return postScreeningRequest({
			markets: [
				"Sp500"
			],
			"sectors": getActiveSectors(sectors),
			"rangedRule": rangedRules,
			"timedRangeRule": timedRangeRules
		});
	}

	const handleMount = () => {
		if (indexID) {
			getCustomIndexRequest()
			setCollapseOpen(true)
		}
	}

	useEffect(() => {handleMount()}, []);
	useEffect(() => { screen() }, [rangedRules, sectors, timedRangeRules]);

	const postCustomIndexRequest = (data = {}) => {
		fetch("https://localhost:7001/CustomIndex", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(function (response) {
				return response.status
			});
	}

	const saveIndex = () => {
		return postCustomIndexRequest({
			userId: props.userID,
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
						<ScreeningControls sectors={sectors} rangedRules={rangedRules} timedRangeRules={timedRangeRules} handleUpdate={screen} handleRangedRuleUpdate={handleRangedRuleUpdate} handleTimedRangeRuleUpdate={handleTimedRangeRuleUpdate} collapseOpen={collapseOpen}/>
						<br/>
						<SaveButton handleSave={saveIndex}/>
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
