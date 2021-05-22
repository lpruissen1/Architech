import React, { Component } from 'react';
import Loading from './Loading';

export class TickerTable extends Component {
	constructor(props) {
		super(props)
	}
	static renderStockDataTable(tickers, loading) {
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
					{loading && <Loading />}
					{tickers.map(stockdatum =>
						<tr key={stockdatum}><td>{stockdatum}</td></tr>
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = TickerTable.renderStockDataTable(this.props.tickers, this.props.loading);

		return (
			<div>
				{contents}
			</div>
		);
	}
} 
