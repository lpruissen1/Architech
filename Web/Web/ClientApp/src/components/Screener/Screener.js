import React, { Component } from 'react';
import { TickerTable } from './Subcomponents/TickerTable';
import { ScreeningControls } from './Subcomponents/ScreeningControls';
import './Screener.css';

export class Screener extends Component {
	static displayName = Screener.name;
	// contains
	//	* Ticker side table
	//	* Screening controls

	render() {
		return (
			<div className='tickerTable'>
				<h1 id="tabelLabel" >Screener Loser</h1>
				<div className='flexbox'>
					<ScreeningControls className='green' />
					<TickerTable className='grey' />
				</div>
			</div>
		);
	}
}
