import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
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

	let { indexID } = useParams();

	const GET_URL = 'https://localhost:7001/CustomIndex/GetCustomIndex?userID=' + props.userID + '&indexId=' + indexID;

	const getCustomIndexRequest = () => {
		fetch(GET_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(function (response) {
				return response.json().then(function (data) {
					console.log(data)


					setRangedRules(data.rangedRule)
					setTimedRangeRules(data.timedRangeRule)
				})
			});
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
					console.log(data)
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
		screen()
		getCustomIndexRequest()
	}

	useEffect(() => {handleMount()}, []);

	const update = () => {
		screen()
	}

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

	const save = () => {
		saveIndex()
	}

	return (
		<div>
			<h1 id="tabelLabel" >Screener: {indexID}</h1>
			<div className='rowThing'>
				<Card className='screenerCard'>
					<div>
						<ScreeningControls sectors={sectors} rangedRules={rangedRules} timedRangeRules={timedRangeRules} handleUpdate={update} handleRangedRuleUpdate={handleRangedRuleUpdate} handleTimedRangeRuleUpdate={handleTimedRangeRuleUpdate} />
						<br/>
						<SaveButton handleSave={save}/>
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
