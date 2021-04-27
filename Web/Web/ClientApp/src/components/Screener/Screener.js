import React, { Component } from 'react';
import { TickerTable } from './Subcomponents/TickerTable';
import { ScreeningControls } from './Subcomponents/ScreeningControls';
import './Screener.css';
import Card from 'react-bootstrap/Card';

export class Screener extends Component {
	static displayName = Screener.name;

	render() {
		return (
			<div>
				<h1 id="tabelLabel" >Screener</h1>
				<div className = 'rowThing'>
					<Card className = 'screenerCard'>
						<ScreeningControls />
					</Card>
					<Card className = 'tickerCard'>
						<div className = 'tickerTableContainer'>
							<TickerTable />
						</div>
					</Card>
				</div>
			</div>
		);
	}
}
