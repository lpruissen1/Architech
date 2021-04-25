import React, { Component } from 'react';
import { TickerTable } from './Subcomponents/TickerTable';
import { ScreeningControls } from './Subcomponents/ScreeningControls';
import './Screener.css';
import Card from 'react-bootstrap/Card';
import { ScreenerCard } from './Subcomponents/TestCard';

export class Screener extends Component {
	static displayName = Screener.name;
	// contains
	//	* Ticker side table
	//	* Screening controls

	render() {
		return (
			<div className='tickerTable'>
				<h1 id="tabelLabel" >Screener Loser</h1>
				<div className = 'rowThing'>
					<Card className = 'screenerCard'>
						<ScreeningControls className='green' />
					</Card>
					<Card className = 'tickerCard'>
						<div className='blah'>
							<TickerTable className='grey' />
						</div>
					</Card>
				</div>
			</div>
		);
	}
}
