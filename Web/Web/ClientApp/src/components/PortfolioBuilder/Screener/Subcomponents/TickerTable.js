import React, { Component } from 'react';
import EmptyTickerTable from './EmptyTickerTable';

export class TickerTable extends Component {

	static renderStockDataTable(tickers) {
		if (tickers.length === 0) 
			return (<EmptyTickerTable />)

			debugger						

		return (
			<table className='table table-striped' aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Ticker</th>
						<th>Weight</th>
					</tr>
				</thead>
				<tbody>
					{tickers && tickers.map(stockdatum =>
						<tr key={stockdatum.ticker}>
							<td>{stockdatum.ticker}</td>
							<td>{stockdatum.weight}</td>
						</tr>
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
