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
				{ value: "Healthcare", isChecked: true },
				{ value: "Mining", isChecked: true },
				{ value: "Financial Services", isChecked: true }
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
