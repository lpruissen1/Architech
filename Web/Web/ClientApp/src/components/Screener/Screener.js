import React, { Component } from 'react';
import { TickerTable } from './Subcomponents/TickerTable';
import { ScreeningControls } from './Subcomponents/ScreeningControls';
import './Screener.css';
import Card from 'react-bootstrap/Card';

export class Screener extends Component {
	static displayName = Screener.name;

	state = {
		customIndex: {
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
				{ value: "Energy", isChecked: false },

			],
			market: "Sp500"
		}
	};

	onUpdate(sectors) { this.setState({ sectors }) }

	render() {
		return (
			<div>
				<h1 id="tabelLabel" >Screener</h1>
				<div className = 'rowThing'>
					<Card className = 'screenerCard'>
						<ScreeningControls {...this.state} />
					</Card>
					<Card className = 'tickerCard'>
						<div className = 'tickerTableContainer'>
							<TickerTable {...this.state}/>
						</div>
					</Card>
				</div>
			</div>
		);
	}
}
