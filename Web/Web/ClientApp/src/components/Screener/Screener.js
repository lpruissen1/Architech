import React, { Component } from 'react';
import { TickerTable } from './Subcomponents/TickerTable';
import SectorSelector from './Subcomponents/SectorSelector';
import './Screener.css';
import Card from 'react-bootstrap/Card';

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
			tickers: []
		};
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
						<SectorSelector sectors={this.state.sectors} handleUpdate={this.update} />
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
