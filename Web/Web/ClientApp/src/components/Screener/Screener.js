import React, { Component } from 'react';
import { TickerTable } from './Subcomponents/TickerTable';
import ScreeningControls from './Subcomponents/ScreeningControls';
import Card from 'react-bootstrap/Card';
import './Screener.css';

export class Screener extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// We should move this isChecked stuff down to the sector selector controls and simply append or remove sectors as clicked
			sectors: [
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
			],
			tickers: [],
			rangedRules: [],
			timedRangeRules: [],
		};
		this.handleRangedRuleUpdate = this.handleRangedRuleUpdate.bind(this);
	}

	handleRangedRuleUpdate(rule) {
		this.setState({
			rangedRules: [...this.state.rangedRules, rule]
		})
	}
	componentDidMount() {
		this.screen()
	}

	update = () => {
		this.screen()
	}

	render() {
		return (
			<div>
				<h1 id="tabelLabel" >Screener</h1>
				<div className='rowThing'>
					<Card className='screenerCard'>
						<div>
							<ScreeningControls sectors={this.state.sectors} rangedRules={this.state.rangedRules} timedRangeRules={this.state.timedRangeRules} handleUpdate={this.update} handleRangedRuleUpdate={ this.handleRangedRuleUpdate} />
						</div>
					</Card>
					<Card className='tickerCard'>
						<div className='tickerTableContainer'>
							<TickerTable tickers={this.state.tickers} />
						</div>
					</Card>
				</div>
			</div>
		);
	}
	
	screen() {
		return this.postScreeningRequest({
			markets: [
				"Sp500"
			],
			"sectors": this.getActiveSectors(this.state.sectors)
		});
	}


	getActiveSectors(sectors) {
		let activeSectors = []
		sectors.forEach(sector => {
			if (sector.isChecked === true)
				activeSectors.push(sector.value)
		})
		return activeSectors
	}

	postScreeningRequest(data = {}) {
		const that = this
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
				that.setState({ tickers: data })
			})
		});
	}
}
