import React, { Component } from 'react';
import { TickerTable } from './Subcomponents/TickerTable';
import SectorSelector from './Subcomponents/SectorSelector';
import RangeSelector from './Subcomponents/RangeSelector';
import BasicRules from './Subcomponents/BasicRules';
import './Screener.css';
import Card from 'react-bootstrap/Card';
import Collapsible from 'react-collapsible';

export class Screener extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			rangedRule: [],
			appendedCompsCount : 0
		};
	}

	componentDidMount() {
		this.screen()
	}

	update = () => {
		this.screen()
	}

	// All of the stuff in the screenercard should go in the screening controls component. 
	render() {
		return (
			<div>
				<h1 id="tabelLabel" >Screener</h1>
				<div className='rowThing'>
					<Card className='screenerCard'>
						<div>
							<Collapsible className='Collapsible' trigger="Sectors"> 
								<SectorSelector sectors={this.state.sectors} handleUpdate={this.update} />
							</Collapsible>
							<Collapsible className='Collapsible' trigger="Basic Metrics">
								<BasicRules/>
							</Collapsible>
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

		// within second pane add a "Basic Rules" component
			// start with empty panel with "+" 
			// button triggers replacement with a list of rule types
			// select rule type

		// Add panel to 
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
