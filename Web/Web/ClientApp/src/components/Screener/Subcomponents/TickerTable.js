import React, { Component } from 'react';

export class TickerTable extends Component {

	static renderStockDataTable(tickers) {
		if (!Array.isArray(tickers))
			return "Loading";

		return (
			<table className='table table-striped' aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Ticker</th>
					</tr>
				</thead>
				<tbody>
					{tickers.map(stockdatum =>
						<tr key={stockdatum}><td>{stockdatum}</td></tr>
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = TickerTable.renderStockDataTable(this.props.tickers);

		return (
			<div>
				{contents}
			</div>
		);
	}
} 
